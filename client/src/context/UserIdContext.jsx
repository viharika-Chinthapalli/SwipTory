import { createContext, useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
const UserIdContext = createContext();

export const UserIDProvider = ({ children }) => {
  const [userID, setUserId] = useState(null);
  const storedUserId = localStorage.getItem("userId");
  useEffect(() => {
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, [storedUserId]);

  return (
    <UserIdContext.Provider value={{ userID, setUserId }}>
      {children}
    </UserIdContext.Provider>
  );
};

UserIDProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export const useUserID = () => useContext(UserIdContext);
