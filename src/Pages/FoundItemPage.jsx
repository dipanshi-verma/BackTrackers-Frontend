// src/Pages/FoundItemPage.jsx

import React, { useState } from "react";
import axios from "axios";
import { API } from "../api";
import { useNavigate } from "react-router-dom";

const FoundItemPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    locationFound: "",
    dateFound: "",
    contactInfo: "",
  });

  const [images, setImages] = useState([]);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);

  // handle text input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  // handle image file selection
  const handleFileChange = (e) => {
    setImages(e.target.files);
  };

  // form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });
    setLoading(true);

    const payload = new FormData();
    payload.append("title", formData.title);
    payload.append("description", formData.description);
    payload.append("locationFound", formData.locationFound);
    payload.append("dateFound", formData.dateFound);
    payload.append("contactInfo", formData.contactInfo);

    // add images to FormData
    for (let i = 0; i < images.length; i++) {
      payload.append("images", images[i]);
    }

    try {
      await axios.post(`${API}/api/found-items`, payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage({
        type: "success",
        text: "Found item reported successfully! Redirecting...",
      });

      setTimeout(() => navigate("/list-items"), 1500);
    } catch (error) {
      console.error("Error reporting found item:", error);
      setMessage({
        type: "error",
        text:
          error.response?.data?.message ||
          "Failed to submit. Make sure backend is running.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-green-100 p-4 sm:p-6 lg:p-8">
      <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-12 md:p-14 w-full max-w-2xl border border-gray-200">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-green-700 text-center mb-8">
          Report Found Item
        </h1>

        {message.text && (
          <div
            className={`p-4 mb-6 rounded-xl text-center ${
              message.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="w-full space-y-6">
          {/* Title */}
          <div>
            <label className="block text-gray-800 font-semibold mb-2">
              Item Title
            </label>
            <input
              type="text"
              name="title"
              placeholder="Example: Laptop Charger, Wallet, ID Card"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-4 py-3 shadow-sm focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-800 font-semibold mb-2">
              Description
            </label>
            <textarea
              name="description"
              rows="5"
              placeholder="Describe the item (color, brand, unique marks)..."
              value={formData.description}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3 shadow-sm focus:ring-2 focus:ring-green-500"
            ></textarea>
          </div>

          {/* Location Found */}
          <div>
            <label className="block text-gray-800 font-semibold mb-2">
              Location Found
            </label>
            <input
              type="text"
              name="locationFound"
              placeholder="Example: Library, Canteen, Parking Lot"
              value={formData.locationFound}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3 shadow-sm focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Date Found */}
          <div>
            <label className="block text-gray-800 font-semibold mb-2">
              Date Found
            </label>
            <input
              type="date"
              name="dateFound"
              value={formData.dateFound}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-4 py-3 shadow-sm focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Contact Info */}
          <div>
            <label className="block text-gray-800 font-semibold mb-2">
              Your Contact Information
            </label>
            <input
              type="text"
              name="contactInfo"
              placeholder="Email or phone number"
              value={formData.contactInfo}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-4 py-3 shadow-sm focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-gray-800 font-semibold mb-2">
              Upload Images
            </label>
            <input
              type="file"
              name="images"
              multiple
              accept="image/png,image/jpg,image/jpeg"
              onChange={handleFileChange}
              className="w-full text-gray-700"
            />
            <p className="text-sm text-gray-500 mt-1">
              Upload multiple images. JPG, PNG supported.
            </p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 rounded-full font-bold shadow-lg hover:bg-green-700 transition-all duration-300 disabled:bg-gray-400"
          >
            {loading ? "Submitting..." : "Submit Found Item"}
          </button>
        </form>

        <button
          onClick={() => navigate("/")}
          className="mt-6 text-green-600 hover:text-green-800 underline text-center block"
        >
          ← Back to Home
        </button>
      </div>
    </div>
  );
};

export default FoundItemPage;
