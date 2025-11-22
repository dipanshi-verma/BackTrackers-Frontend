// src/Pages/ReportLostItemPage.jsx

import React, { useState } from "react";
import axios from "axios";
import { API } from "../api";
import { useNavigate } from "react-router-dom";

function ReportLostItemPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    dateLost: "",
    contactInfo: "",
  });

  const [images, setImages] = useState([]);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleImages = (e) => {
    setImages(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = new FormData();
    payload.append("title", formData.title);
    payload.append("description", formData.description);
    payload.append("location", formData.location);
    payload.append("dateLost", formData.dateLost);
    payload.append("contactInfo", formData.contactInfo);

    for (let img of images) payload.append("images", img);

    try {
      await axios.post(`${API}/api/lost-items`, payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage({ type: "success", text: "Lost item reported!" });

      setTimeout(() => navigate("/list-items"), 1500);
    } catch (err) {
      console.log(err);
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Failed to report item.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-indigo-50 flex justify-center items-center p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-xl">
        <h1 className="text-3xl font-bold text-indigo-700 text-center mb-6">
          Report Lost Item
        </h1>

        {message.text && (
          <div
            className={`p-3 mb-4 rounded ${
              message.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="title"
            placeholder="Title"
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded"
          />
          <textarea
            name="description"
            placeholder="Description"
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          />

          <input
            name="location"
            placeholder="Location"
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          />

          <input
            type="date"
            name="dateLost"
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded"
          />

          <input
            name="contactInfo"
            placeholder="Contact Information"
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded"
          />

          <input
            type="file"
            multiple
            onChange={handleImages}
            className="w-full"
          />

          <button className="w-full bg-indigo-600 text-white py-3 rounded-lg">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default ReportLostItemPage;
