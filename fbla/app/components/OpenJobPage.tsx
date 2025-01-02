"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import JobPage from './JobPage';

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

interface Review {
    user: string
    text: string
    stars: number
}

const OpenJobPage = ({post}: {post: Post}) => {
  // State to track if the component is open
  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle the component
  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="p-4">
      {/* Button to toggle the component */}
      <Button variant="link" className='text-2xl hover:underline text-left' onClick={handleToggle}>{post.title}</Button>

      {/* Conditionally render the component */}
      {isOpen && (
        <JobPage post={post} />
      )}
    </div>
  );
}

export default OpenJobPage