import React, { useEffect, useState } from "react";
import RegisterForm from "../RegisterForm/RegisterForm.component";
import styles from "./LoginRegisterToggle.module.scss";
import LoginForm from "../LoginForm/LoginForm.component";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

function LoginRegisterToggle() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(location.pathname === "/login");

  // useEffect(() => {
  //   if (location.pathname === '/login') {
  //     setIsLogin(true);
  //   } else if (location.pathname === '/register') {
  //     setIsLogin(false);
  //   }
  // }, [location]);

  const toggleForm = (targetPath: string) => {
    navigate(targetPath);
    // setIsLogin(targetPath === "/login");
  };


  return (
    <div className={styles.toggleContainer}>
      <div className={styles.toggleButtons}>
        <NavLink to="/login">
          <button
            className={isLogin ? styles.activeButton : ""}
            // onClick={() =>toggleForm("/login")}
          >
            Login
          </button>{" "}
        </NavLink>
        <NavLink to="/register">
          <button
            className={!isLogin ? styles.activeButton : ""}
            // onClick={() => toggleForm("/register")}
          >
            Register
          </button>
        </NavLink>
      </div>
      <h1>{isLogin ? "Најави се" : "Регистрирај се"}</h1>
      {isLogin ? <LoginForm /> : <RegisterForm />}
    </div>
  );
}

export default LoginRegisterToggle;
