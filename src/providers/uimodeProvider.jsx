import React, { createContext, useEffect, useState, useMemo } from "react";

export const UimodeContext = createContext();

export const UimodeProvider = ({ children }) => {
  const [uimode, setUimode] = useState("dark");

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
