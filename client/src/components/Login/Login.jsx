import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../Register/Register.module.css";
import Button from "../Button/Button";

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
      .post(`${import.meta.env.REACT_APP_BACKEND_URL}/auth/login`, {
        username: username,
        password: password,
      })
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("username", response.data.username);
        toast.success("Login successful!");
        setUsername("");
        setPassword("");

        axios
          .get(`${import.meta.env.REACT_APP_BACKEND_URL}/auth/users`)
          .then((usersResponse) => {
            const users = usersResponse.data;
            console.log(users);
            const foundUser = users.find(
              (user) => user.username === response.data.username
            );

            if (foundUser) {
              const userId = foundUser._id;
              localStorage.setItem("userId", userId);
            } else {
              console.error("User not found");
            }
          })
          .catch((error) => {
            console.error("Error fetching users:", error);
          });

        setTimeout(() => {
          setShowLogin(false);
        }, 2000);
        console.log(response.data);
        return response.data.username;
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
        <Button name={"Login"} color={"#73ABFF"} handleClick={handleLogin} />
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

export default Login;
