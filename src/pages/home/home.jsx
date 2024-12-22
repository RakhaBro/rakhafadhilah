import "./home.css";
import Icon_Chevron_Bottom from "../../assets/icons/chevron_bottom";
import Scene_Rakha from "../../scenes/rakhascene/rakhascene";
import { useEffect, useRef, useState } from "react";
import SocialMedia from "../../components/socialmedia/socialmedia";

function Page_Home() {

    const pageDocumentRef = useRef(null);
    
    // SCROLL CONTROL ================================
    const [scrollPosition, setScrollPosition] = useState(0);
    
    const handleScroll = () => {
        const documentScroll = pageDocumentRef.current.scrollTop;
        const currentScrollPosition = documentScroll / window.innerHeight * 100;
        setScrollPosition(currentScrollPosition);
    };
    // ===============================================

    // MOUSE ========================================
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (event) => {
        setMousePosition({
            x: (event.clientX - (window.innerWidth / 2)) / window.innerWidth * 2,
            y: (event.clientY - (window.innerHeight / 2)) / window.innerHeight * -2
        });
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



    useEffect(() => {
        pageDocumentRef.current.scrollTo({top: 0, behavior: 'smooth'});
        pageDocumentRef.current.addEventListener("scroll", handleScroll);
        return () => {
            pageDocumentRef.current.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return(
        <div
            className="page_home"
            id="page_home"
            ref={pageDocumentRef}
            onMouseMove={handleMouseMove}
        >

            <Scene_Rakha mousePosition={mousePosition} scrollPosition={scrollPosition} />

            <div className="section_top">
                
                <div className="mainlayout">

                    <div className="maintitle">
                        <h1>Rakha Fadhilah</h1>
                        <p>Founder of Hiclob | React Developer</p>
                    </div>

                    <button className="btn_scrolldown"
                        onClick={() => pageDocumentRef.current.scrollTo({top: window.innerHeight, behavior: 'smooth'})}
                        style={{
                            opacity: coverPhaseProgress,
                            display: coverPhaseProgress === 0 ? "none" : "flex"
                        }}
                    >
                        <p>Scroll down</p>
                        <Icon_Chevron_Bottom dimension={12} color={"#000"} />
                    </button>

                </div>
                
                <SocialMedia />
            </div>

            {/* SUMMARY SECTION */}
            <div className="section">
                <div className="summary_container">
                    <div className="summary"
                        style={{
                            opacity: 2 * (summaryPhaseProgress - .5)
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
                                </p>
                            </div>
                        </div>
                        <div className="lower neum neum_hoverable">
                            <h2>About</h2>
                            <br />
                            <p>
                                I can proudly admit that I have <span>entreperneurial spirit</span> and <span>strong passion</span> in
                                technology. Currently, I am a <span>founder</span> and an executive at a startup project,
                                <span> Hiclob</span>, a meet-based social platform to connect people with similar interest.
                            </p>
                            <br />
                            <p>
                                For <span>technical experience</span>, I have been working as a developer for almost 3 years
                                and have been involved in many projects with <span>divergent</span> tech-stacks. Most tech-stacks
                                I have been familiar with is <span>Javascript</span> ecosystem.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* SKILL SECTION */}
            <div className="section">
                <div></div>
                <div className="skill_container">
                    <div className="skill">
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
            
        </div>
    );
}

export default Page_Home;