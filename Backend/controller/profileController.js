const User = require("../models/user");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { uploadCloud } = require("../utils/cloudinary");
// Fetch user profile
const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      photo: user.photo, // Include photo in response
      location: user.location, // Include location in response
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update user profile
const updateUserProfile = async (req, res) => {
  try {
    const userId = req.params.id;

    // Validate user ID
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const { name, email, location, password } = req.body;

    console.log("Request body:", req.body);
    console.log("Uploaded file:", req.file);

    // Find the user in the database
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let photoUrl = user.photo;
    if (req.file) {
      const uploadResponse = await uploadCloud(req.file.path);
      if (uploadResponse && uploadResponse.url) {
        photoUrl = uploadResponse.url;

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

    // Update user fields
    user.name = name || user.name;
    user.email = email || user.email;
    user.location = location || user.location;
    user.photo = photoUrl;

    // Hash the password if it is provided
    if (password) {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      user.password = hashedPassword;
    }

    // Save the updated user
    const updatedUser = await user.save();
    console.log("User updated:", updatedUser);
    res.json({
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      photo: updatedUser.photo,
      location: updatedUser.location,
      message: "User Updated successfully",
    });
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getUserProfile, updateUserProfile };
