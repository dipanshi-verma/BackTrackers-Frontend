// src/Pages/AdminRoute.jsx
// Wrap any route that requires admin role.
// Usage in App.jsx:  <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />

import React from "react";
import { Navigate } from "react-router-dom";

function AdminRoute({ children }) {
  const token = localStorage.getItem("token");
  const raw = localStorage.getItem("user");

  if (!token || !raw) return <Navigate to="/register" replace />;

  try {
    const user = JSON.parse(raw);
    if (user.role !== "admin") return <Navigate to="/dashboard" replace />;
  } catch {
    return <Navigate to="/register" replace />;
  }

  return children;
}

export default AdminRoute;
