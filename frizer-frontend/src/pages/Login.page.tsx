import React from 'react'
import LoginForm from '../components/Login/LoginForm/LoginForm.component';
import Navbar from '../components/fragments/Navbar/Navbar.component';
import Footer from '../components/fragments/Footer/Footer.component';
import LoginRegisterToggle from '../components/Login/LoginRegisterToggle/LoginRegisterToggle.component';
function Login() {
  return (
    <><Navbar />
    <LoginRegisterToggle />
    <Footer/>
    </>
  )
}

export default Login;