import React from 'react'
import {
    Card,
    CardTitle,
    CardContent,
    CardHeader,
} from "@/components/ui/card"
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { MessageSquareMore, Star } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import Link from 'next/link'


interface Review {
    user: string
    text: string
    stars: number
}

interface Post {
    id: string
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

const JobCard = ({post}: {post: Post}) => {
    const link = `/listing?id=${post.id}`
    const images = []
    for (let i = 0; i < post.expandedImages.length; i++) {
        images.push(
            <Image key={i} src={post.expandedImages[i]} alt={post.title} width={500} height={500} className='h-full overflow-hidden px-3' />
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

    const reviews = [<Star key={0} />]
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
        <div> 
            <Card>
                <CardHeader className='text-left'>
                    {/* <Button variant="link" >{post.title}</Button> */}
                    {/* <Link className={buttonVariants({ variant: "link" })}>{post.title}</Link> */}
                    {/* <Button className='text-left'> */}
                    <Link href={link} className='text-2xl hover:underline text-left'>{post.title}</Link>
                    {/* </Button> */}

                    <h1>{post.company}</h1>
                </CardHeader>
                <CardContent>
                    <Image src={post.thumbnailImage} alt={post.title} width={500} height={500} className='w-full' />
                    <div className="flex items-center justify-between p-5">
                        <div className="flex items-center">
                            <div>
                                <p>{post.hours}</p>
                                <p>{post.pay}</p>
                                <p>{post.duration}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-1">
                            <Button variant="outline" size="icon">
                                <MessageSquareMore />
                            </Button>
                            <Button variant="outline" size="icon">
                                <Star />
                            </Button>
                        </div>
                    </div>
                </CardContent>
        </Card>

        </div>
    )
}

export default JobCard