import React from "react";
import styles from "./Slide.module.css";
const Slide = ({ number, onClick, onClose, showCloseButton }) => {
  return (
    <div className={styles.container}>
      {showCloseButton && (
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
      )}
      <div className={styles.slideContent} onClick={onClick}>
        Slide {number}
      </div>
    </div>
  );
};

export default Slide;
