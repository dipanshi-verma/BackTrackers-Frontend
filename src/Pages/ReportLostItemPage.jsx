// src/Pages/ReportLostItemPage.jsx
import React, { useState } from "react";
import axios from "axios";
import { API } from "../api";
import { useNavigate } from "react-router-dom";

const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

function ReportLostItemPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "", description: "", location: "", dateLost: "", contactInfo: "",
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

    const payload = new FormData();
    Object.entries(formData).forEach(([k, v]) => payload.append(k, v));
    for (let img of images) payload.append("images", img);

    const token = localStorage.getItem("token");

    try {
      await axios.post(`${API}/api/lost-items`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });
      setMessage({ type: "success", text: "Lost item reported! Redirecting..." });
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (err) {
      setMessage({ type: "error", text: err.response?.data?.message || "Failed to report item." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-indigo-50 flex justify-center items-center p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-xl">
        <h1 className="text-3xl font-bold text-indigo-700 text-center mb-6">
          Report Lost Item
        </h1>

        {message.text && (
          <div className={`p-3 mb-4 rounded-lg text-sm ${
            message.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs text-gray-500 mb-1 font-medium">Title *</label>
            <input
              name="title"
              placeholder="e.g. Blue Wallet, iPhone 13, Student ID"
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-500 mb-1 font-medium">Description</label>
            <textarea
              name="description"
              placeholder="Describe the item — color, brand, any unique marks..."
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-500 mb-1 font-medium">Location</label>
            <input
              name="location"
              placeholder="e.g. Library, Canteen, Block B"
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-500 mb-1 font-medium">
              Date Lost *{" "}
            </label>
            <input
              type="date"
              name="dateLost"
              onChange={handleChange}
              required
              max={today}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-500 mb-1 font-medium">Contact Info *</label>
            <input
              name="contactInfo"
              placeholder="Your email or phone number"
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-500 mb-1 font-medium">Upload Images (optional)</label>
            <input
              type="file"
              multiple
              accept="image/png,image/jpg,image/jpeg"
              onChange={(e) => setImages(e.target.files)}
              className="w-full text-sm text-gray-600"
            />
          </div>

          <button
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors disabled:bg-gray-400"
          >
            {loading ? "Submitting..." : "Submit Report"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ReportLostItemPage;
