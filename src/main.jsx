import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { PopupProvider } from './providers/popupProvider.jsx'
import { SkillsProvider } from './providers/skillsProvider.jsx'
import { SuggestionsProvider } from './providers/suggestionsProvider.jsx'
import { DimensionProvider } from './providers/dimensionProvider.jsx'
import { UimodeProvider } from './providers/uimodeProvider.jsx'

createRoot(document.getElementById('root')).render(
  <UimodeProvider>
    <DimensionProvider>
    <SkillsProvider>
      <SuggestionsProvider>
        <PopupProvider>
          <App />
        </PopupProvider>
      </SuggestionsProvider>
    </SkillsProvider>
  </DimensionProvider>
  </UimodeProvider>
)
