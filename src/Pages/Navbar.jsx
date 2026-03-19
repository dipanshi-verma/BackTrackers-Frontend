// src/Pages/Navbar.jsx
import React, { useState, useEffect } from "react";
import { Menu, X, LayoutDashboard, ShieldCheck, LogOut, LogIn } from "lucide-react";
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Re-read user from localStorage whenever the route changes
  // (covers login → redirect → navbar update)
  useEffect(() => {
    const raw = localStorage.getItem("user");
    try { setUser(raw ? JSON.parse(raw) : null); } catch { setUser(null); }
  }, [location.pathname]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setIsOpen(false);
    navigate("/");
  };

  const handleScrollTo = (id) => {
    setIsOpen(false);
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }), 150);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const linkClass = ({ isActive }) =>
    `relative text-sm font-medium transition-colors duration-200 ${
      isActive ? "text-indigo-600" : "text-gray-600 hover:text-indigo-600"
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm border-b border-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link to="/" className="text-indigo-600 font-extrabold text-xl tracking-tight">
            Lost<span className="text-gray-800">&</span>Found
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            <NavLink to="/" end className={linkClass}>Home</NavLink>
            <NavLink to="/list-items" className={linkClass}>Browse Items</NavLink>
            <button onClick={() => handleScrollTo("about")}
              className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors">
              About
            </button>
            <button onClick={() => handleScrollTo("contact")}
              className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors">
              Contact
            </button>

            {user ? (
              <>
                {/* Chat — logged in only */}
                <NavLink to="/chat"
                  className="bg-orange-500 text-white text-sm font-semibold px-4 py-1.5 rounded-full hover:bg-orange-600 transition-colors">
                  Chat Room
                </NavLink>

                {/* Admin badge */}
                {user.role === "admin" && (
                  <NavLink to="/admin"
                    className="flex items-center gap-1.5 bg-purple-600 text-white text-sm font-semibold px-4 py-1.5 rounded-full hover:bg-purple-700 transition-colors">
                    <ShieldCheck size={15} /> Admin
                  </NavLink>
                )}

                {/* Dashboard */}
                <NavLink to="/dashboard"
                  className="flex items-center gap-1.5 bg-indigo-600 text-white text-sm font-semibold px-4 py-1.5 rounded-full hover:bg-indigo-700 transition-colors">
                  <LayoutDashboard size={15} /> {user.username}
                </NavLink>

                <button onClick={logout}
                  className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-red-500 transition-colors">
                  <LogOut size={15} /> Logout
                </button>
              </>
            ) : (
              <NavLink to="/register"
                className="flex items-center gap-1.5 bg-indigo-600 text-white text-sm font-semibold px-5 py-2 rounded-full hover:bg-indigo-700 transition-colors">
                <LogIn size={15} /> Login / Register
              </NavLink>
            )}
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-gray-700 hover:text-indigo-600">
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-indigo-50 shadow-lg">
          <div className="flex flex-col px-4 py-4 space-y-3">
            <NavLink to="/" end className={linkClass} onClick={() => setIsOpen(false)}>Home</NavLink>
            <NavLink to="/list-items" className={linkClass} onClick={() => setIsOpen(false)}>Browse Items</NavLink>
            <button onClick={() => handleScrollTo("about")} className="text-left text-sm text-gray-600 hover:text-indigo-600">About</button>
            <button onClick={() => handleScrollTo("contact")} className="text-left text-sm text-gray-600 hover:text-indigo-600">Contact</button>

            {user ? (
              <>
                <NavLink to="/chat" className="text-sm font-semibold text-orange-600" onClick={() => setIsOpen(false)}>Chat Room</NavLink>
                {user.role === "admin" && (
                  <NavLink to="/admin" className="text-sm font-semibold text-purple-700 flex items-center gap-1" onClick={() => setIsOpen(false)}>
                    <ShieldCheck size={14} /> Admin Panel
                  </NavLink>
                )}
                <NavLink to="/dashboard" className="text-sm font-semibold text-indigo-700 flex items-center gap-1" onClick={() => setIsOpen(false)}>
                  <LayoutDashboard size={14} /> Dashboard ({user.username})
                </NavLink>
                <button onClick={logout} className="text-left text-sm text-red-500 flex items-center gap-1">
                  <LogOut size={14} /> Logout
                </button>
              </>
            ) : (
              <NavLink to="/register" className="text-sm font-semibold text-indigo-600 flex items-center gap-1" onClick={() => setIsOpen(false)}>
                <LogIn size={14} /> Login / Register
              </NavLink>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
