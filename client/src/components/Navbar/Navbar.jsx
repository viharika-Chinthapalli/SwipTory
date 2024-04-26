import React, { useState, useEffect } from "react";
import styles from "./Navbar.module.css";
import Button from "../Button/Button";
import RegisterPage from "../../pages/RegisterPage";
import LoginPage from "../../pages/LoginPage";
import AddStory from "../AddStory/AddStory";
import bookmarkImg from "../../assets/Vector.jpg";
import profileImg from "../../assets/Calm and confident.png";
import hamburger from "../../assets/hamburger.png";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showAddStory, setShowAddStory] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate


  const loggedInStatus = localStorage.getItem("isLoggedIn");
  useEffect(() => {
    // Check login status from local storage
    if (loggedInStatus) {
      setIsLoggedIn(true);
    }
  }, [loggedInStatus]);

  const handleRegister = () => {
    setShowRegister(true);
  };

  const handleLogin = () => {
    setShowLogin(true);
  };

  const handleBookmarks = () => {
    navigate("/bookmarks");
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  const handleHamburgerClick = () => {
    setShowLogout(!showLogout);
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>SwipTory</div>
      <div className={styles.btn1}>
        {isLoggedIn ? (
          <>
            <Button
              name={
                <div className={styles.btn1}>
                  <img
                    className={styles.bookmarkImg}
                    src={bookmarkImg}
                    alt=""
                  />
                  Bookmark
                </div>
              }
              color={"#FF7373"}
              handleClick={handleBookmarks}
            />
            <Button
              name={"Add Story"}
              color={"#FF7373"}
              handleClick={() => setShowAddStory(true)}
            />
            <img className={styles.profileImg} src={profileImg} alt="" />

            <img
              className={styles.hamburger}
              src={hamburger}
              onClick={handleHamburgerClick}
            />
            {showLogout && (
              <div className={styles.logoutDiv}>
                <h3>Your Name</h3>
                <Button
                  name={"Logout"}
                  color={"#FF7373"}
                  handleClick={handleLogout}
                />
              </div>
            )}
          </>
        ) : (
          <>
            <Button
              name={"Register Now"}
              color={"#FF7373"}
              handleClick={handleRegister}
            />
            <Button
              name={"Sign In"}
              color={"#73ABFF"}
              handleClick={handleLogin}
            />
          </>
        )}
      </div>
      {showRegister && (
        <div className={styles.overlay}>
          <RegisterPage setShowRegister={setShowRegister} />
        </div>
      )}
      {showLogin && (
        <div className={styles.overlay}>
          <LoginPage setShowLogin={setShowLogin} />
        </div>
      )}
      {showAddStory && (
        <div className={styles.overlay}>
          <AddStory setShowAddStory={setShowAddStory} />
        </div>
      )}
    </div>
  );
};

export default Navbar;
