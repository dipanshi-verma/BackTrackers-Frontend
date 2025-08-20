import React from 'react';
import { Link } from 'react-router-dom'; // Import Link to navigate back to Home

const ReportLostItemPage = () => {
  return (
    // Main container
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-4 sm:p-6 lg:p-8">
      {/* Centralized content area within the page */}
      <div className="flex flex-col items-center justify-center w-full max-w-4xl">
        {/* The main container box for the form */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-10 md:p-12 lg:p-16 w-full max-w-2xl flex flex-col items-center
                    transform transition-transform duration-300 ease-in-out hover:scale-[1.01] border border-gray-200">

          {/* Page title */}
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-8 text-center">
            Report Lost Item
          </h1>

          {/* The form for reporting a lost item */}
          <form className="w-full max-w-lg">
            {/* Item Name input field */}
            <div className="mb-6">
              <label className="block text-gray-800 text-base font-semibold mb-2" htmlFor="itemName">
                Item Name
              </label>
              <input
                type="text"
                id="itemName"
                placeholder="e.g., Apple AirPods, Blue Water Bottle"
                className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-800 leading-tight
                           focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            {/* Description textarea */}
            <div className="mb-6">
              <label className="block text-gray-800 text-base font-semibold mb-2" htmlFor="description">
                Description
              </label>
              <textarea
                id="description"
                placeholder="Provide a detailed description of the item, including color, brand, unique features, where you lost, etc."
                rows="5" 
                className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-800 leading-tight
                           focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-y transition-all duration-200"
              ></textarea>
            </div>

            {/* Image Upload input */}
            <div className="mb-8">
              <label className="block text-gray-800 text-base font-semibold mb-2" htmlFor="images">
                Upload Images (Optional)
              </label>
              <input
                type="file"
                id="images"
                multiple
                className="block w-full text-gray-800 text-sm
                           file:mr-4 file:py-2 file:px-4
                           file:rounded-full file:border-0
                           file:text-sm file:font-semibold
                           file:bg-indigo-50 file:text-indigo-700
                           hover:file:bg-indigo-100 transition-all duration-200
                           cursor-pointer"
              />
              <p className="mt-2 text-sm text-gray-500">Max file size: 5MB per image. PNG, JPG, JPEG allowed.</p>
            </div>

            {/* Submit Button */}
            <button>
                <Link to = "/list-items"
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-full
                         focus:outline-none focus:shadow-outline shadow-md shadow-indigo-500/50
                         transform transition-all duration-300 ease-in-out hover:scale-105"
            >
              Submit Report
              </Link>
            </button>
          </form>

          {/* Back to Home Link */}
          <div className="mt-8 text-center">
            <Link
              to="/" 
              className="text-indigo-600 hover:text-indigo-800 text-base font-medium transition-colors duration-200"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportLostItemPage;
