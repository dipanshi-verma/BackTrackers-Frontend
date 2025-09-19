import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ReportLostItemPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        location: '',
        contactInfo: '',
    });
    const [images, setImages] = useState([]);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleFileChange = (e) => {
        setImages(e.target.files);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage({ type: '', text: '' });
        setLoading(true);

        const formPayload = new FormData();
        formPayload.append('name', formData.name);
        formPayload.append('description', formData.description);
        formPayload.append('location', formData.location);
        formPayload.append('contactInfo', formData.contactInfo);

        for (let i = 0; i < images.length; i++) {
            formPayload.append('images', images[i]);
        }

        const DUMMY_USER_ID = "60c72b2f9c87f10015b6d7a1"; 

        try {
            await axios.post('https://backtrackers-backend-ubyo.onrender.com/api/lost-items', formPayload, {
                headers: {
                    'x-user-id': DUMMY_USER_ID,
                    'Content-Type': 'multipart/form-data',
                }
            });

            setMessage({ type: 'success', text: 'Lost item reported successfully! Redirecting...' });
            setTimeout(() => { navigate('/list-items'); }, 2000);
        } catch (error) {
            console.error("Error reporting lost item:", error);
            if (error.response) {
                setMessage({ type: 'error', text: error.response.data.message || 'An error occurred. Please try again.' });
            } else if (error.request) {
                setMessage({ type: 'error', text: 'No response from server. Check if the backend is running.' });
            } else {
                setMessage({ type: 'error', text: 'Error: ' + error.message });
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-4 sm:p-6 lg:p-8">
            <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-10 md:p-12 lg:p-16 w-full max-w-2xl flex flex-col items-center transform transition-transform duration-300 ease-in-out hover:scale-[1.01] border border-gray-200">
                <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-8 text-center">Report Lost Item</h1>
                {message.text && (
                    <div className={`p-4 rounded-xl mb-6 text-center ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {message.text}
                    </div>
                )}
                <form onSubmit={handleSubmit} className="w-full max-w-lg">
                    {/* Item Name */}
                    <div className="mb-6">
                        <label className="block text-gray-800 text-base font-semibold mb-2" htmlFor="name">Item Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="e.g., wallet, phone, keys"
                            className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                            required
                        />
                    </div>

                    {/* Description */}
                    <div className="mb-6">
                        <label className="block text-gray-800 text-base font-semibold mb-2" htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Provide a detailed description of the item."
                            rows="5" 
                            className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-y transition-all duration-200"
                        ></textarea>
                    </div>

                    {/* Location */}
                    <div className="mb-6">
                        <label className="block text-gray-800 text-base font-semibold mb-2" htmlFor="location">Location Lost</label>
                        <input
                            type="text"
                            id="location"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            placeholder="e.g., Library, Campus Green, Cafeteria"
                            className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                            required
                        />
                    </div>

                    {/* Contact Info */}
                    <div className="mb-6">
                        <label className="block text-gray-800 text-base font-semibold mb-2" htmlFor="contactInfo">Your Contact Info</label>
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
                    
                    {/* Image Upload Input */}
                    <div className="mb-8">
                        <label className="block text-gray-800 text-base font-semibold mb-2" htmlFor="images">
                            Upload Images (Max 5, 10MB each)
                        </label>
                        <input
                            type="file"
                            id="images"
                            name="images"
                            multiple
                            accept="image/png, image/jpeg, image/jpg"
                            onChange={handleFileChange}
                            className="block w-full text-gray-800 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-all duration-200 cursor-pointer"
                        />
                    </div>

                    <button type="submit" disabled={loading} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-full focus:outline-none focus:shadow-outline shadow-md shadow-indigo-500/50 transform transition-all duration-300 ease-in-out hover:scale-105 disabled:bg-gray-400 disabled:shadow-none disabled:cursor-not-allowed">
                        {loading ? 'Submitting...' : 'Submit Report'}
                    </button>
                </form>
                <div className="mt-8 text-center">
                    <Link to="/" className="text-indigo-600 hover:text-indigo-800 text-base font-medium transition-colors duration-200">
                        ← Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );

};

export default ReportLostItemPage;
