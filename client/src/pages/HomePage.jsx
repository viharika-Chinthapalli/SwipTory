import React, { useState } from 'react';
import Navbar from '../components/Navbar/Navbar';
import Cards from '../components/Cards/Cards';
import StoryCards from '../components/StoryCards/StoryCards';

const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div>
      <Navbar />
      <Cards onCategorySelect={handleCategorySelect} />
      <StoryCards category={selectedCategory} />
    </div>
  );
};


export default HomePage;
