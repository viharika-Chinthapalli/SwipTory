import { useEffect, useState } from "react";
import styles from "./ShareStory.module.css";
import axios from "axios";

const ShareStory = () => {
  const clickedID = localStorage.getItem("storyId");
  const [story, setStory] = useState({});
  const [stories, setStories] = useState([]);

  useEffect(() => {
    const fetchStoryById = async () => {
      if (clickedID) {
        const response = await axios.get(
          `${import.meta.env.REACT_APP_BACKEND_URL}/story/${clickedID}`
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
          `${import.meta.env.REACT_APP_BACKEND_URL}/story/get-stories`
        );
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
