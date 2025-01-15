import React, { createContext, useEffect, useState } from 'react';

export const UimodeContext = createContext();

export const UimodeProvider = ({ children }) => {

    const [uimode, setUimode] = useState(
        window.matchMedia('(prefers-color-scheme: dark)').matches
        ? "dark"
        : "light"
    );

    useEffect(() => {
        console.log(uimode);
    }, [uimode])
    
    return (
        <UimodeContext.Provider value={{ uimode, setUimode }}>
        {children}
        </UimodeContext.Provider>
    );
};