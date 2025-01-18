import React, { createContext, useEffect, useState } from 'react';
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

    return (
        <BgmContext.Provider value={{
            isBgmPlaying, setIsBgmPlaying
        }}>
        {children}
        </BgmContext.Provider>
    );
};