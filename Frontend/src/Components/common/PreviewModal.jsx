import React from "react";

const CarPreviewModal = ({ car, isOpen, onClose }) => {
  if (!isOpen || !car) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="p-6 bg-white rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-gray-800">{car.name}</h2>
        <img
          src={car.images?.[0] || "/placeholder.png"}
          alt={car.name}
          className="object-cover w-full h-40 my-3 rounded-md"
        />
        <p>
          <strong>Brand:</strong> {car.brand}
        </p>
        <p>
          <strong>Type:</strong> {car.type}
        </p>
        <p>
          <strong>Fuel:</strong> {car.fuelType}
        </p>
        <p>
          <strong>Location:</strong> {car.location}
        </p>
        <p>
          <strong>Price:</strong> ${car.pricePerDay}/day
        </p>
        <button
          className="px-4 py-2 mt-4 text-white bg-gray-600 rounded-md hover:bg-gray-500"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default CarPreviewModal;
