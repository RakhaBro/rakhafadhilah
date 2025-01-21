import React, { useContext, useEffect, useState } from "react";
import "./nav.css";
import { UimodeContext } from "../../providers/uimodeProvider";
import Icon_Lightmode from "../../assets/icons/lightmode";
import Icon_Darkmode from "../../assets/icons/darkmode";
import SoundManagement from "../soundmanagement/howler";
import Icon_SoundOn from "../../assets/icons/soundonIcon";
import Icon_SoundOff from "../../assets/icons/soundoffIcon";

const Nav = React.memo(({scroll, pageDocumentRef}) => {

    const goToScroll = (destination) => {
        pageDocumentRef.current.scrollTo({ top: destination, behavior: 'smooth' })
    }

    const buttonDataList = [
        { title: "Home", onClick: () => goToScroll(0) },
        { title: "Summary", onClick: () => goToScroll(window.innerHeight) },
        { title: "Projects", onClick: () => goToScroll(window.innerHeight * 2) },
        { title: "Skills", onClick: () => goToScroll(window.innerHeight * 3) },
        { title: "Achievements", onClick: () => goToScroll(window.innerHeight * 4) },
        { title: "Contact", onClick: () => goToScroll(window.innerHeight * 5) },
    ]

    const { uimode, setUimode } = useContext(UimodeContext);
    const switchUiMode = () => {
        if (uimode == "light") {
            setUimode("dark");
        } else if (uimode == "dark") {
            setUimode("light");
        }
    }
    
    const [opacity, setOpacity] = useState(0);

    useEffect(() => {
        if (scroll < 100) {
            setOpacity(0);
        } else {
            setOpacity(1);
        }
    }, [scroll])

    const [isMuted, setIsMuted] = useState(false);
    useEffect(() => {
        SoundManagement.muteAllSounds(isMuted);
    }, [isMuted]);

    const switchMuteState = () => {
        setIsMuted((prev) => !prev);
    }
    
    return(
        <div className="nav">

            <div className="btns_left">
                <button onClick={switchUiMode}>
                    {
                        uimode == "light"
                        ? <Icon_Lightmode dimension={20} />
                        : <Icon_Darkmode dimension={20} />
                    }
                </button>
                <button onClick={switchMuteState}>
                    {
                        isMuted
                        ? <Icon_SoundOff dimension={27} />
                        : <Icon_SoundOn dimension={27} />
                    }
                </button>
            </div>
            
            <div className="nav_buttons" style={{opacity: opacity}} >
                {
                    buttonDataList.map((data, index) => (
                        <button
                            key={index}
                            onClick={opacity != 0 ? data.onClick : null} className="nav_button"
                        >
                            {data.title}
                        </button>
                    ))
                }
            </div>

        </div>
    );
})

export default Nav;