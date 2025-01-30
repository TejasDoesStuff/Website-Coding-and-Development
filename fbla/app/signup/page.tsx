"use client";

import React from "react";
import Header from "../components/Header";

import {Button} from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {useForm, FormProvider} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import Link from "next/link";

const passwordRegex =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const loginSchema = z.object({
    accountType: z.enum(["Student", "Company"], {
        required_error: "Account type is required",
    }),
    username: z.string().min(3, "Username must be at least 3 characters"),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .regex(
            passwordRegex,
            "Password must contain at least one capital letter, one number, and one special character"
        ),
});

const signupSchema = z
    .object({
        accountType: z.enum(["Student", "Company"], {
            required_error: "Account type is required",
        }),
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
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    });

const Page = () => {
    const loginForm = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            accountType: "Student",
            username: "",
            password: "",
        },
    });

    const signupForm = useForm<z.infer<typeof signupSchema>>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            accountType: "Student",
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    function loginSubmit(values: z.infer<typeof loginSchema>) {
        //Add something here so that it redirects to the correct dashboard based on account type
        document.location.href = "/dashboard";
    }

    function signupSubmit(values: z.infer<typeof signupSchema>) {
        //Add something here so that it redirects to the correct dashboard based on account type
        document.location.href = "/dashboard";
    }

    return (
        <div className="w-screen h-screen overflow-y-hidden">
            <h1 className="text-6xl md:text-7xl font-bold text-center mt-4 md:m-4 p-[5px] rounded-sm backdrop-blur-lg">
              Connext
            </h1>
            <div className="w-full flex justify-center">
                <div className="w-full h-screen xl:h-auto xl:w-1/2 md:h-screen rounded-xl p-6 shadow-lg shadow-gray-500/50 flex flex-col mt-2">
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
                                    className="space-y-2 flex flex-col"
                                >
                                    <FormField
                                        control={loginForm.control}
                                        name="accountType"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Account Type</FormLabel>
                                                <Select
                                                    onValueChange={field.onChange}
                                                    defaultValue={field.value}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select Account Type"/>
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="Student">Student</SelectItem>
                                                        <SelectItem value="Company">Company</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={loginForm.control}
                                        name="username"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Username</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Username" {...field} />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={loginForm.control}
                                        name="password"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Password</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="password"
                                                        placeholder="Password"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                    <Button type="submit" variant="secondary" className="w-full">
                                        Log In
                                    </Button>
                                    <Link href={"/api/auth/google"}>
                                        <Button type="submit" variant="ghost" className="w-full">
                                            Continue with Google
                                        </Button>
                                    </Link>
                                </form>
                            </FormProvider>
                        </TabsContent>

                        <TabsContent value="signup" className="w-full p-4 pt-0">
                            <FormProvider {...signupForm}>
                                <form
                                    onSubmit={signupForm.handleSubmit(signupSubmit)}
                                    className="space-y-2 flex flex-col"
                                >
                                    <FormField
                                        control={signupForm.control}
                                        name="accountType"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Account Type</FormLabel>
                                                <Select
                                                    onValueChange={field.onChange}
                                                    defaultValue={field.value}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select Account Type"/>
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="Student">Student</SelectItem>
                                                        <SelectItem value="Company">Company</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={signupForm.control}
                                        name="username"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Username</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Username" {...field} />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={signupForm.control}
                                        name="email"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Email" {...field} />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={signupForm.control}
                                        name="password"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Password</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="password"
                                                        placeholder="Password"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={signupForm.control}
                                        name="confirmPassword"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Confirm Password</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="password"
                                                        placeholder="Confirm Password"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />

                                    <Button type="submit" variant="secondary" className="w-full">
                                        Sign Up
                                    </Button>
                                    <Link href={"/api/auth/google"}>
                                        <Button type="submit" variant="ghost" className="w-full">
                                            Continue with Google
                                        </Button>
                                    </Link>
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
