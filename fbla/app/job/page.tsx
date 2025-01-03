"use client"

import React from 'react'
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
import { useSearchParams } from 'next/navigation';
import posts from "../../posts.json"
import Header from '../Header'
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

const JobPage = () => {
    const searchParams = useSearchParams();
    const id: string = searchParams.get('id')

    if (typeof id !== 'string') {
        return <div>Loading...</div>; // or handle error
    }

    const post: Post = posts[id]

    const images = []
    for (let i = 0; i < post.expandedImages.length; i++) {
        images.push(
            <Image key={i} src={post.expandedImages[i]} alt={post.title} width={500} height={500} className='object-cover h-[500px] overflow-hidden px-3' />
        )
    }

    const requirements = []
    for (let i = 0; i < post.requirements.length; i++) {
        requirements.push(
            <li key={i}>• {post.requirements[i]}</li>
        )
    }

    const tags = []
    for (let i = 0; i < post.tags.length; i++) {
        tags.push(
            <Badge key={i} variant="secondary" className='text-md mx-0.5'>{post.tags[i]}</Badge>
        )
    }

    const reviews = []
    for (let i = 0; i < post.reviews.length; i++) {
        let stars = "⭐ "
        for (let j = post.reviews[i].stars; j > 1; j--) {
            stars += "⭐ "
        }
        reviews.push(
            <Card key={i}>
                <CardHeader>
                    <div className='flex items-center justify-between'>
                        <CardTitle>{post.reviews[i].user}</CardTitle>
                        <p>{stars}</p>
                    </div>
                </CardHeader>
                <CardContent>
                    <p>{post.reviews[i].text}</p>
                </CardContent>
            </Card>   
        )
    }

    return (
        <div className='p-5 overflow-x-hidden'>
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

export default JobPage