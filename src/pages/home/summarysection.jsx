import React, { useEffect, useState } from "react";
import Icon_Out from "../../assets/icons/outIcon";
import SoundManagement from "../../components/soundmanagement/howler";

const SummarySection = React.memo(({scrollPosition, pageDocumentRef}) => {

    const [summaryPhaseProgress, setSummaryPhaseProgress] = useState(0);
    
    useEffect(() => {
        setSummaryPhaseProgress(
            scrollPosition >= 100
                ? (100 - (scrollPosition - 100)) / 100
                : scrollPosition / 100
        );
    }, [scrollPosition]);

    const seeMyProjects = () => {
        SoundManagement.playSound('click_3');
        pageDocumentRef.current.scrollTo({ top: window.innerHeight * 2, behavior: 'smooth' });
    }

    return (
        <div className="section"
            style={{
                opacity: summaryPhaseProgress > 0.5 ? 1 : 0,
                filter: `blur(${summaryPhaseProgress > 0.5 ? 0 : 16}px)`
            }}
        >
            <div className="summary_container">
                <div className="summary">
                    <div className="upper neum neum_hoverable">
                        <div className="img_container">
                            <img loading="lazy" src="./assets/img/people/rakha.webp" alt="" />
                        </div>
                        <div>
                            <div className="nametitle">
                                <img loading="lazy" className="img_small" src="./assets/img/people/rakha.webp" alt="" />
                                <h2 className="gradient_text">Muhammad Rakha Fadhilah</h2>
                            </div>
                            <p>
                                Building Hiclob
                                | ASEAN ACE-YS 2023 & 2024 Delegate
                                | Top 38 Innovillage 2023, Telkom
                                | Diverse Tech Stacks Developer
                                <br />
                            </p>
                        </div>
                    </div>
                    <div className="lower neum neum_hoverable">
                        {/* <h2>Summary</h2> */}
                        <p> I am driven by an <span>entrepreneurial</span> spirit and <span>passion</span> in
                            creating <span>impactful innovations</span>.
                            As the founder
                            of <span><a href="https://hiclob.com" target="_blank">Hiclob<Icon_Out dimension={14} /></a></span>,
                            a platform connecting people with shared interests,
                            I strive to create <span>meaningful connections</span>.
                        </p>
                        <p> With experience across <span>Web, Mobile, and Desktop</span> platforms,
                            I specialize in the <span>JavaScript</span> and <span>Dart</span> ecosystem
                            and have worked on <span>diverse</span> tech stacks.</p>
                        <div></div>
                        <button
                            className="btn_see_my_project"
                            onClick={seeMyProjects}
                        >
                            <p>See all projects</p>
                            {/* <Icon_Chevron_Bottom dimension={12} /> */}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default SummarySection;