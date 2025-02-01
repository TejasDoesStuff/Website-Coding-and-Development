"use client"

import React, {useEffect, useState} from "react";
import Link from "next/link";
import {ArrowRight, Minus} from "lucide-react";
import axios from "axios";

interface User {
    role?: string;
}

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const response = await axios.get('https://connexting.ineshd.com/api/user', {withCredentials: true});
                if (response.status === 200) {
                    setIsLoggedIn(true);
                    setUser(response.data);
                } else {
                    setIsLoggedIn(false);
                    setUser(null);
                }
            } catch (error) {
                console.error('Error checking login status:', error);
                setIsLoggedIn(false);
                setUser(null);
            }
        };

        checkLoginStatus();
    }, []);

    const handleLogoutClick = async (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault(); // Prevent default link behavior
        console.log('Logout link clicked'); // Debugging log

        try {
            const response = await axios.get('/api/auth/logout', {withCredentials: true});
            if (response.status === 200) {
                // Handle successful logout, e.g., redirect to home
                window.location.href = '/';
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    const getRoleDisplay = () => {
        if (!user?.role) return null;
        return user.role === 'recruiter' ? 'Recruit' : 'For Students';
    };

    return (
        <div
            className="sticky top-0 z-50 w-full bg-accent p-6 text-xl flex items-center border-b border-gray-600 shadow-lg">
            <h1 className="absolute text-text font-bold flex flex-col">
                <div className="flex items-center">
                    <Minus size={20}/>
                    <Link href="/">Connext</Link>
                    <ArrowRight size={20}/>
                </div>
                {getRoleDisplay() && (
                    <span className="text-sm font-normal text-muted-foreground">
            {getRoleDisplay()}
          </span>
                )}
            </h1>

            <div className="hidden sm:flex flex-grow justify-center gap-16 text-md ">
                <Link href="/browse" className="text-foreground">Browse</Link>
                <Link href="/dashboard" className="text-foreground">Dashboard</Link>
                {isLoggedIn ?
                    <Link href="/" className="text-text absolute right-5" onClick={handleLogoutClick}>Log Out</Link>
                    :
                    <Link href="/signup" className="text-text absolute right-5">Log In/Sign Up</Link>
                }
            </div>

            <button
                className="sm:hidden ml-auto text-foreground focus:outline-none"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? "✖" : "☰"}
            </button>

            <div
                className={`absolute top-full left-0 w-full bg-background border-b border-gray-600 shadow-md flex flex-col items-center
          transition-all duration-300 ease-in-out
          ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"}
        `}
            >
                <Link href="/browse" className="text-foreground py-3 w-full text-center border-b border-gray-700"
                      onClick={() => setIsOpen(false)}>Browse</Link>
                <Link href="/dashboard" className="text-foreground py-3 w-full text-center border-b border-gray-700"
                      onClick={() => setIsOpen(false)}>Dashboard</Link>
                {isLoggedIn ?
                    <Link href="/" className="text-foreground py-3 w-full text-center" onClick={handleLogoutClick}>Log
                        Out</Link>
                    :
                    <Link href="/signup" className="text-foreground py-3 w-full text-center">Log In/Sign Up</Link>
                }
            </div>
        </div>
    );
};

export default Header;