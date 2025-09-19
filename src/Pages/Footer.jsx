import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    // Footer (same bg as last section for seamless look)
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
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/list-items">List Items</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
          </ul>
        </div>
        <div>
          <h3  id = 'contact' className="text-xl font-semibold mb-4">Contact</h3>
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