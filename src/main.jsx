import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { PopupProvider } from './providers/popupProvider.jsx'
import { SkillsProvider } from './providers/skillsProvider.jsx'

createRoot(document.getElementById('root')).render(
  <SkillsProvider>
    <PopupProvider>
      <App />
    </PopupProvider>
  </SkillsProvider>
)
