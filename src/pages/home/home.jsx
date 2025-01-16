import "./home.css";
import Icon_Chevron_Bottom from "../../assets/icons/chevron_bottom";
import Scene_Rakha from "../../scenes/rakhascene/rakhascene";
import React, { useContext, useEffect, useRef, useState } from "react";
import AllSkills from "../skills/skills";
import SocialMedia from "../../components/socialmedia/socialmedia";
import ProjectItem from "../../components/projectitem/projectitem";
import data_of_projects from "../../data/projects";
import { PopupContext } from "../../providers/popupProvider";
import { SkillsContext } from "../../providers/skillsProvider";
import { SuggestionsContext } from "../../providers/suggestionsProvider";
import GiantRound from "../../components/giantround/giantround";
import Nav from "../../components/nav/nav";
import { DimensionContext } from "../../providers/dimensionProvider";
import DimensionUnsupported from "../dimensionunsupported/dimensionunsupported";
import Page_Achievements from "../achievements/achievements";

const Page_Home = React.memo(({mousePosition}) => {

    const { dimension, without3d } = useContext(DimensionContext);

    // SKILL DATA
    const {skills, fetchSkills} = useContext(SkillsContext);
    useEffect(() => {
        const setSkillsProvider = async () => {
            if (skills.length == 0) {
                fetchSkills();
            }
        }
        setSkillsProvider();
    }, []);
    
    
    
    // SKILL SUGGESTIONS DATA
    const {suggestions, fetchSuggestions} = useContext(SuggestionsContext);
    useEffect(() => {
        const setSuggestionsProvider = async () => {
            if (suggestions.length == 0) {
                fetchSuggestions();
            }
        }
        setSuggestionsProvider();
    }, []);



    const {popupChild, setPopupChild} = useContext(PopupContext);

    const showAllSkills = () => {
        setPopupChild(
            <AllSkills />
        );
    };


    const pageDocumentRef = useRef(null);
    const projectSectionRef = useRef(null);


    // SCROLL CONTROL ================================
    const [scrollPosition, setScrollPosition] = useState(0);
    const [scrollMovement, setScrollMovement] = useState(0);
    const [isScrolling, setIsScrolling] = useState(false);

    const [projectSectionScrollPosition, setProjectSectionScrollPosition] = useState(0);
    useEffect(() => {
        if (projectSectionRef.current) {
            projectSectionRef.current.scrollTo({
                left: projectSectionScrollPosition,
                behavior: projectPhaseProgress === 1 ? 'smooth' : 'instant'
            });
        }
    }, [projectSectionScrollPosition]);
    
    useEffect(() => {

        if (scrollMovement >= 100 || scrollMovement <= -100) {
            setIsScrolling(true);
            setTimeout(() => {
                setIsScrolling(false)
            }, 300);
        }

        if (!isScrolling) {
            
            // IF IN PROJECTS PHASE
            if (
                projectPhaseProgress > 0
                && scrollMovement >= 100
                && projectSectionRef.current.scrollLeft < projectSectionRef.current.scrollWidth - window.innerWidth
            ) {
                if (projectPhaseProgress == 1) {
                    setProjectSectionScrollPosition((value) =>
                        value + 500 > projectSectionRef.current.scrollWidth - window.innerWidth
                            ? projectSectionRef.current.scrollWidth - window.innerWidth
                            : value + 500
                    );
                }
            } else if (
                projectPhaseProgress > 0
                && scrollMovement <= -100
                && projectSectionRef.current.scrollLeft > 0
            ) {
                if (projectPhaseProgress == 1) {
                    setProjectSectionScrollPosition((value) =>
                        value - 500 < 0
                            ? 0
                            : value - 500
                    );
                }
            }
            
            // ELSE, IF PAGE HAS NO SCROLL PREVENTION (DEFAULT)
            else {
                if (scrollMovement >= 100) {
                    pageDocumentRef.current.scrollTo({
                        top: (scrollPosition + 100) / 100 * window.innerHeight,
                        behavior: 'smooth'
                    });
                } else if (scrollMovement <= -100) {
                    pageDocumentRef.current.scrollTo({
                        top: (scrollPosition - 100) / 100 * window.innerHeight,
                        behavior: 'smooth'
                    });
                }
            }
        }

        const scrollMovementInterval = setInterval(() => {
            setScrollMovement((value) => value - value);
        }, 20);
        return () => {
            clearInterval(scrollMovementInterval);
        };

    }, [scrollMovement]);
    
    const handleWheel = (event) => {
        event.preventDefault();
        setScrollMovement((value) =>
            value + event.deltaY > 200
                ? 200
                : value + event.deltaY < -200
                    ? -200
                    : value + event.deltaY
        );
        if (projectPhaseProgress === 1 && event.deltaX !== 0) {
            setScrollMovement((value) =>
                value + event.deltaX > 200
                    ? 200
                    : value + event.deltaX < -200
                        ? -200
                        : value + event.deltaX
            );
        }
    };

    const handleScroll = () => {
        const documentScroll = pageDocumentRef.current.scrollTop;
        const currentScrollPosition = documentScroll / window.innerHeight * 100;
        setScrollPosition(currentScrollPosition);
    };
    // ===============================================

    
    // COVER PHASE PROGRESS ========================
    const [coverPhaseProgress, setCoverPhaseProgress] = useState(0);
    useEffect(() => {
        setCoverPhaseProgress(
            scrollPosition <= 100
                ? (100 - scrollPosition) / 100
                : 0
        );
    }, [scrollPosition]);
    // ===============================================

    // SUMMARY PHASE PROGRESS ========================
    const [summaryPhaseProgress, setSummaryPhaseProgress] = useState(0);
    useEffect(() => {
        setSummaryPhaseProgress(
            scrollPosition >= 100
                ? (100 - (scrollPosition - 100)) / 100
                : scrollPosition / 100
        );
    }, [scrollPosition]);
    // ===============================================

    // PROJECTS PHASE PROGRESS =======================
    const [projectPhaseProgress, setProjectPhaseProgress] = useState(0);
    useEffect(() => {
        if (projectPhaseProgress < .1) {
            setProjectSectionScrollPosition(0);
        }
    }, [projectPhaseProgress]);
    useEffect(() => {
        setProjectPhaseProgress(
            scrollPosition <= 200
            ? scrollPosition <= 100
                ? 0
                : (scrollPosition - 100) / 100
            : (200 - (scrollPosition - 100)) / 100
        );
    }, [scrollPosition]);
    // ===============================================

    // SKILL PHASE PROGRESS ==========================
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
    // ===============================================
    
    // ACHIEVEMENT PHASE PROGRESS ====================
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
    // ===============================================

    const showAllAchievemnts = () => {
        setPopupChild(
            <Page_Achievements />
        );
    };


    const goToScroll = (destination) => {
        pageDocumentRef.current.scrollTo({top: destination, behavior: 'smooth'})
    }


    useEffect(() => {
        if (pageDocumentRef.current) {
            pageDocumentRef.current.scrollTo({left: 0, behavior: 'smooth'});
            pageDocumentRef.current.scrollTo({top: 0, behavior: 'smooth'});
            pageDocumentRef.current.addEventListener("wheel", handleWheel);
            pageDocumentRef.current.addEventListener("scroll", handleScroll);
        }
        return () => {
            if (pageDocumentRef.current) {
                pageDocumentRef.current.removeEventListener("wheel", handleWheel);
                pageDocumentRef.current.removeEventListener("scroll", handleScroll);
            }
        };
    }, []);

    return(
        <div
            className="page_home scroll-container"
            id="page_home"
            ref={pageDocumentRef}
        >

            <Nav
                scroll={scrollPosition}
                buttonDataList={
                    [
                        {title: "Home", onClick: () => goToScroll(0)},
                        {title: "Summary", onClick: () => goToScroll(window.innerHeight)},
                        {title: "Projects", onClick: () => goToScroll(window.innerHeight * 2)},
                        {title: "Skills", onClick: () => goToScroll(window.innerHeight * 3)},
                        {title: "Achievements", onClick: () => goToScroll(window.innerHeight * 4)},
                        {title: "Contact", onClick: () => goToScroll(window.innerHeight * 5)},
                    ]
                }
            />

            <GiantRound scroll={scrollPosition} />

            <SocialMedia />

            {
                dimension > 720 && !without3d &&
                <Scene_Rakha mousePosition={mousePosition} scrollPosition={scrollPosition} />
            }

            <div className="section_top">
                
                <div className="mainlayout">

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
                            onClick={() => goToScroll(window.innerHeight)}
                        >
                            <p>Explore me</p>
                            <Icon_Chevron_Bottom dimension={12} color={"#000"} />
                        </button>
                    </div>

                </div>
                
            </div>


            {/* SUMMARY SECTION */}
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
                                <img src="./assets/img/people/rakha.webp" alt="" />
                            </div>
                            <div>
                                <div className="nametitle">
                                    <img className="img_small" src="./assets/img/people/rakha.webp" alt="" />
                                    <h2 className="gradient_text">Muhammad Rakha Fadhilah</h2>
                                </div>
                                <p>
                                Founder & CEO, Hiclob
                                | ASEAN ACE-YS 2023 & 2024 Delegate
                                | Top 38 Innovillage 2023, Telkom
                                | Diverse Tech Stacks Developer
                                    <br />
                                </p>
                            </div>
                        </div>
                        <div className="lower neum neum_hoverable">
                            {/* <h2>Summary</h2> */}
                            <p> I am driven by an <span>entrepreneurial</span> spirit and <span>passion</span> in <span>technology</span>.
                                As the founder
                                of <span><a href="https://hiclob.com" target="_blank">Hiclob</a></span>,
                                a platform connecting people with shared interests,
                                I strive to create <span>meaningful connections</span>.
                            </p>
                            <p> With experience across <span>Web, Mobile, and Desktop</span> platforms,
                                I specialize in the <span>JavaScript</span> and <span>Dart</span> ecosystem
                                and have worked on <span>diverse</span> tech stacks. </p>
                            <div></div>
                            <button
                                className="btn_see_my_project"
                                onClick={() => pageDocumentRef.current.scrollTo({top: window.innerHeight * 2, behavior: 'smooth'})}
                            >
                                <p>See my projects</p>
                                {/* <Icon_Chevron_Bottom dimension={12} /> */}
                            </button>
                        </div>
                    </div>
                </div>
            </div>


            {/* PROJECT SECTION */}
            <div
                className="section section_project"
                ref={projectSectionRef}
                style={{
                    opacity: projectPhaseProgress > 0.5 ? 1 : 0,
                    filter: `blur(${projectPhaseProgress > 0.5 ? 0 : 16}px)`
                }}
            >
                <div className="projects_container">
                    <div className="title">
                        <h1 className="gradient_text">Project Highlights</h1>
                        <h2>From 2023 to {new Date().getFullYear()}</h2>
                    </div>
                    <div className="projects_content">
                        
                        {
                            data_of_projects.map((projectData, index) => {
                                return(
                                    <ProjectItem
                                        key={index}
                                        data={projectData}
                                    />
                                );
                            })
                        }
                    
                    </div>
                </div>
            </div>


            {/* SKILL SECTION */}
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
                                <p>Node JS, Firebase, Express JS</p>
                            </div>

                            <br />
                            <div className="skill_item">
                                <h3>Others</h3>
                                <p>Electron, Vite, Webpack, Docker, Git, Github</p>
                            </div>

                        </div>
                        <br />
                        <br />
                        <button onClick={showAllSkills}><p>See all</p></button>
                    </div>
                </div>
            </div>


            {/* ACHIEVEMENT SECTION */}
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

            
            <div className="section">
                
            </div>

            
        </div>
    );
});

export default Page_Home;