const Cars = require("../models/cars");
const { uploadCloud } = require("../utils/cloudinary");
const fs = require("fs");
const mongoose = require("mongoose");
// Get all cars
const getAllCars = async (req, res) => {
  try {
    const cars = await Cars.find({});
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch cars" });
  }
};

// Get car by ID
const getCarById = async (req, res) => {
  const { id } = req.params;
  // Validate if the ID is a valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid car ID format" });
  }

  try {
    const car = await Cars.findById(id);
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }
    res.json(car);
  } catch (error) {
    console.error("Error fetching car by ID:", error);
    res.status(500).json({ message: "Server error" });
  }
};
// Create a new car
const createCar = async (req, res) => {
  console.log("Creating car...");
  try {
    let imageUrls = [];

    // Check if images are uploaded
    if (req.files && req.files.length > 0) {
      try {
        // Upload each file to Cloudinary and store the URL
        const uploadPromises = req.files.map(async (file) => {
          const uploadResponse = await uploadCloud(file.path);
          if (uploadResponse?.url) {
            // Delete local file after successful upload
            fs.unlinkSync(file.path);
            return uploadResponse.url;
          }
          throw new Error("Failed to upload image to Cloudinary");
        });

        // Wait for all images to upload
        imageUrls = await Promise.all(uploadPromises);
      } catch (uploadError) {
        console.error("Cloudinary upload error:", uploadError);
        return res.status(500).json({ message: "Image upload failed" });
      }
    }

    // Validate request body
    const {
      name,
      type,
      brand,
      location,
      pricePerDay,
      mileage,
      fuelType,
      description,
    } = req.body;
    console.log("Validating request body", req.body);
    if (
      !name ||
      !type ||
      !brand ||
      !location ||
      !pricePerDay ||
      !mileage ||
      !fuelType
    ) {
      return res
        .status(400)
        .json({ message: "All required fields must be provided" });
    }

    // Create new car entry
    const carData = {
      name,
      type,
      brand,
      location,
      pricePerDay,
      mileage,
      fuelType,
      description,
      images: imageUrls,
    };
    console.log("Uploading Car Data", carData);

    const car = new Cars(carData);
    await car.save();

    res.status(201).json({ message: "Car added successfully", car });
  } catch (error) {
    console.error("Error creating car:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update a car
const updateCar = async (req, res) => {
  try {
    let imageUrl = "";
    if (req.file) {
      const uploadResponse = await uploadCloud(req.file.path);
      if (uploadResponse && uploadResponse.url) {
        imageUrl = uploadResponse.url;

        try {
          fs.unlinkSync(req.file.path);
          console.log("Local file deleted after upload");
        } catch (unlinkError) {
          console.error("Failed to delete local file", unlinkError);
        }
      } else {
        return res
          .status(500)
          .json({ message: "File upload to Cloudinary failed" });
      }
    }
    console.log("update cars", updateCar);
    const carData = {
      ...req.body,
      image: imageUrl || req.body.image, // Keep existing image if no new image is uploaded
    };

    const car = await Cars.findByIdAndUpdate(req.params.id, carData, {
      new: true,
    });
    console.log("Updated Car Data", car);
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }
    res.json(car);
  } catch (error) {
    console.error("Error updating car:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a car
const deleteCar = async (req, res) => {
  try {
    const car = await Cars.findByIdAndDelete(req.params.id);
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }
    res.json({ message: "Car deleted successfully" });
  } catch (error) {
    console.error("Error deleting car:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Search cars
const searchCar = async (req, res) => {
  const {
    location,
    availability,
    name,
    type,
    sort,
    page = 1,
    limit = 12,
  } = req.query;

  try {
    const query = {};
    if (location) query.location = { $regex: location, $options: "i" };
    if (type && type !== "All") query.type = type;
    if (name) query.name = { $regex: name, $options: "i" };
    if (availability) query.availability = availability === "true";
    let sortQuery = {};
    if (sort === "price-asc") sortQuery.pricePerDay = 1;
    if (sort === "price-desc") sortQuery.pricePerDay = -1;
    if (sort === "date-asc") sortQuery.createdAt = 1;
    if (sort === "date-desc") sortQuery.createdAt = -1;
    if (sort === "available") sortQuery.availability = -1;

    // Fetch cars with pagination
    const cars = await Cars.find(query)
      .sort(sortQuery)
      .skip((page - 1) * limit)
      .limit(limit);
    // Get total count for pagination
    const totalCars = await Cars.countDocuments(query);
    const totalPages = Math.ceil(totalCars / limit);

    res.status(200).json({ cars, totalPages });
  } catch (error) {
    console.error("Error searching cars:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getAllCars,
  getCarById,
  createCar,
  updateCar,
  deleteCar,
  searchCar,
};
