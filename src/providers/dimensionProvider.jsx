import React, { createContext, useEffect, useState } from 'react';

export const DimensionContext = createContext();

export const DimensionProvider = ({ children }) => {

    const [dimension, setDimension] = useState(window.innerWidth);

    const [without3d, setWithout3D] = useState(false);

    return (
        <DimensionContext.Provider value={{
            dimension, setDimension,
            without3d, setWithout3D
        }}>
        {children}
        </DimensionContext.Provider>
    );
};