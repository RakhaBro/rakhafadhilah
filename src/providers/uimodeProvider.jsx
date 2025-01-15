import React, { createContext, useEffect, useState } from 'react';

export const UimodeContext = createContext();

export const UimodeProvider = ({ children }) => {

    const [uimode, setUimode] = useState(
        window.matchMedia('(prefers-color-scheme: dark)').matches
        ? "dark"
        : "light"
    );

    useEffect(() => {
        document.body.className = uimode + "_mode";
        console.log(document.body.className);
    }, [uimode])
    
    return (
        <UimodeContext.Provider value={{ uimode, setUimode }}>
        {children}
        </UimodeContext.Provider>
    );
};