// import React from 'react';
import styles from './Button.module.css';
const Button = ({ name, color, handleClick }) => {
  return (
      <button onClick={handleClick} className={styles.container} style={{ background: color }}>{name}</button>
  );
};

export default Button;
