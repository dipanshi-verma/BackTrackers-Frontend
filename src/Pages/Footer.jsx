import React from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { scroller } from "react-scroll";

function Footer() {
  const navigate = useNavigate();

  const handleScrollToSection = (section) => {
    navigate("/"); // Navigate to the home page first
    setTimeout(() => {
      // Use scroller to scroll to the section with a slight delay
      scroller.scrollTo(section, {
        smooth: true,
        duration: 500,
        offset: -70, // Adjust offset for your fixed header
      });
    }, 100); // A small delay is crucial to allow the page to load
  };

  return (
    <footer className="bg-indigo-800 text-white py-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
        <div>
          <h3 className="text-xl font-semibold mb-4">Lost&Found</h3>
          <p className="text-indigo-200">
            A trusted platform for our campus community to report, find, and recover lost belongings with ease.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-indigo-200">
            <li><RouterLink to="/">Home</RouterLink></li>
            {/* Click handler for "About" */}
            <li>
              <button
                onClick={() => handleScrollToSection("about")}
                className="cursor-pointer hover:text-white transition-colors"
              >
                About
              </button>
            </li>
            <li><RouterLink to="/list-items">List Items</RouterLink></li>
            {/* Click handler for "Contact" */}
          </ul>
        </div>
        <div>
          <h3 id="contact" className="text-xl font-semibold mb-4">Contact</h3>
          <p className="text-indigo-200">📍 Parul University, Vadodara</p>
          <p className="text-indigo-200">✉️ support@lostfound.com</p>
          <p className="text-indigo-200">📞 +91 998109 4545</p>
        </div>
      </div>
      <div className="text-center mt-8 text-indigo-300">
        © 2025 Lost&Found. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;