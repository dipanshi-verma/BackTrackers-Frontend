import React, { useState, useRef } from "react";
import { Paperclip, Send, MapPin, Image, Video, Mic } from "lucide-react";

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
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, message]);
    setNewMessage("");
  };

  // Handle file upload for all media types
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
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, message]);
  };

  // Handle a user-selected location (simulated)
  const handleUserLocationShare = () => {
    const isConfirmed = window.confirm("Do you want to share a specific location? This action would normally open a map for you to select a point.");

    if (isConfirmed) {
      // In a real app, you would open a map component here
      const latitude = "40.7128";
      const longitude = "-74.0060";
      const message = {
        id: Date.now(),
        type: "location",
        content: `https://www.google.com/maps/place/${latitude},${longitude}`,
        sender: "You",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, message]);
    }
  };

  // Handle sharing current location
  const handleCurrentLocationShare = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      const message = {
        id: Date.now(),
        type: "location",
        content: `https://www.google.com/maps/place/${latitude},${longitude}`,
        sender: "You",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, message]);
    }, () => {
      alert("Unable to retrieve your current location.");
    });
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 text-gray-800 font-sans">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 shadow-md flex items-center justify-center relative">
        <h1 className="text-xl font-bold">Chat Room</h1>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === "You" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`flex flex-col max-w-sm rounded-xl p-3 shadow-md ${
                msg.sender === "You"
                  ? "bg-blue-500 text-white rounded-br-none"
                  : "bg-gray-200 text-gray-800 rounded-bl-none"
              }`}
            >
              <div className="text-xs text-gray-400 font-semibold mb-1">
                {msg.sender}
              </div>
              <div className="flex flex-col gap-1">
                {msg.type === "text" && <p className="text-sm">{msg.content}</p>}
                {msg.type === "image" && (
                  <img src={msg.content} alt="uploaded" className="rounded-lg max-w-xs" />
                )}
                {msg.type === "video" && (
                  <video src={msg.content} controls className="rounded-lg max-w-xs" />
                )}
                {msg.type === "audio" && <audio src={msg.content} controls className="w-full" />}
                {msg.type === "file" && (
                  <a
                    href={msg.content}
                    download={msg.fileName}
                    className="flex items-center gap-2 text-white bg-blue-600 p-2 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    <Paperclip size={16} />
                    <span className="truncate">{msg.fileName}</span>
                  </a>
                )}
                {msg.type === "location" && (
                  <a
                    href={msg.content}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-white bg-green-500 p-2 rounded-md hover:bg-green-600 transition-colors"
                  >
                    <MapPin size={16} />
                    <span>View Location on Map</span>
                  </a>
                )}
              </div>
              <div className={`text-xs mt-1 ${msg.sender === "You" ? "text-blue-200" : "text-gray-500"}`}>
                {msg.timestamp}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-gray-200 flex items-center gap-2 shadow-inner">
        {/* Attachment and Location Buttons */}
        <div className="relative flex items-center gap-1">
          <button
            onClick={() => fileInputRef.current.click()}
            className="p-2 text-gray-500 hover:text-blue-600 transition-colors"
            title="Attach a file"
          >
            <Paperclip className="w-5 h-5" />
          </button>
          
          <div className="relative group">
            <button
              className="p-2 text-gray-500 hover:text-blue-600 transition-colors"
              title="Share Location"
            >
              <MapPin className="w-5 h-5" />
            </button>
            <div className="absolute bottom-12 left-0 w-max bg-white shadow-lg rounded-md p-2 hidden group-hover:block z-10 border border-gray-200">
              <button
                onClick={handleCurrentLocationShare}
                className="w-full text-left p-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
              >
                Share Current Location
              </button>
              <button
                onClick={handleUserLocationShare}
                className="w-full text-left p-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
              >
                Share a Different Location
              </button>
            </div>
          </div>
        </div>
        
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          className="hidden"
          multiple
        />

        {/* Text Input */}
        <input
          type="text"
          className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />

        {/* Send Button */}
        <button
          onClick={handleSend}
          className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-colors"
          title="Send"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

export default ChatRoom;