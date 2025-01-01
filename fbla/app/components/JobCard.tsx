import React from 'react'
import {
    Card,
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

interface Post {
    jobName: string
    jobDescription: string
    companyName: string
    image: string
    hours: string
    pay: string
    duration: string
}

const JobCard = ({post}: {post: Post}) => {
    return (
        <div>
            <Card>
                <CardHeader>
                    <Drawer>
                        <DrawerTrigger className='text-left hover:underline'>
                            <h1 className='text-2xl'>{post.jobName}</h1>
                        </DrawerTrigger>
                        <DrawerContent className='px-40'>
                            <DrawerHeader>
                                <DrawerTitle className='text-3xl'>{post.jobName}</DrawerTitle>
                                <p className="text-xl">{post.companyName}</p>
                                <DrawerDescription className='text-lg'>{post.jobDescription}</DrawerDescription>
                            </DrawerHeader>
                            <DrawerFooter>
                                <Button>Submit</Button>
                                <DrawerClose asChild>
                                    <Button variant="outline">Cancel</Button>
                                </DrawerClose>
                            </DrawerFooter>
                        </DrawerContent>
                    </Drawer>
                    
                    <h1>{post.companyName}</h1>
                </CardHeader>
                <CardContent className='p-0'>
                    <Image src={post.image} alt={post.jobName} width={500} height={500} className='w-full' />
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