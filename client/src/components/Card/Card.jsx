import PropTypes from 'prop-types';
import styles from './Card.module.css';

const Card = ({ image, title, onClick }) => {
  return (
    <div className={styles.container} onClick={onClick}>
      <div
        className={styles.cardImage}
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className={styles.cardText}>{title}</div>
      </div>
    </div>
  );
}; 

Card.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default Card;
