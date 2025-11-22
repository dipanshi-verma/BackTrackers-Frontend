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
import Dashboard from "./Pages/Dashboard";



function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100">
      <Navbar/>
      <Routes>

        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<ChatRoom />} />
        <Route path="/report-lost" element={<ReportLostItemPage />} />
        <Route path="/report-found" element={<FoundItemPage />} />
        <Route path="/list-items" element={<ListItems />} />
        <Route path="/dashboard" element={<Dashboard />} />

      </Routes>
      <Footer/>
    </div>

  )
}

export default App