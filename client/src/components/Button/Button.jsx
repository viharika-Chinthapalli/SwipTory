import styles from "./Button.module.css";
import PropTypes from "prop-types";

const Button = ({ name, color, handleClick }) => {
  return (
    <button
      onClick={handleClick}
      className={styles.container}
      style={{ background: color }}
    >
      {name}
    </button>
  );
};

Button.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default Button;
