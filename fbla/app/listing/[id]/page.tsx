"use client"

import React, { useEffect, useState } from 'react'
import { useRouter } from "next/navigation";
import { Metadata } from "next";
import Head from 'next/head'
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
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"

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
    recruiter: {
        name: string
        email: string | null
        _id: string
    }
    currentUserRole?: 'student' | 'recruiter' | 'none'
}

interface ApplicationFormProps {
    listingId: string;
    onSuccess: () => void;
    onError: (message: string) => void;
}

const ApplicationForm = ({ listingId, onSuccess, onError }: ApplicationFormProps) => {
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch(`/api/listing/${listingId}/apply`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ message }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to submit application');
            }

            setMessage('');
            onSuccess();
        } catch (error) {
            onError(error instanceof Error ? error.message : 'Failed to submit application');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <Textarea
                    placeholder="Why are you interested in this position?"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    className="min-h-[150px]"
                />
            </div>
            <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full text-text"
                variant="ghost"
            >
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </Button>
        </form>
    );
};

const JobPage = ({ params }: { params: Promise<{ id: string }> }) => {
    const router = useRouter();
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState(true);
    const defaultImage = '/images/defaults/listing-default.jpg';

    const unwrappedParams = React.use(params);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(`https://connexting.ineshd.com/api/listings/${unwrappedParams.id}`, {
                    credentials: 'include',
                });
                
                if (!response.ok) {
                    throw new Error('Post not found');
                }

                const data = await response.json();
                setPost(data);
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
        <Image 
            key={index} 
            src={image} 
            alt={post.name} 
            width={500} 
            height={500} 
            className="object-contain h-[300px] sm:h-[400px] md:h-[500px] overflow-hidden px-3" 
        />
    )) : [
        <Image 
            key="default" 
            src={defaultImage} 
            alt={post.name} 
            width={500} 
            height={500}
            className="object-contain h-[300px] sm:h-[400px] md:h-[500px] overflow-hidden px-3" 
        />
    ];

    const requirements = post.requirements?.length ? post.requirements.map((req, index) => (
        <li key={index} className="text-sm sm:text-base">• {req}</li>
    )) : <li className="text-sm sm:text-base">• No requirements</li>;

    const tags = post.tags?.length ? post.tags.map((tag, index) => (
        <Badge key={index} variant="secondary" className="text-xs sm:text-md mx-0.5">{tag}</Badge>
    )) : <Badge variant="secondary" className="text-xs sm:text-md my-0.5 mx-0.5">No tags</Badge>;

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
        <>
            <Head>
                <title>Connext - Job Details</title>
                <meta name="description" content="Explore job opportunities for high school students" />
            </Head>
            <div className="overflow-x-hidden">
                <Header />
                {/* Job Details Section */}
                <div className="px-4 sm:px-8 md:px-16 lg:px-48 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-16 overflow-y-auto h-full p-4">
                    <div>
                        <h1 className="text-xl sm:text-2xl md:text-3xl md:text-left text-center">{post.name}</h1>
                        <div className="pt-2 flex flex-wrap gap-1 justify-center md:justify-start">{tags}</div>
                        <p className="text-md sm:text-lg text-center md:text-left">{post.recruiter?.name || 'Unknown Recruiter'}</p>
                        <h1 className="text-md sm:text-lg mt-2">{post.description}</h1>
                        <h1 className="text-lg sm:text-xl mt-4">Requirements:</h1>
                        <ul className="text-sm sm:text-base">{requirements}</ul>
                        
                        {/* Buttons container */}
                        <div className="flex flex-col md:flex-row gap-4 mt-4">
                            {/* Only show Apply button for students */}
                            {post.currentUserRole === 'student' && (
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button className="flex-1" variant="outline">
                                            Apply
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Apply for {post.name}</DialogTitle>
                                            <DialogDescription>
                                                Submit your application for this position at {post.company}
                                            </DialogDescription>
                                        </DialogHeader>
                                        <ApplicationForm 
                                            listingId={unwrappedParams.id}
                                            onSuccess={() => {
                                                alert('Application submitted successfully!');
                                                router.refresh();
                                            }}
                                            onError={(message) => {
                                                alert(message);
                                            }}
                                        />
                                    </DialogContent>
                                </Dialog>
                            )}

                            {/* Contact Recruiter Button */}
                            {post.recruiter?.email && (
                                <Button 
                                    className="flex-1"
                                    variant="secondary"
                                    onClick={() => window.location.href = `mailto:${post.recruiter.email}`}
                                >
                                    Contact Recruiter
                                </Button>
                            )}
                        </div>
                    </div>

                    {/* Image Marquee Section */}
                    <div className="flex justify-center items-center h-full">
                        <div className="max-w-[500px] w-full">
                            {images}
                        </div>
                    </div>
                </div>

                {/* Reviews Section */}
                <div className="px-4 sm:px-8 md:px-16 lg:px-48 mt-6">
                    {/* <h1 className="text-lg sm:text-xl">Reviews:</h1>
                    <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 hidden sm:block">
                        {reviews}
                    </div> */}
                    {/* Back Button */}
                    <Button className="w-full" variant="destructive" onClick={() => router.back()}>
                        Back
                    </Button>
                </div>
            </div>
        </>
    )
}

export default JobPage;
