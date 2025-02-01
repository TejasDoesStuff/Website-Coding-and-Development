import React from "react";
import Header from "./components/Header";
import { ArrowRight, ArrowDown, Minus } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image"

export const metadata: Metadata = {
  title: "—Connext→",
  description: "Tesla STEM's platform for your future.",
};

const page = () => {
  return (
    <div>
      <div className="flex flex-col h-screen min-h-[720px] max-md:min-h-[480px] scroll-smooth">
      <Header />
      <section className="h-full">
      <div className="w-auto flex-1 h-full text-center relative flex overflow-hidden" style={{ backgroundImage: "url('/defaults/stem.jpeg')" }}>
        <Image src="/images/defaults/stem.jpeg" alt="tesla stem" width={256} height={256} className="absolute w-full h-full -z-50 opacity-20 blur-sm object-cover"></Image>
        <div className="absolute md:w-1/2 aspect-square bg-gradient-to-br from-accent-brand to-green-600 top-[-256px] left-[-256px] -z-10 rounded-full blur-md" />
        <div className="absolute md:w-1/2 aspect-square bg-gradient-to-br from-secondary-brand to-green-900 bottom-[-200px] right-[-256px] -z-10 rounded-full blur-md" />
        <div className="pt-16 w-full p-10 flex flex-row gap-8 justify-center items-center">
          <div className="w-auto md:w-1/2 h-full flex flex-col justify-center items-center">
            <h1 className="text-5xl md:text-7xl font-bold text-center mt-[-4rem] mb-4 md:m-10 p-[5px] rounded-sm backdrop-blur-lg flex justify-center items-center">
              <Minus size={64} />
              Connext
              <ArrowRight size={64} />
            </h1>
            <h2 className="text-2xl font-bold text-center px-6 py-4 rounded-full bg-gradient-to-r from-blue-500 to-primary-brand drop-shadow-lg hover:scale-[101%] mx-auto transition-all text-white max-w-[95%] md:w-full lg:max-w-[80%]">
              Where High Schoolers Expand Their Horizons
            </h2>
            <p className="text-md md:text-4xl xl:text-2xl md:w-[96vw] lg:w-auto m-4 mb-0 backdrop-blur-lg p-[5px] rounded-sm">Tesla STEM's platform for your future.</p>
            <p className="text-sm md:text-3xl xl:text-xl  md:w-[96vw] lg:w-auto mb-8">By the Counseling Department</p>
            <a
              href="/signup"
              className="transition-all p-2 text-3xl font-bold text-center mb-4 rounded-2xl border-foreground border-2 text-text bg-background hover:bg-primary-brand hover:border-background hover:text-white hover:scale-110"
            >
              Sign Up
            </a>
            <a href="#down" className="aspect-square absolute bottom-[5%]"><ArrowDown size={40} className="animate-bounce position" /></a>
          </div>
        </div>
        <div className="plus w-full h-full absolute -z-20 bg-repeat bg-[length:32px_32px] opacity-50" />
      </div>
      </section>
      
    </div>
          <section className="w-full py-20 px-8 bg-accent text-center text-text" id="down">
          <h2 className="text-3xl md:text-5xl font-bold">What is Connext?</h2>
            <p className="text-lg md:text-2xl mt-4 max-w-3xl mx-auto">
              Connext is where Tesla STEM students can connext to their next job!
            </p>
    
            <div className="flex flex-wrap justify-center gap-8 mt-12">
              <div className="bg-primary-brand shadow-lg p-6 rounded-lg w-full max-w-sm text-white hover:scale-105 transition-all duration-300">
                <h3 className="text-xl font-bold">Find Jobs</h3>
                <p className="mt-2">Students can quickly browse through jobs and find the perfect one!</p>
              </div>
              <div className="bg-accent-brand shadow-lg p-6 rounded-lg w-full max-w-sm text-white hover:scale-105 transition-all duration-300">
                <h3 className="text-xl font-bold">Recruit Employees</h3>
                <p className="mt-2">Companies can post listings so students can find their next opportunity!</p>
              </div>
              <div className="bg-secondary-brand shadow-lg p-6 rounded-lg w-full max-w-sm text-white hover:scale-105 transition-all duration-300">
                <h3 className="text-xl font-bold">Plan your Future</h3>
                <p className="mt-2">Make connections that benefit you and your employer in the long term!</p>
              </div>
            </div>
          </section>
    </div>

  );
};

export default page;