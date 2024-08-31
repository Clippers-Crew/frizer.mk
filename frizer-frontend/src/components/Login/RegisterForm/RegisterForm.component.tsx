import React, { useContext, useState } from "react";
import styles from "./RegisterForm.module.scss";
import { useNavigate } from "react-router-dom";
import {
  GlobalContext,
  ACTION_TYPE,
  DecodedToken,
} from "../../../context/Context";
import AuthService from "../../../services/auth.service";
import { BaseUserCreate } from "../../../interfaces/BaseUserCreate.interface";

function RegisterForm() {
  const nav = useNavigate();
  const { dispatch } = useContext(GlobalContext);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmedPassword, setConfirmedPassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [errorMsgs, setErrorMsgs] = useState<string[]>([]);
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
    setEmail(event.target.value);
  }

  function handleChangePassword(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
  }

  function handleChangeConfirmedPassword(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    setConfirmedPassword(event.target.value);
  }

  function handleChangeFirstName(event: React.ChangeEvent<HTMLInputElement>) {
    setFirstName(event.target.value);
  }

  function handleChangeLastName(event: React.ChangeEvent<HTMLInputElement>) {
    setLastName(event.target.value);
  }

  function handleChangePhoneNumber(event: React.ChangeEvent<HTMLInputElement>) {
    setPhoneNumber(event.target.value);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const newErrors: string[] = [];

    if (!isValidEmail(email)) {
      newErrors.push("Invalid email format.");
    }
    if (password !== confirmedPassword) {
      newErrors.push("Passwords do not match.");
    }
    if (newErrors.length > 0) {
      setErrorMsgs(newErrors);
      return;
    }

    try {
      const user: BaseUserCreate = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        phoneNumber: phoneNumber,
      };
      const response = await AuthService.register(user);
      if (response.message == "Successfully registered.") {
        navigate("/login");
      }
    } catch (error) {
      setErrorMsgs(["Registration failed. Please try again."]);
    }
  }
  function onSwitchToRegister() {
    navigate("/register");
  }
  function onSwitchToLogin() {
    navigate("/login");
  }
  return (
    <form onSubmit={handleSubmit}>
      {errorMsgs.length > 0 &&
        errorMsgs.map((error, index) => (
          <span key={index} className="errorMsg">
            {error}
          </span>
        ))}
      <label htmlFor="firstName">Име</label>
      <div className={styles.formGroup}>
        <input
          type="text"
          name="firstName"
          value={firstName}
          required
          placeholder="First Name"
          onChange={handleChangeFirstName}
        />
      </div>
      <label htmlFor="lastName">Презиме</label>
      <div className={styles.formGroup}>
        <input
          type="text"
          name="lastName"
          value={lastName}
          required
          placeholder="Last Name"
          onChange={handleChangeLastName}
        />
      </div>
      <label htmlFor="phoneNumber">Телефонски број</label>
      <div className={styles.formGroup}>
        <input
          type="text"
          name="phoneNumber"
          value={phoneNumber}
          required
          placeholder="Phone Number"
          onChange={handleChangePhoneNumber}
        />
      </div>
      <label htmlFor="email">Е-маил</label>
      <div className={styles.formGroup}>
        <input
          type="text"
          name="email"
          value={email}
          required
          placeholder="Email"
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
      <label htmlFor="confirmedPassword">Потврди лозинка</label>
      <div className={styles.formGroup}>
        <input
          type="password"
          name="confirmedPassword"
          value={confirmedPassword}
          required
          placeholder="Confirm Password"
          onChange={handleChangeConfirmedPassword}
        />
      </div>
      <div className={styles.formGroup}>
        <button className="primaryButton" type="submit">
          Register
        </button>
      </div>
    </form>
  );
}

export default RegisterForm;
