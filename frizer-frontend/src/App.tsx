import './App.css';
import Home from './pages/Home.page';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login.page';
import Register from './pages/Register.page';


function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/home" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="*" element={<div>Error: Page not found</div>} />
        </Routes>
      </Router>
  );
}

export default App;
