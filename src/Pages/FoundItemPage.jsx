import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const FoundItemPage = () => {
  // useNavigate hook to programmatically navigate after successful submission
  const navigate = useNavigate();

  // State for form data
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    locationFound: '', // Use 'locationFound' to match the backend schema
    contactInfo: '',
  });

  // State for images
  const [images, setImages] = useState([]);

  // State for feedback messages
  const [message, setMessage] = useState({ type: '', text: '' });

  // State for loading indicator
  const [loading, setLoading] = useState(false);

  // Handle input changes for text fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle file changes for the images input
  const handleFileChange = (e) => {
    setImages(e.target.files);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setMessage({ type: '', text: '' }); // Clear previous messages
    setLoading(true);

    const DUMMY_USER_ID = '60c72b2f9c87f10015b6d7a1';

    // Use FormData to handle both text and file data
    const formPayload = new FormData();
    formPayload.append('name', formData.name);
    formPayload.append('description', formData.description);
    formPayload.append('locationFound', formData.locationFound);
    formPayload.append('contactInfo', formData.contactInfo);

    // Append each selected image file
    for (let i = 0; i < images.length; i++) {
      formPayload.append('images', images[i]);
    }

    try {
      // Make the POST request to the backend's found items endpoint
      await axios.post('http://localhost:5000/api/found-items', formPayload, {
        headers: {
          'x-user-id': DUMMY_USER_ID,
          'Content-Type': 'multipart/form-data',
        },
      });

      setMessage({
        type: 'success',
        text: 'Found item reported successfully! Redirecting...',
      });

      // Redirect to the list page after a short delay
      setTimeout(() => {
        navigate('/list-items');
      }, 2000);
    } catch (error) {
      console.error('Error reporting found item:', error);
      if (error.response) {
        setMessage({
          type: 'error',
          text:
            error.response.data.message || 'An error occurred. Please try again.',
        });
      } else if (error.request) {
        setMessage({
          type: 'error',
          text: 'No response from server. Check if the backend is running.',
        });
      } else {
        setMessage({ type: 'error', text: 'Error: ' + error.message });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-4 sm:p-6 lg:p-8">
      {/* Centralized content area within the page */}
      <div className="flex flex-col items-center justify-center w-full max-w-4xl">
        {/* The main container box for the form */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-10 md:p-12 lg:p-16 w-full max-w-2xl flex flex-col items-center transform transition-transform duration-300 ease-in-out hover:scale-[1.01] border border-gray-200">
          {/* Page title */}
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-8 text-center">
            Report Found Item
          </h1>

          {/* Feedback message display */}
          {message.text && (
            <div
              className={`p-4 rounded-xl mb-6 text-center ${
                message.type === 'success'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
              }`}
            >
              {message.text}
            </div>
          )}

          {/* The form for reporting a lost item */}
          <form onSubmit={handleSubmit} className="w-full max-w-lg">
            {/* Item Name input field */}
            <div className="mb-6">
              <label
                className="block text-gray-800 text-base font-semibold mb-2"
                htmlFor="name"
              >
                Item Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., Apple AirPods, Blue Water Bottle"
                className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                required
              />
            </div>

            {/* Description textarea */}
            <div className="mb-6">
              <label
                className="block text-gray-800 text-base font-semibold mb-2"
                htmlFor="description"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Provide a detailed description of the item, including color, brand, unique features, etc."
                rows="5"
                className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-y transition-all duration-200"
              ></textarea>
            </div>

            {/* Location Found input field */}
            <div className="mb-6">
              <label
                className="block text-gray-800 text-base font-semibold mb-2"
                htmlFor="locationFound"
              >
                Location Found
              </label>
              <input
                type="text"
                id="locationFound"
                name="locationFound"
                value={formData.locationFound}
                onChange={handleChange}
                placeholder="e.g., Campus Library, Cafeteria"
                className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            {/* Contact Info input field */}
            <div className="mb-6">
              <label
                className="block text-gray-800 text-base font-semibold mb-2"
                htmlFor="contactInfo"
              >
                Your Contact Info
              </label>
              <input
                type="text"
                id="contactInfo"
                name="contactInfo"
                value={formData.contactInfo}
                onChange={handleChange}
                placeholder="e.g., your_email@college.edu or phone number"
                className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                required
              />
            </div>

            {/* Image Upload input */}
            <div className="mb-8">
              <label
                className="block text-gray-800 text-base font-semibold mb-2"
                htmlFor="images"
              >
                Upload Images
              </label>
              <input
                type="file"
                id="images"
                name="images"
                multiple
                accept="image/png, image/jpeg, image/jpg"
                onChange={handleFileChange}
                className="block w-full text-gray-800 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 transition-all duration-200 cursor-pointer"
              />
              <p className="mt-2 text-sm text-gray-500">
                Max file size: 5MB per image. PNG, JPG, JPEG allowed.
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-full focus:outline-none focus:shadow-outline shadow-md shadow-indigo-500/50 transform transition-all duration-300 ease-in-out hover:scale-105 disabled:bg-gray-400 disabled:shadow-none disabled:cursor-not-allowed"
            >
              {loading ? 'Submitting...' : 'Submit Report'}
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

export default FoundItemPage;