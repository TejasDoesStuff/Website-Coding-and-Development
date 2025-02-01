"use client";

import React, {useEffect, useState} from "react";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {Plus} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import Link from "next/link";
import axios from "axios";
import CheckLogIn from "@/app/components/CheckLogIn";
import {ScrollArea} from "@/components/ui/scroll-area"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {format} from 'date-fns'
import {useRouter} from "next/navigation";
import DashboardJobCard from "@/app/components/DashboardJobCard";
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


const libraries = ["places"];

interface Application {
    listingId: string;
    listingName: string;
    applicant: {
        id: string;
        name: string;
        email: string;
        profileImage: string;
    };
    message: string;
    appliedAt: string;
    status: number;
}

interface Listing {
    id: string;
    name: string;
    description: string;
    company: string;
    recruiter: {
        name: string;
        _id: string;
    };
    thumbnailImage: string;
    expandedImages: string[];
    hours: string;
    pay: string;
    duration: string;
    requirements: string[];
    tags: string[];
    reviews: any[];
}

export default function OptionsCompany() {
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState("");
    const [setting, setSetting] = React.useState<string | null>(null);
    const [name, setName] = React.useState<string | null>("Company");
    const [applications, setApplications] = useState<Application[]>([]);
    const [listings, setListings] = useState<Listing[]>([]);
    const router = useRouter();

    useEffect(() => {
        axios.get("https://connexting.ineshd.com/api/user", {withCredentials: true})
            .then(response => {
                setName(response.data.name);
            })
            .catch(error => {
                setName("Company");
            });
    }, []);

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const response = await axios.get(
                    'https://connexting.ineshd.com/api/listings/applications',
                    {withCredentials: true}
                );
                setApplications(response.data.applications);
            } catch (error) {
                console.error('Error fetching applications:', error);
            }
        };

        fetchApplications();
    }, []);

    useEffect(() => {
        const fetchListings = async () => {
            try {
                const response = await axios.get(
                    'https://connexting.ineshd.com/api/listings/self',
                    {withCredentials: true}
                );
                setListings(response.data.listings);
            } catch (error) {
                console.error('Error fetching listings:', error);
            }
        };

        fetchListings();
    }, []);

    const autocompleteRef = React.useRef(null);
    const handlePlaceChanged = () => {
        if (autocompleteRef.current) {
            const place = autocompleteRef.current.getPlace();
            //   console.log("Selected Place:", place);
        }
    };


    const formSchema = z.object({
        title: z.string().min(2, {
            message: "Title must be at least 3 characters.",
        }),
    });

    const listingFormSchema = z.object({
        name: z.string().min(3, {
            message: "Job name must be at least 3 characters.",
        }),
        description: z.string().min(3).max(300, {
            message: "Description is at max 300 characters.",
        }),
        salary: z.string().regex(/^[0-9]+$/, {
            message: "Salary must be a number",
        }),
        hours: z.string().regex(/^[0-9]+$/, {
            message: "Hours must be a number",
        }),
        setting: z.enum(["inperson", "online"], {
            message: "You need to select a location.",
        }),
        type: z.enum(["fulltime", "parttime", "internship"], {
            message: "You need to select a type of job.",
        })
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
        },
    });

    const listingForm = useForm<z.infer<typeof listingFormSchema>>({
        resolver: zodResolver(listingFormSchema),
        defaultValues: {
            name: "",
            description: "",
            salary: "",
            hours: "",
            setting: "online",
            type: "fulltime",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const response = await axios.patch(
                'https://connexting.ineshd.com/api/user',
                {name: values.title},
                {withCredentials: true}
            );
            // Update the displayed name after successful update
            setName(response.data.name);
            form.reset(); // Reset form after successful submission
        } catch (error) {
            console.error('Error updating company name:', error);
            // You may want to show an error message to the user here
        }
    }

    function onListingSubmit(values: z.infer<typeof listingFormSchema>) {
        // console.log("New Listing:", values);
        console.log("e")
    }

    const handleAcceptApplication = async (listingId: string, userId: string) => {
        try {
            const response = await fetch(`/api/listing/${listingId}/application/${userId}/status`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({status: 1}),
            });

            if (!response.ok) {
                throw new Error('Failed to accept application');
            }

            // Update the local state to reflect the change
            setApplications(applications.map(app =>
                app.listingId === listingId && app.applicant.id === userId
                    ? {...app, status: 1}
                    : app
            ));
        } catch (error) {
            console.error('Error accepting application:', error);
            alert('Failed to accept application');
        }
    };

    const handleRejectApplication = async (listingId: string, userId: string) => {
        try {
            const response = await fetch(`/api/listing/${listingId}/application/${userId}/status`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({status: -1}),
            });

            if (!response.ok) {
                throw new Error('Failed to reject application');
            }

            // Update the local state to reflect the change
            setApplications(applications.map(app =>
                app.listingId === listingId && app.applicant.id === userId
                    ? {...app, status: -1}
                    : app
            ));
        } catch (error) {
            console.error('Error rejecting application:', error);
            alert('Failed to reject application');
        }
    };

    const handleDeleteListing = async (listingId: string) => {
        try {
            const response = await fetch(`/api/listings/${listingId}`, {
                method: 'DELETE',
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Failed to delete listing');
            }

            // Update the local state to remove the deleted listing
            setListings(listings.filter(listing => listing.id !== listingId));
        } catch (error) {
            console.error('Error deleting listing:', error);
            alert('Failed to delete listing');
        }
    };

    const handleDeleteAccount = async () => {
        try {
            const response = await axios.delete(
                'https://connexting.ineshd.com/api/user',
                {withCredentials: true}
            );
            if (response.status === 200) {
                window.location.href = '/';
            }
        } catch (error) {
            console.error('Error deleting account:', error);
            alert('Failed to delete account');
        }
    };

    return (
        <div className="w-full h-full flex flex-col right-0 flex-1 overflow-y-scroll scroll-smooth">
            <CheckLogIn/>
            <div className="mx-16 mt-8">
                <h1 className="text-5xl font-bold flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
                    <div>Welcome <span className="underline underline-offset-4">{name}.</span></div>

                    <Button variant="secondary">
                        <Link href="/listing/create"
                              className="flex flex-row justify-center items-center gap-2"><Plus/> Add Listing</Link>
                    </Button>
                </h1>
            </div>
            <div className="md:m-16 flex flex-col" id="company">
                <h3 className="text-2xl sticky top-0 backdrop-blur border-b border-gray-500 p-6 text-center md:text-left">
                    Company Overview
                </h3>
                <div className="m-6 text-md md:w-1/2">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Company Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="title" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            This is your company's name.
                                        </FormDescription>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" variant="secondary">
                                Submit
                            </Button>
                        </form>
                    </Form>
                </div>
                <div className="mt-8 border-t pt-8 flex flex-col justify-center items-center md:items-start">
                    <h4 className="text-lg font-semibold text-destructive mb-4 text-center">Danger Zone</h4>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="destructive">Delete Account</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Delete Account</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Are you sure you want to delete your account? This action cannot be undone.
                                    All your listings and data will be permanently removed.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                    onClick={handleDeleteAccount}
                                    className="bg-destructive hover:bg-destructive/90"
                                >
                                    Delete Account
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </div>
            <div className="md:m-16 flex flex-col" id="listings">
                <h3 className="text-2xl sticky top-0 backdrop-blur border-b border-gray-500 p-6 text-center md:text-left">
                    My Listings
                </h3>
                <div className="m-6">
                    {listings.length === 0 ? (
                        <p className="text-center text-muted-foreground">No listings yet</p>
                    ) : (
                        <div className="grid gap-4">
                            {listings.map((listing) => (
                                <DashboardJobCard
                                    key={listing.id}
                                    post={listing}
                                    onDelete={handleDeleteListing}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <div className="md:m-16 flex flex-col" id="applications">
                <h3 className="text-2xl sticky top-0 backdrop-blur-sm p-6 border-b border-gray-500 text-center md:text-left">
                    Applications
                </h3>
                <ScrollArea className="h-[500px] rounded-md border p-2 md:p-4">
                    {applications.length === 0 ? (
                        <p className="text-center text-muted-foreground">No applications yet</p>
                    ) : (
                        <div className="space-y-6">
                            {applications.map((application, index) => (
                                <div key={index}
                                     className="flex flex-col md:flex-row md:items-start space-y-4 md:space-y-0 md:space-x-4 p-4 border rounded-lg">
                                    <Avatar>
                                        <AvatarImage src={application.applicant.profileImage}/>
                                        <AvatarFallback>
                                            {application.applicant.name.charAt(0).toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1 space-y-2">
                                        <div
                                            className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                                            <h4 className="font-semibold">{application.applicant.name}</h4>
                                            <time className="text-sm text-muted-foreground">
                                                {format(new Date(application.appliedAt), 'PPp')}
                                            </time>
                                        </div>
                                        <p className="text-sm text-muted-foreground">
                                            Applied for: {application.listingName}
                                        </p>
                                        <div className="rounded-md bg-muted p-3">
                                            <p className="text-sm">{application.message}</p>
                                        </div>
                                        <div
                                            className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                            <div className="text-sm">
                                                Status: {
                                                application.status === 1 ? 'Accepted' :
                                                    application.status === -1 ? 'Rejected' :
                                                        'Pending'
                                            }
                                            </div>
                                            <div className="flex flex-wrap gap-2 w-full md:w-auto">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="flex-1 md:flex-none"
                                                    onClick={() => router.push(`/listing/${application.listingId}`)}
                                                >
                                                    View Listing
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="flex-1 md:flex-none"
                                                    onClick={() => window.location.href = `mailto:${application.applicant.email}`}
                                                >
                                                    Contact Applicant
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="flex-1 md:flex-none"
                                                    onClick={async () => {
                                                        const response = await fetch(`https://connexting.ineshd.com/resumes/${application.applicant.id}.pdf`);
                                                        if (response.ok) {
                                                            window.open(`https://connexting.ineshd.com/resumes/${application.applicant.id}.pdf`, '_blank');
                                                        } else {
                                                            alert('User has not uploaded a resume yet.');
                                                        }
                                                    }}
                                                >
                                                    View Resume
                                                </Button>
                                                {application.status === 0 && (
                                                    <div className="flex gap-2 w-full md:w-auto">
                                                        <AlertDialog>
                                                            <AlertDialogTrigger asChild>
                                                                <Button
                                                                    variant="default"
                                                                    size="sm"
                                                                    className="flex-1 md:flex-none text-text"
                                                                >
                                                                    Accept
                                                                </Button>
                                                            </AlertDialogTrigger>
                                                            <AlertDialogContent>
                                                                <AlertDialogHeader>
                                                                    <AlertDialogTitle>Accept
                                                                        Application</AlertDialogTitle>
                                                                    <AlertDialogDescription>
                                                                        Are you sure you want to
                                                                        accept {application.applicant.name}'s
                                                                        application for "{application.listingName}"?
                                                                        This will notify the applicant.
                                                                    </AlertDialogDescription>
                                                                </AlertDialogHeader>
                                                                <AlertDialogFooter>
                                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                    <AlertDialogAction
                                                                        onClick={() => handleAcceptApplication(application.listingId, application.applicant.id)}
                                                                        className="bg-primary hover:bg-primary/90 text-text"
                                                                    >
                                                                        Accept
                                                                    </AlertDialogAction>
                                                                </AlertDialogFooter>
                                                            </AlertDialogContent>
                                                        </AlertDialog>

                                                        <AlertDialog>
                                                            <AlertDialogTrigger asChild>
                                                                <Button
                                                                    variant="destructive"
                                                                    size="sm"
                                                                    className="flex-1 md:flex-none"
                                                                >
                                                                    Reject
                                                                </Button>
                                                            </AlertDialogTrigger>
                                                            <AlertDialogContent>
                                                                <AlertDialogHeader>
                                                                    <AlertDialogTitle>Reject
                                                                        Application</AlertDialogTitle>
                                                                    <AlertDialogDescription>
                                                                        Are you sure you want to
                                                                        reject {application.applicant.name}'s
                                                                        application for "{application.listingName}"?
                                                                        This action cannot be undone and will notify the
                                                                        applicant.
                                                                    </AlertDialogDescription>
                                                                </AlertDialogHeader>
                                                                <AlertDialogFooter>
                                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                    <AlertDialogAction
                                                                        onClick={() => handleRejectApplication(application.listingId, application.applicant.id)}
                                                                        className="bg-destructive hover:bg-destructive/90"
                                                                    >
                                                                        Reject Application
                                                                    </AlertDialogAction>
                                                                </AlertDialogFooter>
                                                            </AlertDialogContent>
                                                        </AlertDialog>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </ScrollArea>
            </div>
        </div>
    );
}