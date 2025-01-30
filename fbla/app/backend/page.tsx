"use client"

import React, {useEffect, useState} from 'react'
import JobCard from "@/app/components/JobCard";
import axios from 'axios';
import { Check, X } from "lucide-react"
import Header from '../components/Header';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "admin123" // In production, use environment variable

const Backend = () => {
    const [posts, setPosts] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [filter, setFilter] = useState(0);

    useEffect(() => {
        if (isAuthenticated) {
            fetchData();
        }
    }, [isAuthenticated, filter]);

    async function fetchData() {
        try {
            const response = await axios.get("https://connexting.ineshd.com/api/listings", {
                withCredentials: true,
            });
            // Filter posts based on selected filter value
            const filteredPosts = Object.fromEntries(
                Object.entries(response.data).filter(([_, post]) => post.status === filter)
            );
            setPosts(filteredPosts);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    }

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
            const response = await axios.patch(`https://connexting.ineshd.com/api/listings/${id}/status`, {
                status: action === 'accept' ? 1 : -1
            }, {
                withCredentials: true
            });
            
            if (response.status === 200) {
                setPosts(prev => {
                    const newPosts = {...prev};
                    delete newPosts[id];
                    return newPosts;
                });
            }
        } catch (error) {
            console.error('Error updating post status:', error);
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
                    {Object.entries(posts).map(([id, post]) => (
                        <div key={id} className="flex flex-col justify-center items-center">
                            <JobCard post={post}/>
                            <div className="flex flex-row w-full gap-1 mt-1 justify-center">
                                {filter !== 1 && ( // Show accept button if not in accepted view
                                    <Button 
                                        onClick={() => handlePostAction(id, 'accept')}
                                        className="w-1/2 bg-green-500 hover:bg-green-600 text-white"
                                    >
                                        <Check />
                                    </Button>
                                )}
                                {filter !== -1 && ( // Show reject button if not in rejected view
                                    <Button 
                                        onClick={() => handlePostAction(id, 'reject')}
                                        className="w-1/2 bg-red-500 hover:bg-red-600 text-white"
                                    >
                                        <X />
                                    </Button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Backend;
