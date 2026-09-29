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

// Scroll tuning ---------------------------------------------------------------
const STEP_THRESHOLD = 60; // accumulated wheel delta needed to commit one step
const IDLE_RESET_MS = 140; // clear the accumulator after a gap between wheel events
const SETTLE_IDLE_MS = 90; // vertical unlock fires this long after motion stops
const VERTICAL_LOCK_MAX_MS = 1200; // safety cap in case a scroll produces no motion
const HORIZONTAL_LOCK_MS = 320; // ignore input while a horizontal card scroll settles
const HORIZONTAL_STEP = 500; // px moved per horizontal step through the projects
const PROJECTS_ENTER = 0.9; // projectPhaseProgress above this = horizontal mode
const EDGE_EPS = 4; // px tolerance when detecting the horizontal start/end
// -----------------------------------------------------------------------------

const Page_Home = React.memo(({ mousePosition }) => {
  const { dimension, without3d } = useContext(DimensionContext);

  const pageDocumentRef = useRef(null);
  const projectSectionRef = useRef(null);

  // SCROLL CONTROL ================================
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollPositionRef = useRef(0);

  // Wheel accumulator + input lock (replaces the old per-event threshold)
  const accumRef = useRef(0);
  const lastWheelTsRef = useRef(0);
  const isLockedRef = useRef(false);
  const lockTimeoutRef = useRef(null); // safety cap timer
  const settleTimerRef = useRef(null); // scroll-idle timer for vertical unlock

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
        behavior:
          projectPhaseProgressRef.current > PROJECTS_ENTER ? "smooth" : "auto",
      });
    }
  }, [projectSectionScrollPosition]);

  const clearLockTimers = useCallback(() => {
    if (lockTimeoutRef.current) clearTimeout(lockTimeoutRef.current);
    if (settleTimerRef.current) clearTimeout(settleTimerRef.current);
    lockTimeoutRef.current = null;
    settleTimerRef.current = null;
  }, []);

  const releaseLock = useCallback(() => {
    isLockedRef.current = false;
    clearLockTimers();
  }, [clearLockTimers]);

  // Vertical steps unlock when scrolling actually stops (settle-driven), so the
  // next step's base section is only ever read at rest, never mid-flight. The
  // idle timer is kicked off here and re-armed by handleScroll on every scroll
  // tick; the max cap covers a no-op scrollTo that produces no motion at all.
  const lockVertical = useCallback(() => {
    isLockedRef.current = true;
    accumRef.current = 0;
    clearLockTimers();
    lockTimeoutRef.current = setTimeout(releaseLock, VERTICAL_LOCK_MAX_MS);
    settleTimerRef.current = setTimeout(releaseLock, SETTLE_IDLE_MS);
  }, [clearLockTimers, releaseLock]);

  // Horizontal steps are quick and don't emit scroll events on the page
  // container, so a short fixed lock is enough. A stale scrollLeft read here
  // self-corrects on the next step (moves are min/max-clamped).
  const lockHorizontal = useCallback(() => {
    isLockedRef.current = true;
    accumRef.current = 0;
    clearLockTimers();
    lockTimeoutRef.current = setTimeout(releaseLock, HORIZONTAL_LOCK_MS);
  }, [clearLockTimers, releaseLock]);

  // Commit a single step. dir === 1 is down/forward, dir === -1 is up/back.
  const doStep = useCallback(
    (dir) => {
      const page = pageDocumentRef.current;
      const projects = projectSectionRef.current;
      if (!page) return;

      // While the projects section owns the viewport, steps move the card list
      // horizontally until it reaches an edge, then fall through to vertical.
      if (projects && projectPhaseProgressRef.current > PROJECTS_ENTER) {
        const maxLeft = projects.scrollWidth - projects.clientWidth;
        const atEnd = projects.scrollLeft >= maxLeft - EDGE_EPS;
        const atStart = projects.scrollLeft <= EDGE_EPS;

        if (dir > 0 && !atEnd) {
          setProjectSectionScrollPosition((v) =>
            Math.min(maxLeft, v + HORIZONTAL_STEP)
          );
          lockHorizontal();
          return;
        }
        if (dir < 0 && !atStart) {
          setProjectSectionScrollPosition((v) =>
            Math.max(0, v - HORIZONTAL_STEP)
          );
          lockHorizontal();
          return;
        }
        // At an edge: fall through to a normal vertical section step.
      }

      // Vertical section step. The browser clamps `top` to the scrollable
      // range, so a taller-than-viewport section (e.g. contact) still bottoms
      // out correctly instead of being capped to a section boundary.
      const currentSection = Math.round(scrollPositionRef.current / 100);
      const target = Math.max(0, currentSection + dir) * window.innerHeight;
      page.scrollTo({ top: target, behavior: "smooth" });
      lockVertical();
    },
    [lockVertical, lockHorizontal]
  );

  const handleWheel = useCallback(
    (event) => {
      // Controlled scroll: always own the wheel (needs a non-passive listener).
      event.preventDefault();

      const page = pageDocumentRef.current;
      if (!page) return;

      // Drop the accumulator after a pause so a finished gesture doesn't leak
      // into the next one.
      const now = performance.now();
      if (now - lastWheelTsRef.current > IDLE_RESET_MS) {
        accumRef.current = 0;
      }
      lastWheelTsRef.current = now;

      // Ignore everything while a step is still animating.
      if (isLockedRef.current) return;

      // In the gallery, honour a genuine horizontal gesture; otherwise track Y.
      const inProjects = projectPhaseProgressRef.current > PROJECTS_ENTER;
      const delta =
        inProjects && Math.abs(event.deltaX) > Math.abs(event.deltaY)
          ? event.deltaX
          : event.deltaY;

      // Accumulate small touchpad deltas until they add up to a real step.
      accumRef.current += delta;
      if (Math.abs(accumRef.current) >= STEP_THRESHOLD) {
        const dir = accumRef.current > 0 ? 1 : -1;
        accumRef.current = 0;
        doStep(dir);
      }
    },
    [doStep]
  );

  const handleScroll = useCallback(() => {
    const page = pageDocumentRef.current;
    if (!page) return;
    setScrollPosition((page.scrollTop / window.innerHeight) * 100);
    // While a vertical step animates, keep pushing the unlock out until motion
    // stops, so we never commit the next step from a mid-flight position.
    if (isLockedRef.current && settleTimerRef.current !== null) {
      clearTimeout(settleTimerRef.current);
      settleTimerRef.current = setTimeout(releaseLock, SETTLE_IDLE_MS);
    }
  }, [releaseLock]);

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
      pageElement.scrollTo({ top: 0, behavior: "smooth" });
      // Non-passive so preventDefault() actually holds the controlled scroll.
      pageElement.addEventListener("wheel", handleWheel, { passive: false });
      pageElement.addEventListener("scroll", handleScroll, { passive: true });
    }
    return () => {
      if (pageElement) {
        pageElement.removeEventListener("wheel", handleWheel);
        pageElement.removeEventListener("scroll", handleScroll);
      }
      clearLockTimers();
    };
  }, [handleWheel, handleScroll, clearLockTimers]);

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
