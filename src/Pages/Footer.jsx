import React from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { scroller } from "react-scroll";
import { ShieldCheck } from "lucide-react";

function Footer() {
  const navigate = useNavigate();

  const handleScrollToSection = (section) => {
    navigate("/");
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
            <li><RouterLink to="/" className="hover:text-white transition-colors">Home</RouterLink></li>
            <li>
              <button onClick={() => handleScrollToSection("about")}
                className="cursor-pointer hover:text-white transition-colors">
                About
              </button>
            </li>
            <li><RouterLink to="/list-items" className="hover:text-white transition-colors">List Items</RouterLink></li>
            <li><RouterLink to="/report-found" className="hover:text-white transition-colors">Report Found Items</RouterLink></li>
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

      {/* Bottom bar */}
      <div className="max-w-6xl mx-auto px-6 mt-8 flex items-center justify-between">
        <p className="text-indigo-300 text-sm">© 2025 Lost&Found. All rights reserved.</p>

        {/* Subtle admin link — small, quiet, not obvious to regular users */}
        <RouterLink
          to="/admin-login"
          className="flex items-center gap-1.5 text-indigo-500 hover:text-indigo-300 transition-colors text-xs opacity-50 hover:opacity-100"
        >
          <ShieldCheck size={13} />
          Admin
        </RouterLink>
      </div>
    </footer>
  );
}

export default Footer;