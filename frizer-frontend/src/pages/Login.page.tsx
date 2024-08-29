import React from 'react'
import LoginForm from '../components/Login/LoginForm/LoginForm.component';
import Navbar from '../components/fragments/Navbar/Navbar.component';
import Footer from '../components/fragments/Footer/Footer.component';
function Login() {
  return (
    <><Navbar />
    <LoginForm />
    <Footer/>
    </>
  )
}

export default Login;