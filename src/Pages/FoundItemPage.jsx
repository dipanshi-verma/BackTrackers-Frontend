// src/Pages/FoundItemPage.jsx
import React, { useState } from "react";
import axios from "axios";
import { API } from "../api";
import { useNavigate } from "react-router-dom";

const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

const FoundItemPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "", description: "", locationFound: "", dateFound: "", contactInfo: "",
  });
  const [images, setImages] = useState([]);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    const payload = new FormData();
    Object.entries(formData).forEach(([k, v]) => payload.append(k, v));
    for (let i = 0; i < images.length; i++) payload.append("images", images[i]);

    const token = localStorage.getItem("token");

    try {
      await axios.post(`${API}/api/found-items`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });
      setMessage({ type: "success", text: "Found item reported! Redirecting..." });
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (error) {
      setMessage({
        type: "error",
        text: error.response?.data?.message || "Failed to submit. Make sure backend is running.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-green-100 p-4 sm:p-6">
      <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-12 w-full max-w-2xl border border-gray-100">
        <h1 className="text-4xl font-extrabold text-green-700 text-center mb-8">
          Report Found Item
        </h1>

        {message.text && (
          <div className={`p-4 mb-6 rounded-xl text-sm text-center ${
            message.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Item Title *</label>
            <input
              type="text"
              name="title"
              placeholder="e.g. Laptop Charger, Wallet, ID Card"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-green-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              rows={4}
              placeholder="Describe the item (color, brand, unique marks)..."
              value={formData.description}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-green-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Location Found</label>
            <input
              type="text"
              name="locationFound"
              placeholder="e.g. Library, Canteen, Parking Lot"
              value={formData.locationFound}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-green-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Date Found *{" "}
            </label>
            <input
              type="date"
              name="dateFound"
              value={formData.dateFound}
              onChange={handleChange}
              required
              max={today}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-green-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Your Contact Info *</label>
            <input
              type="text"
              name="contactInfo"
              placeholder="Email or phone number"
              value={formData.contactInfo}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-green-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Upload Images (optional)</label>
            <input
              type="file"
              name="images"
              multiple
              accept="image/png,image/jpg,image/jpeg"
              onChange={(e) => setImages(e.target.files)}
              className="w-full text-sm text-gray-600"
            />
            <p className="text-xs text-gray-400 mt-1">JPG, PNG supported.</p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 rounded-full font-bold hover:bg-green-700 transition-colors disabled:bg-gray-400"
          >
            {loading ? "Submitting..." : "Submit Found Item"}
          </button>
        </form>

        <button
          onClick={() => navigate("/")}
          className="mt-6 text-green-600 hover:text-green-800 underline text-sm text-center block"
        >
          ← Back to Home
        </button>
      </div>
    </div>
  );
};

export default FoundItemPage;
