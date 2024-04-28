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
import { toast } from "react-toastify";

const ViewStory = ({ stories, currentIndex, onClose }) => {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(currentIndex);
  const [bookmarkStatus, setBookmarkStatus] = useState({});
  const [likeStatus, setLikeStatus] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [likes, setLikes] = useState([]);

  const story = stories[currentStoryIndex];
  const storyId = story._id;
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentStoryIndex]);

  useEffect(() => {
    // Check login status from local storage
    const loggedInStatus = localStorage.getItem("token");
    if (loggedInStatus) {
      setIsLoggedIn(true);
    }

    const fetchInitialBookmarkStatus = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/bookmarks/${userId}`
        );
        const bookmarkedStoryIds = response.data.bookmarkedStories;
        const initialBookmarkStatus = {};
        for (const story of stories) {
          initialBookmarkStatus[story._id] = bookmarkedStoryIds.includes(
            String(story._id)
          );
        }
        setBookmarkStatus(initialBookmarkStatus);
      } catch (error) {
        console.error("Error fetching initial bookmark status:", error);
        toast.error("Failed to fetch initial bookmark status", {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    };

    fetchInitialBookmarkStatus();
  }, [userId, stories]);

  useEffect(() => {
    // Check login status from local storage
    const loggedInStatus = localStorage.getItem("token");
    if (loggedInStatus) {
      setIsLoggedIn(true);
    }

    const fetchInitialLikedStatus = async () => {
      try {
        const response = await axios.post(
          `http://localhost:8000/api/v1/like-story/like/${userId}/${storyId}`
        );
        const likedStoryIds = response.data.like.likedStories;
        const updatedLikeStatus = {};
        for (const story of stories) {
          updatedLikeStatus[story._id] = likedStoryIds.includes(
            String(story._id)
          );
        }
        setLikeStatus(updatedLikeStatus);
      } catch (error) {
        console.error("Error fetching initial bookmark status:", error);
        toast.error("Failed to fetch initial bookmark status", {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    };

    fetchInitialLikedStatus();
  }, [userId, stories]);

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
    const storyLink = `http://localhost:5173/story/${story._id}`;
    navigator.clipboard.writeText(storyLink);

    // Show toast message
    toast.success("Link copied to clipboard!", {
      position: toast.POSITION.BOTTOM_CENTER,
    });
  };

  const handleBookmark = async () => {
    if (!isLoggedIn) {
      // Handle case when user is not logged in
      toast.error("Please log in to bookmark.");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:8000/api/v1/bookmark/${userId}/${storyId}`
      );
      const bookmarkedStoryIds = response.data.bookmark.bookmarkedStories;
      const updatedBookmarkStatus = {};
      for (const story of stories) {
        updatedBookmarkStatus[story._id] = bookmarkedStoryIds.includes(
          String(story._id)
        );
      }
      setBookmarkStatus(updatedBookmarkStatus);
      toast.success("Bookmark status toggled successfully");
    } catch (error) {
      console.error("Error toggling bookmark status:", error);
      toast.error("Failed to toggle bookmark status");
    }
  };

  const handleLike = async () => {
    if (!isLoggedIn) {
      // Handle case when user is not logged in
      toast.error("Please log in to like.");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:8000/api/v1/like-story/like/${userId}/${storyId}`
      );
      const likedStoryIds = response.data.like.likedStories;
      const updatedLikeStatus = {};
      for (const story of stories) {
        updatedLikeStatus[story._id] = likedStoryIds.includes(
          String(story._id)
        );
      }
      setLikeStatus(updatedLikeStatus);
      toast.success("Like status toggled successfully");
    } catch (error) {
      console.error("Error toggling like status:", error);
      toast.error("Failed to toggle like status");
    }
  };

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const url = `http://localhost:8000/api/v1/story/${storyId}`;
        const response = await axios.get(url);
        setLikes(response.data.likeCount); // Update state with the like count
      } catch (error) {
        console.error(`Error fetching likes for story ${storyId}:`, error);
        setLikes(0); // Set likes to 0 if there's an error fetching likes
      }
    };
  
    fetchLikes();
  }, [storyId]);
  

  return (
    <div className={styles.overlay1}>
      <div
        className={styles.container}
        style={{ backgroundImage: `url(${story.img})` }}
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
              {bookmarkStatus[story._id] === true ? (
                <img src={TrueBookmark} alt="bookmark img" />
              ) : (
                <img src={bookmarkImg} alt="bookmark img" />
              )}
            </div>
            <div className={styles.heartImg} onClick={handleLike}>
              {likeStatus[story._id] === true ? (
                <img src={TrueHeart} alt="heart img" />
              ) : (
                <img src={heartImg} alt="heart img" />
              )}
              <div className={styles.count}>{likes}</div>
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
      _id: PropTypes.string.isRequired,
      img: PropTypes.string,
      header: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      likeCount: PropTypes.number.isRequired, // Add this line for likeCount validation
    })
  ).isRequired,
  currentIndex: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ViewStory;
