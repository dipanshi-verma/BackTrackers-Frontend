// src/api.js

export const API = "http://localhost:5000";  // Change here for production

export const endpoints = {
  register: `${API}/api/auth/register`,
  login: `${API}/api/auth/login`,
  lostItems: `${API}/api/lost-items`,
  foundItems: `${API}/api/found-items`,
};
