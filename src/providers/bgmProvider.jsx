import React, { createContext, useEffect, useState, useMemo } from 'react';
import SoundManagement from "../components/soundmanagement/howler";

export const BgmContext = createContext();

export const BgmProvider = ({ children }) => {

    const [isBgmPlaying, setIsBgmPlaying] = useState(false);

    useEffect(() => {
        if (isBgmPlaying) {
            SoundManagement.playSound('bgm');
        } else {
            SoundManagement.stopSound('bgm');
        }
    }, [isBgmPlaying]);

    const value = useMemo(() => ({
        isBgmPlaying, setIsBgmPlaying
    }), [isBgmPlaying]);

    return (
        <BgmContext.Provider value={value}>
        {children}
        </BgmContext.Provider>
    );
};