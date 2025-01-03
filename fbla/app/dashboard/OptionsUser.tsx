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

export default function OptionsUser() {
  const formSchema = z.object({
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),
    email: z.string().email({
      message: "Email must be valid",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="w-4/5 h-full flex flex-col absolute right-0 overflow-y-scroll scroll-smooth">
      <div className="mx-16 mt-8">
        <h1 className="text-5xl font-bold">
          Welcome{" "}
          <span className="underline underline-offset-4">username.</span>
        </h1>
      </div>
      <div className="m-16 flex flex-col" id="profile">
        <h3 className="text-2xl sticky top-0 backdrop-blur border-b border-gray-500 p-6">Profile</h3>
        <div className="m-6 text-md w-1/2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
      <div className="m-16 flex flex-col" id="preferences">
        <h3 className="text-2xl sticky top-0 backdrop-blur-sm p-6 border-b border-gray-500">Preferences</h3>
        <div className="m-6 text-md">
          <p>Preferences go here.</p>
          <p>They can select preferences for the following</p>
          <li>Location (Online/In Person - Certain radius from the user's home)</li>
          <li>Industry (Tags: CS, Med, Engineering, Fast food, etc)</li>
          <li>Role (Intern, Paid Intern, employee, etc)</li>
          <li>Salary (Range)</li>
        </div>
      </div>
      <div className="m-16 flex flex-col" id="resume">
        <h3 className="text-2xl sticky top-0 backdrop-blur-sm p-6 border-b border-gray-500">Resume</h3>
        <div className="m-6 text-md">
          <p>Resume goes here.</p>
          <p>They can upload a file of their resume here</p>
        </div>
      </div>
      <div className="m-16 flex flex-col" id="applications">
        <h3 className="text-2xl sticky top-0 backdrop-blur-sm p-6 border-b border-gray-500">Applications</h3>
        <div className="m-6 text-md">
          <p>You have no pending applications.</p>
          <p>This is where the user can see/adjust any applications they have currently sent out</p>
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
