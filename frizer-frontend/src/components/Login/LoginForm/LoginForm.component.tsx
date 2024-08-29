import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlobalContext, ACTION_TYPE, DecodedToken } from '../../../context/Context';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from '../../../services/auth.service';
import styles from './LoginForm.module.scss'
export default function LoginForm() {
  const nav = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [errorMsgs, setErrorMsgs] = useState<string[]>([]);
  const { dispatch } = useContext(GlobalContext);

  function isValidEmail(email: string) {
    return /\S+@\S+\.\S+/.test(email) && !/\s/.test(email) && email.length > 2 && email.length < 50;
  }

  function isValidPassword(password: string) {
    const specialChars = /[!@#$%^&*(),.?":{}|<>]/;
    return /\d/.test(password) && /[A-Z]/.test(password) && /[a-z]/.test(password) &&
      specialChars.test(password) && password.length >= 8 && password.length <= 50 && !/\s/.test(password);
  }

  function handleChangeEmail(event: React.ChangeEvent<HTMLInputElement>) {
    const newEmail = event.target.value;
    const newErrors: string[] = [];

    if (!isValidEmail(newEmail)) {
      if (/\s/.test(newEmail)) newErrors.push('Username must not contain whitespaces!');
      if (!newEmail.includes('@')) newErrors.push('Username must include @!');
      if (newEmail.length > 50) newErrors.push('Username is too long!');
    }

    setErrorMsgs(newErrors);
    setEmail(newEmail);
  }

  function handleChangePassword(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (true) {
      try {
        const response = await AuthService.authenticate(email, password);
        const token = response.token;
        console.log(response)
        console.log("valid token",token)
        if (!token || token.split('.').length !== 3) {
          console.log("Invalid token",token)
          throw new Error('Invalid token structure');
        }

        localStorage.setItem('token', token);

        const decodedToken = jwtDecode<DecodedToken>(token);
        console.log('Decoded Token:', decodedToken);

        const currentUser = {
          id: decodedToken.id,
          name: decodedToken.firstName,
          email: decodedToken.sub,
          role: decodedToken.authorities,
        };

        dispatch({ type: ACTION_TYPE.SET_USER, payload: currentUser });
        dispatch({ type: ACTION_TYPE.SET_TOKEN, payload: token });
        nav('/');
      } catch (error) {
        console.error('Login error:', error);
        setIsValid(false);
        setErrorMsgs(['Wrong username or password.']);
        dispatch({ type: ACTION_TYPE.SET_USER, payload: null });
        dispatch({ type: ACTION_TYPE.SET_TOKEN, payload: null });
      }
    } else {
      setIsValid(false);
      setErrorMsgs(['Invalid email or password format.']);
    }
  }

  return (
    <div className={styles.loginForm}>
      <div className={styles.formBox}>
      <h2>Логирај се</h2>
      <form onSubmit={handleSubmit} >
        {errorMsgs.length > 0 && errorMsgs.map((error, index) => (
          <span key={index} className="errorMsg">{error}</span>
        ))}
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
      <a href="#">Forgot password?</a>
      <div className={styles.formGroup}>
        <button className={styles.loginButton} type="submit" >
          LOGIN
        </button>
      </div>
    </form>
    </div>
    </div>
  );
}
