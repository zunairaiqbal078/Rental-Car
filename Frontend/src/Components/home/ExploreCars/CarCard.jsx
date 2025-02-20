import React from "react";
import { Link } from "react-router-dom";

const CarCard = ({ car }) => {
  return (
    <div className="p-4 transition-shadow duration-300 transform bg-white border border-gray-200 rounded-lg shadow-md group hover:shadow-lg hover:scale-105">
      {/* Car Image */}
      <div className="relative mb-4 overflow-hidden rounded-lg">
        <img
          src={car.images}
          alt={car.name}
          className="object-cover w-full h-48 transition-transform duration-300 transform group-hover:scale-110"
        />
        {/* Availability Badge */}
        <div
          className={`absolute top-2 right-2 px-3 py-1 rounded-full text-sm font-semibold ${
            car.availability
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {car.availability ? "Available" : "Unavailable"}
        </div>
      </div>

      {/* Car Details */}
      <h3 className="mb-2 text-xl font-semibold text-gray-800">{car.name}</h3>
      <p className="mb-2 text-lg font-medium text-gray-600">
        ${car.pricePerDay}/day
      </p>
      <p className="mb-2 text-sm text-gray-500">
        {car.location} • {car.type}
      </p>
      <p className="mb-4 text-xs text-gray-400">
        Added on: {new Date(car.createdAt).toLocaleDateString()}
      </p>

      {/* Action Buttons */}
      <div className="flex justify-between">
        <button
          className={`px-4 py-2 text-sm font-semibold text-white rounded-lg ${
            car.availability
              ? "bg-yellow-600 hover:bg-yellow-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
          disabled={!car.availability}
        >
          {car.availability ? "Book Now" : "Unavailable"}
        </button>
        <Link to={`/explore/viewDetails/${car._id}`}>
          <button className="px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
            More Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CarCard;
