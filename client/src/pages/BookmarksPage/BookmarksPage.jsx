import React, { useState, useEffect } from "react";
import axios from "axios";
import StoryCard from "../../components/StoryCard/StoryCard";
import styles from "./BookmarksPage.module.css";
import ViewStory from "../../components/ViewStory/ViewStory";

const BookmarksPage = () => {
  const [stories, setStories] = useState([]);
  const [clickedCardId, setClickedCardId] = useState(null);

  const handleCardClick = (id) => {
    console.log("Clicked card ID:", id);
    setClickedCardId(id);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const userId = localStorage.getItem("userId");
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/bookmarks/${userId}`
      );
      const bookmarkedStoryIds = response.data.bookmarkedStories;

      if (bookmarkedStoryIds.length === 0) {
        setStories([]);
      } else {
        const storiesData = await Promise.all(
          bookmarkedStoryIds.map(async (storyId) => {
            const storyResponse = await axios.get(
              `http://localhost:8000/api/v1/story/${storyId}`
            );
            return storyResponse.data;
          })
        );
        setStories(storiesData);
      }

      console.log(response);
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
        <p>No bookmarks yet</p>
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
