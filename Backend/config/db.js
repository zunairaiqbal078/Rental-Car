const mongoose = require("mongoose");
require("dotenv").config();
const connectDB = async () => {
  mongoose
    .connect(process.env.MONGODB)
    .then(() => console.log("MongoDB connected successfully."))
    .catch((error) => console.error("Error connecting to MongoDB:", error));
};

module.exports = connectDB;
