import React, { createContext, useState, useMemo } from 'react';

export const PopupContext = createContext();

export const PopupProvider = ({ children }) => {

  const [popupChild, setPopupChild] = useState(null);

  const value = useMemo(() => ({
    popupChild, setPopupChild
  }), [popupChild]);

  return (
    <PopupContext.Provider value={value}>
      {children}
    </PopupContext.Provider>
  );
};