// ListItems.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Search, Trash, Pencil, CheckCircle, Package } from 'lucide-react';

const ListItems = () => {
  const navigate = useNavigate();
  const [lostItems, setLostItems] = useState([]);
  const [foundItems, setFoundItems] = useState([]);
  const [activeTab, setActiveTab] = useState('lost');
  const [message, setMessage] = useState({ type: '', text: '' });
  const [searchQuery, setSearchQuery] = useState('');
  const [currentUser, setCurrentUser] = useState({ id: 'dummy-id', role: 'user' }); // Placeholder for logged-in user state

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setCurrentUser(storedUser);
    }
  }, []);

  const fetchItems = async () => {
    try {
      const lostItemsResponse = await axios.get(`http://localhost:5000/api/lost-items?q=${searchQuery}`);
      const foundItemsResponse = await axios.get(`http://localhost:5000/api/found-items?q=${searchQuery}`);
      setLostItems(lostItemsResponse.data);
      setFoundItems(foundItemsResponse.data);
    } catch (error) {
      console.error("Error fetching items:", error);
      setMessage({ type: 'error', text: 'Failed to fetch items. Check server connection.' });
    }
  };

  useEffect(() => {
    fetchItems();
  }, [searchQuery]);

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleDelete = async (itemId, type) => {
    if (!currentUser) {
      setMessage({ type: 'error', text: 'You must be logged in to delete an item.' });
      return navigate('/login');
    }
    if (!window.confirm("Are you sure you want to delete this item?")) {
      return;
    }
    try {
      await axios.delete(`http://localhost:5000/api/${type}-items/${itemId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setMessage({ type: 'success', text: 'Item deleted successfully.' });
      fetchItems();
    } catch (error) {
      console.error(`Error deleting ${type} item:`, error);
      setMessage({ type: 'error', text: error.response?.data?.message || `Failed to delete ${type} item.` });
    }
  };

  const handleMarkAsFound = async (itemId) => {
    if (!currentUser) {
      setMessage({ type: 'error', text: 'You must be logged in to mark an item as found.' });
      return navigate('/login');
    }
    if (!window.confirm("Are you sure you want to mark this item as found? It will be moved to the Found Items list.")) {
      return;
    }
    try {
      await axios.put(`http://localhost:5000/api/lost-items/${itemId}/mark-found`, {}, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setMessage({ type: 'success', text: 'Item marked as found successfully!' });
      fetchItems();
    } catch (error) {
      console.error("Error marking item as found:", error);
      setMessage({ type: 'error', text: error.response?.data?.message || 'Failed to mark item as found.' });
    }
  };

  const handleEdit = (item) => {
    if (!currentUser) {
      setMessage({ type: 'error', text: 'You must be logged in to edit an item.' });
      return navigate('/login');
    }
    console.log('Edit button clicked for item:', item);
    // In a real application, you'd open an edit modal here
  };

  const renderItem = (item, type) => {
    const canModify = currentUser && (currentUser.id === (type === 'lost' ? item.postedBy : item.foundBy) || currentUser.role === 'admin');

    return (
      <div key={item._id} className="bg-white rounded-lg shadow-md p-6 flex flex-col md:flex-row items-start md:items-center justify-between transition-transform duration-300 hover:scale-[1.01] border-l-4 border-l-blue-600">
        <div className="flex-grow">
          <h4 className="font-bold text-xl text-gray-800 mb-2">{item.name}</h4>
          <p className="text-gray-600 mb-2">{item.description}</p>
          <div className="flex flex-wrap gap-2 mt-4">
            {item.images && item.images.length > 0 ? (
              item.images.map((image, index) => (
                <img key={index} src={`http://localhost:5000${image}`} alt={item.name} className="w-24 h-24 object-cover rounded-md" />
              ))
            ) : (
              <div className="w-24 h-24 flex items-center justify-center bg-gray-200 rounded-md text-gray-500">
                <Package size={32} />
              </div>
            )}
          </div>
        </div>
        <div className="mt-4 md:mt-0 md:ml-6 text-right flex-shrink-0">
          <p className="text-sm text-gray-500">
            {type === 'lost' ? `Lost on: ${new Date(item.dateLost).toLocaleDateString()}` : `Found on: ${new Date(item.dateFound).toLocaleDateString()}`}
          </p>
          <p className="text-sm text-gray-500">Contact: {item.contactInfo}</p>
          {canModify && type === 'lost' && (
            <button
              onClick={() => handleMarkAsFound(item._id)}
              className="mt-2 flex items-center justify-center gap-1 bg-green-500 text-white px-3 py-1 rounded-md text-sm hover:bg-green-600 transition-colors"
            >
              <CheckCircle size={16} /> Mark as Found
            </button>
          )}
          {canModify && (
            <div className="mt-2 flex justify-end gap-2">
              <button
                onClick={() => handleDelete(item._id, type)}
                className="bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600 transition-colors flex items-center justify-center gap-1"
              >
                <Trash size={16} /> Delete
              </button>
              <button
                onClick={() => handleEdit(item)}
                className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-600 transition-colors flex items-center justify-center gap-1"
              >
                <Pencil size={16} /> Edit
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-8">Lost & Found Items</h1>
        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by item name or description..."
              value={searchQuery}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-3 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
            />
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <Search size={24} />
            </div>
          </div>
        </div>
        <div className="flex justify-center mb-8">
          <button
            className={`flex items-center gap-2 px-6 py-2 rounded-full font-semibold transition-colors ${activeTab === 'lost' ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            onClick={() => setActiveTab('lost')}
          >
            <Package size={20} /> Lost Items ({lostItems.length})
          </button>
          <button
            className={`ml-4 flex items-center gap-2 px-6 py-2 rounded-full font-semibold transition-colors ${activeTab === 'found' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            onClick={() => setActiveTab('found')}
          >
            <CheckCircle size={20} /> Found Items ({foundItems.length})
          </button>
        </div>
        {message.text && (
          <div className={`p-4 rounded-lg mb-6 text-center ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {message.text}
          </div>
        )}
        <div className="space-y-6">
          {activeTab === 'lost' ? (
            lostItems.length > 0 ? lostItems.map(item => renderItem(item, 'lost')) : <p className="text-center text-gray-500">No lost items found.</p>
          ) : (
            foundItems.length > 0 ? foundItems.map(item => renderItem(item, 'found')) : <p className="text-center text-gray-500">No found items found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListItems;