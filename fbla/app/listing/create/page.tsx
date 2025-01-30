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
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import Password from "../../dashboard/forms/Password";
import { useLoadScript, Autocomplete } from "@react-google-maps/api";
import { Textarea } from "@/components/ui/textarea"
import Header from "@/app/components/Header";
import axios from "axios";

const libraries = ["places"];

export default function OptionsCompany() {
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState("");
    const [type, setType] = React.useState<string | null>(null);


    const autocompleteRef = React.useRef(null);
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY, // Replace with your API key
        libraries,
    });
    const handlePlaceChanged = () => {
        if (autocompleteRef.current) {
            const place = autocompleteRef.current.getPlace();
            //   console.log("Selected Place:", place);
        }
    };

    const listingFormSchema = z.object({
        name: z.string().min(3, {
            message: "Job name must be at least 3 characters.",
        }),
        description: z.string().min(3).max(500, {
            message: "Description is at max 500 characters.",
        }),
        pay: z.string().regex(/^[0-9]+$/, {
            message: "pay must be a number",
        }),
        hours: z.string().regex(/^[0-9]+$/, {
            message: "Hours must be a number",
        }),
        setting: z.enum(["inperson", "online"], {
            message: "You need to select a location.",
        }),
        type: z.enum(["fulltime", "parttime", "internship"], {
            message: "You need to select a type of job.",
        }),
        address: z.string().optional(),
        image: z.instanceof(File).optional(),
    });



    const listingForm = useForm<z.infer<typeof listingFormSchema>>({
        resolver: zodResolver(listingFormSchema),
        defaultValues: {
            name: "",
            description: "",
            pay: "",
            hours: "",
            setting: "online",
            type: "fulltime",
            address: "",
        }
    });


    async function onListingSubmit(values: z.infer<typeof listingFormSchema>) {
        // console.log("New Listing:", values);
        // console.log("e")
        try {
            const response = await axios.post('https://connexting.ineshd.com/api/listings', values, { withCredentials: true });
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

    const setting = listingForm.watch("setting");

    return (
        <div>
        <Header />
        <div className="w-full h-full flex flex-col items-center lg:items-start overflow-y-scroll scroll-smooth overflow-x-hidden">

            <div className="mx-16 mt-8">
                <h1 className="text-5xl font-bold text-center">
                    Create Listing
                </h1>
            </div>
              
            <div className="m-16 flex flex-col w-4/5 md:w-2/3 lg:w-1/2 mt-0" id="listings">
                <div className="m-6 text-md w-auto">
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
                                            Maximum 500 characters.
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
                                        <FormLabel>Hourly Pay</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter pay" {...field} />
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
                                            <FormField
                                                control={listingForm.control}
                                                name="address"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Address</FormLabel>
                                                        <FormControl>
                                                            <Autocomplete 
                                                                onLoad={(ref) => (autocompleteRef.current = ref)} 
                                                                onPlaceChanged={handlePlaceChanged}
                                                            >
                                                                <Input placeholder="Enter address" {...field} />
                                                            </Autocomplete>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
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
                                        <FormLabel>Hours per Week</FormLabel>
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
        </div>
    );
}