// src/components/CarDetails.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCarById } from "../../../api/carApi";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CarDetails = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // Fetch car details by ID
  useEffect(() => {
    const fetchCarDetails = async () => {
      setLoading(true);
      try {
        const response = await getCarById(id);
        setCar(response);
      } catch (err) {
        console.error("Error fetching car details:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCarDetails();
  }, [id]);

  // Slick Slider Settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  // Handle Booking
  const handleBooking = () => {
    if (!startDate || !endDate) {
      alert("Please select a start and end date for booking.");
      return;
    }
    // Add your booking logic here
    alert(
      `Booking confirmed for ${
        car.name
      } from ${startDate.toDateString()} to ${endDate.toDateString()}`
    );
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-8">Error: {error}</div>;
  }

  if (!car) {
    return <div className="text-center py-8">Car not found.</div>;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Car Name and Brand */}
      <h1 className="text-4xl font-bold mb-2">{car.name}</h1>
      <p className="text-lg text-gray-600 mb-6">{car.brand}</p>

      {/* Slick Slider for Car Images */}
      <div className="mb-8">
        <Slider {...sliderSettings}>
          <div>
            <img
              src={car.image}
              alt={car.name}
              className="w-full h-96 object-cover rounded-lg"
            />
          </div>
          {/* Add more images if available */}
          <div>
            <img
              src="https://via.placeholder.com/800x400.png?text=Car+Image+2"
              alt="Car Image 2"
              className="w-full h-96 object-cover rounded-lg"
            />
          </div>
          <div>
            <img
              src="https://via.placeholder.com/800x400.png?text=Car+Image+3"
              alt="Car Image 3"
              className="w-full h-96 object-cover rounded-lg"
            />
          </div>
        </Slider>
      </div>

      {/* Car Details */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-700">Type</h3>
          <p className="text-gray-600">{car.type}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-700">Location</h3>
          <p className="text-gray-600">{car.location}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-700">Price Per Day</h3>
          <p className="text-gray-600">${car.pricePerDay}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-700">Mileage</h3>
          <p className="text-gray-600">{car.mileage} km</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-700">Fuel Type</h3>
          <p className="text-gray-600">{car.fuelType}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-700">Availability</h3>
          <p
            className={`font-semibold ${
              car.availability ? "text-green-600" : "text-red-600"
            }`}
          >
            {car.availability ? "Available" : "Unavailable"}
          </p>
        </div>
      </div>

      {/* Description */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Description</h2>
        <p className="text-gray-700">{car.description}</p>
      </div>

      {/* Booking Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Book This Car</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Calendar for Start Date */}
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              Start Date
            </label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              className="w-full p-2 border border-gray-300 rounded-lg"
              minDate={new Date()}
              placeholderText="Select start date"
            />
          </div>

          {/* Calendar for End Date */}
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              End Date
            </label>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              className="w-full p-2 border border-gray-300 rounded-lg"
              minDate={startDate || new Date()}
              placeholderText="Select end date"
            />
          </div>
        </div>

        {/* Book Now Button */}
        <button
          onClick={handleBooking}
          className="mt-6 px-6 py-3 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 transition-colors"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default CarDetails;
