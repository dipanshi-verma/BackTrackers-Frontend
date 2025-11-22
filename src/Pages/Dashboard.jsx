// src/Pages/Dashboard.jsx

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const u = localStorage.getItem("user");
    if (!u) return navigate("/register");
    setUser(JSON.parse(u));
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/register");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-indigo-50 flex flex-col items-center justify-center p-8">
      <div className="bg-white shadow-xl rounded-3xl p-10 max-w-lg w-full text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Welcome, {user.username} 👋
        </h1>

        <p className="text-gray-600 mb-8">
          What would you like to do today?
        </p>

        <div className="flex flex-col gap-4">
          <Link
            to="/report-lost"
            className="bg-indigo-600 text-white py-3 rounded-lg text-lg font-semibold"
          >
            Report Lost Item
          </Link>

          <Link
            to="/report-found"
            className="bg-green-600 text-white py-3 rounded-lg text-lg font-semibold"
          >
            Report Found Item
          </Link>

          <Link
            to="/list-items"
            className="bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold"
          >
            View All Items
          </Link>

          <button
            onClick={logout}
            className="bg-red-500 text-white py-3 rounded-lg text-lg font-semibold"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
