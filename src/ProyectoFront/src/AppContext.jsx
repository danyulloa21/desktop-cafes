import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AppContext = createContext();

export function useAppContext() {
  return useContext(AppContext);
}

export function AppProvider({ children }) {
  const [user, setUser] = useState(null); // Aquí puedes almacenar el estado del usuario
  const nav = useNavigate();

  const handleLogout = () => {
    // Lógica de logout
    setUser(null);
    nav("/");
  };

  return (
    <AppContext.Provider value={{ user, setUser, handleLogout }}>
      {children}
    </AppContext.Provider>
  );
}

