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
  const [location, setLocation] = React.useState<string | null>(null);


  const formSchema = z.object({
    title: z.string().min(2, {
      message: "Title must be at least 3 characters.",
    }),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),
    email: z.string().email({
      message: "Email must be valid",
    }),
  });

  const listingFormSchema = z.object({
    name: z.string().min(3, {
      message: "Job name must be at least 3 characters.",
    }),
    description: z.string().min(3).max(500, {
      message: "Description is at max 500 characters.",
    }),
    salary: z.string().regex(/^[0-9]+$/,{
      message: "Salary must be a number",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      password: "",
      email: "",
    },
  });

  const listingForm = useForm<z.infer<typeof listingFormSchema>>({
    resolver: zodResolver(listingFormSchema),
    defaultValues: {
      name: "",
      description: "",
      salary: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  function onListingSubmit(values: z.infer<typeof listingFormSchema>) {
    console.log("New Listing:", values);
  }

  return (
    <div className="w-4/5 h-full flex flex-col absolute right-0 overflow-y-scroll scroll-smooth">
      <div className="mx-16 mt-8">
        <h1 className="text-5xl font-bold">
          Welcome <span className="underline underline-offset-4">company.</span>
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

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="conext@gmail.com" {...field} />
                    </FormControl>
                    <FormDescription>This is your email.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Popover open={open} onOpenChange={setOpen}>
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
              <p>Change profile picture here: File upload/Remove pfp</p>
              <Button type="submit" variant="secondary">
                Submit
              </Button>
              <Button className="ml-4 bg-red-600 text-white hover:bg-red-700">
                Cancel
              </Button>
            </form>
          </Form>
        </div>
      </div>
      <div className="m-16 flex flex-col" id="listings">
        <h3 className="text-2xl sticky top-0 backdrop-blur-sm p-6 border-b border-gray-500">
          Listings
        </h3>
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
                      <Input placeholder="Enter job description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={listingForm.control}
                name="salary"
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
  name="mean"
  render={({ field }) => (
    <FormItem className="space-y-3">
      <FormLabel>Location</FormLabel>
      <FormControl>
        <RadioGroup
          onValueChange={(value) => setLocation(value)}
          value={location}
          className="flex flex-col space-y-1"
        >
          <FormItem className="flex items-center space-x-3">
            <FormControl>
              <RadioGroupItem value="inperson" />
            </FormControl>
            <FormLabel className="font-normal">In-person</FormLabel>
          </FormItem>
          <FormItem className="flex items-center space-x-3">
            <FormControl>
              <RadioGroupItem value="online" />
            </FormControl>
            <FormLabel className="font-normal">Online</FormLabel>
          </FormItem>
        </RadioGroup>
        {/* Conditional rendering for 'online' */}
        {location === "online" && (
          <div className="mt-4">
            <h1 className="text-lg font-semibold">Additional Information</h1>
            <input
              type="text"
              className="mt-2 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter details for online location"
            />
          </div>
        )}
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

              <p>add radio selector for online/inperson</p>
              <li>if in person, show the location</li>
              <p>add radio selector for fulltime/parttime/internship</p>
              <p>add hours per week</p>
              <Button type="submit" variant="secondary">
                Create Listing
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
