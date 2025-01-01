const express = require("express");
const connectDb = require("./config/db");
const dotenv = require("dotenv");
const cors = require("cors");
const authRouter = require("./routes/auth/authRouter");
const cookieParser = require("cookie-parser");
const app = express();
dotenv.config();
// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // Allow requests from this origin
    credentials: true,
  })
);
app.use(cookieParser());
// Routes
app.use("/auth", authRouter);

const PORT = process.env.PORT || 4000;
connectDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
  });
