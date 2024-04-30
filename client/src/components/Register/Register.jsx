import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./Register.module.css";
import Button from "../Button/Button";

const Register = ({ setShowRegister }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleClose = () => {
    setShowRegister(false);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleRegister = () => {
    if (username.trim() === "" || password.trim() === "") {
      setError("Username and password are required");
      return;
    }

    const userData = {
      username: username,
      password: password,
    };

    axios
    .post(`${import.meta.env.REACT_APP_BACKEND_URL}/auth/register`, userData)
    .then((response) => {
      localStorage.setItem("token", response.data.token);
      toast.success("Registration successful!");
      setUsername("");
      setPassword("");

      // Store userId only after successful registration
      const userId = response.data.userId; // Assuming your backend returns userId
      localStorage.setItem("username", username);

      localStorage.setItem("userId", userId);

      setTimeout(() => {
        setShowRegister(false);
      }, 2000);
    })
    .catch((error) => {
      console.error("Error during registration:", error);
      toast.error(error.response.data.errorMessage);
    });
  };

  return (
    <div className={styles.modal}>
      <div className={styles.container}>
        <button className={styles.closeButton} onClick={handleClose}>
          &times;
        </button>
        <h3>Register to SwipTory</h3>
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

        <Button
          name={"Register"}
          color={"#73ABFF"}
          handleClick={handleRegister}
        />
      </div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default Register;
