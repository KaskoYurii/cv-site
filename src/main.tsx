import { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import { Analytics } from '@vercel/analytics/react'
import { App } from './App'
import './styles/global.css'

// index.html arrives prerendered (scripts/prerender.js), so hydrate instead of rendering.
hydrateRoot(
  document.getElementById('root')!,
  <StrictMode>
    <App />
    <Analytics />
  </StrictMode>,
)
