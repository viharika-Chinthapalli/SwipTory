import React, { createContext, useState, useContext } from "react";

const EditCardContext = createContext();

export const EditCardProvider = ({ children }) => {
  const [clickedEditId, setClickedEditId] = useState(null);

  return (
    <EditCardContext.Provider value={{ clickedEditId, setClickedEditId }}>
      {children}
    </EditCardContext.Provider>
  );
};

export const useEditCardID = () => useContext(EditCardContext);
