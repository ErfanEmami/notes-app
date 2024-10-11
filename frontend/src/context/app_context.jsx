import React, { createContext, useState, useContext } from "react";

// Create the context
const AppContext = createContext();

// Provider component
export const AppContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null); 
  const [authenticated, setAuthenticated] = useState(null); 

  const value = {
    loading, setLoading,
    error, setError,
    authenticated, setAuthenticated,
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the app context
export const useAppContext = () => useContext(AppContext);
