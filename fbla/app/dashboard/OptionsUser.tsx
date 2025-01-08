"use client";

import { useState } from "react";
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

export default function OptionsUser() {
  const [preview, setPreview] = useState<string | null>(null);

  //The requirements for the form fields
  const formSchema = z.object({
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }).optional(),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }).optional(),
    email: z.string().email({
      message: "Email must be valid",
    }).optional(),
    profilePicture: z
      .custom<FileList | null>((val) => val instanceof FileList || val === null)
      .optional(),
  });

  //The default values for the form fields
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      email: "",
      profilePicture: null,
    },
  });

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      form.setValue("profilePicture", e.target.files);
    } else {
      setPreview(null);
    }
  }

  //The function that is called when the form is submitted
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    if (values.profilePicture) {
      const file = values.profilePicture[0];
      console.log("Selected file:", file.name);
    }
  }

  return (
    <div className="w-4/5 h-full flex flex-col absolute right-0 overflow-y-scroll scroll-smooth">
      {/* Header */}
      <div className="mx-16 mt-8">
        <h1 className="text-5xl font-bold">
          Welcome{" "}
          <span className="underline underline-offset-4">username.</span>
        </h1>
      </div>
      {/* Options */}
      <div className="m-16 flex flex-col" id="profile">
        {/* Profile Section */}
        <h3 className="text-2xl sticky top-0 backdrop-blur border-b border-gray-500 p-6">
          Profile
        </h3>
        <div className="m-6 text-md w-1/2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Profile Username */}
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="username" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Profile Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="*********" {...field} />
                    </FormControl>
                    <FormDescription>This is your password.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Profile Email */}
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
              {/* Profile Picture */}
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
                    {/* Pencil Icon Overlay */}
                    <label
                      htmlFor="profile-picture-upload"
                      className="absolute bottom-2 right-2 bg-blue-500 text-white p-2 rounded-full cursor-pointer hover:bg-blue-600 transition"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.862 3.487a2.25 2.25 0 113.182 3.182L7.443 19.27a4.5 4.5 0 01-1.691 1.073l-4.244 1.415a.375.375 0 01-.48-.48l1.415-4.243a4.5 4.5 0 011.073-1.692L16.862 3.487z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.753 6.247l-1.506-1.506"
                        />
                      </svg>
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
                <FormDescription>Upload your profile picture.</FormDescription>
                <FormMessage />
              </FormItem>
              {/* Submit Button */}
              <Button type="submit" variant="secondary">
                Update Profile
              </Button>
            </form>
          </Form>
        </div>
      </div>
      <div className="m-16 flex flex-col" id="preferences">
        <h3 className="text-2xl sticky top-0 backdrop-blur-sm p-6 border-b border-gray-500">
          Preferences
        </h3>
        <div className="m-6 text-md">
          <p>Preferences go here.</p>
          <p>They can select preferences for the following</p>
          <li>
            Location (Online/In Person - Certain radius from the user's home)
          </li>
          <li>Industry (Tags: CS, Med, Engineering, Fast food, etc)</li>
          <li>Role (Intern, Paid Intern, employee, etc)</li>
          <li>Salary (Range)</li>
        </div>
      </div>
      <div className="m-16 flex flex-col" id="resume">
        <h3 className="text-2xl sticky top-0 backdrop-blur-sm p-6 border-b border-gray-500">
          Resume
        </h3>
        <div className="m-6 text-md">
          <p>Resume goes here.</p>
          <p>They can upload a file of their resume here</p>
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
