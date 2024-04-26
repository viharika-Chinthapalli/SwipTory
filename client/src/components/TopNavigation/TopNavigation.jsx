import React from 'react';
import PropTypes from 'prop-types';
import styles from './TopNavigation.module.css';

const TopNavigation = ({ stories, onClick }) => {
  return (
    <div className={styles.topNav}>
      {stories.map((story, index) => (
        <button key={index} onClick={() => onClick(story)}>
          {story.header}
        </button>
      ))}
    </div>
  );
};

TopNavigation.propTypes = {
  stories: PropTypes.arrayOf(
    PropTypes.shape({
      header: PropTypes.string.isRequired
    })
  ).isRequired,
  onClick: PropTypes.func.isRequired, // onClick prop is a function to switch stories
};

export default TopNavigation;
