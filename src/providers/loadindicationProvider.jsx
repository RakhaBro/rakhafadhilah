import React, { createContext, useEffect, useState } from 'react';

export const LoadindicatorContext = createContext();

export const LoadindicatorProvider = ({ children }) => {

    const [loads, setLoads] = useState([]);
    const [doneLoading, setDoneLoading] = useState(false);

    useEffect(() => {
        if (loads.length >= 3) {
            setDoneLoading(true);
        }
    }, [loads]);

    return (
        <LoadindicatorContext.Provider value={{ loads, setLoads, doneLoading }}>
            {children}
        </LoadindicatorContext.Provider>
    );
};