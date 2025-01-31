import React from 'react'
import {
    Card,
    CardTitle,
    CardContent,
    CardHeader,
} from "@/components/ui/card"
import Image from 'next/image'
import {Button} from '@/components/ui/button'
import {MessageSquareMore, Star} from 'lucide-react'
import {Badge} from "@/components/ui/badge"
import Link from 'next/link'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"


interface Review {
    user: string
    text: string
    stars: number
}

interface Post {
    id: string
    name: string
    description: string
    company: string
    recruiter: {
        name: string
        _id: string
    }
    photos?: string[]
    thumbnailImage?: string
    expandedImages?: string[]
    hours: string
    pay: string
    duration: string
    requirements: Array<string>
    tags: Array<string>
    reviews: Array<Review>
    location: string
}

const JobCard = ({post}: { post: Post }) => {
    const link = `/listing/${post.id}`
    const defaultImage = '/images/defaults/listing-default.jpg'
    
    const thumbnailImage = post.photos?.[0] || defaultImage;
    
    const images = post.photos?.map((image, i) => (
        <Image 
            key={i} 
            src={image} 
            alt={post.name} 
            width={500} 
            height={500}
            className='h-full overflow-hidden px-3'
        />
    )) || [
        <Image 
            key="default" 
            src={defaultImage} 
            alt={post.name} 
            width={500} 
            height={500}
            className='h-full overflow-hidden px-3'
        />
    ]

    const requirements = []
    for (let i = 0; post.requirements != null && i < post.requirements.length; i++) {
        requirements.push(
            <li key={i}>• {post.requirements[i]}</li>
        )
    }

    if (post.requirements == null || post.requirements.length < 0) {
        requirements.push(
            <li key={0}>• No requirements</li>
        )
    }

    const tags = []
    for (let i = 0; post.tags != null && i < post.tags.length; i++) {
        tags.push(
            <Badge key={i} variant="secondary" className='text-md mx-0.5'>{post.tags[i]}</Badge>
        )
    }

    if (post.tags == null || post.tags.length < 0) {
        tags.push(
            <Badge key={0} variant="secondary" className='text-md mx-0.5'>No tags</Badge>
        )
    }

    const reviews = [<Star key={0}/>]
    for (let i = 0; post.reviews != null && i < post.reviews.length; i++) {
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
    if (post.reviews == null || post.reviews.length < 0) {
        reviews.push(
            <Card key={0}>
                <CardHeader>
                    <div className='flex items-center justify-between'>
                        <CardTitle>No reviews</CardTitle>
                        <p>⭐</p>
                    </div>
                </CardHeader>
                <CardContent>
                    <p>No reviews</p>
                </CardContent>
            </Card>
        )
    }

    return (
        <div className={"w-80"}>
            <Card className="cursor-pointer" onClick={() => (document.location.href = link)}>
                <CardHeader className='text-left'>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link 
                                    href={link} 
                                    className='text-2xl hover:underline text-left truncate block'
                                >
                                    {post.name}
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>{post.name}</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <h1>{post.recruiter?.name || 'Unknown Recruiter'}</h1>
                </CardHeader>
                <CardContent>
                    <div className="relative w-full pt-[75%]">
                        <Image 
                            src={thumbnailImage} 
                            alt={post.name} 
                            fill
                            className='absolute top-0 left-0 object-cover'
                        />
                    </div>
                    <div className="flex items-center justify-between p-5">
                        <div className="flex items-center">
                            <div>
                                <p>{post.hours} hours / week</p>
                                <p>${post.pay} per hour</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default JobCard