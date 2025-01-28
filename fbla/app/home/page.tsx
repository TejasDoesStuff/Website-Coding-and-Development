"use client";

import JobCard from "../components/JobCard";
import Header from "../components/Header";
import Card from "../browse/Card";
import Link from "next/link";
import {useEffect, useState} from "react";


export default function Home() {

  return (
    <div className="overflow-x-hidden w-screen h-screen">
      <Header />
      <div className="p-5">
        <div className="w-full h-auto flex flex-col items-center">
          <div className="text-5xl font-bold text-text-brand pt-8">
            Welcome to Connext!
          </div>
          <div className="text-lg text-text-brand w-full mt-12 flex flex-col justify-center items-center mb-0 px-12">
            <div className="w-full px-16 m-2">
              <h2 className="">
                For You:
              </h2>
            </div>
            <div className="min-h-64 w-full flex flex-row overflow-hidden justify-center">
              <Card></Card>
              <Card></Card>
              <Card></Card>
            </div>
            <div className="m-6 flex justify-center items-center">
              <Link href="/browse" className="border-2 border-foreground p-4 rounded-lg text-text-brand hover:bg-primary-brand hover:border-background hover:text-white hover:scale-110 transition-all">See More!</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
