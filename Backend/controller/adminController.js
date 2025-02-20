const User = require("../models/user");
const Contact = require("../models/contact");
const mongoose = require("mongoose");
// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
};
// Delete User by Id and email
const deleteUserById = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all contact messages
const getAllContacts = async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    return res.status(200).json(messages);
  } catch (error) {
    console.error("Error fetching contact messages:", error);
    return res.status(500).json({ message: "Failed to fetch messages." });
  }
};

module.exports = { getAllUsers, getAllContacts, deleteUserById };
