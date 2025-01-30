"use client"

import React, { useState } from "react";
import Link from "next/link";
import { LogOut } from "lucide-react"

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50 w-full bg-background p-6 text-xl flex items-center border-b border-gray-600 shadow-lg">
      <h1 className="absolute text-text font-bold">
        <Link href="/">Connext</Link>
      </h1>

      <div className="hidden sm:flex flex-grow justify-center gap-16 text-md">
        <Link href="/browse" className="text-foreground">Browse</Link>
        <Link href="/dashboard" className="text-foreground">Dashboard</Link>
        {/* if user is logged out make it sign in? */}
        <Link href="/api/auth/logout" className="text-text absolute right-5 rotate-180"><LogOut /></Link>
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
        <Link href="/browse" className="text-foreground py-3 w-full text-center border-b border-gray-700" onClick={() => setIsOpen(false)}>Browse</Link>
        <Link href="/dashboard" className="text-foreground py-3 w-full text-center border-b border-gray-700" onClick={() => setIsOpen(false)}>Dashboard</Link>
        <Link href="/api/auth/logout" className="text-foreground py-3 w-full text-center">Log Out</Link>
      </div>
    </div>
  );
};

export default Header;
