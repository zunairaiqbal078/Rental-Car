const express = require("express");

const router = express.Router();
const {
  getAllUsers,
  getAllContacts,
  deleteUserById,
} = require("../controller/adminController");

router.get("/message", getAllContacts);
router.get("/users", getAllUsers);
router.delete("/delete-user/:id", deleteUserById);
module.exports = router;
