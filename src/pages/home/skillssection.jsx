import React, { useContext, useEffect, useState } from "react";
import SoundManagement from "../../components/soundmanagement/howler";
import AllSkills from "../skills/skills";
import { PopupContext } from "../../providers/popupProvider";
import { SkillsContext } from "../../providers/skillsProvider";
import { SuggestionsContext } from "../../providers/suggestionsProvider";

const SkillsSection = React.memo(({scrollPosition}) => {

    
    // SKILL DATA
    const { skills, fetchSkills } = useContext(SkillsContext);

    // SKILL SUGGESTIONS DATA
    const { suggestions, fetchSuggestions } = useContext(SuggestionsContext);
        
    useEffect(() => {
        const setSkillsProvider = async () => {
            if (skills.length == 0) {
                fetchSkills();
            }
        }
        setSkillsProvider();
        const setSuggestionsProvider = async () => {
            if (suggestions.length == 0) {
                fetchSuggestions();
            }
        }
        setSuggestionsProvider();
    }, []);

    const { setPopupChild } = useContext(PopupContext);
    const [skillPhaseProgress, setSkillPhaseProgress] = useState(0);

    useEffect(() => {
        setSkillPhaseProgress(
            scrollPosition <= 300
                ? scrollPosition <= 200
                    ? 0
                    : (scrollPosition - 200) / 100
                : (300 - (scrollPosition - 100)) / 100
        );
    }, [scrollPosition]);

    const showAllSkills = () => {
        SoundManagement.playSound('click_3');
        setPopupChild(
            <AllSkills />
        );
    };

    return(
        <div className="section"
            style={{
                opacity: skillPhaseProgress > 0.5 ? 1 : 0,
                filter: `blur(${skillPhaseProgress > 0.5 ? 0 : 16}px)`
            }}
        >
            <div></div>
            <div className="skills_container">
                <div className="skills">
                    <h1 className="gradient_text">Tech Knowledge</h1>
                    <div className="skill_list">

                        <br />
                        <div className="skill_item">
                            <h3>Frontend</h3>
                            <p>React JS, React Native, Flutter, Three JS, React Three Fiber</p>
                        </div>

                        <br />
                        <div className="skill_item">
                            <h3>Backend</h3>
                            <p>Node JS, Firebase, MySQL</p>
                        </div>

                        <br />
                        <div className="skill_item">
                            <h3>Others</h3>
                            <p>Electron, Vite, Git, Github, Blender</p>
                        </div>

                    </div>
                    <br />
                    <br />
                    <button onClick={showAllSkills}><p>See all</p></button>
                </div>
            </div>
        </div>
    );
})

export default SkillsSection;