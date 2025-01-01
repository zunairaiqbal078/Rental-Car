import React from "react";
import { MdLocationOn } from "react-icons/md";
import { Cards } from "../../../Data/Rides";
import { Link } from "react-router-dom";

function Cars() {
  return (
    <>
      <div className="">
        <h2 className="mb-1 text-xl font-bold text-gray-800 ">
          Explore{" "}
          <Link to="/explore">
            <span className="text-blue-600">All Cars</span>
          </Link>
        </h2>
        <p className="mb-3 text-gray-600">
          Find the perfect car for your next journey!
        </p>
        <div className="grid grid-cols-3 gap-3 max-[539px]:grid-cols-1 max-md:grid-cols-3 lg:grid-cols-2 max-[629px]:grid-cols-2">
          {Cards.map((card) => (
            <div
              key={card.id}
              className="transition-shadow bg-white rounded-lg shadow-md hover:shadow-lg"
            >
              <div className="max-w-sm ">
                <img
                  src={card.image}
                  alt={card.name}
                  className="object-cover rounded-t-lg "
                />
                <div className="max-w-lg p-2 max-md:max-w-fit">
                  <h3 className="mb-1 text-xl font-bold tracking-tight text-gray-900 ">
                    {card.title}
                  </h3>
                  <p className="mb-1 font-normal text-gray-700 dark:text-gray-400 ">
                    <span className="pl-1 font-normal text-blue-500">
                      {card.price}
                    </span>
                  </p>
                  <div className="flex items-center mb-2">
                    <MdLocationOn className="text-gray-700 " />
                    <p className="font-normal text-gray-700 ">
                      {card.location}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Cars;
