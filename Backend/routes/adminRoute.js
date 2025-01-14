const express = require("express");
const verifyAdmin = require("../middleware/adminJwtToken");
const router = express.Router();
const {
  getAllUsers,
  getAllContacts,
} = require("../controller/adminController");

router.get("/message", verifyAdmin, getAllContacts);
router.get("/users", verifyAdmin, getAllUsers);
module.exports = router;
