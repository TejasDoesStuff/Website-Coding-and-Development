"use client"

import React, { useEffect, useState } from 'react'
import {
    Card,
    CardTitle,
    CardContent,
    CardHeader,
} from "@/components/ui/card"
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Marquee from "react-fast-marquee";
import { Badge } from "@/components/ui/badge"
import Header from '../../components/Header'
import Link from 'next/link'

interface Review {
    user: string
    text: string
    stars: number
}

interface Post {
    name: string
    description: string
    company: string
    thumbnailImage: string
    expandedImages: Array<string>
    hours: string
    pay: string 
    duration: string
    requirements: Array<string>
    tags: Array<string>
    reviews: Array<Review>
}

const JobPage = ({ params }: { params: Promise<{ id: string }> }) => {
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState(true);

    const unwrappedParams = React.use(params);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch('https://connexting.ineshd.com/api/listings', {
                    credentials: 'include',
                });
                const posts = await response.json();
                if (unwrappedParams.id && posts[unwrappedParams.id]) {
                    setPost(posts[unwrappedParams.id]);
                } else {
                    throw new Error('Post not found');
                }
            } catch (error) {
                console.error("Failed to fetch post data:", error);
            } finally {
                setLoading(false);
            }
        };

        if (unwrappedParams.id) {
            fetchPost();
        }
    }, [unwrappedParams.id]);

    if (loading) {
        return <div className="text-center mt-10">Loading...</div>;
    }

    if (!post) {
        return <div className="text-center mt-10">Post not found</div>;
    }

    const images = post.expandedImages?.length ? post.expandedImages.map((image, index) => (
        <Image key={index} src={image} alt={post.name} width={500} height={500} 
               className="object-fill h-[300px] sm:h-[400px] md:h-[500px] overflow-hidden px-3" />
    )) : [
        <Image key={0} src="https://unsplash.it/500/500?random" alt={post.name} width={500} height={500}
               className="object-cover h-[300px] sm:h-[400px] md:h-[500px] overflow-hidden px-3" />
    ];

    const requirements = post.requirements?.length ? post.requirements.map((req, index) => (
        <li key={index} className="text-sm sm:text-base">• {req}</li>
    )) : <li className="text-sm sm:text-base">• No requirements</li>;

    const tags = post.tags?.length ? post.tags.map((tag, index) => (
        <Badge key={index} variant="secondary" className="text-xs sm:text-md mx-0.5">{tag}</Badge>
    )) : <Badge variant="secondary" className="text-xs sm:text-md mx-0.5">No tags</Badge>;

    const reviews = post.reviews?.length ? post.reviews.map((review, index) => (
        <Card key={index}>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle className="text-sm sm:text-md">{review.user}</CardTitle>
                    <p className="text-xs sm:text-md">{'⭐'.repeat(review.stars)}</p>
                </div>
            </CardHeader>
            <CardContent>
                <p className="text-sm sm:text-base">{review.text}</p>
            </CardContent>
        </Card>
    )) : (
        <Card>
            <CardHeader>
                <CardTitle className="text-sm sm:text-md">No reviews</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm sm:text-base">No reviews available</p>
            </CardContent>
        </Card>
    );

    return (
        <div className="overflow-x-hidden">
            <Header />
            {/* Job Details Section */}
            <div className="px-4 sm:px-8 md:px-16 lg:px-48 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-16 overflow-y-auto h-full p-4">
                <div>
                    <h1 className="text-xl sm:text-2xl md:text-3xl md:text-left text-center">{post.name}</h1>
                    <div className="pt-2 flex flex-wrap gap-1 justify-center md:justify-start">{tags}</div>
                    <p className="text-md sm:text-lg">{post.company}</p>
                    <h1 className="text-md sm:text-lg mt-2">{post.description}</h1>
                    <h1 className="text-lg sm:text-xl mt-4">Requirements:</h1>
                    <ul className="text-sm sm:text-base">{requirements}</ul>
                    {/* Apply Button */}
                    <Button className="w-full px-4 py-2 mt-4" variant="outline">Apply</Button>
                </div>

                {/* Image Marquee Section */}
                <div className="flex justify-center">
                    {images}
                    {/* <Marquee speed={0} pauseOnHover className="rounded-3xl">
                        {images}
                    </Marquee> */}
                </div>
            </div>

            {/* Reviews Section */}
            <div className="px-4 sm:px-8 md:px-16 lg:px-48 mt-6">
                {/* <h1 className="text-lg sm:text-xl">Reviews:</h1>
                <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 hidden sm:block">
                    {reviews}
                </div> */}
                {/* Back Button */}
                <Button className="w-full" variant="destructive" asChild>
                    <Link href="/browse">Back</Link>
            </Button>
            </div>
        </div>
    )
}

export default JobPage;
