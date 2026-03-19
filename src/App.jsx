// src/App.jsx
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Register from './Pages/Register.jsx'
import Home from './Pages/Home'
import ListItems from './Pages/ListItems'
import Navbar from './Pages/Navbar.jsx'
import FoundItemPage from './Pages/FoundItemPage.jsx'
import ReportLostItemPage from './Pages/ReportLostItemPage.jsx'
import Footer from './Pages/Footer.jsx'
import ChatRoom from './Pages/ChatRoom.jsx'
import Dashboard from './Pages/Dashboard.jsx'
import AdminDashboard from './Pages/AdminDashboard.jsx'
import AdminLogin from './Pages/AdminLogin.jsx'
import ProtectedRoute from './Pages/ProtectedRoute.jsx'
import AdminRoute from './Pages/AdminRoute.jsx'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100">
      <Navbar />
      <Routes>
        {/* Public routes — anyone can visit */}
        <Route path="/"           element={<Home />} />
        <Route path="/register"   element={<Register />} />
        <Route path="/list-items" element={<ListItems />} />

        {/* Protected routes — must be logged in */}
        <Route path="/report-lost" element={
          <ProtectedRoute><ReportLostItemPage /></ProtectedRoute>
        } />
        <Route path="/report-found" element={
          <ProtectedRoute><FoundItemPage /></ProtectedRoute>
        } />
        <Route path="/chat" element={
          <ProtectedRoute><ChatRoom /></ProtectedRoute>
        } />
        <Route path="/dashboard" element={
          <ProtectedRoute><Dashboard /></ProtectedRoute>
        } />

        {/* Admin login — public but separate from main login */}
        <Route path="/admin-login" element={<AdminLogin />} />

        {/* Admin-only route */}
        <Route path="/admin" element={
          <AdminRoute><AdminDashboard /></AdminRoute>
        } />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
