import AdminPage from './components/AdminPage';
import LoginPage from './components/LoginPage';
import MarketplaceSelector from './components/Market'
import './index.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
     <Router>
      <Routes>
      <Route path="/" element={<MarketplaceSelector />} />
        <Route path="/login" element={<LoginPage />} />
         <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Router>
  )
}

export default App
