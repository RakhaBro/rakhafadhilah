import React, { createContext, useEffect, useState, useMemo } from "react";

export const UimodeContext = createContext();

export const UimodeProvider = ({ children }) => {
  const [uimode, setUimode] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  );

  useEffect(() => {
    document.body.className = uimode + "_mode";
  }, [uimode]);

  const value = useMemo(
    () => ({
      uimode,
      setUimode,
    }),
    [uimode]
  );

  return (
    <UimodeContext.Provider value={value}>{children}</UimodeContext.Provider>
  );
};
