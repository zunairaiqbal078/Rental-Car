const express = require("express");
const connectDb = require("./config/db");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const http = require("http");
const socketHandler = require("./utils/socketHandler");
const chatRoute = require("./routes/chatRoute");
// Import other routes
const authRouter = require("./routes/authRouter");
const userRoute = require("./routes/userRoute");
const adminRoute = require("./routes/adminRoute");
const carRoute = require("./routes/carRoute");
const createAdmin = require("./controller/addAdmin");

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//Seed Admin
createAdmin();
// Routes
app.use("/car", carRoute);
app.use("/auth", authRouter);
app.use("/user", userRoute);
app.use("/admin", adminRoute);
app.use("/chat", chatRoute);

// Connect to the database
connectDb()
  .then(() => {
    // Start the server and initialize Socket.IO
    const PORT = process.env.PORT || 4000;
    server.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
    // Handle Socket.IO
    socketHandler(io);
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
  });
