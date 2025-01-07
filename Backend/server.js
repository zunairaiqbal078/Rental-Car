const express = require("express");
const connectDb = require("./config/db");
const dotenv = require("dotenv");
const cors = require("cors");
const authRouter = require("./routes/auth/authRouter");
const userRoute = require("./routes/userRoute");
const cookieParser = require("cookie-parser");
const adminRoute = require("./routes/auth/adminRoute");
const app = express();
dotenv.config();
// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());

// Routes
app.use("/auth", authRouter);
app.use("/user", userRoute);
app.use("/admin", adminRoute);

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
