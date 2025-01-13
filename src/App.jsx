import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Page_Home from "./pages/home/home"
import CustomizeCursor from "./components/cursor/cursor"
import { useContext, useEffect, useState } from 'react';
import Popup from './components/popup/popup';

function App() {

  // MOUSE ========================================
  const [isMousePositionInitialized, setIsMousePositionInitialized] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event) => {
    if (!isMousePositionInitialized) {
      setIsMousePositionInitialized(true);
    }
    setMousePosition({
        x: (event.clientX - (window.innerWidth / 2)) / window.innerWidth * 2,
        y: (event.clientY - (window.innerHeight / 2)) / window.innerHeight * -2
    });
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  // ===============================================


  return (
    <div onMouseMove={handleMouseMove}>
      <CustomizeCursor
        mousePosition={mousePosition}
        isMousePositionInitialized={isMousePositionInitialized}
      />
      <Popup />
      <Router>
          <Routes>
            <Route path='/' element={<Page_Home mousePosition={mousePosition} />} />
          </Routes>
        </Router>
    </div>
  );
}

export default App
