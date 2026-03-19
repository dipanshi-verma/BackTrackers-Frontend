// src/Pages/ListItems.jsx
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Search, Trash, Pencil, CheckCircle, Package, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { API } from "../api";

// ── Edit Modal ────────────────────────────────────────────────────
function EditModal({ item, type, onClose, onSaved }) {
  const today = new Date().toISOString().split("T")[0];

  const [form, setForm] = useState(
    type === "lost"
      ? {
          title:       item.title       || "",
          description: item.description || "",
          location:    item.location    || "",
          dateLost:    item.dateLost    ? item.dateLost.split("T")[0] : "",
          contactInfo: item.contactInfo || "",
        }
      : {
          title:         item.title         || "",
          description:   item.description   || "",
          locationFound: item.locationFound  || "",
          dateFound:     item.dateFound      ? item.dateFound.split("T")[0] : "",
          contactInfo:   item.contactInfo   || "",
        }
  );

  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");

  const handleChange = (e) => {
    setError("");
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const token = localStorage.getItem("token");
    try {
      const res = await axios.put(
        `${API}/api/${type}-items/${item._id}`,
        form,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      onSaved(res.data);   // pass updated item back to parent
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update item.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none";

  return (
    // Backdrop
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.45)" }}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-800">
            Edit {type === "lost" ? "Lost" : "Found"} Item
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={22} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Title *</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              className={inputClass}
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              className={inputClass}
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">
              {type === "lost" ? "Location" : "Location Found"}
            </label>
            <input
              name={type === "lost" ? "location" : "locationFound"}
              value={type === "lost" ? form.location : form.locationFound}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">
              {type === "lost" ? "Date Lost" : "Date Found"} *{" "}
              <span className="text-gray-400 font-normal">(no future dates)</span>
            </label>
            <input
              type="date"
              name={type === "lost" ? "dateLost" : "dateFound"}
              value={type === "lost" ? form.dateLost : form.dateFound}
              onChange={handleChange}
              required
              max={today}
              className={inputClass}
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Contact Info *</label>
            <input
              name="contactInfo"
              value={form.contactInfo}
              onChange={handleChange}
              required
              className={inputClass}
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-lg border border-gray-300 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors disabled:bg-gray-400"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── Main ListItems ─────────────────────────────────────────────────
const ListItems = () => {
  const navigate = useNavigate();

  const [lostItems,  setLostItems]  = useState([]);
  const [foundItems, setFoundItems] = useState([]);
  const [activeTab,  setActiveTab]  = useState("lost");
  const [message,    setMessage]    = useState({ type: "", text: "" });
  const [searchQuery, setSearchQuery] = useState("");
  const [loading,    setLoading]    = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [editTarget, setEditTarget] = useState(null); // { item, type }
  const searchTimeout = useRef(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try { setCurrentUser(JSON.parse(storedUser)); }
      catch (e) { console.error("Invalid user data", e); }
    }
  }, []);

  const fetchItems = async (query = "") => {
    setLoading(true);
    setMessage({ type: "", text: "" });
    try {
      const [lost, found] = await Promise.all([
        axios.get(`${API}/api/lost-items?q=${encodeURIComponent(query)}`),
        axios.get(`${API}/api/found-items?q=${encodeURIComponent(query)}`),
      ]);
      setLostItems(Array.isArray(lost.data)  ? lost.data  : []);
      setFoundItems(Array.isArray(found.data) ? found.data : []);
    } catch (err) {
      setMessage({ type: "error", text: "Could not load items. Is backend running?" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchItems(""); }, []);

  useEffect(() => {
    if (searchTimeout.current) clearTimeout(searchTimeout.current);
    searchTimeout.current = setTimeout(() => fetchItems(searchQuery.trim()), 350);
    return () => clearTimeout(searchTimeout.current);
  }, [searchQuery]);

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const handleDelete = async (id, type) => {
    if (!currentUser) return navigate("/register");
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      await axios.delete(`${API}/api/${type}-items/${id}`, { headers: getAuthHeaders() });
      setMessage({ type: "success", text: "Item deleted successfully." });
      if (type === "lost")  setLostItems((p)  => p.filter((i) => i._id !== id));
      if (type === "found") setFoundItems((p) => p.filter((i) => i._id !== id));
    } catch (err) {
      setMessage({ type: "error", text: err.response?.data?.message || "Failed to delete item." });
    }
  };

  const handleMarkAsReturned = async (id) => {
    if (!currentUser) return navigate("/register");
    if (!window.confirm("Mark this item as returned?")) return;
    try {
      await axios.put(`${API}/api/lost-items/${id}/mark-returned`, {}, { headers: getAuthHeaders() });
      setMessage({ type: "success", text: "Item marked as returned." });
      setLostItems((prev) =>
        prev.map((item) => item._id === id ? { ...item, status: "returned" } : item)
      );
    } catch (err) {
      setMessage({ type: "error", text: err.response?.data?.message || "Failed to update item." });
    }
  };

  // Called by modal when save succeeds
  const handleEditSaved = (updatedItem, type) => {
    setMessage({ type: "success", text: "Item updated successfully!" });
    if (type === "lost")
      setLostItems((p)  => p.map((i) => i._id === updatedItem._id ? updatedItem : i));
    else
      setFoundItems((p) => p.map((i) => i._id === updatedItem._id ? updatedItem : i));
  };

  const renderImage = (item) => {
    if (item.images && item.images.length > 0) {
      return (
        <img src={item.images[0]} alt={item.title || "item"}
          className="w-24 h-24 object-cover rounded-md flex-shrink-0" />
      );
    }
    return (
      <div className="w-24 h-24 bg-gray-200 flex items-center justify-center rounded-md flex-shrink-0">
        <Package size={32} className="text-gray-500" />
      </div>
    );
  };

  const renderItem = (item, type) => {
    const ownerId =
      type === "lost"
        ? (item.reportedBy?._id || item.reportedBy || null)
        : (item.foundBy?._id    || item.foundBy    || null);

    const isAdmin   = currentUser?.role === "admin";
    const isOwner   = currentUser && ownerId && String(currentUser.id) === String(ownerId);
    const canModify = isAdmin || isOwner;
    const isReturned = item.status === "returned";

    return (
      <div key={item._id}
        className="bg-white shadow-md rounded-lg p-6 flex flex-col md:flex-row justify-between border-l-4 border-blue-600 hover:scale-[1.01] transition">
        <div className="flex gap-4">
          {renderImage(item)}
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
              {type === "lost" && (
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                  isReturned ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"
                }`}>
                  {isReturned ? "✓ Returned" : "Still Lost"}
                </span>
              )}
            </div>
            <p className="text-gray-700 mt-1">{item.description}</p>
            <p className="text-sm text-gray-500 mt-2">
              {type === "lost"
                ? item.dateLost  && `Lost on ${new Date(item.dateLost).toLocaleDateString()}`
                : item.dateFound && `Found on ${new Date(item.dateFound).toLocaleDateString()}`}
            </p>
            <p className="text-sm text-gray-500">
              Location: {item.location || item.locationFound || "Unknown"}
            </p>
            <p className="text-sm text-gray-500">
              Contact: {item.contactInfo || "N/A"}
            </p>
            {item.reportedBy?.username && (
              <p className="text-xs text-gray-400 mt-1">
                Reported by: {item.reportedBy.username}
              </p>
            )}
          </div>
        </div>

        {canModify && (
          <div className="flex flex-col items-end gap-2 mt-4 md:mt-0">
            {type === "lost" && !isReturned && (
              <button
                onClick={() => handleMarkAsReturned(item._id)}
                className="bg-green-500 text-white px-3 py-1 rounded flex items-center gap-1 hover:bg-green-600 text-sm"
              >
                <CheckCircle size={16} /> Mark Returned
              </button>
            )}

            {/* ✅ Edit opens the modal */}
            <button
              onClick={() => setEditTarget({ item, type })}
              className="bg-blue-500 text-white px-3 py-1 rounded flex items-center gap-1 hover:bg-blue-600 text-sm"
            >
              <Pencil size={16} /> Edit
            </button>

            <button
              onClick={() => handleDelete(item._id, type)}
              className="bg-red-500 text-white px-3 py-1 rounded flex items-center gap-1 hover:bg-red-600 text-sm"
            >
              <Trash size={16} /> Delete
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto">

        <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
          Lost & Found Items
        </h1>

        {/* Search */}
        <div className="relative mb-8">
          <input
            type="text"
            placeholder="Search items..."
            className="w-full pl-12 pr-4 py-3 rounded-full shadow-lg focus:ring-2 focus:ring-blue-500 bg-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-6">
          <button onClick={() => setActiveTab("lost")}
            className={`px-6 py-2 rounded-full font-semibold flex items-center gap-2 ${
              activeTab === "lost" ? "bg-red-500 text-white" : "bg-gray-300 text-gray-700"
            }`}>
            <Package size={20} /> Lost Items ({lostItems.length})
          </button>
          <button onClick={() => setActiveTab("found")}
            className={`px-6 py-2 rounded-full font-semibold flex items-center gap-2 ${
              activeTab === "found" ? "bg-green-500 text-white" : "bg-gray-300 text-gray-700"
            }`}>
            <CheckCircle size={20} /> Found Items ({foundItems.length})
          </button>
        </div>

        {/* Message */}
        {message.text && (
          <div className={`p-4 rounded text-center mb-6 ${
            message.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}>
            {message.text}
          </div>
        )}

        {/* Results */}
        {loading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : (
          <div className="space-y-6">
            {activeTab === "lost"
              ? lostItems.length > 0
                ? lostItems.map((item) => renderItem(item, "lost"))
                : <p className="text-center text-gray-600">No lost items found.</p>
              : foundItems.length > 0
                ? foundItems.map((item) => renderItem(item, "found"))
                : <p className="text-center text-gray-600">No found items found.</p>}
          </div>
        )}
      </div>

      {/* ✅ Edit modal — rendered outside the list so it overlays everything */}
      {editTarget && (
        <EditModal
          item={editTarget.item}
          type={editTarget.type}
          onClose={() => setEditTarget(null)}
          onSaved={(updatedItem) => {
            handleEditSaved(updatedItem, editTarget.type);
            setEditTarget(null);
          }}
        />
      )}
    </div>
  );
};

export default ListItems;