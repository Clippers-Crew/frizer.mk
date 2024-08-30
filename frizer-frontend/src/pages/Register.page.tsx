import React from 'react'
import RegisterForm from '../components/Login/RegisterForm/RegisterForm.component';
import Navbar from '../components/fragments/Navbar/Navbar.component';
import LoginRegisterToggle from '../components/Login/LoginRegisterToggle/LoginRegisterToggle.component';
import Footer from '../components/fragments/Footer/Footer.component';

function Register() {
  return (
    <><Navbar />
    <LoginRegisterToggle />
    <Footer/>
    </>  )
}

export default Register;