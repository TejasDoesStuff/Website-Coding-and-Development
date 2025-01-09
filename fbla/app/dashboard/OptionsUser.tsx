"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { Edit } from "lucide-react";

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

  // The requirements for the form fields
  const usernameSchema = z.object({
    username: z
      .string()
      .min(2, { message: "Username must be at least 2 characters." }),
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

  // The default values for the form fields
  const usernameMethod = useForm<z.infer<typeof usernameSchema>>({
    resolver: zodResolver(usernameSchema),
    defaultValues: {},
  });

  const passwordMethod = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: "",
    },
  });

  const emailMethod = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  const profilePictureMethod = useForm<z.infer<typeof profilePictureSchema>>({
    resolver: zodResolver(profilePictureSchema),
    defaultValues: {
      profilePicture: null,
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
  function handleUsernameSubmit(values: { username: string }) {
    console.log("Username Values:", values);
  }

  function handlePasswordSubmit(values: { password: string }) {
    console.log("Password Values:", values);
  }

  function handleEmailSubmit(values: { email: string }) {
    console.log("Email Values:", values);
  }

  function handleProfilePictureSubmit(values: {
    profilePicture: FileList | null;
  }) {
    console.log("Profile Picture Values:", values);
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
      {/* Profile Section */}
      <div className="m-16 flex flex-col" id="profile">
        <h3 className="text-2xl sticky top-0 backdrop-blur border-b border-gray-500 p-6">
          Profile
        </h3>
        <div className="m-6 text-md w-1/2">
          {/* Username Form */}
          <FormProvider {...usernameMethod}>
            <Form {...usernameMethod}>
              <form
                onSubmit={usernameMethod.handleSubmit(handleUsernameSubmit)}
                className="space-y-4 my-4"
              >
                <FormField
                  control={usernameMethod.control}
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
                <Button type="submit" variant="secondary" className="mt-4 mb-6">
                  Update Username
                </Button>
              </form>
            </Form>
          </FormProvider>
          {/* Password Form */}
          <Form {...passwordMethod}>
            <form
              onSubmit={passwordMethod.handleSubmit(handlePasswordSubmit)}
              className="space-y-4 my-4"
            >
              <FormField
                control={passwordMethod.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="*******" {...field} />
                    </FormControl>
                    <FormDescription>This is your password.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" variant="secondary" className="my-6">
                Update Password
              </Button>
            </form>
          </Form>

          {/* Email Form */}
          <Form {...emailMethod}>
            <form
              onSubmit={emailMethod.handleSubmit(handleEmailSubmit)}
              className="space-y-4 my-4"
            >
              <FormField
                control={emailMethod.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="example@domain.com" {...field} />
                    </FormControl>
                    <FormDescription>This is your email.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" variant="secondary" className="">
                Update Email
              </Button>
            </form>
          </Form>

          {/* Profile Picture Form */}
          <Form {...profilePictureMethod}>
            <form
              onSubmit={profilePictureMethod.handleSubmit(
                handleProfilePictureSubmit
              )}
              className="space-y-4 my-4"
            >
              <FormItem>
                <div className="flex flex-col items-start py-4">
                  <FormLabel className="my-2">Profile Picture</FormLabel>
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
                <FormDescription>Upload your profile picture.</FormDescription>
                <FormMessage />
              </FormItem>
              <Button type="submit" variant="secondary">
                Update Profile Picture
              </Button>
            </form>
          </Form>
        </div>
      </div>

      {/* Resume Section */}
      <div className="m-16 flex flex-col" id="resume">
        <h3 className="text-2xl sticky top-0 backdrop-blur-sm p-6 border-b border-gray-500">
          Resume
        </h3>
        <div className="m-6 text-md">
          <p>Resume goes here.</p>
          <p>They can upload a file of their resume here</p>
        </div>
      </div>

      {/* Preferences Section */}
      <div className="m-16 flex flex-col" id="preferences">
        <h3 className="text-2xl sticky top-0 backdrop-blur-sm p-6 border-b border-gray-500">
          Preferences
        </h3>
        <div className="m-6 text-md">
          <p>Preferences go here.</p>
          <p>They can select preferences for the following</p>
          <ul>
            <li>
              Location (Online/In Person - Certain radius from the user's home)
            </li>
            <li>Industry (Tags: CS, Med, Engineering, Fast food, etc)</li>
            <li>Role (Intern, Paid Intern, employee, etc)</li>
            <li>Salary (Range)</li>
          </ul>
        </div>
      </div>

      {/* Applications Section */}
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
          <ul>
            <li>View the job details</li>
            <li>View/Change their application details</li>
            <li>View the status of their application</li>
            <li>Cancel their application</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
