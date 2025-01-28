"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import Header from "@/app/components/Header";
import { useLoadScript, Autocomplete } from "@react-google-maps/api";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import axios from "axios"; // Add this import

const libraries = ["places"];

const listingFormSchema = z.object({
    name: z.string().min(3, {
        message: "Job name must be at least 3 characters.",
    }),
    description: z.string().min(3).max(300, {
        message: "Description is at max 300 characters.",
    }),
    pay: z.string().regex(/^[0-9]+$/, {
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

export default function OptionsCompany() {
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState("");
    const [setting, setSetting] = React.useState<string | null>(null);
    const [type, setType] = React.useState<string | null>(null);

    const autocompleteRef = React.useRef(null);
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY, // Replace with your API key
        libraries,
    });
    const handlePlaceChanged = () => {
        if (autocompleteRef.current) {
            const place = autocompleteRef.current.getPlace();
        }
    };

    const listingForm = useForm<z.infer<typeof listingFormSchema>>({
        resolver: zodResolver(listingFormSchema),
        defaultValues: {
            name: "",
            description: "",
            pay: "",
            hours: "",
            setting: "online",
            type: "fulltime",
        },
    });

    async function onListingSubmit(values: z.infer<typeof listingFormSchema>) {
        try {
            const response = await axios.post('https://fbla.ineshd.com/listings', values, { withCredentials: true });
            console.log(response);

            if (response.status !== 200) {
                throw new Error('Failed to create listing');
            }

            const data = await response.data;
            console.log('Listing created:', data);
        } catch (error) {
            console.error('Error creating listing:', error);
        }
    }

    return (
        <div className="w-full h-full flex flex-col right-0 overflow-y-scroll scroll-smooth overflow-x-hidden">
            <Header />
            <div className="mx-16 mt-8">
                <h1 className="text-5xl font-bold">
                    Create Listing
                </h1>
            </div>

            <div className="m-16 flex flex-col" id="listings">
                <div className="m-6 text-md w-1/2">
                    <Form {...listingForm}>
                        <form
                            onSubmit={listingForm.handleSubmit(onListingSubmit)}
                            className="space-y-4"
                        >
                            <FormField
                                control={listingForm.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Job Title</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter job name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={listingForm.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Job Description</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Write a job description"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Maximum 300 words.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={listingForm.control}
                                name="pay"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Salary</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter salary" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={listingForm.control}
                                name="setting"
                                render={({ field }) => (
                                    <FormItem className="">
                                        <FormLabel>Setting</FormLabel>
                                        <FormControl>
                                            <RadioGroup
                                                onValueChange={field.onChange}
                                                value={field.value}
                                                className="flex flex-col "
                                            >
                                                <FormItem className="flex items-center space-x-3 space-y-0 my-2">
                                                    <FormControl>
                                                        <RadioGroupItem value="inperson" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal my-0">In-person</FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="online" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal my-0">Online</FormLabel>
                                                </FormItem>
                                            </RadioGroup>
                                        </FormControl>
                                        {setting === "inperson" && isLoaded && (
                                            <FormItem>
                                                <FormLabel>Address</FormLabel>
                                                <FormControl>
                                                    <Autocomplete onLoad={(ref) => (autocompleteRef.current = ref)} onPlaceChanged={handlePlaceChanged}>
                                                        <Input placeholder="Enter address" {...field} />
                                                    </Autocomplete>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={listingForm.control}
                                name="type"
                                render={({ field }) => (
                                    <FormItem className="">
                                        <FormLabel>Job Type</FormLabel>
                                        <FormControl>
                                            <RadioGroup
                                                onValueChange={field.onChange}
                                                value={field.value}
                                                className="flex flex-col "
                                            >
                                                <FormItem className="flex items-center space-x-3 space-y-0 mt-2">
                                                    <FormControl>
                                                        <RadioGroupItem value="fulltime" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">Full Time</FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-3 space-y-0 my-2">
                                                    <FormControl>
                                                        <RadioGroupItem value="parttime" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">Part Time</FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="internship" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">Internship</FormLabel>
                                                </FormItem>
                                            </RadioGroup>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={listingForm.control}
                                name="hours"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Hours</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter hours" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" variant="secondary">
                                Create Listing
                            </Button>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    );
}