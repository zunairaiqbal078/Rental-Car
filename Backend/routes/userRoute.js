const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const { submitContactForm } = require("../controller/contactController");
const verifyAuth = require("../middleware/authJwtToken");
const {
  getUserProfile,
  updateUserProfile,
} = require("../controller/profileController");

router.post("/contact", submitContactForm);
router.get("/profile", verifyAuth, getUserProfile);
router.patch("/update-profile/:id", upload.single("photo"), updateUserProfile);

module.exports = router;
