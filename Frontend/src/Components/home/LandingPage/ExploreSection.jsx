import React from "react";
import { locations } from "../../../Data/FAQ";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import Catalog from "./CarTypes";
import Cars from "./Cars";
function ExploreSection() {
  return (
    <>
      <section className="px-6 py-6 bg-gradient-to-l from-teal-500/20 via-cyan-700/2 to-cyan-800/25 ">
        <div className="flex flex-col justify-between mx-6 gap-7 md:flex-row">
          {/* First Div */}
          <div className="flex flex-col w-full p-6 space-y-6 border rounded-lg shadow-lg md:w-1/2">
            <h1 className="text-2xl font-bold text-center mb-14">
              <span className="text-yellow-400">Plan Your Next Ride</span>
              <br />
              Explore our locations
            </h1>
            <div className="w-full space-y-4">
              {locations.map((ride) => (
                <div
                  key={ride.id}
                  className="flex items-center justify-between w-full max-w-md px-4 py-3 mx-auto font-serif border border-gray-300 rounded-md hover:border-blue-600"
                >
                  <h2 className="text-lg font-medium text-center">
                    {ride.city}
                  </h2>
                  <IoIosArrowDroprightCircle className="text-2xl text-gray-600 hover:text-blue-600" />
                </div>
              ))}
              <div className="flex items-center justify-center ">
                <button className="p-3 mt-5 text-white bg-blue-600 rounded-full">
                  see our most popular rides
                </button>
              </div>
            </div>
          </div>

          {/* Second Div */}
          <div className="flex flex-col w-full gap-6 p-4 rounded-lg bg-gradient-to-l from-teal-600/30 via-cyan-700/2 to-teal-900/15 md:w-1/2 max-md:shadow-none">
            <div className="w-full p-4 border-2 rounded-lg shadow-sm hover:shadow-lg ">
              <Catalog />
            </div>

            <div className="flex flex-col w-full p-4 bg-gray-100 border-2 rounded-lg shadow-sm hover:shadow-lg max-md:border-none max-md:shadow-none">
              <Cars />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ExploreSection;
