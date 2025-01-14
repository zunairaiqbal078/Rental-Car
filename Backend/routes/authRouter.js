const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
} = require("../controller/userController");
// Define the /signup route

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

// Export the router
module.exports = router;
