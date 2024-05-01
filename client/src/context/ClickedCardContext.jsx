import { createContext, useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
const ClickedCardContext = createContext();

export const ClickedCardProvider = ({ children }) => {
  const [clickedCardId, setClickedCardId] = useState(null);
  useEffect(() => {}, [clickedCardId]);
  return (
    <ClickedCardContext.Provider value={{ clickedCardId, setClickedCardId }}>
      {children}
    </ClickedCardContext.Provider>
  );
};

ClickedCardProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useClickedCard = () => useContext(ClickedCardContext);
