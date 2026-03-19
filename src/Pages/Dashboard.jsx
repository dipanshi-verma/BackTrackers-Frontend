// src/Pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { API } from "../api";
import {
  PlusCircle, Search, LogOut, Package, CheckCircle,
  Trash2, Clock, AlertCircle
} from "lucide-react";

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [myLost, setMyLost] = useState([]);
  const [myFound, setMyFound] = useState([]);
  const [activeTab, setActiveTab] = useState("lost");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    const raw = localStorage.getItem("user");
    if (!raw) return navigate("/register");
    const u = JSON.parse(raw);
    setUser(u);
    fetchMyItems(u);
  }, []);

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const fetchMyItems = async (u) => {
    setLoading(true);
    try {
      const [lost, found] = await Promise.all([
        axios.get(`${API}/api/lost-items`, { headers: getAuthHeaders() }),
        axios.get(`${API}/api/found-items`, { headers: getAuthHeaders() }),
      ]);

      // Filter to only show the current user's items
      const userId = u.id || u._id;
      setMyLost(
        (Array.isArray(lost.data) ? lost.data : []).filter(
          (item) => item.reportedBy?._id === userId || item.reportedBy === userId
        )
      );
      setMyFound(
        (Array.isArray(found.data) ? found.data : []).filter(
          (item) => item.foundBy?._id === userId || item.foundBy === userId
        )
      );
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, type) => {
    if (!window.confirm("Delete this item?")) return;
    try {
      await axios.delete(`${API}/api/${type}-items/${id}`, {
        headers: getAuthHeaders(),
      });
      setMessage({ type: "success", text: "Item deleted." });
      fetchMyItems(user);
    } catch (err) {
      setMessage({ type: "error", text: err.response?.data?.message || "Delete failed." });
    }
  };

  const handleMarkReturned = async (id) => {
    if (!window.confirm("Mark as returned?")) return;
    try {
      await axios.put(`${API}/api/lost-items/${id}/mark-returned`, {}, {
        headers: getAuthHeaders(),
      });
      setMessage({ type: "success", text: "Marked as returned!" });
      fetchMyItems(user);
    } catch (err) {
      setMessage({ type: "error", text: err.response?.data?.message || "Failed." });
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const statusBadge = (item, type) => {
    if (type === "lost") {
      const isReturned = item.status === "returned" || item.isReturned;
      return isReturned ? (
        <span className="inline-flex items-center gap-1 text-xs font-medium bg-green-100 text-green-700 px-2.5 py-1 rounded-full">
          <CheckCircle size={12} /> Returned
        </span>
      ) : (
        <span className="inline-flex items-center gap-1 text-xs font-medium bg-red-100 text-red-600 px-2.5 py-1 rounded-full">
          <AlertCircle size={12} /> Still Lost
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 text-xs font-medium bg-blue-100 text-blue-700 px-2.5 py-1 rounded-full">
        <Package size={12} /> Found Item
      </span>
    );
  };

  if (!user) return null;

  const items = activeTab === "lost" ? myLost : myFound;

  return (
    <div className="min-h-screen bg-indigo-50 py-10 px-4">
      <div className="max-w-3xl mx-auto">

        {/* Header card */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Hey, {user.username} 👋
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              {myLost.length} lost · {myFound.length} found reported
            </p>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-red-500 transition-colors"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
          <Link to="/report-lost"
            className="flex items-center justify-center gap-2 bg-indigo-600 text-white py-3 rounded-xl font-semibold text-sm hover:bg-indigo-700 transition-colors">
            <PlusCircle size={16} /> Report Lost
          </Link>
          <Link to="/report-found"
            className="flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-xl font-semibold text-sm hover:bg-green-700 transition-colors">
            <PlusCircle size={16} /> Report Found
          </Link>
          <Link to="/list-items"
            className="flex items-center justify-center gap-2 bg-blue-500 text-white py-3 rounded-xl col-span-2 sm:col-span-1 rounded-xl font-semibold text-sm hover:bg-blue-600 transition-colors">
            <Search size={16} /> Browse All
          </Link>
        </div>

        {/* Alert message */}
        {message.text && (
          <div className={`mb-4 p-3 rounded-lg text-sm ${
            message.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"
          }`}>
            {message.text}
          </div>
        )}

        {/* Tabs */}
        <div className="flex rounded-xl overflow-hidden border border-gray-200 bg-white mb-4 shadow-sm">
          <button
            onClick={() => setActiveTab("lost")}
            className={`w-1/2 py-2.5 text-sm font-semibold transition-colors ${
              activeTab === "lost" ? "bg-red-500 text-white" : "text-gray-500 hover:bg-gray-50"
            }`}
          >
            My Lost Items ({myLost.length})
          </button>
          <button
            onClick={() => setActiveTab("found")}
            className={`w-1/2 py-2.5 text-sm font-semibold transition-colors ${
              activeTab === "found" ? "bg-green-500 text-white" : "text-gray-500 hover:bg-gray-50"
            }`}
          >
            My Found Items ({myFound.length})
          </button>
        </div>

        {/* Items list */}
        {loading ? (
          <p className="text-center text-gray-500 py-12">Loading your items...</p>
        ) : items.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-sm">
            <Package size={40} className="mx-auto text-gray-300 mb-3" />
            <p className="text-gray-500 text-sm">
              You haven't reported any {activeTab} items yet.
            </p>
            <Link
              to={activeTab === "lost" ? "/report-lost" : "/report-found"}
              className="mt-4 inline-block text-sm text-indigo-600 font-medium hover:underline"
            >
              Report one now →
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {items.map((item) => (
              <div key={item._id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex justify-between items-start gap-4">
                <div className="flex gap-4 flex-1 min-w-0">
                  {/* Thumbnail */}
                  {item.images?.[0] ? (
                    <img src={item.images[0]} alt={item.title}
                      className="w-16 h-16 object-cover rounded-lg flex-shrink-0" />
                  ) : (
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Package size={24} className="text-gray-400" />
                    </div>
                  )}
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h3 className="font-semibold text-gray-800 truncate">{item.title}</h3>
                      {statusBadge(item, activeTab)}
                    </div>
                    <p className="text-gray-500 text-sm line-clamp-2">{item.description}</p>
                    <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                      <Clock size={11} />
                      {activeTab === "lost"
                        ? item.dateLost && new Date(item.dateLost).toLocaleDateString()
                        : item.dateFound && new Date(item.dateFound).toLocaleDateString()}
                      {" · "}{item.location || item.locationFound || "No location"}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2 flex-shrink-0">
                  {activeTab === "lost" && !(item.status === "returned" || item.isReturned) && (
                    <button
                      onClick={() => handleMarkReturned(item._id)}
                      className="text-xs bg-green-50 text-green-700 border border-green-200 px-3 py-1.5 rounded-lg hover:bg-green-100 transition-colors flex items-center gap-1"
                    >
                      <CheckCircle size={12} /> Mark Returned
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(item._id, activeTab)}
                    className="text-xs bg-red-50 text-red-600 border border-red-200 px-3 py-1.5 rounded-lg hover:bg-red-100 transition-colors flex items-center gap-1"
                  >
                    <Trash2 size={12} /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
