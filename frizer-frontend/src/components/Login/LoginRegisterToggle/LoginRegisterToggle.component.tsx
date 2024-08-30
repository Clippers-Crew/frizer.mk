import React, { useEffect, useState } from 'react';
import RegisterForm from '../RegisterForm/RegisterForm.component';
import styles from './LoginRegisterToggle.module.scss';
import LoginForm from '../LoginForm/LoginForm.component';
import { useLocation, useNavigate } from 'react-router-dom';

function LoginRegisterToggle() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(location.pathname === '/login');

  useEffect(() => {
    if (location.pathname === '/login') {
      setIsLogin(true);
    } else if (location.pathname === '/register') {
      setIsLogin(false);
    }
  }, [location]);

  const toggleForm = () => {
    const targetPath = isLogin ? '/register' : '/login';
    navigate(targetPath);
  };

  return (
    <div className={styles.toggleContainer}>
      <div className={styles.toggleButtons}>
        <button
          className={isLogin ? styles.active : ''}
          onClick={() => setIsLogin(true)}
        >
          Login
        </button>
        <button
          className={!isLogin ? styles.active : ''}
          onClick={() => setIsLogin(false)}
        >
          Register
        </button>
      </div>
      <div className={styles.formContainer}>
        {isLogin ? <LoginForm /> : <RegisterForm />}
      </div>
    </div>
  );
}

export default LoginRegisterToggle;