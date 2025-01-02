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
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import Marquee from "react-fast-marquee";
import { Badge } from "@/components/ui/badge"

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

const JobCard = ({post}: {post: Post}) => {
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
        <div>
            <Card>
                <CardHeader>
                    <Drawer>
                        <DrawerTrigger className='text-left hover:underline'>
                            <h1 className='text-2xl'>{post.title}</h1>
                        </DrawerTrigger>
                        <DrawerContent className='px-48'>
                            <DrawerHeader className="py-10">
                                <div className='grid grid-cols-2 gap-16 overflow-y-auto h-full p-4'>
                                    <div>
                                        <DrawerTitle className='text-3xl'>{post.title}</DrawerTitle>
                                        <div className="pt-2">
                                            {tags}
                                        </div>
                                        <br />
                                        <p className="text-xl">{post.company}</p>
                                        <br />
                                        <DrawerDescription className='text-lg'>{post.description}</DrawerDescription>
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
                                <h1 className='text-xl'>Reviews:</h1>
                                <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                    {reviews}     
                                </div>  
                                <DrawerClose asChild>
                                    <Button className='w-full mt-1' variant="destructive">Cancel</Button>
                                </DrawerClose> 
                            </DrawerHeader>
                        </DrawerContent>
                    </Drawer>
                    
                    <h1>{post.company}</h1>
                </CardHeader>
                <CardContent className='p-0'>
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