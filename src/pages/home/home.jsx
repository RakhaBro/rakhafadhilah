import "./home.css";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  lazy,
  Suspense,
} from "react";
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
import ErrorBoundary3D from "../../components/errorboundary/ErrorBoundary3D";

// Lazy load 3D scene - defers ~300KB+ of Three.js until needed
const Scene_Rakha = lazy(() => import("../../scenes/rakhascene/rakhascene"));

const Page_Home = React.memo(({ mousePosition }) => {
  const { dimension, without3d } = useContext(DimensionContext);

  const pageDocumentRef = useRef(null);
  const projectSectionRef = useRef(null);

  // SCROLL CONTROL ================================
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollPositionRef = useRef(0);
  const scrollMovementRef = useRef(0);
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef(null);

  // Keep ref in sync with state for use in event handlers (avoids stale closures)
  useEffect(() => {
    scrollPositionRef.current = scrollPosition;
  }, [scrollPosition]);

  const [projectSectionScrollPosition, setProjectSectionScrollPosition] =
    useState(0);
  useEffect(() => {
    if (projectSectionRef.current) {
      projectSectionRef.current.scrollTo({
        left: projectSectionScrollPosition,
        behavior: projectPhaseProgress === 1 ? "smooth" : "instant",
      });
    }
  }, [projectSectionScrollPosition]);

  const processScrollMovement = useCallback((movement) => {
    if (Math.abs(movement) >= 100 && !isScrollingRef.current) {
      isScrollingRef.current = true;

      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      scrollTimeoutRef.current = setTimeout(() => {
        isScrollingRef.current = false;
      }, 300);

      // Use refs to get current values (avoids stale closure)
      const currentProjectPhase = projectPhaseProgressRef.current;
      const currentScrollPos = scrollPositionRef.current;

      // IF IN PROJECTS PHASE
      if (
        currentProjectPhase > 0 &&
        movement >= 100 &&
        projectSectionRef.current.scrollLeft <
          projectSectionRef.current.scrollWidth - window.innerWidth
      ) {
        if (currentProjectPhase === 1) {
          setProjectSectionScrollPosition((value) =>
            value + 500 >
            projectSectionRef.current.scrollWidth - window.innerWidth
              ? projectSectionRef.current.scrollWidth - window.innerWidth
              : value + 500
          );
        }
      } else if (
        currentProjectPhase > 0 &&
        movement <= -100 &&
        projectSectionRef.current.scrollLeft > 0
      ) {
        if (currentProjectPhase === 1) {
          setProjectSectionScrollPosition((value) =>
            value - 500 < 0 ? 0 : value - 500
          );
        }
      }
      // ELSE, IF PAGE HAS NO SCROLL PREVENTION (DEFAULT)
      else {
        if (movement >= 100) {
          pageDocumentRef.current.scrollTo({
            top: ((currentScrollPos + 100) / 100) * window.innerHeight,
            behavior: "smooth",
          });
        } else if (movement <= -100) {
          pageDocumentRef.current.scrollTo({
            top: ((currentScrollPos - 100) / 100) * window.innerHeight,
            behavior: "smooth",
          });
        }
      }
    }
    // Reset movement
    scrollMovementRef.current = 0;
  }, []);

  const handleWheel = useCallback(
    (event) => {
      event.preventDefault();
      if (pageDocumentRef.current.scrollTop >= window.innerHeight) {
        let newMovement = scrollMovementRef.current + event.deltaY;
        newMovement = Math.max(-200, Math.min(200, newMovement));

        // Use ref to get current value (avoids stale closure)
        if (projectPhaseProgressRef.current === 1 && event.deltaX !== 0) {
          newMovement = scrollMovementRef.current + event.deltaX;
          newMovement = Math.max(-200, Math.min(200, newMovement));
        }

        scrollMovementRef.current = newMovement;
        processScrollMovement(newMovement);
      }
    },
    [processScrollMovement]
  );

  const handleScroll = useCallback((event) => {
    if (pageDocumentRef.current.scrollTop < window.innerHeight) {
      event.preventDefault();
    }
    const documentScroll = pageDocumentRef.current.scrollTop;
    const currentScrollPosition = (documentScroll / window.innerHeight) * 100;
    setScrollPosition(currentScrollPosition);
  }, []);

  const handleTouchMove = useCallback((event) => {
    if (pageDocumentRef.current.scrollTop == 0) {
      event.preventDefault();
    }
  }, []);
  // ===============================================

  const [projectPhaseProgress, setProjectPhaseProgress] = useState(0);
  const projectPhaseProgressRef = useRef(0);

  useEffect(() => {
    const newProgress =
      scrollPosition <= 200
        ? scrollPosition <= 100
          ? 0
          : (scrollPosition - 100) / 100
        : (200 - (scrollPosition - 100)) / 100;
    setProjectPhaseProgress(newProgress);
    projectPhaseProgressRef.current = newProgress;
  }, [scrollPosition]);

  useEffect(() => {
    if (projectPhaseProgress < 0.1) {
      setProjectSectionScrollPosition(0);
    }
  }, [projectPhaseProgress]);
  // ===============================================

  useEffect(() => {
    const pageElement = pageDocumentRef.current;
    if (pageElement) {
      pageElement.scrollTo({ left: 0, behavior: "smooth" });
      pageElement.scrollTo({ top: 0, behavior: "smooth" });
      pageElement.addEventListener("wheel", handleWheel);
      pageElement.addEventListener("scroll", handleScroll);
      pageElement.addEventListener("touchmove", handleTouchMove, {
        passive: false,
      });
    }
    return () => {
      if (pageElement) {
        pageElement.removeEventListener("wheel", handleWheel);
        pageElement.removeEventListener("scroll", handleScroll);
        pageElement.removeEventListener("touchmove", handleTouchMove, {
          passive: false,
        });
      }
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [handleWheel, handleScroll, handleTouchMove]);

  return (
    <div className="page_home" id="page_home" ref={pageDocumentRef}>
      {!(without3d ?? false) && <Waiting />}

      <Nav scroll={scrollPosition} pageDocumentRef={pageDocumentRef} />

      <GiantRound scroll={scrollPosition} />

      <SocialMedia scrollPosition={scrollPosition} />

      {dimension > 720 && !without3d && (
        <ErrorBoundary3D fallback={null}>
          <Suspense fallback={null}>
            <Scene_Rakha
              mousePosition={mousePosition}
              scrollPosition={scrollPosition}
            />
          </Suspense>
        </ErrorBoundary3D>
      )}

      {/* COVER SECTION */}
      <CoverSection
        scrollPosition={scrollPosition}
        pageDocumentRef={pageDocumentRef}
      />

      {/* SUMMARY SECTION */}
      <SummarySection
        scrollPosition={scrollPosition}
        pageDocumentRef={pageDocumentRef}
      />

      {/* PROJECT SECTION */}
      <ProjectsSection
        projectSectionRef={projectSectionRef}
        projectPhaseProgress={projectPhaseProgress}
      />

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
