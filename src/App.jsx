import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Page_Home from "./pages/home/home";
import CustomizeCursor from "./components/cursor/cursor";
import React, {
  useContext,
  useEffect,
  useState,
  useRef,
  useCallback,
} from "react";
import Popup from "./components/popup/popup";
import { DimensionContext } from "./providers/dimensionProvider";
import DimensionUnsupported from "./pages/dimensionunsupported/dimensionunsupported";
import SoundManagement from "./components/soundmanagement/howler";

const App = React.memo(() => {
  // MOUSE ========================================
  const [isMousePositionInitialized, setIsMousePositionInitialized] =
    useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const rafRef = useRef(null);

  const handleMouseMove = useCallback(
    (event) => {
      if (rafRef.current) return; // Skip if a frame is already pending

      rafRef.current = requestAnimationFrame(() => {
        if (!isMousePositionInitialized) {
          setIsMousePositionInitialized(true);
        }
        setMousePosition({
          x: ((event.clientX - window.innerWidth / 2) / window.innerWidth) * 2,
          y:
            ((event.clientY - window.innerHeight / 2) / window.innerHeight) *
            -2,
        });
        rafRef.current = null;
      });
    },
    [isMousePositionInitialized]
  );
  // ==============================================

  // DIMENSION ====================================
  const { dimension, setDimension, without3d } = useContext(DimensionContext);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    const handleResize = () => {
      setDimension(window.innerWidth);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    SoundManagement.addSound({
      key: "click_1",
      src: "./assets/aud/click_1.mp3",
      loop: false,
      volume: 0.7,
    });
    SoundManagement.addSound({
      key: "click_2",
      src: "./assets/aud/click_2.mp3",
      loop: false,
      volume: 0.7,
    });
    SoundManagement.addSound({
      key: "click_3",
      src: "./assets/aud/click_3.mp3",
      loop: false,
      volume: 0.7,
    });
    SoundManagement.addSound({
      key: "bgm",
      src: "./assets/aud/bgm.mp3",
      loop: true,
      volume: 1,
    });

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [handleMouseMove]);

  return (
    <div>
      <CustomizeCursor
        mousePosition={mousePosition}
        isMousePositionInitialized={isMousePositionInitialized}
      />
      <Popup />
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              dimension <= 720 && !without3d ? (
                <DimensionUnsupported />
              ) : (
                <Page_Home mousePosition={mousePosition} />
              )
            }
          />
        </Routes>
      </Router>
    </div>
  );
});

export default App;
