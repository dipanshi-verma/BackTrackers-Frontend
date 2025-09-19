import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { NavLink, Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleScrollToSection = (id) => {
    // Check if we are already on the home page
    const isHomePage = window.location.pathname === '/' || window.location.pathname === '/home';

    if (isHomePage) {
      // If we are on the home page, just scroll
      const element = document.getElementById(id);
      if (element) {
        // Offset for fixed header
        const offset = -70; 
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition + offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
        setIsOpen(false);
      }
    } else {
      // If we are not on the home page, navigate first and then scroll
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          const offset = -70; 
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = element.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition + offset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
          setIsOpen(false);
        }
      }, 100);
    }
  };

  const navLinks = [
    { path: "/", label: "Home", isScrollLink: false },
    { path: "/register", label: "Register", isScrollLink: false },
    { path: "/list-items", label: "ListItems", isScrollLink: false },
    { path: "/", label: "About", isScrollLink: true, scrollId: "about" },
    { path: "/", label: "Contact", isScrollLink: true, scrollId: "contact" },
    { path: "/chat", label: "ChatRoom", special: true, isScrollLink: false },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-md transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 text-indigo-600 font-bold text-2xl cursor-pointer">
            <Link to="/">Lost&Found</Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map(({ path, label, special, isScrollLink, scrollId }) => (
              isScrollLink ? (
                <button
                  key={scrollId}
                  onClick={() => handleScrollToSection(scrollId)}
                  className="relative text-gray-600 hover:text-indigo-600 transition duration-300 group"
                >
                  {label}
                  <span className="absolute left-0 -bottom-1 w-0 group-hover:w-full transition-all h-[2px] bg-indigo-600"></span>
                </button>
              ) : (
                <NavLink
                  key={path}
                  to={path}
                  className={({ isActive }) =>
                    `relative transition duration-300 ${
                      special
                        ? "bg-orange-500 text-white px-4 py-2 rounded-full font-semibold hover:bg-orange-600"
                        : "text-gray-600 hover:text-indigo-600"
                    } ${isActive && !special ? "text-indigo-600 font-semibold" : ""}`
                  }
                >
                  {!special && (
                    <span className="group">
                      {label}
                      <span className="absolute left-0 -bottom-1 w-0 group-hover:w-full transition-all h-[2px] bg-indigo-600"></span>
                    </span>
                  )}
                  {special && label}
                </NavLink>
              )
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-indigo-600 focus:outline-none"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg animate-slideDown">
          <div className="flex flex-col space-y-4 p-4">
            {navLinks.map(({ path, label, special, isScrollLink, scrollId }) => (
              isScrollLink ? (
                <button
                  key={scrollId}
                  onClick={() => handleScrollToSection(scrollId)}
                  className="transition-colors duration-300 text-gray-600 hover:text-indigo-600 text-left w-full"
                >
                  {label}
                </button>
              ) : (
                <NavLink
                  key={path}
                  to={path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `transition-colors duration-300 ${
                      special
                        ? "bg-orange-500 text-white px-4 py-2 rounded-full font-semibold hover:bg-orange-600 text-center"
                        : "text-gray-600 hover:text-indigo-600"
                    } ${isActive && !special ? "text-indigo-600 font-semibold" : ""}`
                  }
                >
                  {label}
                </NavLink>
              )
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
