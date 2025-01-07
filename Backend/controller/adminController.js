const User = require("../models/user");
const Contact = require("../models/contact");

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

// Get all contact messages
const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({});
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch contact messages" });
  }
};

module.exports = { getAllUsers, getAllContacts };
