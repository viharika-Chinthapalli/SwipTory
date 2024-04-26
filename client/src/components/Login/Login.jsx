import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../Register/Register.module.css";
import Button from '../Button/Button';

const Login = ({ setShowLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleClose = () => {
    setShowLogin(false);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = () => {
    if (username.trim() === "" || password.trim() === "") {
      setError("Please enter valid username");
      return;
    }
  
    axios
      .post("http://localhost:8000/api/v1/auth/login", {
        username: username,
        password: password,
      })
      .then((response) => {
        // Store login status in local storage
        localStorage.setItem("isLoggedIn", true);
        toast.success("Login successful!");
        setUsername("");
        setPassword("");
        setTimeout(() => {
          setShowLogin(false);
        }, 2000);
      })
      .catch((error) => {
        toast.error("Invalid username or password");
        console.error("Error during login:", error);
      });
  };
  

  return (
    <div className={styles.modal}>
      <div className={styles.container}>
        <button className={styles.closeButton} onClick={handleClose}>
          &times;
        </button>
        <h3>Login to SwipTory</h3>
        <div className={styles.inputs}>
          <label className={styles.label} htmlFor="username">
            Username
          </label>
          <input
            className={styles.input}
            id="username"
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div className={styles.inputs}>
          <label className={styles.label} htmlFor="password">
            Password
          </label>
          <input
            className={styles.input}
            id="password"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        {error && <p className={styles.error}>{error}</p>}
        <Button name={'Login'} color={'#73ABFF'} handleClick={handleLogin} />
      </div>
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </div>
  );
};

export default Login;
