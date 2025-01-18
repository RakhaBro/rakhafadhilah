import React, { createContext, useEffect, useState } from 'react';

export const PopupContext = createContext();

export const PopupProvider = ({ children }) => {

  const [popupChild, setPopupChild] = useState(null);

  useEffect(() => {
    const handlePopState = (event) => {
      event.preventDefault();
      alert("Back button tapped!");
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  });

  return (
    <PopupContext.Provider value={{ popupChild, setPopupChild }}>
      {children}
    </PopupContext.Provider>
  );
};