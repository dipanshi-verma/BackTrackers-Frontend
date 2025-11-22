// src/Pages/ListItems.jsx
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Search, Trash, Pencil, CheckCircle, Package } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { API } from "../api";

const ListItems = () => {
  const navigate = useNavigate();

  const [lostItems, setLostItems] = useState([]);
  const [foundItems, setFoundItems] = useState([]);
  const [activeTab, setActiveTab] = useState("lost");
  const [message, setMessage] = useState({ type: "", text: "" });
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const [currentUser, setCurrentUser] = useState(null);
  const searchTimeout = useRef(null);

  // Load logged-in user
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setCurrentUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Invalid user data", e);
      }
    }
  }, []);

  // Fetch items
  const fetchItems = async (query = "") => {
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const lost = await axios.get(
        `${API}/api/lost-items?q=${encodeURIComponent(query)}`
      );
      const found = await axios.get(
        `${API}/api/found-items?q=${encodeURIComponent(query)}`
      );

      setLostItems(Array.isArray(lost.data) ? lost.data : []);
      setFoundItems(Array.isArray(found.data) ? found.data : []);
    } catch (err) {
      setMessage({
        type: "error",
        text: "Could not load items. Is backend running?",
      });
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchItems("");
  }, []);

  // Debounce search
  useEffect(() => {
    if (searchTimeout.current) clearTimeout(searchTimeout.current);

    searchTimeout.current = setTimeout(() => {
      fetchItems(searchQuery.trim());
    }, 350);

    return () => clearTimeout(searchTimeout.current);
  }, [searchQuery]);

  const handleChange = (e) => setSearchQuery(e.target.value);

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  // Delete Lost / Found
  const handleDelete = async (id, type) => {
    if (!currentUser) return navigate("/register");

    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      await axios.delete(`${API}/api/${type}-items/${id}`, {
        headers: getAuthHeaders(),
      });

      setMessage({ type: "success", text: "Item deleted successfully." });
      fetchItems(searchQuery);
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Failed to delete item.",
      });
    }
  };

  // Mark Lost Item as Returned
  const handleMarkAsReturned = async (id) => {
    if (!currentUser) return navigate("/register");

    if (!window.confirm("Mark this item as returned?")) return;

    try {
      await axios.put(
        `${API}/api/lost-items/${id}/mark-returned`,
        {},
        { headers: getAuthHeaders() }
      );

      setMessage({ type: "success", text: "Item marked as returned." });
      fetchItems(searchQuery);
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Failed to update item.",
      });
    }
  };

  // Edit (not implemented)
  const handleEdit = (item) => {
    if (!currentUser) return navigate("/register");
    setMessage({ type: "info", text: "Edit feature coming soon!" });
  };

  // Render image thumbnail
  const renderImage = (item) => {
    if (item.images && item.images.length > 0) {
      return (
        <img
          src={item.images[0]}
          alt={item.title || "item"}
          className="w-24 h-24 object-cover rounded-md"
        />
      );
    }
    return (
      <div className="w-24 h-24 bg-gray-200 flex items-center justify-center rounded-md">
        <Package size={32} className="text-gray-500" />
      </div>
    );
  };

  // Render item card
  const renderItem = (item, type) => {
    const ownerId =
      (type === "lost" && item.reportedBy?._id) ||
      (type === "found" && item.foundBy?._id) ||
      null;

    const canModify =
      currentUser &&
      (currentUser.role === "admin" || currentUser.id === ownerId);

    return (
      <div
        key={item._id}
        className="bg-white shadow-md rounded-lg p-6 flex flex-col md:flex-row justify-between border-l-4 border-blue-600 hover:scale-[1.01] transition"
      >
        <div className="flex gap-4">
          {renderImage(item)}

          <div>
            <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
            <p className="text-gray-700">{item.description}</p>

            <p className="text-sm text-gray-500 mt-2">
              {type === "lost"
                ? item.dateLost && `Lost on ${new Date(item.dateLost).toLocaleDateString()}`
                : item.dateFound &&
                  `Found on ${new Date(item.dateFound).toLocaleDateString()}`}
            </p>

            <p className="text-sm text-gray-500">
              Location: {item.location || item.locationFound || "Unknown"}
            </p>

            <p className="text-sm text-gray-500">
              Contact: {item.contactInfo || "N/A"}
            </p>
          </div>
        </div>

        {/* Actions */}
        {canModify && (
          <div className="flex flex-col items-end gap-2 mt-4 md:mt-0">
            {type === "lost" && (
              <button
                onClick={() => handleMarkAsReturned(item._id)}
                className="bg-green-500 text-white px-3 py-1 rounded flex items-center gap-1 hover:bg-green-600"
              >
                <CheckCircle size={16} /> Mark Returned
              </button>
            )}

            <button
              onClick={() => handleEdit(item)}
              className="bg-blue-500 text-white px-3 py-1 rounded flex items-center gap-1 hover:bg-blue-600"
            >
              <Pencil size={16} /> Edit
            </button>

            <button
              onClick={() => handleDelete(item._id, type)}
              className="bg-red-500 text-white px-3 py-1 rounded flex items-center gap-1 hover:bg-red-600"
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
            className="w-full pl-12 pr-4 py-3 rounded-full shadow-lg focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={handleChange}
          />
          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={() => setActiveTab("lost")}
            className={`px-6 py-2 rounded-full font-semibold flex items-center gap-2 ${
              activeTab === "lost"
                ? "bg-red-500 text-white"
                : "bg-gray-300 text-gray-700"
            }`}
          >
            <Package size={20} /> Lost Items ({lostItems.length})
          </button>

          <button
            onClick={() => setActiveTab("found")}
            className={`px-6 py-2 rounded-full font-semibold flex items-center gap-2 ${
              activeTab === "found"
                ? "bg-green-500 text-white"
                : "bg-gray-300 text-gray-700"
            }`}
          >
            <CheckCircle size={20} /> Found Items ({foundItems.length})
          </button>
        </div>

        {/* Messages */}
        {message.text && (
          <div
            className={`p-4 rounded text-center mb-6 ${
              message.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
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
    </div>
  );
};

export default ListItems;
