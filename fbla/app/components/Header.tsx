import React from "react";
import Link from "next/link";

const Header = () => {
  return (
    <div className="relative w-screen min-h-24 bg-background p-6 text-xl flex items-center max-sm:flex-col border-b border-gray-600 dropshadow-2xl">
      <h1 className="text-text font-bold absolute max-sm:pb-8 max-sm:relative">
        <Link href="/">Conext</Link>
      </h1>
      <div className="flex-grow"></div>
      <div className="flex flex-row items-center w-full mx-auto justify-center [&>*]:w-auto gap-16 text-md">
        <div className="text-foreground">
          <Link href="/home">Home</Link>
        </div>

        <div className="text-foreground">
          <Link href="/browse">Browse</Link>
        </div>
        <div className="text-foreground">
          <Link href="/dashboard">Dashboard</Link>
        </div>
      </div>
      <div className="flex-grow"></div>
      <div className="rounded-full bg-accent aspect-square h-2/3 absolute right-0 m-10"></div>
    </div>
  );
};

export default Header;
