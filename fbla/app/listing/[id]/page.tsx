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
    title: string
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
                const response = await fetch(`https://fbla.ineshd.com/listings`);
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
        return <div>Loading...</div>;
    }

    if (!post) {
        return <div>Post not found</div>; // Handle error if post is not found
    }

    const images = post.expandedImages.map((image, index) => (
        <Image key={index} src={image} alt={post.title} width={500} height={500} className='object-cover h-[500px] overflow-hidden px-3' />
    ));

    const requirements = post.requirements.map((req, index) => (
        <li key={index}>• {req}</li>
    ));

    const tags = post.tags.map((tag, index) => (
        <Badge key={index} variant="secondary" className='text-md mx-0.5'>{tag}</Badge>
    ));

    const reviews = post.reviews.map((review, index) => {
        let stars = "⭐ ";
        for (let i = 1; i < review.stars; i++) {
            stars += "⭐ ";
        }
        return (
            <Card key={index}>
                <CardHeader>
                    <div className='flex items-center justify-between'>
                        <CardTitle>{review.user}</CardTitle>
                        <p>{stars}</p>
                    </div>
                </CardHeader>
                <CardContent>
                    <p>{review.text}</p>
                </CardContent>
            </Card>
        );
    });

    return (
        <div className='overflow-x-hidden'>
            <Header />
            <div className='px-48 grid grid-cols-2 gap-16 overflow-y-auto h-full p-4'>
                <div>
                    <h1 className='text-3xl'>{post.title}</h1>
                    <div className="pt-2">
                        {tags}
                    </div>
                    <br />
                    <p className="text-xl">{post.company}</p>
                    <br />
                    <h1 className='text-lg'>{post.description}</h1>
                    <br />
                    <h1 className='text-xl'>Requirements:</h1>
                    <ul>
                        {requirements}
                    </ul>
                    <br />
                    <Button className='w-full' variant="outline">Apply</Button>
                </div>
                <div>
                    <Marquee speed={100} pauseOnHover={true} className='rounded-3xl'>{images}</Marquee>
                </div>
            </div>
            <br />
            <div className='px-48'>
                <h1 className='text-xl'>Reviews:</h1>
                <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {reviews}
                </div>
                <br />
                <Button className='w-full mt-1' variant="destructive" asChild>
                    <Link href="/">Back</Link>
                </Button>
            </div>
        </div>
    )
}

export default JobPage;
