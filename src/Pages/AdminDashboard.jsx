// src/Pages/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../api";
import {
  ShieldCheck, Users, Package, CheckCircle,
  Trash2, Search, AlertTriangle, BarChart2,
  RefreshCw, Crown
} from "lucide-react";

const TABS = ["overview", "items", "users"];

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [lostItems, setLostItems]   = useState([]);
  const [foundItems, setFoundItems] = useState([]);
  const [users, setUsers]           = useState([]);
  const [loading, setLoading]       = useState(true);
  const [message, setMessage]       = useState({ type: "", text: "" });
  const [itemSearch, setItemSearch] = useState("");
  const [userSearch, setUserSearch] = useState("");
  const [itemTab, setItemTab]       = useState("lost");

  const headers = () => {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const flash = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: "", text: "" }), 3000);
  };

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [lost, found, usersRes] = await Promise.allSettled([
        axios.get(`${API}/api/lost-items`,   { headers: headers() }),
        axios.get(`${API}/api/found-items`,  { headers: headers() }),
        axios.get(`${API}/api/users`,        { headers: headers() }),
      ]);
      if (lost.status   === "fulfilled") setLostItems(Array.isArray(lost.value.data)       ? lost.value.data   : []);
      if (found.status  === "fulfilled") setFoundItems(Array.isArray(found.value.data)     ? found.value.data  : []);
      if (usersRes.status === "fulfilled") setUsers(Array.isArray(usersRes.value.data)     ? usersRes.value.data : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAll(); }, []);

  // ── Item actions ──────────────────────────────────────────────────
  const deleteItem = async (id, type) => {
    if (!window.confirm("Delete this item?")) return;
    try {
      await axios.delete(`${API}/api/${type}-items/${id}`, { headers: headers() });
      flash("success", "Item deleted.");
      fetchAll();
    } catch { flash("error", "Delete failed."); }
  };

  const markReturned = async (id) => {
    try {
      await axios.put(`${API}/api/lost-items/${id}/mark-returned`, {}, { headers: headers() });
      flash("success", "Marked as returned.");
      fetchAll();
    } catch { flash("error", "Failed to update."); }
  };

  // ── User actions ──────────────────────────────────────────────────
  const promoteToAdmin = async (userId) => {
    if (!window.confirm("Promote this user to admin?")) return;
    try {
      await axios.put(`${API}/api/users/${userId}/role`, { role: "admin" }, { headers: headers() });
      flash("success", "User promoted to admin.");
      fetchAll();
    } catch { flash("error", "Could not promote user. Does your backend support this endpoint?"); }
  };

  const demoteUser = async (userId) => {
    if (!window.confirm("Demote this admin to regular user?")) return;
    try {
      await axios.put(`${API}/api/users/${userId}/role`, { role: "user" }, { headers: headers() });
      flash("success", "User demoted.");
      fetchAll();
    } catch { flash("error", "Could not demote user."); }
  };

  const deleteUser = async (userId) => {
    if (!window.confirm("Delete this user and all their posts? This cannot be undone.")) return;
    try {
      await axios.delete(`${API}/api/users/${userId}`, { headers: headers() });
      flash("success", "User deleted.");
      fetchAll();
    } catch { flash("error", "Could not delete user."); }
  };

  // ── Computed stats ────────────────────────────────────────────────
  const returnedCount  = lostItems.filter((i) => i.status === "returned" || i.isReturned).length;
  const pendingCount   = lostItems.length - returnedCount;
  const resolutionRate = lostItems.length > 0
    ? Math.round((returnedCount / lostItems.length) * 100) : 0;

  // ── Filtered lists ────────────────────────────────────────────────
  const filteredItems = (itemTab === "lost" ? lostItems : foundItems).filter((item) =>
    !itemSearch || item.title?.toLowerCase().includes(itemSearch.toLowerCase())
  );
  const filteredUsers = users.filter((u) =>
    !userSearch || u.username?.toLowerCase().includes(userSearch.toLowerCase())
  );

  const currentAdminUser = (() => {
    try { return JSON.parse(localStorage.getItem("user")); } catch { return null; }
  })();

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-purple-600 text-white p-2.5 rounded-xl">
              <ShieldCheck size={22} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Admin Panel</h1>
              <p className="text-xs text-gray-400">Logged in as {currentAdminUser?.username}</p>
            </div>
          </div>
          <button onClick={fetchAll}
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-indigo-600 transition-colors border border-gray-200 px-3 py-1.5 rounded-lg bg-white">
            <RefreshCw size={14} /> Refresh
          </button>
        </div>

        {/* Flash message */}
        {message.text && (
          <div className={`mb-4 p-3 rounded-lg text-sm ${
            message.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"
          }`}>
            {message.text}
          </div>
        )}

        {/* Tab bar */}
        <div className="flex bg-white rounded-xl border border-gray-200 mb-6 overflow-hidden shadow-sm">
          {TABS.map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2.5 text-sm font-semibold capitalize transition-colors ${
                activeTab === tab ? "bg-purple-600 text-white" : "text-gray-500 hover:bg-gray-50"
              }`}>
              {tab === "overview" && <BarChart2 size={14} className="inline mr-1.5" />}
              {tab === "items"    && <Package   size={14} className="inline mr-1.5" />}
              {tab === "users"    && <Users     size={14} className="inline mr-1.5" />}
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {loading ? (
          <p className="text-center text-gray-400 py-16">Loading data...</p>
        ) : (

          <>
            {/* ── OVERVIEW TAB ── */}
            {activeTab === "overview" && (
              <div>
                {/* Stat cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                  {[
                    { label: "Total Users",    value: users.length,       icon: <Users size={18}/>,       bg: "bg-blue-50",   text: "text-blue-600"   },
                    { label: "Lost Reports",   value: lostItems.length,   icon: <AlertTriangle size={18}/>,bg: "bg-red-50",    text: "text-red-500"    },
                    { label: "Found Reports",  value: foundItems.length,  icon: <Package size={18}/>,      bg: "bg-green-50",  text: "text-green-600"  },
                    { label: "Resolution Rate",value: `${resolutionRate}%`,icon: <BarChart2 size={18}/>,   bg: "bg-purple-50", text: "text-purple-600" },
                  ].map(({ label, value, icon, bg, text }) => (
                    <div key={label} className={`${bg} rounded-xl p-5 flex flex-col gap-2`}>
                      <div className={`${text}`}>{icon}</div>
                      <div className="text-2xl font-bold text-gray-800">{value}</div>
                      <div className="text-xs text-gray-500">{label}</div>
                    </div>
                  ))}
                </div>

                {/* Status breakdown */}
                <div className="bg-white rounded-xl border border-gray-200 p-6 mb-4">
                  <h2 className="font-semibold text-gray-700 mb-4 text-sm uppercase tracking-wide">
                    Lost items status
                  </h2>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex-1 bg-gray-100 rounded-full h-3 overflow-hidden">
                      <div
                        className="bg-green-500 h-3 rounded-full transition-all"
                        style={{ width: `${resolutionRate}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-600 w-12 text-right">{resolutionRate}%</span>
                  </div>
                  <div className="flex gap-4 mt-3 text-sm text-gray-500">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-green-400 inline-block"/>
                      {returnedCount} Returned
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-400 inline-block"/>
                      {pendingCount} Still lost
                    </span>
                  </div>
                </div>

                {/* Recent lost items */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h2 className="font-semibold text-gray-700 mb-4 text-sm uppercase tracking-wide">
                    5 most recent lost reports
                  </h2>
                  {lostItems.slice(0, 5).map((item) => (
                    <div key={item._id} className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0">
                      <div>
                        <p className="text-sm font-medium text-gray-800">{item.title}</p>
                        <p className="text-xs text-gray-400">
                          {item.reportedBy?.username || "Unknown"} ·{" "}
                          {item.dateLost ? new Date(item.dateLost).toLocaleDateString() : "—"}
                        </p>
                      </div>
                      {(item.status === "returned" || item.isReturned) ? (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Returned</span>
                      ) : (
                        <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">Active</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── ITEMS TAB ── */}
            {activeTab === "items" && (
              <div>
                {/* Sub-tabs */}
                <div className="flex gap-3 mb-4">
                  {["lost","found"].map((t) => (
                    <button key={t} onClick={() => setItemTab(t)}
                      className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors ${
                        itemTab === t
                          ? t === "lost" ? "bg-red-500 text-white" : "bg-green-500 text-white"
                          : "bg-white border border-gray-200 text-gray-500 hover:bg-gray-50"
                      }`}>
                      {t === "lost" ? `Lost (${lostItems.length})` : `Found (${foundItems.length})`}
                    </button>
                  ))}
                </div>

                {/* Search */}
                <div className="relative mb-4">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
                  <input
                    value={itemSearch} onChange={(e) => setItemSearch(e.target.value)}
                    placeholder="Search by title..."
                    className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-purple-300"
                  />
                </div>

                {/* Items list */}
                <div className="space-y-3">
                  {filteredItems.length === 0 ? (
                    <p className="text-center text-gray-400 py-10">No items found.</p>
                  ) : filteredItems.map((item) => (
                    <div key={item._id}
                      className="bg-white border border-gray-100 rounded-xl p-4 flex items-start justify-between gap-4 shadow-sm">
                      <div className="flex gap-3 flex-1 min-w-0">
                        {item.images?.[0] ? (
                          <img src={item.images[0]} alt={item.title}
                            className="w-14 h-14 object-cover rounded-lg flex-shrink-0"/>
                        ) : (
                          <div className="w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Package size={20} className="text-gray-400"/>
                          </div>
                        )}
                        <div className="min-w-0">
                          <p className="font-semibold text-gray-800 text-sm truncate">{item.title}</p>
                          <p className="text-xs text-gray-400 mt-0.5">
                            By: {item.reportedBy?.username || item.foundBy?.username || "Unknown"} ·{" "}
                            {item.location || item.locationFound || "No location"}
                          </p>
                          <p className="text-xs text-gray-400 line-clamp-1 mt-0.5">{item.description}</p>
                        </div>
                      </div>
                      <div className="flex flex-col gap-1.5 flex-shrink-0">
                        {itemTab === "lost" && !(item.status === "returned" || item.isReturned) && (
                          <button onClick={() => markReturned(item._id)}
                            className="text-xs bg-green-50 text-green-700 border border-green-200 px-3 py-1.5 rounded-lg hover:bg-green-100 flex items-center gap-1">
                            <CheckCircle size={11}/> Return
                          </button>
                        )}
                        <button onClick={() => deleteItem(item._id, itemTab)}
                          className="text-xs bg-red-50 text-red-600 border border-red-200 px-3 py-1.5 rounded-lg hover:bg-red-100 flex items-center gap-1">
                          <Trash2 size={11}/> Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── USERS TAB ── */}
            {activeTab === "users" && (
              <div>
                <div className="relative mb-4">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
                  <input
                    value={userSearch} onChange={(e) => setUserSearch(e.target.value)}
                    placeholder="Search users..."
                    className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-purple-300"
                  />
                </div>

                {filteredUsers.length === 0 ? (
                  <p className="text-center text-gray-400 py-10">
                    No users found.{" "}
                    <span className="text-xs block mt-1 text-gray-400">
                      (Make sure your backend has a GET /api/users admin endpoint)
                    </span>
                  </p>
                ) : (
                  <div className="space-y-2">
                    {filteredUsers.map((u) => {
                      const isSelf = u._id === currentAdminUser?.id || u._id === currentAdminUser?._id;
                      return (
                        <div key={u._id}
                          className="bg-white border border-gray-100 rounded-xl px-5 py-4 flex items-center justify-between shadow-sm">
                          <div className="flex items-center gap-3">
                            {/* Avatar */}
                            <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm ${
                              u.role === "admin" ? "bg-purple-100 text-purple-700" : "bg-indigo-100 text-indigo-600"
                            }`}>
                              {u.username?.[0]?.toUpperCase() || "?"}
                            </div>
                            <div>
                              <p className="font-medium text-sm text-gray-800 flex items-center gap-1.5">
                                {u.username}
                                {isSelf && <span className="text-xs text-gray-400">(you)</span>}
                                {u.role === "admin" && (
                                  <span className="inline-flex items-center gap-0.5 text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">
                                    <Crown size={10}/> Admin
                                  </span>
                                )}
                              </p>
                              <p className="text-xs text-gray-400">{u.email || "No email"}</p>
                            </div>
                          </div>

                          {/* Actions — hide for self */}
                          {!isSelf && (
                            <div className="flex items-center gap-2">
                              {u.role !== "admin" ? (
                                <button onClick={() => promoteToAdmin(u._id)}
                                  className="text-xs bg-purple-50 text-purple-700 border border-purple-200 px-3 py-1.5 rounded-lg hover:bg-purple-100 flex items-center gap-1">
                                  <Crown size={11}/> Promote
                                </button>
                              ) : (
                                <button onClick={() => demoteUser(u._id)}
                                  className="text-xs bg-gray-50 text-gray-600 border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-100 flex items-center gap-1">
                                  Demote
                                </button>
                              )}
                              <button onClick={() => deleteUser(u._id)}
                                className="text-xs bg-red-50 text-red-600 border border-red-200 px-3 py-1.5 rounded-lg hover:bg-red-100 flex items-center gap-1">
                                <Trash2 size={11}/> Delete
                              </button>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
