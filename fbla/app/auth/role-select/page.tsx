"use client";

import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {useRouter} from "next/navigation";
import {useState} from "react";

export default function RoleSelect() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleRoleSelect = async (selectedRole: 'student' | 'recruiter') => {
        try {
            setIsLoading(true);
            const response = await fetch('/api/user/role', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({role: selectedRole}),
            });

            if (!response.ok) {
                throw new Error('Failed to update role');
            }

            await router.push('/dashboard');
        } catch (error) {
            console.error('Error updating role:', error);
            // Handle error (show toast notification, etc.)
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <h1 className="text-4xl font-bold">Welcome to Connext</h1>
                    <p className="mt-2 text-text">Please select an experience for your account</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative">
                    <Card
                        className="cursor-pointer relative hover:border-primary transition-colors pb-8 overflow-hidden"
                        onClick={() => !isLoading && handleRoleSelect('student')}>
                        <CardHeader>
                            <CardTitle>For Students</CardTitle>
                            <CardDescription>Find your next opportunity!</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button className="absolute w-full bottom-0 text-text" disabled={isLoading}>
                                Continue as Student
                            </Button>
                        </CardContent>
                    </Card>

                    <Card
                        className="cursor-pointer relative hover:border-primary transition-colors pb-8 overflow-hidden"
                        onClick={() => !isLoading && handleRoleSelect('recruiter')}>
                        <CardHeader>
                            <CardTitle>Recruit</CardTitle>
                            <CardDescription>Find prepared high schoolers for your company!</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button className="absolute w-full bottom-0 text-text" disabled={isLoading}>
                                Continue as Recruiter
                            </Button>
                        </CardContent>

                    </Card>
                </div>
            </div>
        </div>
    );
} 