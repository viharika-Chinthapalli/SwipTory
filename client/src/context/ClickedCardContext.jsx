import React, { createContext, useState, useContext, useEffect } from "react";

const ClickedCardContext = createContext();

export const ClickedCardProvider = ({ children }) => {
  const [clickedCardId, setClickedCardId] = useState(null);
  useEffect(() => {
    console.log(clickedCardId);
  }, [clickedCardId])
  return (
    <ClickedCardContext.Provider value={{ clickedCardId, setClickedCardId }}>
      {children}
    </ClickedCardContext.Provider>
  );
};

export const useClickedCard = () => useContext(ClickedCardContext);
