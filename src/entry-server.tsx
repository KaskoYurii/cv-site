import { renderToString } from 'react-dom/server'
import { App } from './App'

// Build-time only: scripts/prerender.js puts this HTML into dist/index.html.
export const render = () => renderToString(<App />)
