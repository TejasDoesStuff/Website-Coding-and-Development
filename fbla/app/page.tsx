import React from "react";
import Header from "./components/Header";

const page = () => {
  return (
    <div>
      <Header />
      <div className="w-full h-auto text-center relative flex overflow-hidden">
        <div className="absolute w-1/2 aspect-square bg-gradient-to-br from-accent-brand to-red-600 top-[-256] left-[-256] -z-10 rounded-full blur-md" />
        <div className="absolute w-1/2 aspect-square bg-gradient-to-br from-secondary-brand to-yellow-900 bottom-[-200] right-[-225] -z-10 rounded-full blur-md" />
        <div className="pt-16 w-full h-full p-10 flex flex-row gap-8 justify-center items-center">
          <div className="w-1/2 h-full flex flex-col justify-center items-center">
            <h1 className="text-7xl font-bold text-center m-10 p-[5px] rounded-sm backdrop-blur-lg">
              Connext
            </h1>
            {/* Replace this with logo later */}
            <h2 className="text-5xl font-bold text-center p-12 rounded-full w-full bg-gradient-to-r from-blue-500 to-primary-brand drop-shadow-lg mr-2 hover:scale-[101%] transition-all text-white">
              Where High Schoolers Expand Their Horizons
            </h2>
            <p className="text-2xl m-12 mb-0 backdrop-blur-lg p-[5px] rounded-sm">Tesla STEM's platform for your future.</p>
            <p className="text-sm mb-8">By the Counseling Department</p>
            <a
              href="/signup"
              className="transition-all text-3xl font-bold text-center p-4 mb-8 rounded-2xl border-foreground border-2 text-text bg-background hover:bg-primary-brand hover:border-background hover:text-white hover:scale-110"
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
