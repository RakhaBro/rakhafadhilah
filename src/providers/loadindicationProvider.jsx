import React, { createContext, useEffect, useState, useMemo } from 'react';

export const LoadindicatorContext = createContext();

export const LoadindicatorProvider = ({ children }) => {

    const [loads, setLoads] = useState([]);
    const [doneLoading, setDoneLoading] = useState(false);

    useEffect(() => {
        if (loads.length >= 3) {
            setDoneLoading(true);
        }
    }, [loads]);

    const value = useMemo(() => ({
        loads, setLoads, doneLoading
    }), [loads, doneLoading]);

    return (
        <LoadindicatorContext.Provider value={value}>
            {children}
        </LoadindicatorContext.Provider>
    );
};