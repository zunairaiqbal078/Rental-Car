const Cars = require("../models/cars");

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
  try {
    const car = new Cars(req.body);
    await car.save();
    res.status(201).json(car);
  } catch (error) {
    console.error("Error creating car:", error);
    res.status(400).json({ message: "Invalid request data" });
  }
};
// Update a car
const updateCar = async (req, res) => {
  try {
    const car = await Cars.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
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

// Search for a car by location and type

const searchCar = async (req, res) => {
  try {
    const { type, location } = req.query;
    const cars = await Cars.find({ location, type });
    res.status(200).json(cars);
  } catch (error) {
    console.error("Error searching for car:", error);
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
