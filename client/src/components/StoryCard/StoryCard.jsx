import PropTypes from 'prop-types';
import styles from './StoryCard.module.css';

const defaultImage = 'https://cdn.pixabay.com/photo/2023/05/19/05/33/boats-8003723_1280.jpg';

const StoryCard = ({ story, onClick }) => {
  const backgroundImage = story.img ? `url(${story.img})` : defaultImage;
  
  const handleCardClick = () => {
    onClick(story._id);
  };

  return (
    <div
      className={styles.container}
      style={{ backgroundImage: backgroundImage }}
      onClick={handleCardClick}
    >
      <div className={styles.overlay}>
        <h4 className={styles.heading}>{story.header}</h4>
        <h6 className={styles.paragraph}>{story.description}</h6>
      </div>
    </div>
  );
};

StoryCard.propTypes = {
  story: PropTypes.shape({
    img: PropTypes.string,
    header: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  }).isRequired,
  onClick: PropTypes.func.isRequired, // onClick prop is a function
};

export default StoryCard;
