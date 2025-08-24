import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import About from './Pages/About'
import ListItems from './Pages/ListItems'
import Contact from './Pages/Contact'
import Faq from './Pages/Faq'
import Navbar from './Pages/Navbar.jsx'
import FoundItemPage from './Pages/FoundItemPage.jsx'
import ReportLostItemPage from './Pages/ReportLostItemPage.jsx'
import Footer from './Pages/Footer.jsx'


function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<Faq />} />
         <Route path="/report-lost" element={<ReportLostItemPage />} />
            <Route path="/found" element={<FoundItemPage />} />
            <Route path="/list-items" element={<ListItems />} />
      </Routes>
      <Footer/>
    </div>
  )
}

export default App