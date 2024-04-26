import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./StoryCards.module.css";
import StoryCard from "../StoryCard/StoryCard";
import ViewStory from "../ViewStory/ViewStory";

const StoryCards = ({ category }) => {
  const [stories, setStories] = useState([]);
  const [clickedCardId, setClickedCardId] = useState(null);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        let url = "http://localhost:8000/api/v1/story/get-stories";
        if (category && category !== "all") {
          url = `http://localhost:8000/api/v1/story/stories?type=${category}`;
        }
        const response = await axios.get(url);
        setStories(response.data.stories);
      } catch (error) {
        console.error("Error fetching stories:", error);
      }
    };

    fetchStories();
  }, [category]);

  const handleCardClick = (id) => {
    console.log("Clicked card ID:", id);
    setClickedCardId(id);
  };

  const handleCloseModal = () => {
    setClickedCardId(null);
  };

  const handleViewStory = () => {
    if (clickedCardId) {
      const clickedStoryIndex = stories.findIndex((story) => story._id === clickedCardId);
      return clickedStoryIndex;
    }
    return null;
  };

  return (
    <div>
      {clickedCardId !== null && (
        <ViewStory
          stories={stories}
          currentIndex={handleViewStory()}
          onClose={handleCloseModal}
        />
      )}
      <>
        {category === "all" && (
          <div>
            {["medical", "fruits", "world", "india"].map((card) => (
              <div key={card}>
                <h2 className={styles.heading}>Top Stories about {card}</h2>
                <div className={styles.container}>
                  {stories
                    .filter((story) => story.type === card)
                    .map((filteredStory) => (
                      <StoryCard
                        key={filteredStory._id}
                        story={filteredStory}
                        onClick={handleCardClick}
                      />
                    ))}
                </div>
                {stories.filter((story) => story.type === card).length ===
                  0 && (
                  <h2 className={`${styles.heading} ${styles.para}`}>
                    No cards available
                  </h2>
                )}
              </div>
            ))}
          </div>
        )}
        {category !== "all" && (
          <div>
            <h2 className={styles.heading}>Top Stories about {category}</h2>
            <div className={styles.container}>
              {stories.length > 0 ? (
                stories.map((story) => (
                  <StoryCard
                    key={story._id}
                    story={story}
                    onClick={handleCardClick}
                  />
                ))
              ) : (
                <p>No cards available for {category}</p>
              )}
            </div>
          </div>
        )}
      </>
    </div>
  );
};

StoryCards.propTypes = {
  category: PropTypes.string, // Allow null values
};

StoryCards.defaultProps = {
  category: null, // Set default value to null
};

export default StoryCards;
