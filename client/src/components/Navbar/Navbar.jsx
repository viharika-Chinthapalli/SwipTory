import React, { useState, useEffect } from "react";
import styles from "./Navbar.module.css";
import Button from "../Button/Button";
import RegisterPage from "../../pages/RegisterPage";
import LoginPage from "../../pages/LoginPage";
import AddStory from "../AddStory/AddStory";
import bookmarkImg from "../../assets/Vector.jpg";
import profileImg from "../../assets/Calm and confident.png";
import hamburger from "../../assets/hamburger.png";
import { useNavigate } from "react-router-dom";
import { useEditCardID } from "../../context/EditCardContext";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showAddStory, setShowAddStory] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const { clickedEditId, setClickedEditId } = useEditCardID();
  const [showMenu, setShowMenu] = useState(false); // State to control hamburger menu

  const navigate = useNavigate();

  const loggedInStatus = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  useEffect(() => {
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
    localStorage.clear();
    setIsLoggedIn(false);
    setShowLogin(true);
  };

  const handleHamburgerClick = () => {
    setShowLogout(!showLogout);
  };

  const handleSmallScreenHamburger = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>SwipTory</div>
      <div>
        <img
          className={styles.hamburger1}
          src={hamburger}
          onClick={handleSmallScreenHamburger}
          alt="Hamburger Menu"
        />
        {showMenu && (
          <div className={styles.btn2}>
            <div className={styles.menu}>
              {isLoggedIn ? (
                <>
                  <div className={styles.menuItem}>
                    <h3>{username}</h3>

                    <Button
                      name={
                        <div className={styles.btn3}>
                          <img
                            className={styles.bookmarkImg}
                            src={bookmarkImg}
                            alt=""
                          />
                          Bookmarks
                        </div>
                      }
                      color={"#FF7373"}
                      handleClick={handleBookmarks}
                    />
                  </div>

                  <div className={styles.menuItem}>
                    <Button
                      name={"Add Story"}
                      color={"#FF7373"}
                      handleClick={() => setShowAddStory(true)}
                    />
                  </div>

                  {showMenu && (
                    <div className={styles.menuItem}>
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
                  <div className={styles.menuItem}>
                    <Button
                      name={"Register Now"}
                      color={"#FF7373"}
                      handleClick={handleRegister}
                    />
                  </div>
                  <div className={styles.menuItem}>
                    <Button
                      name={"Sign In"}
                      color={"#73ABFF"}
                      handleClick={handleLogin}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
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
                  Bookmarks
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
            <img
              className={styles.profileImg}
              src={profileImg}
              alt="profile image"
            />

            <img
              className={styles.hamburger}
              src={hamburger}
              onClick={handleHamburgerClick}
            />
            {showLogout && (
              <div className={styles.logoutDiv}>
                <h3>{username}</h3>
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
      {clickedEditId && (
        <div className={styles.overlay}>
          <AddStory setShowAddStory={setShowAddStory} />
        </div>
      )}
    </div>
  );
};

export default Navbar;
