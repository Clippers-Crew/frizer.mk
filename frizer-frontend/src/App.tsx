import './App.css';
import Home from './pages/Home.page';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login.page';
import Register from './pages/Register.page';
import SalonDetails from './pages/SalonDetails.page';
import SalonService from './services/salon.service';
import { useEffect, useState } from 'react';
import { Salon } from './interfaces/Salon.interface';

function App() {
  const [salon, setSalon] = useState<Salon | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSalon = async () => {
      try {
        const response = await SalonService.getSalon(1);
        setSalon(response.data);
      } catch (error) {
        console.error('Error fetching salon:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSalon();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {salon && <Route path="/salons/1" element={<SalonDetails salon={salon} />} />}
        <Route path="*" element={<div>Error: Page not found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
