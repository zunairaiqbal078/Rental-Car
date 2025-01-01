const User = require("../models/user"); // Import the User model
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Function to handle user registration
const registerUser = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  try {
    // Check if all required fields are present
    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match." });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }
    // Hash the password
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });
    const storeData = await user.save();
    console.log("User saved to DB:", storeData);
    // Respond with success
    res.status(200).json({
      success: true,
      message: "User registered successfully.",
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, message: "Something went wrong." });
  }
};

// Function to handle user login

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Check if both email and password are provided
  if (!email || !password) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Compare provided password with stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.SECRET_KEY,
      { expiresIn: "1d" }
    );

    console.log(token);

    // Send token and success message in response
    return res.status(200).json({
      message: "Logged in successfully.",
      token,
      success: true,
      email,
      name: user.name,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong." });
  }
};

const logoutUser = () => {
  // Clear the JWT token from the local storage
  localStorage.removeItem("token");
  return true;
};

module.exports = { registerUser, loginUser, logoutUser }; // Export the function
