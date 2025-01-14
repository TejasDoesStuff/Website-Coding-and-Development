"use client";

import React from "react";
import Header from "../components/Header";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const loginSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      passwordRegex,
      "Password must contain at least one capital letter, one number, and one special character"
    ),
});

const signupSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      passwordRegex,
      "Password must contain at least one capital letter, one number, and one special character"
    ),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const Page = () => {
  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const signupForm = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  function loginSubmit(values: z.infer<typeof loginSchema>) {
    console.log(values);
  }

  function signupSubmit(values: z.infer<typeof signupSchema>) {
    console.log(values);
  }

  return (
    <div className="w-screen h-screen overflow-y-hidden">
      <Header />
      <div className="w-full flex justify-center">
        <div className="border border-gray-600 w-1/3 h-auto rounded-xl p-6 shadow-inner shadow-gray-500/50 flex flex-col mt-12">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="w-full flex">
              <TabsTrigger className="w-1/2" value="login">
                Log In
              </TabsTrigger>
              <TabsTrigger className="w-1/2" value="signup">
                Sign Up
              </TabsTrigger>
            </TabsList>
            <TabsContent value="login" className="w-full p-4 flex flex-col">
              <FormProvider {...loginForm}>
                <form
                  onSubmit={loginForm.handleSubmit(loginSubmit)}
                  className="space-y-6 flex flex-col"
                >
                  <FormField
                    control={loginForm.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input placeholder="Username" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={loginForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="Password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" variant="secondary" className="w-full">
                    Log In
                  </Button>
                </form>
              </FormProvider>
            </TabsContent>
            <TabsContent value="signup" className="w-full p-4 pt-0">
              <FormProvider {...signupForm}>
                <form
                  onSubmit={signupForm.handleSubmit(signupSubmit)}
                  className="space-y-6 flex flex-col"
                >
                  <FormField
                    control={signupForm.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input placeholder="Username" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={signupForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={signupForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="Password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={signupForm.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Confirm Password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" variant="secondary" className="w-full">
                    Sign Up
                  </Button>
                </form>
              </FormProvider>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Page;