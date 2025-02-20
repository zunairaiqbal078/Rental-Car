const express = require("express");
const { saveMessage, getChatHistory } = require("../controller/chatController");
const verifyAuth = require("../middleware/authJwtToken");

const router = express.Router();
const injectIo = (req, res, next) => {
  req.io = req.app.get("io");
  next();
};

// Save a message (authenticated users and admins)
router.post("/send", verifyAuth, injectIo, saveMessage);

// Fetch chat history (authenticated users and admins)
router.get("/history/:receiverId/:receiverRole", verifyAuth, getChatHistory);

module.exports = router;
