import React, { useState, useEffect } from "react";
import axios from "axios";
import StoryCard from "../../components/StoryCard/StoryCard";
const BookmarksPage = () => {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/story/bookmarks"
      );
      setStories(response.data.stories);
      console.log(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <h2>Your Bookmarks</h2>
      <div>
        {stories.map((story) => (
          <StoryCard key={story._id} story={story}/>
        ))}
      </div>
    </div>
  );
};

export default BookmarksPage;
