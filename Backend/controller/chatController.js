const Chat = require("../models/chat");

const saveMessage = async (req, res) => {
  const { receiverId, receiverRole, message } = req.body;

  // Extract sender info from the authenticated request
  const senderId = req.user.id;
  const senderRole = req.user.role; // "user" or "admin"

  try {
    // Save the message to the database
    const chatMessage = new Chat({
      senderId,
      senderRole,
      receiverId,
      receiverRole,
      message,
    });
    await chatMessage.save();

    // Emit the message to the receiver via Socket.IO
    const io = req.app.get("io");
    io.to(receiverId).emit("receiveMessage", chatMessage);

    return res.status(200).json(chatMessage);
  } catch (error) {
    console.error("Error saving chat message:", error);
    return res.status(500).json({ message: "Failed to save message." });
  }
};
const getChatHistory = async (req, res) => {
  const { receiverId, receiverRole } = req.params;

  // Extract sender info from the authenticated request
  const senderId = req.user.id;
  const senderRole = req.user.role; // "user" or "admin"

  try {
    // Fetch messages between the two parties
    const messages = await Chat.find({
      $or: [
        { senderId, senderRole, receiverId, receiverRole },
        {
          senderId: receiverId,
          senderRole: receiverRole,
          receiverId: senderId,
          receiverRole: senderRole,
        },
      ],
    }).sort({ createdAt: 1 });

    return res.status(200).json(messages);
  } catch (error) {
    console.error("Error fetching chat history:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = { saveMessage, getChatHistory };
