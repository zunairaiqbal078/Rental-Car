const User = require("../models/user");

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
const updateUserProfile = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user details
    user.name = name || user.name;
    user.email = email || user.email;
    user.password = password || user.password;

    const updatedUser = await user.save();
    res.json({
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      password: updatedUser.password,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
module.exports = { getUserProfile, updateUserProfile };
