import React from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { scroller } from "react-scroll";

function Footer() {
  const navigate = useNavigate();

  const handleScrollToSection = (section) => {
    navigate("/"); // Go to home page first
    setTimeout(() => {
      scroller.scrollTo(section, {
        smooth: true,
        duration: 500,
        offset: -70,
      });
    }, 150);
  };

  return (
    <footer className="bg-indigo-800 text-white py-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
        
        {/* Section 1 */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Lost&Found</h3>
          <p className="text-indigo-200">
            A trusted platform for our campus community to report, find, and recover belongings.
          </p>
        </div>

        {/* Section 2 */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-indigo-200">

            <li>
              <RouterLink to="/">Home</RouterLink>
            </li>

            <li>
              <button
                onClick={() => handleScrollToSection("about")}
                className="cursor-pointer hover:text-white transition-colors"
              >
                About
              </button>
            </li>

            <li>
              <RouterLink to="/list-items">
                List Items
              </RouterLink>
            </li>

            <li>
              <RouterLink to="/found">
                Report Found Items
              </RouterLink>
            </li>

          </ul>
        </div>

        {/* Section 3 */}
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
