import React, { createContext, useState, useMemo, useEffect } from "react";

export const DimensionContext = createContext();

export const DimensionProvider = ({ children }) => {
  const [dimension, setDimension] = useState(window.innerWidth);
  const [without3d, setWithout3D] = useState(false);

  // Update dimension on window resize
  useEffect(() => {
    const handleResize = () => {
      setDimension(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const value = useMemo(
    () => ({
      dimension,
      setDimension,
      without3d,
      setWithout3D,
    }),
    [dimension, without3d]
  );

  return (
    <DimensionContext.Provider value={value}>
      {children}
    </DimensionContext.Provider>
  );
};
