import React, { createContext, useState, useContext, useEffect } from "react";

const UserIdContext = createContext();

export const UserIDProvider = ({ children }) => {
  const [userID, setUserId] = useState(null);

  // Fetch user ID from local storage on component mount
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

export const useUserID = () => useContext(UserIdContext);
