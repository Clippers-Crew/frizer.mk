import './App.css';
import Home from './pages/Home.page';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login.page';
import Register from './pages/Register.page';
import SalonDetails from './pages/SalonDetails.page';
import { GlobalContext, GlobalContextProvider } from './context/Context'; 
import PrivateRoute from './PrivateRoute'; 

interface AppProps {
  isAuth: boolean;
}
function App({ isAuth }:AppProps) {
  return (
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
              path="/salons/:id"
              element={
                  <PrivateRoute
                      element={<SalonDetails />}
                      path="/salons/:id"
                      isAuth={isAuth}
                  />
              }
          />
          <Route path="*" element={<div>Error: Page not found</div>} />
      </Routes>
  );
}

export default App;