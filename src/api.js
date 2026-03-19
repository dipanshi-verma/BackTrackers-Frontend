// src/api.js
export const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const endpoints = {
  register:   `${API}/api/auth/register`,
  login:      `${API}/api/auth/login`,
  adminLogin: `${API}/api/auth/admin-login`,   
  me:         `${API}/api/auth/me`,
};
