import React, { useState, useRef } from "react";
import { Paperclip, Send, Image, Video, Mic, MapPin } from "lucide-react";

function ChatRoom() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const fileInputRef = useRef(null);

  // Handle text send
  const handleSend = () => {
    if (!newMessage.trim()) return;

    const message = {
      id: Date.now(),
      type: "text",
      content: newMessage,
      sender: "You",
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, message]);
    setNewMessage("");
  };

  // Handle file upload (images, videos, audio, docs)
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const type = file.type.startsWith("image")
      ? "image"
      : file.type.startsWith("video")
      ? "video"
      : file.type.startsWith("audio")
      ? "audio"
      : "file";

    const url = URL.createObjectURL(file);

    const message = {
      id: Date.now(),
      type,
      content: url,
      fileName: file.name,
      sender: "You",
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, message]);
  };

  // Handle location share
  const handleLocationShare = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported in your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      const message = {
        id: Date.now(),
        type: "location",
        content: `https://www.google.com/maps?q=${latitude},${longitude}`,
        sender: "You",
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, message]);
    });
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 text-lg font-semibold">
        Chat Room
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg) => (
          <div key={msg.id} className="flex flex-col">
            <div className="text-sm text-gray-500">{msg.sender}</div>
            <div className="p-2 rounded-lg bg-white shadow max-w-md">
              {msg.type === "text" && <p>{msg.content}</p>}
              {msg.type === "image" && (
                <img src={msg.content} alt="uploaded" className="rounded-lg" />
              )}
              {msg.type === "video" && (
                <video src={msg.content} controls className="rounded-lg" />
              )}
              {msg.type === "audio" && <audio src={msg.content} controls />}
              {msg.type === "file" && (
                <a
                  href={msg.content}
                  download={msg.fileName}
                  className="text-blue-600 underline"
                >
                  {msg.fileName}
                </a>
              )}
              {msg.type === "location" && (
                <a
                  href={msg.content}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  📍 Shared Location
                </a>
              )}
            </div>
            <div className="text-xs text-gray-400">{msg.timestamp}</div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="p-3 bg-white border-t flex items-center gap-2">
        <button
          onClick={() => fileInputRef.current.click()}
          className="p-2 rounded-full hover:bg-gray-200"
        >
          <Paperclip className="w-5 h-5" />
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          className="hidden"
        />

        <button
          onClick={handleLocationShare}
          className="p-2 rounded-full hover:bg-gray-200"
        >
          <MapPin className="w-5 h-5" />
        </button>

        <input
          type="text"
          className="flex-1 border rounded-full px-4 py-2"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 text-white p-2 rounded-full"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

export default ChatRoom;