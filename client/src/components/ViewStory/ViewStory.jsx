import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import styles from "./ViewStory.module.css";
import leftArrow from "../../assets/left-arrow.png";
import rightArrow from "../../assets/right-arrow.png";
import bookmarkImg from "../../assets/bookmark.png";
import TrueBookmark from "../../assets/trueBookmark.png";
import heartImg from "../../assets/heart.png";
import TrueHeart from "../../assets/trueHeart.png";
import sendImg from "../../assets/send.png";
import closeImg from "../../assets/close.png";
import axios from "axios";
import {toast} from "react-toastify";

const ViewStory = ({ stories, currentIndex, onClose }) => {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(currentIndex);
  const [bookmarkStatus, setBookmarkStatus] = useState({});
  const [likeStatus, setLikeStatus] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentStoryIndex]);

  useEffect(() => {
    const fetchInitialStoryStatus = async () => {
      try {
        const initialBookmarkStatus = {};
        const initialLikeStatus = {};
        for (const story of stories) {
          const response = await axios.get(
            `http://localhost:8000/api/v1/story/${story._id}`
          );
          initialBookmarkStatus[story._id] = response.data.isBookmarked;
          initialLikeStatus[story._id] = response.data.isLiked;
        }
        setBookmarkStatus(initialBookmarkStatus);
        setLikeStatus(initialLikeStatus);
      } catch (error) {
        console.error("Error fetching initial story statuses:", error);
      }
    };

    fetchInitialStoryStatus();
  }, []);

  const handleNext = () => {
    setCurrentStoryIndex((prevIndex) =>
      prevIndex === stories.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentStoryIndex((prevIndex) =>
      prevIndex === 0 ? stories.length - 1 : prevIndex - 1
    );
  };

  const handleClose = () => {
    onClose();
  };

  const handleShare = () => {
    // Copy link to clipboard
    const story = stories[currentStoryIndex];
    const storyLink = `http://localhost:5173/story/${story._id}`; // Replace with actual URL
    navigator.clipboard.writeText(storyLink);

    // Show toast message
    toast.success("Link copied to clipboard!", {
      position: toast.POSITION.BOTTOM_CENTER
    });
  };

  const handleBookmark = async () => {
    try {
      const story = stories[currentStoryIndex];
      const updatedStory = { ...story };
      await axios.put(
        `http://localhost:8000/api/v1/story/${story._id}`,
        updatedStory
      );
      setBookmarkStatus((prevStatus) => ({
        ...prevStatus,
        [story._id]: !prevStatus[story._id]
      }));
      console.log("Bookmark updated successfully!");
    } catch (error) {
      console.error("Error updating bookmark:", error);
    }
  };

  const handleLike = async () => {
    try {
      const story = stories[currentStoryIndex];
      const updatedStory = { ...story };
      await axios.put(
        `http://localhost:8000/api/v1/story/updateLike/${story._id}`,
        updatedStory
      );
      setLikeStatus((prevStatus) => ({
        ...prevStatus,
        [story._id]: !prevStatus[story._id]
      }));
      console.log("Like updated successfully!");
    } catch (error) {
      console.error("Error updating like:", error);
    }
  };

  const story = stories[currentStoryIndex];
  const backgroundImage = story.img ? `url(${story.img})` : "";

  return (
    <div className={styles.overlay1}>
      <div
        className={styles.container}
        style={{ backgroundImage: backgroundImage }}
      >
        <div className={styles.topContainer}>
          <div className={styles.closeImg} onClick={handleClose}>
            <img src={closeImg} alt="close img" />
          </div>
          <div className={styles.sendImg} onClick={handleShare}>
            <img src={sendImg} alt="send img" />
          </div>
        </div>
        <div className={styles.overlay2}>
          <div className={styles.text}>
            <h4 className={styles.heading}>{story.header}</h4>
            <h6 className={styles.paragraph}>{story.description}</h6>
          </div>
          <div className={styles.bottomContainer}>
            <div className={styles.bookmarkImg} onClick={handleBookmark}>
              {bookmarkStatus[story._id] ? (
                <img src={TrueBookmark} alt="bookmark img" />
              ) : (
                <img src={bookmarkImg} alt="bookmark img" />
              )}
            </div>
            <div className={styles.heartImg} onClick={handleLike}>
              {likeStatus[story._id] ? (
                <img src={TrueHeart} alt="heart img" />
              ) : (
                <img src={heartImg} alt="heart img" />
              )}
            </div>
          </div>
        </div>

        <div className={styles.progressIndicator}>
          {stories.map((_, index) => (
            <div
              key={index}
              className={
                currentStoryIndex === index
                  ? styles.activeProgressDot
                  : styles.progressDot
              }
            ></div>
          ))}
        </div>
      </div>

      <div className={styles.arrowLeft} onClick={handlePrev}>
        <img src={leftArrow} alt="left-arrow" />
      </div>
      <div className={styles.arrowRight} onClick={handleNext}>
        <img src={rightArrow} alt="right-arrow" />
      </div>
    </div>
  );
};

ViewStory.propTypes = {
  stories: PropTypes.arrayOf(
    PropTypes.shape({
      img: PropTypes.string,
      header: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
  currentIndex: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ViewStory;
