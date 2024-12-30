import React from 'react'
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card"
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { MessageSquareMore, Star } from 'lucide-react'


interface Post {
  jobName: string
  companyName: string
  image: string
  hours: string
  pay: string
  duration: string
}

{/* <Button variant="outline" size="icon">
      <ChevronRight />
    </Button> */}

const JobCard = ({post}: {post: Post}) => {

  return (
    <div>
      <Card>
        <CardHeader>
          <h1 className='text-2xl'>{post.jobName}</h1>
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
            {/* <p></p> */}
          </div>
        </CardContent>
        {/* <CardFooter>
          <div className="flex items-center justify-center gap-1.5">

          </div>
        </CardFooter> */}
    </Card>

    </div>
  )
}

export default JobCard