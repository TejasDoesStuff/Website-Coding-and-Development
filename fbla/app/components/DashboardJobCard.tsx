import React from 'react';
import {Card, CardContent} from "@/components/ui/card";
import {Button} from '@/components/ui/button';
import {Badge} from "@/components/ui/badge";
import Link from 'next/link';
import {Trash2} from 'lucide-react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Post {
    id: string;
    name: string;
    hours: string;
    pay: string;
    tags: string[];
}

interface Props {
    post: Post;
    onDelete: (id: string) => void;
}

const DashboardJobCard = ({post, onDelete}: Props) => {
    const link = `/listing/${post.id}`;

    const tags = post.tags?.slice(0, 2).map((tag, i) => (
        <Badge key={i} variant="secondary" className='text-sm mx-0.5'>
            {tag}
        </Badge>
    ));

    if (post.tags?.length > 2) {
        tags.push(
            <Badge key="more" variant="secondary" className='text-sm mx-0.5'>
                +{post.tags.length - 2}
            </Badge>
        );
    }

    return (
        <Card className="w-full hover:bg-accent/50 transition-colors">
            <CardContent className="p-6">
                <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                        <Link
                            href={link}
                            className="text-lg font-semibold hover:underline block truncate"
                        >
                            {post.name}
                        </Link>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                            <span>{post.hours}h/week</span>
                            <span>${post.pay}/h</span>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                            {tags}
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-destructive hover:text-destructive"
                                >
                                    <Trash2 className="h-4 w-4"/>
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This will permanently delete the listing "{post.name}". This action cannot be
                                        undone.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction
                                        onClick={() => onDelete(post.id)}
                                        className="bg-destructive hover:bg-destructive/90"
                                    >
                                        Delete
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default DashboardJobCard; 