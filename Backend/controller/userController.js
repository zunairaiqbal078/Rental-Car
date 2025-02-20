const User = require("../models/user");
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
  console.log("i am email and password", email, password);

  if (!email || !password) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const user = await User.findOne({ email });
    console.log("Found User:", user);

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
        photo: user.photo,
        location: user.location,
      },
      process.env.SECRET_KEY,
      { expiresIn: "1d" }
    );
    console.log("Generated Token:", token);

    // Admin Login: Token stored in HTTP-Only Cookies
    if (user.role === "admin") {
      console.log("✅ Admin Login - Storing Token in Cookies");

      res.cookie("authToken", token, {
        httpOnly: true, // Secure token storage
        secure: process.env.NODE_ENV === "production", // HTTPS only in production
        sameSite: "Strict",
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      });
      console.log(" Cookies Set:", res.getHeaders()["set-cookie"]);
      return res.status(200).json({
        role: "admin",
        message: "Admin logged in successfully.",
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          photo: user.photo,
          location: user.location,
        },
      });
    }

    // User Login: Token sent in JSON response
    else {
      console.log("User detected - Sending token in response...");
      return res.status(200).json({
        token,
        role: "user",
        message: "User logged in successfully.",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          photo: user.photo,
          location: user.location,
        },
      });
    }
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ error: "Something went wrong." });
  }
};

// Logout User or Admin
const logoutUser = (req, res) => {
  res.clearCookie("authToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });

  return res.status(200).json({ message: "Logged out successfully." });
};

module.exports = { registerUser, loginUser, logoutUser }; // Export the function
