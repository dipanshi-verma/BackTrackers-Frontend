import './App.css'
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import ReportLostItemPage from './Pages/ReportLostItemPage';
import FoundItemPage from './Pages/FoundItemPage';
import ListItems from './Pages/ListItems';
function App() {
 
  return (
    <>
      <div>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/report-lost" element={<ReportLostItemPage />} />
            <Route path="/found" element={<FoundItemPage />} />
            <Route path="/list-items" element={<ListItems/>} />
        </Routes>
      </div>
    </>
  )
}

export default App
