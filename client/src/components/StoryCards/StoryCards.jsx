import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./StoryCards.module.css";
import StoryCard from "../StoryCard/StoryCard";
import ViewStory from "../ViewStory/ViewStory";
import Button from "../Button/Button";
import edit from "../../assets/edit-btn.png";
import { useClickedCard } from "../../context/ClickedCardContext";
import { useEditCardID } from "../../context/EditCardContext";

const StoryCards = ({ category }) => {
  const [stories, setStories] = useState([]);
  // const {setClickedCardId} = useClickedCard();
  const { clickedCardId, setClickedCardId } = useClickedCard();
  const { setClickedEditId } = useEditCardID();

  const [expandedCategories, setExpandedCategories] = useState([]);
  const [filteredStories, setFilteredStories] = useState([]);
  const [userStories, setUserStories] = useState([]);

  const userId = localStorage.getItem("userId");

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

    const fetchUserStories = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const response = await axios.get(
          `http://localhost:8000/api/v1/story/get-userstories/${userId}`
        );
        setUserStories(response.data.userStories);
      } catch (error) {
        console.error("Error fetching user stories:", error);
      }
    };

    fetchStories();
    fetchUserStories();
  }, [category]);

  const handleCardClick = (id) => {
    console.log("Clicked card ID:", id);
    const clickedStory = stories.find((story) => story._id === id);
    if (clickedStory) {
      const storiesToSend = stories.filter(
        (story) => story.type === clickedStory.type
      );
      setClickedCardId(id);
      setFilteredStories(storiesToSend); // Set the filtered stories to state
    }
  };

  const handleCloseModal = () => {
    setClickedCardId(null);
  };

  const handleViewAllClick = (clickedCategory) => {
    setExpandedCategories((prevExpandedCategories) => {
      // Add the clicked category to the list of expanded categories
      if (!prevExpandedCategories.includes(clickedCategory)) {
        return [...prevExpandedCategories, clickedCategory];
      } else {
        // Remove the clicked category if it's already expanded
        return prevExpandedCategories.filter(
          (category) => category !== clickedCategory
        );
      }
    });
  };

  const handleEdit = async (id) => {
    try {
      console.log("clicked id", id);
      setClickedEditId(id);
      const response = await axios.get(`http://localhost:8000/api/v1/story/${id}`);
      setFilteredStories([response.data.story]);
    } catch (error) {
      console.error("Error fetching story details:", error);
    }
  };
 
  return (
    <div>
      {clickedCardId !== null && (
        <ViewStory
          stories={filteredStories}
          currentIndex={filteredStories.findIndex(
            (story) => story._id === clickedCardId
          )}
          onClose={handleCloseModal}
        />
      )} 
      {category === "all" && (
        <>
          {["medical", "fruits", "world", "india"].map((card) => (
            <div key={card}>
              <h2 className={styles.heading}>Top Stories about {card}</h2>
              <div className={styles.container}>
                {stories
                  .filter((story) => story.type === card)
                  .slice(
                    0,
                    expandedCategories.includes(card) ? stories.length : 4
                  )
                  .map((filteredStory) => (
                    <div key={filteredStory._id}>
                      <StoryCard
                        story={filteredStory}
                        onClick={handleCardClick}
                      />
                      {userStories.includes(filteredStory._id) && (
                        <span className={styles.edit}>
                          <img
                            className={styles.editImage}
                            src={edit}
                            alt="edit image"
                          />
                          <Button
                            name={"Edit"}
                            color={"#FFFFFF"}
                            handleClick={() => handleEdit(filteredStory._id)}
                          />
                        </span>
                      )}
                    </div>
                  ))}
              </div>
              {stories.length === 0 && (
                <h1 className={styles.para}>No stories Available</h1>
              )}
              {stories.length !== 0 && !expandedCategories.includes(card) && (
                <div className={styles.btn}>
                  <Button
                    name={"See more"}
                    color={"#FF7373"}
                    handleClick={() => handleViewAllClick(card)}
                  />
                </div>
              )}
            </div>
          ))}
        </>
      )}
      {category !== "all" && (
        <div>
          <h2 className={styles.heading}>Top Stories about {category}</h2>
          <div className={styles.container}>
            {stories.length > 0 ? (
              stories.map((story) => (
                <div key={story._id} className={styles.cardContainer}>
                    <StoryCard story={story} onClick={handleCardClick} />
                  {userStories.includes(story._id) && (
                      <span className={styles.edit}>
                        <img
                          className={styles.editImage}
                          src={edit}
                          alt="edit image"
                        />
                        <Button
                          name={"Edit"}
                          color={"#FFFFFF"}
                          handleClick={() => handleEdit()}
                        />
                      </span>
                  )}
                </div>
              ))
            ) : (
              <p className={styles.para}>No cards available for {category}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

StoryCards.propTypes = {
  category: PropTypes.string,
};

StoryCards.defaultProps = {
  category: null,
};

export default StoryCards;
