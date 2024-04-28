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
      password: password
    };

    // Send POST request to the backend using Axios
    axios.post("http://localhost:8000/api/v1/auth/register", userData)
      .then(response => {
        localStorage.setItem("token", response.data.token);
        toast.success("Registration successful!");
        setUsername("");
        setPassword("");
        setTimeout(() => {
          setShowRegister(false);
        }, 2000);
      })
      .catch(error => { 
        console.error("Error during registration:", error);
        toast.error("Error during registration. Please try again later.");
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

        <Button name={'Register'} color={'#73ABFF'} handleClick={handleRegister} />

      </div>
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </div>
  );
};

export default Register;
