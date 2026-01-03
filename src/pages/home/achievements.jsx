import React, { useContext, useEffect, useState, lazy, Suspense } from "react";
import SoundManagement from "../../components/soundmanagement/howler"
import { PopupContext } from "../../providers/popupProvider";

// Lazy load modal page
const Page_Achievements = lazy(() => import("../achievements/achievements"));

const AchievementsSection = React.memo(({scrollPosition}) => {

    const { setPopupChild } = useContext(PopupContext);

    const [achievementPhaseProgress, setAchievementPhaseProgress] = useState(0);
    useEffect(() => {
        setAchievementPhaseProgress(
            scrollPosition <= 400
                ? scrollPosition <= 300
                    ? 0
                    : (scrollPosition - 300) / 100
                : (400 - (scrollPosition - 100)) / 100
        );
    }, [scrollPosition]);

    const showAllAchievemnts = () => {
        SoundManagement.playSound('click_2');
        setPopupChild(
            <Suspense fallback={<div style={{padding: '2rem'}}>Loading...</div>}>
                <Page_Achievements />
            </Suspense>
        );
    };

    return (
        <div className="section"
            style={{
                opacity: achievementPhaseProgress > 0.5 ? 1 : 0,
                filter: `blur(${achievementPhaseProgress > 0.5 ? 0 : 16}px)`
            }}
        >
            <div className="achievements_container">
                <div className="title">
                    <h1 className="gradient_text">Achievement Highlights</h1>
                    <h2>From 2023 to 2025</h2>
                    <br />
                    <br />
                    <button onClick={showAllAchievemnts}><p>See all</p></button>
                </div>
            </div>
        </div>
    );
});

export default AchievementsSection;