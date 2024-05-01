import { useState } from "react";
import Cards from "../components/Cards/Cards";
import StoryCards from "../components/StoryCards/StoryCards";

const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div style={{ width: "100%" }}>
      <Cards onCategorySelect={handleCategorySelect} />
      <StoryCards category={selectedCategory} />
    </div>
  );
};

export default HomePage;
