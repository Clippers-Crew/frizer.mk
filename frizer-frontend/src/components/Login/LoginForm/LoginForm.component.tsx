import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  GlobalContext,
  ACTION_TYPE,
  DecodedToken,
} from "../../../context/Context";
import { jwtDecode } from "jwt-decode";
import styles from "./LoginForm.module.scss";
import AuthService from "../../../services/auth.service";
import UserService from "../../../services/user.service";

export default function LoginForm() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [errorMsgs, setErrorMsgs] = useState<string[]>([]);
  const { dispatch } = useContext(GlobalContext);
  const navigate = useNavigate();
  function isValidEmail(email: string) {
    return (
      /\S+@\S+\.\S+/.test(email) &&
      !/\s/.test(email) &&
      email.length > 2 &&
      email.length < 50
    );
  }

  function handleChangeEmail(event: React.ChangeEvent<HTMLInputElement>) {
    const newEmail = event.target.value;
    const newErrors: string[] = [];

    if (!isValidEmail(newEmail)) {
      if (/\s/.test(newEmail))
        newErrors.push("Username must not contain whitespaces!");
      if (!newEmail.includes("@")) newErrors.push("Username must include @!");
      if (newEmail.length > 30) newErrors.push("Username is too long!");
    }

    setErrorMsgs(newErrors);
    setEmail(newEmail);
  }

  function handleChangePassword(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isValidEmail(email)) {
      try {
        const response = await AuthService.authenticate(email, password);
        const token = response.token;
        if (!token || token.split(".").length !== 3) {
          throw new Error("Invalid token structure");
        }

        localStorage.setItem("token", token);
        UserService.setUserWithToken();

        const decodedToken = jwtDecode<DecodedToken>(token);
        const currentUser = {
          id: decodedToken.id,
          name: decodedToken.firstName,
          email: decodedToken.sub,
          role: decodedToken.authorities,
        };

        dispatch({ type: ACTION_TYPE.SET_USER, payload: currentUser });
        dispatch({ type: ACTION_TYPE.SET_TOKEN, payload: token });
        nav("/");
      } catch (error) {
        console.error("Login error:", error);
        setIsValid(false);
        setErrorMsgs(["Wrong username or password."]);
        dispatch({ type: ACTION_TYPE.SET_USER, payload: null });
        dispatch({ type: ACTION_TYPE.SET_TOKEN, payload: null });
        UserService.removeUser();
      }
    }
  }
  function onSwitchToRegister() {
    navigate("/register");
  }
  function onSwitchToLogin() {
    navigate("/login");
  }
  return (
    <form onSubmit={handleSubmit} className={styles.LoginForm}>
      {errorMsgs.length > 0 &&
        errorMsgs.map((error, index) => (
          <span key={index} className="errorMsg">
            {error}
          </span>
        ))}
      <label htmlFor="username">Корисничко име</label>
      <div className={styles.formGroup}>
        <input
          type="text"
          name="username"
          value={email}
          required
          placeholder="Username"
          onChange={handleChangeEmail}
        />
      </div>
      <label htmlFor="password">Лозинка</label>
      <div className={styles.formGroup}>
        <input
          type="password"
          name="password"
          value={password}
          required
          placeholder="Password"
          onChange={handleChangePassword}
        />
      </div>
      <a href="#">Заборавена лозинка?</a>
      <div className={styles.formGroup}>
        <button className="primaryButton" type="submit">
          Login
        </button>
      </div>
    </form>
  );
}
