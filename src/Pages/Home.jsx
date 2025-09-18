import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    // Main container for the entire landing page content.
    // Uses flexbox to arrange content vertically and takes at least the full viewport height.
    // A subtle background gradient provides a modern look.
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 font-sans">

      {/* Hero Section - The main introductory part */}
      <section className="flex items-center justify-center py-16 md:py-24 px-4 text-center">
        <div className="max-w-5xl w-full bg-white rounded-3xl shadow-xl p-8 md:p-12 transform transition-transform duration-300 ease-in-out hover:scale-[1.01]">
          {/* Main heading for the landing page */}
          <h1 className="font-extrabold text-gray-900 text-4xl sm:text-5xl md:text-6xl tracking-tight leading-tight mb-6">
            Introducing Our College <br className="sm:hidden"/> Lost & Found Solution
          </h1>
          {/* Sub-text providing a brief overview of the project */}
          <p className="text-gray-600 text-lg sm:text-xl leading-relaxed mb-8 max-w-2xl mx-auto">
            Helping students and faculty easily track and recover lost items on campus.
            Our platform simplifies the process of reporting lost items and finding misplaced belongings, fostering a more connected and responsible college community.
          </p>
          {/* Call to action buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button>
                  <Link to="/report-lost" // This is the key! It tells React Router where to navigate.
                    className="bg-indigo-600 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg
                  hover:bg-indigo-700 hover:shadow-xl transition-all duration-300 ease-in-out
                  focus:outline-none focus:ring-4 focus:ring-indigo-300 inline-block">
                    Report Lost Item
                  </Link>
              </button>
            <button>
              <Link to="/list-items"  // This is linking to the  Items page
              className="bg-white text-indigo-600 border border-indigo-600 px-8 py-3 rounded-full text-lg font-semibold shadow-lg
                         hover:bg-indigo-50 hover:shadow-xl transition-all duration-300 ease-in-out
                         focus:outline-none focus:ring-4 focus:ring-indigo-300">
              Item List
              </Link>
            </button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-20 px-4 bg-white text-center shadow-inner">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-10">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="flex flex-col items-center p-6 bg-indigo-50 rounded-2xl shadow-md transform transition-transform duration-300 hover:scale-105">
              <div className="bg-indigo-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mb-4">1</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Report</h3>
              <p className="text-gray-600">Lost something? Quickly report it with details and photos. Found an item? Report it here too!</p>
            </div>
            {/* Step 2 */}
            <div className="flex flex-col items-center p-6 bg-blue-50 rounded-2xl shadow-md transform transition-transform duration-300 hover:scale-105">
              <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mb-4">2</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Search & Match</h3>
              <p className="text-gray-600">Our system intelligently matches reported lost items with found items. Users can also browse.</p>
            </div>
            {/* Step 3 */}
            <div className="flex flex-col items-center p-6 bg-green-50 rounded-2xl shadow-md transform transition-transform duration-300 hover:scale-105">
              <div className="bg-green-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mb-4">3</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Reclaim</h3>
              <p className="text-gray-600">Once a match is found, verify ownership and arrange for the safe return of the item.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-16 md:py-20 px-4 text-center">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-10">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-6 bg-white rounded-2xl shadow-md text-left flex items-start space-x-4 transform transition-transform duration-300 hover:scale-105">
              {/* Icon for the feature (using a placeholder for now, replace with actual icon later) */}
              <div className="flex-shrink-0 bg-purple-100 p-3 rounded-full">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Easy Reporting</h3>
                <p className="text-gray-600">Simple forms to quickly report lost or found items with all necessary details.</p>
              </div>
            </div>
            {/* Feature 2 */}
            <div className="p-6 bg-white rounded-2xl shadow-md text-left flex items-start space-x-4 transform transition-transform duration-300 hover:scale-105">
              <div className="flex-shrink-0 bg-red-100 p-3 rounded-full">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Smart Matching</h3>
                <p className="text-gray-600">Advanced algorithms to help you find your items faster by suggesting matches.</p>
              </div>
            </div>
            {/* Feature 3 */}
            <div className="p-6 bg-white rounded-2xl shadow-md text-left flex items-start space-x-4 transform transition-transform duration-300 hover:scale-105">
              <div className="flex-shrink-0 bg-yellow-100 p-3 rounded-full">
                <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.592 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.592-1M12 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2"></path></svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Secure Verification</h3>
                <p className="text-gray-600">Robust processes to ensure items are returned to their rightful owners.</p>
              </div>
            </div>
            {/* Feature 4 */}
            <div className="p-6 bg-white rounded-2xl shadow-md text-left flex items-start space-x-4 transform transition-transform duration-300 hover:scale-105">
              <div className="flex-shrink-0 bg-green-100 p-3 rounded-full">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.747 0-3.332.477-4.5 1.253"></path></svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Campus-Wide Access</h3>
                <p className="text-gray-600">Available to all students and staff, promoting a cohesive community.</p>
              </div>
            </div>
            {/* Feature 5 */}
            <div className="p-6 bg-white rounded-2xl shadow-md text-left flex items-start space-x-4 transform transition-transform duration-300 hover:scale-105">
              <div className="flex-shrink-0 bg-teal-100 p-3 rounded-full">
                <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Notifications</h3>
                <p className="text-gray-600">Get alerts when a potential match for your lost item is found.</p>
              </div>
            </div>
            {/* Feature 6 */}
            <div className="p-6 bg-white rounded-2xl shadow-md text-left flex items-start space-x-4 transform transition-transform duration-300 hover:scale-105">
              <div className="flex-shrink-0 bg-cyan-100 p-3 rounded-full">
                <svg className="w-8 h-8 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">User-Friendly Interface</h3>
                <p className="text-gray-600">Clean, intuitive design for easy navigation and a smooth user experience.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final Call to Action Section */}
      <section className="py-16 md:py-20 px-4 bg-indigo-700 text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-indigo-100 text-lg sm:text-xl leading-relaxed mb-8">
            Join our college community in making it easier to reunite lost items with their owners.
            Whether you've lost something or found an item, our solution is here to help.
          </p>
          {/* Duplicate call to action buttons for easy access */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button>
               <Link to="/report-lost" 
                    className="bg-indigo-600 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg
                  hover:bg-indigo-700 hover:shadow-xl transition-all duration-300 ease-in-out
                  focus:outline-none focus:ring-4 focus:ring-indigo-300 inline-block">
                    Report Lost Item
                  </Link>
            </button>
            <button>
              <Link to="/found" 
              className="bg-transparent border border-white text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg
                         hover:bg-white hover:text-indigo-700 transition-all duration-300 ease-in-out
                         focus:outline-none focus:ring-4 focus:ring-indigo-300">
              Report Found Items
              </Link>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
