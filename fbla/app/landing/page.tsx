import React from "react";
import Header from "../components/Header";

const page = () => {
  return (
    <div>
      <Header />
      <div className="w-full h-auto text-center relative flex overflow-y-hidden">
        <div className="absolute w-1/2 aspect-square bg-gradient-to-br from-[#ff7a6b] to-red-600 top-[-256] left-[-256] -z-10 rounded-full blur-md" />
        <div className="absolute w-1/2 aspect-square bg-gradient-to-br from-[#f6e63a] to-yellow-900 bottom-[-200] right-[-200] -z-10 rounded-full blur-md" />
        <div className="pt-16 w-full h-full p-10 flex flex-row gap-8 justify-center items-center">
          <div className="w-1/2 h-full flex flex-col justify-center items-center">
            <h1 className="text-7xl font-bold text-center p-10 w-full rounded-full">
              Conext
            </h1>
            {/* Replace this with logo later */}
            <h2 className="text-5xl font-bold text-center p-12 rounded-full w-full bg-gradient-to-r from-blue-800 to-[#33b7e8] drop-shadow-lg mr-2">
              Where High Schoolers Expand Their Horizons
            </h2>
            <p className="text-2xl m-12">Placeholder text goes here.</p>
            <h3 className="transition-all text-3xl font-bold text-center p-4 mb-8 rounded-full bg-white text-black border-white border-4">
              Sign Up
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
