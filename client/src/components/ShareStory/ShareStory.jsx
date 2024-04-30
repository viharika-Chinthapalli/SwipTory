import React, { useEffect, useState } from "react";
import styles from "./ShareStory.module.css";
import axios from "axios";
import leftArrow from "../../assets/left-arrow.png";
import rightArrow from "../../assets/right-arrow.png";
import bookmarkImg from "../../assets/bookmark.png";
import TrueBookmark from "../../assets/trueBookmark.png";
import heartImg from "../../assets/heart.png";
import TrueHeart from "../../assets/trueHeart.png";
import sendImg from "../../assets/send.png";
import closeImg from "../../assets/close.png";

const ShareStory = () => {
  const clickedID = localStorage.getItem("storyId");
  const [story, setStory] = useState({});
  const [stories, setStories] = useState([]);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(clickedID);
  const userID = localStorage.getItem("userID");

  useEffect(() => {
    const fetchStoryById = async () => {
      if (clickedID) {
        const response = await axios.get(
          `http://localhost:8000/api/v1/story/${clickedID}`
        );
        setStory(response.data);
      }
    };
    fetchStoryById();
  }, [clickedID]);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/story/get-stories"
        );
        console.log(response)
        setStories(response.data.stories);
      } catch (error) {
        console.error("Error fetching stories:", error);
      }
    };
    fetchStories();
  }, [clickedID]);

  return (
    <div className={styles.overlay1}>
      <div
        className={styles.container}
        style={{ backgroundImage: `url(${story.img})` }}
      >
        <div className={styles.overlay2}>
          <div className={styles.text}>
            <h4 className={styles.heading}>{story.header}</h4>
            <h6 className={styles.paragraph}>{story.description}</h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareStory;
