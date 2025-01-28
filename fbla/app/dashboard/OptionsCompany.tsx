"use client";

import React, {useEffect, useState} from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { Edit, Check, ChevronsUpDown } from "lucide-react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
import Password from "./forms/Password";
import { useLoadScript, Autocomplete } from "@react-google-maps/api";
import { Plus } from "lucide-react"
import Link from "next/link";
import axios from "axios";
import CheckLogIn from "@/app/components/CheckLogIn";



const libraries = ["places"];

const industries = [
    {
        value: "technology",
        label: "Technology",
    },
    {
        value: "finance",
        label: "Finance",
    },
    {
        value: "healthcare",
        label: "Healthcare",
    },
    {
        value: "education",
        label: "Education",
    },
    {
        value: "manufacturing",
        label: "Manufacturing",
    },
    {
        value: "retail",
        label: "Retail",
    },
    {
        value: "transportation",
        label: "Transportation",
    },
    {
        value: "real_estate",
        label: "Real Estate",
    },
    {
        value: "hospitality",
        label: "Hospitality",
    },
    {
        value: "energy",
        label: "Energy",
    },
    {
        value: "agriculture",
        label: "Agriculture",
    },
    {
        value: "entertainment",
        label: "Entertainment",
    },
    {
        value: "construction",
        label: "Construction",
    },
    {
        value: "telecommunications",
        label: "Telecommunications",
    },
    {
        value: "legal",
        label: "Legal",
    },
];

export default function OptionsCompany() {
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState("");
    const [setting, setSetting] = React.useState<string | null>(null);
    // const [type, setType] = React.useState<string | null>(null);
    const [name, setName] = React.useState<string | null>("Company");

    useEffect(() => {
        axios.get("https://fbla.ineshd.com/user", { withCredentials: true })
            .then(response => {
                setName(response.data.name);
            })
            .catch(error => {
                setName("Company");
            });
    }, []);

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

    function onSubmit(values: z.infer<typeof formSchema>) {
        // console.log(values);
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

    function onListingSubmit(values: z.infer<typeof listingFormSchema>) {
        // console.log("New Listing:", values);
        console.log("e")
    }

    return (
        <div className="w-full h-full flex flex-col right-0 overflow-y-scroll scroll-smooth">
            <CheckLogIn />
            <div className="mx-16 mt-8">
                <h1 className="text-5xl font-bold flex items-center justify-between">
                    <div>Welcome <span className="underline underline-offset-4">{name}.</span></div>
                    
                    <Button variant="secondary">
                    <Plus /> <Link href="/listing/create">Add Listing</Link>
                    </Button>
                </h1>
            </div>
            <div className="m-16 flex flex-col" id="company">
                <h3 className="text-2xl sticky top-0 backdrop-blur border-b border-gray-500 p-6">
                    Company Overview
                </h3>
                <div className="m-6 text-md w-1/2">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Company Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="title" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            This is your company's name.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {/* <Popover open={open} onOpenChange={setOpen}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        role="combobox"
                                        aria-expanded={open}
                                        className="w-[200px] justify-between"
                                    >
                                        {value
                                            ? industries.find((industry) => industry.value === value)
                                                ?.label
                                            : "Select industry..."}
                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-[200px] p-0">
                                    <Command>
                                        <CommandInput placeholder="Search industry..." />
                                        <CommandList>
                                            <CommandEmpty>No industry found.</CommandEmpty>
                                            <CommandGroup>
                                                {industries.map((industry) => (
                                                    <CommandItem
                                                        key={industry.value}
                                                        value={industry.value}
                                                        onSelect={(currentValue) => {
                                                            setValue(
                                                                currentValue === value ? "" : currentValue
                                                            );
                                                            setOpen(false);
                                                        }}
                                                    >
                                                        <Check
                                                            className={cn(
                                                                "mr-2 h-4 w-4",
                                                                value === industry.value
                                                                    ? "opacity-100"
                                                                    : "opacity-0"
                                                            )}
                                                        />
                                                        {industry.label}
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                            <p>Change profile picture here: File upload/Remove pfp</p> */}
                            <Button type="submit" variant="secondary">
                                Submit
                            </Button>
                            <Button className="ml-4 bg-red-600 text-white hover:bg-red-700" onSubmit={listingForm.handleSubmit(onListingSubmit)}>
                                Cancel
                            </Button>
                        </form>
                    </Form>
                </div>
            </div>
            <div className="m-16 flex flex-col" id="applications">
                <h3 className="text-2xl sticky top-0 backdrop-blur-sm p-6 border-b border-gray-500">
                    Applications
                </h3>
                <div className="m-6 text-md">
                    <p>You have no pending applications.</p>
                    <p>
                        This is where the user can see/adjust any applications they have
                        currently sent out
                    </p>
                    <p>They can</p>
                    <li>View the job details</li>
                    <li>View/Change their application details</li>
                    <li>View the status of their application</li>
                    <li>Cancel their application</li>
                </div>
            </div>
        </div>
    );
}