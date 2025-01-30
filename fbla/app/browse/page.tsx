"use client"

import React, {useEffect, useState} from 'react'
import Header from '../components/Header'
import Search from './Search'
import Deck from './Deck'
import JobCard from "@/app/components/JobCard";
import axios from 'axios';
import CheckLogIn from "@/app/components/CheckLogIn";


// This function fetches the data from the API on the server side
async function fetchPosts() {
    const response = await axios.get("https://connexting.ineshd.com/api/listings", {
        withCredentials: true, // Include cookies in the request
    });
    if (response.status !== 200) {
        throw new Error('Failed to fetch posts');
    }
    return response.data;
}

const BrowsePage = () => {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        async function fetchData() {
            try {
                const allPosts = await fetchPosts();
                
                // Convert object to array and filter by status
                const filteredPosts = Object.values(allPosts).filter(post => post.status === 1);

                setPosts(filteredPosts);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        }

        fetchData();
    }, []);

    return (
        <div className="overflow-x-hidden">
            <CheckLogIn/>
            <Header/>
            <Search/>
            <div className="w-screen h-auto bg-background flex justify-center items-center">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-6 px-2">
                    {Object.entries(posts).map(([id, post]) => (
                        <JobCard key={id} post={post}/>
                    ))}
                </div>

            </div>
        </div>
    );
}

export default BrowsePage