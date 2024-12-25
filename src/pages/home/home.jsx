import "./home.css";
import Icon_Chevron_Bottom from "../../assets/icons/chevron_bottom";
import Scene_Rakha from "../../scenes/rakhascene/rakhascene";
import React, { useEffect, useRef, useState } from "react";
import SocialMedia from "../../components/socialmedia/socialmedia";
import ProjectItem from "../../components/projectitem/projectitem";

const Page_Home = React.memo(({mousePosition}) => {


    const pageDocumentRef = useRef(null);
    const projectSectionRef = useRef(null);


    // SCROLL CONTROL ================================
    const [scrollPosition, setScrollPosition] = useState(0);
    const [scrollMovement, setScrollMovement] = useState(0);
    const [isScrolling, setIsScrolling] = useState(false);

    const [projectSectionScrollPosition, setProjectSectionScrollPosition] = useState(0);
    useEffect(() => {
        projectSectionRef.current.scrollTo({
            left: projectSectionScrollPosition,
            behavior: projectPhaseProgress === 1 ? 'smooth' : 'instant'
        });
    }, [projectSectionScrollPosition]);
    
    useEffect(() => {

        if (scrollMovement >= 100 || scrollMovement <= -100) {
            setIsScrolling(true);
            setTimeout(() => {
                setIsScrolling(false)
            }, 400);
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
                        value + 400 > projectSectionRef.current.scrollWidth - window.innerWidth
                            ? projectSectionRef.current.scrollWidth - window.innerWidth
                            : value + 400
                    );
                }
            } else if (
                projectPhaseProgress > 0
                && scrollMovement <= -100
                && projectSectionRef.current.scrollLeft > 0
            ) {
                if (projectPhaseProgress == 1) {
                    setProjectSectionScrollPosition((value) =>
                        value - 400 < 0
                            ? 0
                            : value - 400
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



    useEffect(() => {
        projectSectionRef.current.scrollTo({left: 0, behavior: 'smooth'});
        pageDocumentRef.current.scrollTo({top: 0, behavior: 'smooth'});
        pageDocumentRef.current.addEventListener("wheel", handleWheel);
        pageDocumentRef.current.addEventListener("scroll", handleScroll);
        return () => {
            pageDocumentRef.current.removeEventListener("wheel", handleWheel);
            pageDocumentRef.current.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return(
        <div
            className="page_home scroll-container"
            id="page_home"
            ref={pageDocumentRef}
        >

            <Scene_Rakha mousePosition={mousePosition} scrollPosition={scrollPosition} />

            <div className="section_top">
                
                <div className="mainlayout">

                    <div className="maintitle">
                        <h1>Rakha Fadhilah</h1>
                        <p>Founder of Hiclob | React Developer</p>
                    </div>

                    <div className="btn_scrolldown_container"
                        style={{
                            opacity: coverPhaseProgress,
                            display: coverPhaseProgress === 0 ? "none" : "flex"
                        }}
                    >
                        <button className="btn_scrolldown"
                            onClick={() => pageDocumentRef.current.scrollTo({top: window.innerHeight, behavior: 'smooth'})}
                        >
                            <p>Start a tour</p>
                            <Icon_Chevron_Bottom dimension={12} color={"#000"} />
                        </button>
                    </div>

                </div>
                
                <SocialMedia />
            </div>


            {/* SUMMARY SECTION */}
            <div className="section">
                <div className="summary_container">
                    <div className="summary"
                        style={{
                            opacity: summaryPhaseProgress,
                            filter: `blur(${(1 - summaryPhaseProgress) * 12}px)`
                        }}
                    >
                        <div className="upper neum neum_hoverable">
                            <div className="img_container">
                                <img src="/assets/img/rakha.webp" alt="" />
                            </div>
                            <div>
                                <h2>Muhammad Rakha Fadhilah</h2>
                                <p>
                                    React JS, React Native, Node JS, Vite, Electron,
                                    Flutter, Firebase, React Three Fiber, Three JS
                                    <br />
                                    <span>(2+ years of study and work)</span>
                                </p>
                            </div>
                        </div>
                        <div className="lower neum neum_hoverable">
                            <h2>Summary</h2>
                            <p>
                                I embody an <span>entrepreneurial spirit</span> and a <span>strong passion</span> for technology. 
                                As the <span>founder</span> of
                                <span> <a href="https://hiclob.com" target="_blank">Hiclob</a></span>, 
                                a platform connecting people with shared interests, I aim to foster meaningful connections.
                            </p>
                            <p>
                                I have contributed to diverse projects
                                spanning <span>Web, Mobile, and Desktop</span> platforms, 
                                working with a wide range of <span>tech stacks</span>.
                                My expertise lies in the <span>JavaScript ecosystem</span>.
                            </p>
                            <div></div>
                            <button
                                className="btn_see_my_project"
                                onClick={() => pageDocumentRef.current.scrollTo({top: window.innerHeight * 2, behavior: 'smooth'})}
                            >
                                <p>See my projects</p>
                                {/* <Icon_Chevron_Bottom dimension={12} color={"#000"} /> */}
                            </button>
                        </div>
                    </div>
                </div>
            </div>


            {/* PROJECT SECTION */}
            <div className="section section_project" ref={projectSectionRef}>
                <div className="projects_container">
                    <div className="title">
                        <h1>Project Highlights</h1>
                        <h2>From 2022 to 2025</h2>
                    </div>
                    <div className="projects_content">
                        <ProjectItem />
                        <ProjectItem />
                        <ProjectItem />
                        <ProjectItem />
                        <ProjectItem />
                        <ProjectItem />
                        <ProjectItem />
                        <ProjectItem />
                    </div>
                </div>
            </div>


            {/* SKILL SECTION */}
            <div className="section">
                <div></div>
                <div className="skills_container">
                    <div className="skills"
                        style={{
                            opacity: skillPhaseProgress,
                            filter: `blur(${(1 - skillPhaseProgress) * 16}px)`
                        }}
                    >
                        <h1>Skills</h1>
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
                    </div>
                </div>
            </div>


            {/* ACHIEVEMENT SECTION */}
            <div className="section"
                style={{
                    opacity: achievementPhaseProgress,
                    filter: `blur(${(1 - achievementPhaseProgress) * 12}px)`
                }}
            >
                <div className="achievements_container">
                    <div className="title">
                        <h1>Achievement Highlights</h1>
                        <h2>From 2022 to 2024</h2>
                        <br />
                        <br />
                        <button><p>See more</p></button>
                    </div>
                </div>
            </div>

            
            <div className="section">
                
            </div>

            
        </div>
    );
});

export default Page_Home;