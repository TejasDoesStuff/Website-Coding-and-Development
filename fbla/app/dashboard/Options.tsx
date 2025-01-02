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

export default function Options() {
  const formSchema = z.object({
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    password: z.string().min(2, {
      message: "Password must be at least 6 characters.",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="w-4/5 h-full flex flex-col absolute right-0 overflow-y-scroll">
      <div className="mx-16 mt-8 ">
        <h1 className="text-5xl font-bold">
          Welcome{" "}
          <span className="underline underline-offset-4">username.</span>
        </h1>
      </div>
      <div className="m-16 flex flex-col">
        <h3 className="text-2xl sticky top-8">Profile</h3>
        <div className="m-6 text-md">
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
                <Button type="submit" variant="secondary">
                  Submit
                </Button>
                <Button variant="secondary" className="ml-4 bg-red-600">
                  Cancel
                </Button>
            </form>
          </Form>
        </div>
      </div>
      <div className="m-16 flex flex-col">
        <h3 className="text-2xl sticky top-8">Preferences</h3>
        <div className="m-6 text-md">
          <p>Preferences go here.</p>
          <p>HARHARHARHARHARHARHARHARHARHARHARHAR.</p>
          <p>HARHARHARHARHARHARHARHARHARHARHARHAR.</p>
          <p>HARHARHARHARHARHARHARHARHARHARHARHAR.</p>
          <p>HARHARHARHARHARHARHARHARHARHARHARHAR.</p>
          <p>HARHARHARHARHARHARHARHARHARHARHARHAR.</p>
          <p>HARHARHARHARHARHARHARHARHARHARHARHAR.</p>
          <p>HARHARHARHARHARHARHARHARHARHARHARHAR.</p>
          <p>HARHARHARHARHARHARHARHARHARHARHARHAR.</p>
          <p>HARHARHARHARHARHARHARHARHARHARHARHAR.</p>
          <p>HARHARHARHARHARHARHARHARHARHARHARHAR.</p>
          <p>HARHARHARHARHARHARHARHARHARHARHARHAR.</p>
          <p>HARHARHARHARHARHARHARHARHARHARHARHAR.</p>
          <p>HARHARHARHARHARHARHARHARHARHARHARHAR.</p>
          <p>HARHARHARHARHARHARHARHARHARHARHARHAR.</p>
          <p>HARHARHARHARHARHARHARHARHARHARHARHAR.</p>
          <p>HARHARHARHARHARHARHARHARHARHARHARHAR.</p>
          <p>HARHARHARHARHARHARHARHARHARHARHARHAR.</p>
          <p>HARHARHARHARHARHARHARHARHARHARHARHAR.</p>
          <p>HARHARHARHARHARHARHARHARHARHARHARHAR.</p>
          <p>HARHARHARHARHARHARHARHARHARHARHARHAR.</p>
          <p>HARHARHARHARHARHARHARHARHARHARHARHAR.</p>
          <p>HARHARHARHARHARHARHARHARHARHARHARHAR.</p>
          <p>HARHARHARHARHARHARHARHARHARHARHARHAR.</p>
          <p>HARHARHARHARHARHARHARHARHARHARHARHAR.</p>
          <p>HARHARHARHARHARHARHARHARHARHARHARHAR.</p>
        </div>
      </div>
    </div>
  );
}
