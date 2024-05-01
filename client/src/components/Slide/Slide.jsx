import PropTypes from "prop-types";
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
      <div className={styles.slideContent}>Slide {number}</div>
    </div>
  );
};

Slide.propTypes = {
  number: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  showCloseButton: PropTypes.bool.isRequired,
  isSelected: PropTypes.bool.isRequired,
};

export default Slide;
