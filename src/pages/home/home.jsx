import "./home.css";
import Scene_Rakha from "../../scenes/rakhascene/rakhascene";
import React, { useContext, useEffect, useRef, useState } from "react";
import SocialMedia from "../../components/socialmedia/socialmedia";
import GiantRound from "../../components/giantround/giantround";
import Nav from "../../components/nav/nav";
import { DimensionContext } from "../../providers/dimensionProvider";
import Waiting from "../../components/waiting/waiting";
import AchievementsSection from "./achievements";
import SkillsSection from "./skillssection";
import ContactSection from "./contactsection";
import SummarySection from "./summarysection";
import CoverSection from "./coversection";
import ProjectsSection from "./projectssection";

const Page_Home = React.memo(({ mousePosition }) => {

    const { dimension, without3d } = useContext(DimensionContext);

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
        if (pageDocumentRef.current.scrollTop >= window.innerHeight) {
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
        }
    };

    const handleScroll = (event) => {
        if (pageDocumentRef.current.scrollTop < window.innerHeight) {event.preventDefault();}
        const documentScroll = pageDocumentRef.current.scrollTop;
        const currentScrollPosition = documentScroll / window.innerHeight * 100;
        setScrollPosition(currentScrollPosition);
    };

    const handleTouchMove = (event) => {
        if (pageDocumentRef.current.scrollTop == 0) {event.preventDefault();}
    }
    // ===============================================


    const [projectPhaseProgress, setProjectPhaseProgress] = useState(0);

    useEffect(() => {
        setProjectPhaseProgress(
            scrollPosition <= 200
                ? scrollPosition <= 100
                    ? 0
                    : (scrollPosition - 100) / 100
                : (200 - (scrollPosition - 100)) / 100
        );
    }, [scrollPosition]);

    useEffect(() => {
        if (projectPhaseProgress < .1) {
            setProjectSectionScrollPosition(0);
        }
    }, [projectPhaseProgress]);
    // ===============================================


    useEffect(() => {
        if (pageDocumentRef.current) {
            pageDocumentRef.current.scrollTo({ left: 0, behavior: 'smooth' });
            pageDocumentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
            pageDocumentRef.current.addEventListener("wheel", handleWheel);
            pageDocumentRef.current.addEventListener("scroll", handleScroll);
            pageDocumentRef.current.addEventListener("touchmove", handleTouchMove, { passive: false });
        }
        return () => {
            if (pageDocumentRef.current) {
                pageDocumentRef.current.removeEventListener("wheel", handleWheel);
                pageDocumentRef.current.removeEventListener("scroll", handleScroll);
                pageDocumentRef.current.removeEventListener("touchmove", handleTouchMove, { passive: false });
            }
        };
    }, []);

    return (
        <div
            className="page_home"
            id="page_home"
            ref={pageDocumentRef}
        >

            {!(without3d ?? false) && <Waiting />}

            <Nav scroll={scrollPosition} pageDocumentRef={pageDocumentRef} />

            <GiantRound scroll={scrollPosition} />

            <SocialMedia scrollPosition={scrollPosition} />

            {
                dimension > 720 && !without3d &&
                <Scene_Rakha mousePosition={mousePosition} scrollPosition={scrollPosition} />
            }

            {/* COVER SECTION */}
            <CoverSection scrollPosition={scrollPosition} pageDocumentRef={pageDocumentRef} />

            {/* SUMMARY SECTION */}
            <SummarySection scrollPosition={scrollPosition} pageDocumentRef={pageDocumentRef} />


            {/* PROJECT SECTION */}
            <ProjectsSection projectSectionRef={projectSectionRef} projectPhaseProgress={projectPhaseProgress} />


            {/* SKILL SECTION */}
            <SkillsSection scrollPosition={scrollPosition} />


            {/* ACHIEVEMENT SECTION */}
            <AchievementsSection scrollPosition={scrollPosition} />


            {/* CONTACT SECTION */}
            <ContactSection />


        </div>
    );
});

export default Page_Home;