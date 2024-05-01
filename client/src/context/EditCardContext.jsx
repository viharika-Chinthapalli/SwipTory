import { createContext, useState, useContext } from "react";
import PropTypes from "prop-types";
const EditCardContext = createContext();

export const EditCardProvider = ({ children }) => {
  const [clickedEditId, setClickedEditId] = useState(null);

  return (
    <EditCardContext.Provider value={{ clickedEditId, setClickedEditId }}>
      {children}
    </EditCardContext.Provider>
  );
};

EditCardProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useEditCardID = () => useContext(EditCardContext);
