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
const upload = require("../middleware/multer");
const verifyAdmin = require("../middleware/adminJwtToken");

router.get("/all-cars", getAllCars);
router.get("/view-car/:id", getCarById);
router.post("/create-car", upload.array("images", 3), createCar);
router.patch("/update-car/:id", upload.array("images", 3), updateCar);
router.delete("/delete-car/:id", deleteCar);
router.get("/search", searchCar);

module.exports = router;
