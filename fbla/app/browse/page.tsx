"use client"

import React, { useEffect, useState, Suspense } from 'react';
import Header from '../components/Header';
import Search from './Search';
import JobCard from "@/app/components/JobCard";
import axios from 'axios';
import CheckLogIn from "@/app/components/CheckLogIn";
import { Button } from '@/components/ui/button';
import { useSearchParams, useRouter } from 'next/navigation';
import Head from 'next/head';

interface PaginationData {
    currentPage: number;
    totalPages: number;
    totalListings: number;
    hasMore: boolean;
}

const BrowsePage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState<PaginationData>({
        currentPage: 1,
        totalPages: 1,
        totalListings: 0,
        hasMore: false
    });

    const fetchPosts = async (page: number) => {
        try {
            const searchQuery = searchParams.get('q');
            const minHours = searchParams.get('minHours') || '0';
            const maxHours = searchParams.get('maxHours') || '40';
            const baseUrl = `https://connexting.ineshd.com/api/listings${searchQuery ? '/search' : ''}`;
            const queryParams = new URLSearchParams({
                page: page.toString(),
                limit: '9',
                minHours,
                maxHours
            });

            if (searchQuery) {
                queryParams.set('q', searchQuery);
            }

            const response = await axios.get(
                `${baseUrl}?${queryParams.toString()}`,
                { withCredentials: true }
            );
            setPosts(response.data.listings);
            setPagination(response.data.pagination);
        } catch (error) {
            console.error('Error fetching posts:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Always generate and set a new seed when component mounts
        const newSeed = Math.floor(Math.random() * 1000000).toString();
        document.cookie = `browseSeed=${newSeed};path=/;max-age=3600`; // Cookie expires in 1 hour

        fetchPosts(1);
    }, [
        searchParams.get('q'),
        searchParams.get('minHours'),
        searchParams.get('maxHours')
    ]);

    const handlePageChange = (newPage: number) => {
        setLoading(true);
        fetchPosts(newPage);
    };

    if (loading) {
        return <div className="text-center mt-10">Loading...</div>;
    }

    return (
        <>
            <Head>
                <title>Connext - Browse Opportunities</title>
                <meta name="description" content="Browse job opportunities and internships for high school students" />
            </Head>
            <div className="flex flex-col min-h-screen">
                <div className="overflow-x-hidden">
                    <CheckLogIn/>
                    <Header/>
                    <Search/>
                    <div className="w-screen h-auto bg-background flex flex-col items-center">
                        {Object.keys(posts).length === 0 ? (
                            <div className="text-center py-12 text-lg text-gray-500">
                                No results found :(
                            </div>
                        ) : (
                            <>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-8">
                                    {Object.entries(posts).map(([id, post]) => (
                                        <JobCard key={id} post={post}/>
                                    ))}
                                </div>

                                {/* Pagination Controls */}
                                <div className="flex gap-2 mb-8">
                                    <Button
                                        onClick={() => handlePageChange(pagination.currentPage - 1)}
                                        disabled={pagination.currentPage === 1}
                                        variant="outline"
                                    >
                                        Previous
                                    </Button>
                                    <span className="flex items-center px-4">
                                        Page {pagination.currentPage} of {pagination.totalPages}
                                    </span>
                                    <Button
                                        onClick={() => handlePageChange(pagination.currentPage + 1)}
                                        disabled={!pagination.hasMore}
                                        variant="outline"
                                    >
                                        Next
                                    </Button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

const BrowsePageWrapper = () => (
    <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
        <BrowsePage />
    </Suspense>
);

export default BrowsePageWrapper;