import React, { createContext, useState } from 'react';

export const PopupContext = createContext();

export const PopupProvider = ({ children }) => {
  const [popupChild, setPopupChild] = useState(null);

  return (
    <PopupContext.Provider value={{ popupChild, setPopupChild }}>
      {children}
    </PopupContext.Provider>
  );
};