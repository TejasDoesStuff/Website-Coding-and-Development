"use client"

import React, {useEffect, useState} from 'react'
import JobCard from "@/app/components/JobCard";
import axios from 'axios';
import { Check, X } from "lucide-react"
import Header from '../components/Header';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "admin123" // In production, use environment variable

interface PaginationData {
    currentPage: number;
    totalPages: number;
    totalListings: number;
    hasMore: boolean;
}

const Backend = () => {
    const [posts, setPosts] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [filter, setFilter] = useState(0);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState<PaginationData>({
        currentPage: 1,
        totalPages: 1,
        totalListings: 0,
        hasMore: false
    });

    const fetchData = async (page = 1) => {
        try {
            const response = await axios.get(
                `https://connexting.ineshd.com/api/listings/backend?page=${page}&limit=10&filter=${filter}`,
                { withCredentials: true }
            );
            setPosts(response.data.listings);
            setPagination(response.data.pagination);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            fetchData(1); // Reset to first page when filter changes
        }
    }, [isAuthenticated, filter]);

    const handlePageChange = (newPage: number) => {
        fetchData(newPage);
    };

    const handlePasswordSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === ADMIN_PASSWORD) {
            setIsAuthenticated(true);
            setError("");
        } else {
            setError("Incorrect password");
        }
    };

    const handlePostAction = async (id: string, action: 'accept' | 'reject') => {
        try {
            const status = action === 'accept' ? 1 : -1;
            const postId = posts.find(post => post._id === id)?._id; // MongoDB stores the ID in the _id field
            await axios.patch(
                `https://connexting.ineshd.com/api/listings/${postId}/status`,
                { status },
                { withCredentials: true }
            );
            fetchData(pagination.currentPage); // Refresh current page
        } catch (error) {
            console.error('Error updating post:', error);
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="h-screen flex items-center justify-center">
                <form onSubmit={handlePasswordSubmit} className="space-y-4 w-[300px]">
                    <h1 className="text-2xl font-bold text-center">Admin Access</h1>
                    <Input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter admin password"
                    />
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <Button type="submit" className="w-full text-text">Login</Button>
                </form>
            </div>
        );
    }

    return (
        <div className="overflow-x-hidden">
            <Header />
            <div className="w-screen h-auto bg-background flex flex-col items-center my-4">
                <div className="flex gap-2 mb-6">
                    <Button 
                        onClick={() => setFilter(0)}
                        className={`${filter === 0 ? 'bg-primary' : 'bg-secondary'} text-text`}
                    >
                        Pending
                    </Button>
                    <Button 
                        onClick={() => setFilter(1)}
                        className={`${filter === 1 ? 'bg-primary' : 'bg-secondary'} text-text`}
                    >
                        Accepted
                    </Button>
                    <Button 
                        onClick={() => setFilter(-1)}
                        className={`${filter === -1 ? 'bg-primary' : 'bg-secondary'} text-text`}
                    >
                        Rejected
                    </Button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Object.entries(posts).map(([_, post]) => (
                        <div key={post._id} className="flex flex-col justify-center items-center">
                            <JobCard post={{
                                ...post,
                                id: post._id  // Ensure the id is correctly passed
                            }}/>
                            <div className="flex flex-row w-full gap-1 mt-1 justify-center">
                                {filter !== 1 && (
                                    <Button 
                                        onClick={() => handlePostAction(post._id, 'accept')}
                                        className="w-1/2 bg-green-500 hover:bg-green-600 text-white mt-2"
                                    >
                                        <Check />
                                    </Button>
                                )}
                                {filter !== -1 && (
                                    <Button 
                                        onClick={() => handlePostAction(post._id, 'reject')}
                                        className="w-1/2 bg-red-500 hover:bg-red-600 text-white mt-2"
                                    >
                                        <X />
                                    </Button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-center gap-2 mt-4">
                    <Button
                        onClick={() => handlePageChange(pagination.currentPage - 1)}
                        disabled={pagination.currentPage === 1}
                    >
                        Previous
                    </Button>
                    <span className="py-2">
                        Page {pagination.currentPage} of {pagination.totalPages}
                    </span>
                    <Button
                        onClick={() => handlePageChange(pagination.currentPage + 1)}
                        disabled={!pagination.hasMore}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Backend;
