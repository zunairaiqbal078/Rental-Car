const mongoose = require("mongoose");

const carSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Car name is required"],
      trim: true,
    },
    type: {
      type: String,
      required: [true, "Car type is required"],
      enum: [
        "Suv",
        "Sedan",
        "Hatchback",
        "Truck",
        "Convertible",
        "Luxury",
        "Coupe",
      ],
    },
    brand: {
      type: String,
      required: [true, "Car brand is required"],
    },
    location: {
      type: String,
      required: [true, "Car location is required"],
      enum: ["Lahore", "Sahiwal", "Okara"],
    },
    availability: {
      type: Boolean,
      default: true,
    },
    pricePerDay: {
      type: Number,
      required: [true, "Price per day is required"],
      min: [0, "Price cannot be negative"],
    },
    mileage: {
      type: Number,
      required: [true, "Mileage is required"],
      min: [0, "Mileage cannot be negative"],
    },
    fuelType: {
      type: String,
      required: [true, "Fuel type is required"],
      enum: ["Petrol", "Diesel", "Electric", "Hybrid"],
    },
    images: {
      type: [String], // Array of image URLs
      // required: [true, "At least one image URL is required"],
    },
    description: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cars", carSchema);
