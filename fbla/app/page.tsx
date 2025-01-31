import React from "react";
import Header from "./components/Header";
import { ArrowRight, Minus } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "—Connext→",
  description: "Tesla STEM's platform for your future.",
};



const page = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="w-auto flex-1 text-center relative flex overflow-hidden">
        <div className="absolute md:w-1/2 aspect-square bg-gradient-to-br from-accent-brand to-red-600 top-[-256] left-[-256] -z-10 rounded-full blur-md" />
        <div className="absolute md:w-1/2 aspect-square bg-gradient-to-br from-secondary-brand to-yellow-900 bottom-[-200] right-[-225] -z-10 rounded-full blur-md" />
        <div className="pt-16 w-full p-10 flex flex-row gap-8 justify-center items-center">
          <div className="w-auto md:w-1/2 h-full flex flex-col justify-center items-center">
            <h1 className="text-5xl md:text-7xl font-bold text-center mt-[-4rem] mb-4 md:m-10 p-[5px] rounded-sm backdrop-blur-lg flex justify-center items-center">
              <Minus size={64} />
              Connext
              <ArrowRight size={64} />
            </h1>
            <h2 className="text-2xl md:text-5xl font-bold text-center max-md:text-2xl max-md:p-5 p-12 rounded-full bg-gradient-to-r from-blue-500 to-primary-brand drop-shadow-lg hover:scale-[101%] mx-4 transition-all text-white w-[95vw] xl:w-auto">
              Where High Schoolers Expand Their Horizons
            </h2>
            <p className="text-md md:text-4xl xl:text-2xl md:w-[96vw] lg:w-auto m-4 md:m-12 mb-0 md:mb-0 backdrop-blur-lg p-[5px] rounded-sm">Tesla STEM's platform for your future.</p>
            <p className="text-sm md:text-3xl xl:text-xl  md:w-[96vw] lg:w-auto mb-8">By the Counseling Department</p>
            <a
              href="/signup"
              className="transition-all md:text-5xl p-4 md:p-8 lg:text-5xl font-bold text-center lg:p-4 mb-8 rounded-2xl border-foreground border-2 text-text bg-background hover:bg-primary-brand hover:border-background hover:text-white hover:scale-110"
            >
              Sign Up
            </a>
          </div>
        </div>
        <div className="plus w-full h-full absolute -z-20 bg-repeat bg-[length:32px_32px] opacity-50" />
      </div>
    </div>
  );
};

export default page;
