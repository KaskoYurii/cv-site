import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Analytics } from '@vercel/analytics/react'
import { App } from './app/App'
import './i18n'
import './styles/global.css'
import './styles/animations.css'
import './styles/hero.css'
import './styles/preloader.css'
import './styles/tech-stack.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <Analytics />
  </StrictMode>,
)
