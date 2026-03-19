// src/Pages/ProtectedRoute.jsx
// Wrap any route that requires login.
// Usage in App.jsx:  <Route path="/report-lost" element={<ProtectedRoute><ReportLostItemPage /></ProtectedRoute>} />

import React from "react";
import { Navigate, useLocation } from "react-router-dom";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  const location = useLocation();

  if (!token) {
    // Redirect to /register, but remember where the user wanted to go
    return <Navigate to="/register" state={{ from: location }} replace />;
  }

  return children;
}

export default ProtectedRoute;
