// Bake the English page into dist/index.html so crawlers and link previews see real
// content without running JS. The client then hydrates it (src/main.tsx).
import { readFileSync, rmSync, writeFileSync } from 'node:fs'
import { render } from '../dist-ssr/entry-server.js'

const file = 'dist/index.html'
const html = readFileSync(file, 'utf8')
const root = '<div id="root"></div>'

if (!html.includes(root)) {
  throw new Error(`prerender: ${root} not found in ${file}`)
}

writeFileSync(file, html.replace(root, `<div id="root">${render()}</div>`))
rmSync('dist-ssr', { recursive: true, force: true })
