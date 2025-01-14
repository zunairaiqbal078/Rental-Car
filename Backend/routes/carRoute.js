const {
  getAllCars,
  getCarById,
  createCar,
  updateCar,
  deleteCar,
  searchCar,
} = require("../controller/carController");

const express = require("express");
const router = express.Router();
const verifyAdmin = require("../middleware/adminJwtToken");

router.get("/all-cars", getAllCars);
router.get("/view-car/:id", getCarById);

router.post("/create-car", verifyAdmin, createCar);

router.put("/update-car/:id", verifyAdmin, updateCar);

router.delete("/delete-car/:id", verifyAdmin, deleteCar);

router.get("/search", searchCar);

module.exports = router;
