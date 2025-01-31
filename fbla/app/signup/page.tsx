"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Minus } from "lucide-react";
import Head from 'next/head'

const Page = () => {
    return (
        <>
            <Head>
                <title>Connext - Sign Up</title>
                <meta name="description" content="Join Connext to explore job opportunities" />
            </Head>
            <div className="w-screen h-screen flex flex-col justify-center items-center">
                <h1 className="text-5xl md:text-7xl font-bold text-center mb-6 flex justify-center items-center">
                    <Minus size={64} />
                    Connext
                    <ArrowRight size={64} />
                </h1>
                <div className="rounded-xl shadow-lg shadow-gray-500/50 flex flex-col items-center">
                    <Link href={"/api/auth/google"}>
                        <Button variant="ghost" className="w-full text-xl p-6">
                            Sign in with Google
                        </Button>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default Page;
