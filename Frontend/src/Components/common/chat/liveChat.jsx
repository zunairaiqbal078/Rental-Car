import React, { useState, useEffect } from "react";

const ChatPage = () => {
  const [messages, setMessages] = useState([
    { sender: "admin", text: "Hello! How can I help you today?" },
    { sender: "me", text: "I need some information about my booking." },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "me", text: newMessage },
      ]);
      setNewMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="flex items-center justify-center p-4 mt-4">
      <div className="w-full max-w-2xl overflow-hidden bg-white shadow-lg rounded-xl">
        {/* Chat Header */}
        <div className="p-4 bg-gradient-to-r from-cyan-900 to-blue-900 ">
          <div className="flex items-center">
            <div className="flex items-center justify-center w-10 h-10 bg-white rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h1 className="text-xl font-bold text-white">Chat with Admin</h1>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="ml-2 text-sm text-white opacity-90">
                  Online
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="h-[400px] overflow-y-auto p-4 bg-gray-50">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.sender === "me" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs p-3 rounded-xl shadow-sm ${
                    message.sender === "me"
                      ? "bg-cyan-900 text-white rounded-br-none"
                      : "bg-white text-gray-800 rounded-bl-none"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-white border-t">
          <div className="flex items-center border rounded-lg bg-gray-50">
            <input
              type="text"
              placeholder="Type your message..."
              className="flex-1 px-4 py-3 bg-transparent focus:outline-none"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button
              onClick={handleSendMessage}
              className="px-6 py-3 text-white transition-colors bg-yellow-300 rounded-r-lg hover:bg-yellow-400"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
