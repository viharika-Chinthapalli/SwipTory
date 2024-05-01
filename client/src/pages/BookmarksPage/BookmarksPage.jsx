import { useState, useEffect } from "react";
import axios from "axios";
import StoryCard from "../../components/StoryCard/StoryCard";
import styles from "./BookmarksPage.module.css";
import ViewStory from "../../components/ViewStory/ViewStory";

const BookmarksPage = () => {
  const [stories, setStories] = useState([]);
  const [clickedCardId, setClickedCardId] = useState(null);
  localStorage.setItem("storyId", clickedCardId);
  const handleCardClick = (id) => {
    setClickedCardId(id);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const userId = localStorage.getItem("userId");
    try {
      const response = await axios.get(
        `${import.meta.env.REACT_APP_BACKEND_URL}/bookmarks/${userId}`
      );
      const bookmarkedStoryIds = response.data.bookmarkedStories;

      if (bookmarkedStoryIds.length === 0) {
        setStories([]);
      } else {
        const storiesData = await Promise.all(
          bookmarkedStoryIds.map(async (storyId) => {
            const storyResponse = await axios.get(
              `${import.meta.env.REACT_APP_BACKEND_URL}/story/${storyId}`
            );
            return storyResponse.data;
          })
        );
        setStories(storiesData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleCloseModal = () => {
    setClickedCardId(null);
  };

  return (
    <div className={styles.container}>
      {clickedCardId !== null && (
        <ViewStory
          stories={stories}
          currentIndex={stories.findIndex(
            (story) => story._id === clickedCardId
          )}
          onClose={handleCloseModal}
        />
      )}

      <h2>Your Bookmarks</h2>
      {stories.length === 0 ? (
        <p className={styles.bookmarks}>No bookmarks yet</p>
      ) : (
        <div className={styles.cards}>
          {stories.map((story) => (
            <StoryCard
              key={story._id}
              story={story}
              onClick={handleCardClick}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BookmarksPage;
