const socketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    // Join a room based on user ID and role
    socket.on("joinRoom", (userId, userRole) => {
      socket.join(userId);
      console.log(`User ${userId} (${userRole}) joined room`);
    });

    // Handle sending messages
    socket.on("sendMessage", (data) => {
      const { receiverId, message } = data;
      io.to(receiverId).emit("receiveMessage", message);
    });

    // Handle disconnection
    socket.on("disconnect", () => {
      console.log("A user disconnected:", socket.id);
    });
  });
};

module.exports = socketHandler;
