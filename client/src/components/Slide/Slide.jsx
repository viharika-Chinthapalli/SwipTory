import React, { useState } from "react";
import styles from "./Slide.module.css";

const Slide = ({ number, onClick, onClose, showCloseButton, isSelected }) => {
  return (
    <div
      className={`${styles.container} ${isSelected ? styles.selected : ""}`}
      onClick={onClick}
    >
      {showCloseButton && (
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
      )}
      <div className={styles.slideContent}>
        Slide {number}
      </div>
    </div>
  );
};

export default Slide;
