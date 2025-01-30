"use client"

import SelectorUser from "./SelectorUser"
import OptionsUser from "./OptionsUser"

import SelectorCompany from "./SelectorCompany"
import OptionsCompany from "./OptionsCompany"

import CheckLogIn from "@/app/components/CheckLogIn";
import React, {useEffect, useState} from 'react'
import axios from "axios";

async function fetchUserInfo() {
    const response = await axios.get("https://connexting.ineshd.com/api/user", {
        withCredentials: true, // Include cookies in the request
    });
    if (response.status !== 200) {
        throw new Error('Failed to fetch posts');
    }
    return response.data;
}

interface User {
    role: string;
}

export default function Holder() {
    const [user, setUser] = useState<User | null>(null);
    useEffect(() => {
        async function fetchData() {
            try {
                const user = await fetchUserInfo();
                setUser(user);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        }

        fetchData();
    }, []);
    return (
        <div className="w-screen h-[87.5vh] flex flex-row overflow-y-hidden relative">
            <CheckLogIn/>
            {user?.role === "recruiter" ? (
                <>
                    <SelectorCompany />
                    <OptionsCompany />
                </>
            ) : (
                <>
                    <SelectorUser />
                    <OptionsUser />
                </>
            )}
        </div>
    )
}