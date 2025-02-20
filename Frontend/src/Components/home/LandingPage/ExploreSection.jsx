import React from "react";
import { locations } from "../../../Data/FAQ";
import { IoIosArrowDroprightCircle } from "react-icons/io";

function ExploreSection() {
  return (
    <>
      <section className="px-6 py-6 bg-white ">
        <div className="flex flex-col justify-between mx-6 gap-7 md:flex-row">
          <div className="flex flex-col w-full gap-6 p-4 rounded-lg md:w-1/2 max-md:shadow-none">
            <img
              src="src/assets/CarTypes/img5.jpeg"
              alt="promo Section"
              className="rounded-sm "
            />
          </div>
          {/* First Div */}
          <div className="flex flex-col w-full p-6 space-y-6 bg-gray-100 rounded-md md:w-1/2">
            <h1 className="mb-10 text-2xl font-bold text-center">
              <span className="text-yellow-600">Plan Your Next Ride</span>
              <br />
              Explore our locations
            </h1>
            <div className="w-full space-y-4">
              {locations.map((ride) => (
                <div
                  key={ride.id}
                  className="flex items-center justify-between w-full max-w-md px-4 py-3 mx-auto font-serif border border-gray-300 rounded-md hover:border-cyan-800"
                >
                  <h2 className="text-lg font-medium text-center">
                    {ride.city}
                  </h2>
                  <IoIosArrowDroprightCircle className="text-2xl text-gray-600 hover:text-blue-600" />
                </div>
              ))}
              <div className="flex items-center justify-center ">
                <button className="p-3 mt-5 text-white bg-yellow-600 rounded-full">
                  see our most popular rides
                </button>
              </div>
            </div>
          </div>

          {/* Second Div */}
        </div>
      </section>
    </>
  );
}

export default ExploreSection;
