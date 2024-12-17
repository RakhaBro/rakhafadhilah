import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Page_Projects from "./pages/projects/projects"
import Page_Home from "./pages/home/home"
import Page_Contact from "./pages/contact/contact"

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Page_Home />} />
        <Route path='/projects' element={<Page_Projects />} />
        <Route path='/contact' element={<Page_Contact />} />
      </Routes>
    </Router>
  );
}

export default App
