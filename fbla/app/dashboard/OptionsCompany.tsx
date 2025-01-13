"use client";

import { useState } from "react";
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

const industries = [
  { value: "technology", label: "Technology" },
  { value: "finance", label: "Finance" },
  { value: "healthcare", label: "Healthcare" },
  { value: "education", label: "Education" },
  { value: "manufacturing", label: "Manufacturing" },
  { value: "retail", label: "Retail" },
  { value: "transportation", label: "Transportation" },
  { value: "real_estate", label: "Real Estate" },
  { value: "hospitality", label: "Hospitality" },
  { value: "energy", label: "Energy" },
  { value: "agriculture", label: "Agriculture" },
  { value: "entertainment", label: "Entertainment" },
  { value: "construction", label: "Construction" },
  { value: "telecommunications", label: "Telecommunications" },
  { value: "legal", label: "Legal" },
];

export default function OptionsCompany() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [preview, setPreview] = useState<string | null>(null);

  // Schemas for each form field
  const companyNameSchema = z.object({
    companyName: z
      .string()
      .min(2, { message: "Company name must be at least 2 characters." }),
  });

  const passwordSchema = z.object({
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters." }),
  });

  const emailSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email address." }),
  });

  const profilePictureSchema = z.object({
    profilePicture: z.custom<FileList | null>(
      (val) => val instanceof FileList || val === null
    ),
  });

  const listingSchema = z.object({
    listingName: z.string().min(1, { message: "Listing name is required." }),
    jobDescription: z
      .string()
      .min(1, { message: "Job description is required." }),
    salary: z.string().min(1, { message: "Salary is required." }),
    jobType: z.enum(["full-time", "part-time", "internship"], {
      message: "Job type is required.",
    }),
    industry: z.string().min(1, { message: "Industry is required." }),
  });

  // Form methods for each form field
  const companyNameMethods = useForm<z.infer<typeof companyNameSchema>>({
    resolver: zodResolver(companyNameSchema),
    defaultValues: {
      companyName: "",
    },
  });

  const passwordMethods = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: "",
    },
  });

  const emailMethods = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  const profilePictureMethods = useForm<z.infer<typeof profilePictureSchema>>({
    resolver: zodResolver(profilePictureSchema),
    defaultValues: {
      profilePicture: null,
    },
  });

  const listingMethods = useForm<z.infer<typeof listingSchema>>({
    resolver: zodResolver(listingSchema),
    defaultValues: {
      listingName: "",
      jobDescription: "",
      salary: "",
      jobType: "internship",
      industry: "",
    },
  });

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  }

  // Separate submit handlers for each form section
  function handleCompanyNameSubmit(values: { companyName: string }) {
    console.log("Company Name Values:", values);
  }

  function handlePasswordSubmit(values: { password: string }) {
    console.log("Password Values:", values);
  }

  function handleEmailSubmit(values: { email: string }) {
    console.log("Email Values:", values);
  }

  function handleProfilePictureSubmit(values: { profilePicture: FileList | null }) {
    console.log("Profile Picture Values:", values);
  }

  function handleListingSubmit(values: z.infer<typeof listingSchema>) {
    console.log("Listing Values:", values);
  }

  return (
    <div className="w-4/5 h-full flex flex-col absolute right-0 overflow-y-scroll scroll-smooth">
      {/* Header */}
      <div className="mx-16 mt-8">
        <h1 className="text-5xl font-bold">
          Welcome <span className="underline underline-offset-4">company.</span>
        </h1>
      </div>
      {/* Profile Section */}
      <div className="m-16 flex flex-col" id="profile">
        <h3 className="text-2xl sticky top-0 backdrop-blur border-b border-gray-500 p-6 z-10">
          Profile
        </h3>
        <div className="m-6 text-md w-1/2">
          {/* Company Name Form */}
          <FormProvider {...companyNameMethods}>
            <form
              onSubmit={companyNameMethods.handleSubmit(handleCompanyNameSubmit)}
              className="space-y-4 py-4"
            >
              <FormField
                control={companyNameMethods.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Company Name" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your company's public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" variant="secondary" className="">
                Update Company Name
              </Button>
            </form>
          </FormProvider>

          {/* Password Form */}
          <FormProvider {...passwordMethods}>
            <form
              onSubmit={passwordMethods.handleSubmit(handlePasswordSubmit)}
              className="space-y-4 py-4"
            >
              <FormField
                control={passwordMethods.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="*******"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" variant="secondary" className="">
                Update Password
              </Button>
            </form>
          </FormProvider>

          {/* Email Form */}
          <FormProvider {...emailMethods}>
            <form
              onSubmit={emailMethods.handleSubmit(handleEmailSubmit)}
              className="space-y-4 py-4"
            >
              <FormField
                control={emailMethods.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="example@domain.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" variant="secondary" className="">
                Update Email
              </Button>
            </form>
          </FormProvider>

          {/* Industry Selection */}
          <FormProvider {...listingMethods}>
            <form
              onSubmit={listingMethods.handleSubmit(handleListingSubmit)}
              className="space-y-4 py-4"
            >
              <FormField
                control={listingMethods.control}
                name="industry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Industry</FormLabel>
                    <br />
                    <FormControl>
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
                                      setValue(currentValue === value ? "" : currentValue);
                                      field.onChange(currentValue);
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
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" variant="secondary" className="">
                Create Listing
              </Button>
            </form>
          </FormProvider>

          {/* Profile Picture Form */}
          <FormProvider {...profilePictureMethods}>
            <form
              onSubmit={profilePictureMethods.handleSubmit(handleProfilePictureSubmit)}
              className="space-y-4 py-4"
            >
              <FormItem>
                <div className="flex flex-col items-start">
                  <FormLabel className="mb-2">Profile Picture</FormLabel>
                  <div className="relative">
                    {preview ? (
                      <img
                        src={preview}
                        alt="Profile Preview"
                        className="w-32 h-32 object-cover rounded-full border"
                      />
                    ) : (
                      <div className="w-32 h-32 bg-gray-200 flex items-center justify-center rounded-full border">
                        <span className="text-gray-500">No Image</span>
                      </div>
                    )}
                    <label
                      htmlFor="profile-picture-upload"
                      className="absolute bottom-2 right-2 bg-blue-500 text-white p-2 rounded-full cursor-pointer hover:bg-blue-600 transition"
                    >
                      <Edit className="w-4 h-4" />
                    </label>
                  </div>
                </div>
                <Input
                  id="profile-picture-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <FormDescription>
                  Upload your profile picture.
                </FormDescription>
                <FormMessage />
              </FormItem>
              <Button type="submit" variant="secondary" className="">
                Update Profile Picture
              </Button>
            </form>
          </FormProvider>
        </div>
      </div>

      {/* Listings Section */}
      <div className="m-16 flex flex-col" id="listings">
        <h3 className="text-2xl sticky top-0 backdrop-blur-sm p-6 border-b border-gray-500">
          Listings
        </h3>
        <div className="m-6 text-md w-1/2">
          <FormProvider {...listingMethods}>
            <form
              onSubmit={listingMethods.handleSubmit(handleListingSubmit)}
              className="space-y-4"
            >
              <FormField
                control={listingMethods.control}
                name="listingName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Listing Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Listing Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={listingMethods.control}
                name="jobDescription"
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
                control={listingMethods.control}
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
                control={listingMethods.control}
                name="jobType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Type</FormLabel>
                    <FormControl>
                      <RadioGroup
                        value={field.value}
                        onChange={(value) => field.onChange(value)}
                      >
                        <RadioGroupItem value="full-time">
                          Full-time
                        </RadioGroupItem>
                        <RadioGroupItem value="part-time">
                          Part-time
                        </RadioGroupItem>
                        <RadioGroupItem value="internship">
                          Internship
                        </RadioGroupItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" variant="secondary">
                Create Listing
              </Button>
            </form>
          </FormProvider>
        </div>
      </div>

      {/* Applications Section */}
      <div className="m-16 flex flex-col" id="applications">
        <h3 className="text-2xl sticky top-0 backdrop-blur-sm p-6 border-b border-gray-500">
          Applications
        </h3>
        <div className="m-6 text-md">
          <p>You have no applications to review.</p>
          <p>
            This is where the company can see/adjust any applications they have recieved for their job posting
          </p>
          <p>They can</p>
          <ul>
            <li>View the application details</li>
            <li>Accept/Reject the application</li>
            <li>Send a short message to the applicant</li>
          </ul>
        </div>
      </div>
    </div>
  );
}