import './App.css';
import Home from './pages/Home.page';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login.page';
import Register from './pages/Register.page';
import SalonSearchResults from './pages/SalonSearchResults.page';
import ScrollToTop from './utils/ScrollToTop';


function App() {
  return (
    <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/home" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/salons" element={<SalonSearchResults/>} />
          <Route path="*" element={<div>Error: Page not found</div>} />
        </Routes>
      </Router>
  );
}

export default App;
