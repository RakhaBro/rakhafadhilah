import React, { useContext, useEffect, useState } from "react";
import SoundManagement from "../../components/soundmanagement/howler";
import Icon_Chevron_Bottom from "../../assets/icons/chevron_bottom";
import { LoadindicatorContext } from "../../providers/loadindicationProvider";
import { DimensionContext } from "../../providers/dimensionProvider";
import { BgmContext } from "../../providers/bgmProvider";

const CoverSection = React.memo(({scrollPosition, pageDocumentRef}) => {
    
    const { isBgmPlaying, setIsBgmPlaying } = useContext(BgmContext);
    const { doneWaiting } = useContext(LoadindicatorContext);
    const { without3d } = useContext(DimensionContext);

    const exploreMe = () => {
        SoundManagement.playSound('click_2');
        if (!isBgmPlaying) {setIsBgmPlaying(true);}
        pageDocumentRef.current.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
    }

    
    const [coverPhaseProgress, setCoverPhaseProgress] = useState(0);
    
    useEffect(() => {
        setCoverPhaseProgress(
            scrollPosition <= 80
                ? (80 - scrollPosition) / 100
                : 0
        );
    }, [scrollPosition]);
    
    return (
        <div className="section_top">

            <div className={"mainlayout" + (doneWaiting || without3d ? " initpage" : "")}>

                <div className="maintitle">
                    <h1 className="gradient_text">Rakha Fadhilah</h1>
                    <p>A Diverse Curious & Persever</p>
                </div>

                <div className="btn_scrolldown_container"
                    style={{
                        opacity: coverPhaseProgress,
                        display: coverPhaseProgress === 0 ? "none" : "flex"
                    }}
                >
                    <button className="btn_scrolldown"
                        onClick={exploreMe}
                    >
                        <p>Explore me</p>
                        <Icon_Chevron_Bottom dimension={12} color={"#000"} />
                    </button>
                </div>

            </div>

        </div>
    );
});

export default CoverSection;