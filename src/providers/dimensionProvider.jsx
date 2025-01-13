import React, { createContext, useEffect, useState } from 'react';

export const DimensionContext = createContext();

export const DimensionProvider = ({ children }) => {

    const [dimension, setDimension] = useState(window.innerWidth);

    return (
        <DimensionContext.Provider value={{ dimension, setDimension }}>
        {children}
        </DimensionContext.Provider>
    );
};