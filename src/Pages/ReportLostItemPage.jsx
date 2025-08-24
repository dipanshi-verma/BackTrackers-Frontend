import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Upload, Image as ImageIcon, ArrowLeft } from "lucide-react";

const ReportLostItemPage = () => {
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setImages(previews);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!itemName.trim() || !description.trim()) {
      setError("Please fill out all required fields.");
      return;
    }
    setError("");
    // Here you would send data to backend
    navigate("/list-items");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-2xl border border-gray-200"
      >
        {/* Page Title */}
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-8 text-center">
          Report Lost Item
        </h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Item Name */}
          <div>
            <label className="block text-gray-800 font-semibold mb-2" htmlFor="itemName">
              Item Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="itemName"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              placeholder="e.g., Apple AirPods, Blue Water Bottle"
              className="w-full border border-gray-300 rounded-lg py-3 px-4 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-800 font-semibold mb-2" htmlFor="description">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide details: color, brand, unique features, where lost..."
              rows="5"
              className="w-full border border-gray-300 rounded-lg py-3 px-4 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-y"
            ></textarea>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-gray-800 font-semibold mb-2">Upload Images</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition">
              <Upload className="w-10 h-10 text-indigo-500 mb-2" />
              <p className="text-gray-500 text-sm">Drag & drop or click to upload</p>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="images"
              />
            </div>
            {images.length > 0 && (
              <div className="mt-4 grid grid-cols-3 gap-3">
                {images.map((src, index) => (
                  <div key={index} className="relative">
                    <img
                      src={src}
                      alt="Preview"
                      className="rounded-lg shadow-md object-cover w-full h-24"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

          {/* Submit */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-3 px-4 rounded-full shadow-md"
          >
            Submit Report
          </motion.button>
        </form>

        {/* Back to Home */}
        <div className="mt-8 text-center">
          <Link
            to="/"
            className="flex items-center justify-center text-indigo-600 hover:text-indigo-800 font-medium"
          >
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default ReportLostItemPage;