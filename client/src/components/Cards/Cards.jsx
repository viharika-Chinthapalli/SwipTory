import PropTypes from 'prop-types';
import axios from 'axios';
import styles from './Cards.module.css';
import Card from '../Card/Card';
import AllImg from '../../assets/All.png';
import fruitsImg from '../../assets/fruits.png';
import indiaImg from '../../assets/india.png';
import medicalImg from '../../assets/medical.png';
import worldImg from '../../assets/world.png';

const Cards = ({ onCategorySelect }) => {
  const handleCardClick = async (type) => {
    try {
      let url = `http://localhost:8000/api/v1/story/stories?type=${type}`;
      if (type === 'all') {
        url = 'http://localhost:8000/api/v1/story/get-stories';
      }
      const response = await axios.get(url);
      onCategorySelect(type);
    } catch (error) {
      console.error('Error fetching stories:', error);
    }
  };
 
  return (
    <div className={styles.container}>
      <Card image={AllImg} title="All" onClick={() => handleCardClick('all')} />
      <Card image={medicalImg} title="Medical" onClick={() => handleCardClick('medical')} />
      <Card image={fruitsImg} title="Fruits" onClick={() => handleCardClick('fruits')} />
      <Card image={worldImg} title="World" onClick={() => handleCardClick('world')} />
      <Card image={indiaImg} title="India" onClick={() => handleCardClick('india')} />
    </div>
  );
};

Cards.propTypes = {
  onCategorySelect: PropTypes.func.isRequired
};

export default Cards;
