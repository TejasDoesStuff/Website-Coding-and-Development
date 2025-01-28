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
    const response = await axios.get("https://fbla.ineshd.com/listings", {
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
                const posts = await fetchPosts();
                setPosts(posts);
            } catch (error) {
                console.error('Error fetching posts:', error);
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
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {Object.entries(posts).map(([id, post]) => (
                        <JobCard key={id} post={post}/>
                    ))}
                </div>

            </div>
        </div>
    );
}

export default BrowsePage