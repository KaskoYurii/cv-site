import type { CSSProperties } from 'react'
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll'
import { useLang } from '@/lang'

const techLogos = [
  {
    name: 'Vue',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg',
    color: '#41b883',
  },
  {
    name: 'TypeScript',
    iconUrl:
      'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg',
    color: '#3178c6',
  },
  {
    name: 'Pinia',
    iconUrl: 'https://cdn.simpleicons.org/pinia/ffd859',
    color: '#ffd859',
  },
  {
    name: 'Vite',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg',
    color: '#bd34fe',
  },
  {
    name: 'Vuetify',
    iconUrl:
      'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuetify/vuetify-original.svg',
    color: '#1697f6',
  },
  {
    name: 'Quasar',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/quasar/quasar-original.svg',
    color: '#1976d2',
  },
  {
    name: 'Vitest',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitest/vitest-original.svg',
    color: '#729b1b',
  },
  {
    name: 'Docker',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg',
    color: '#2496ed',
  },
  {
    name: 'Git',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg',
    color: '#f05032',
  },
  {
    name: 'VS Code',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg',
    color: '#24a4ff',
  },
  {
    name: 'WebStorm',
    iconUrl:
      'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/webstorm/webstorm-original.svg',
    color: '#00cdd7',
  },
  {
    name: 'Figma',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg',
    color: '#f24e1e',
  },
  {
    name: 'Cursor',
    iconUrl: 'https://api.iconify.design/simple-icons/cursor.svg?color=%23a3a3a3',
    color: '#a3a3a3',
  },
  {
    name: 'Claude Code',
    iconUrl: 'https://api.iconify.design/simple-icons/claude.svg?color=%23d97757',
    color: '#d97757',
  },
  {
    name: 'Codex',
    iconUrl: 'https://api.iconify.design/simple-icons/openai.svg?color=%23f97316',
    color: '#f97316',
  },
]

const mobileLogoRows = [
  techLogos.filter((_, index) => index % 3 === 0),
  techLogos.filter((_, index) => index % 3 === 1),
  techLogos.filter((_, index) => index % 3 === 2),
]

export function TechStack() {
  const { t } = useLang()
  const sectionRef = useRevealOnScroll<HTMLElement>()

  return (
    <section
      ref={sectionRef}
      id="stack"
      className="relative z-10 mx-auto max-w-6xl scroll-mt-24 py-20 sm:py-28"
    >
      <div data-reveal className="reveal-up">
        <p className="text-sm font-semibold uppercase tracking-wider text-orange-400">{t.stack.title}</p>

        <div className="tech-stack-mobile mt-8 space-y-2 overflow-hidden sm:hidden">
          {mobileLogoRows.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className={`tech-stack-mobile__track flex w-max gap-4 ${
                rowIndex === 1 ? 'tech-stack-mobile__track--reverse' : ''
              }`}
            >
              {[...row, ...row].map((logo, index) => (
                <div
                  key={`${rowIndex}-${logo.name}-${index}`}
                  className="tech-stack__item flex h-12 min-w-32 items-center justify-start gap-2.5"
                  style={{ '--logo-color': logo.color } as CSSProperties}
                  aria-hidden={index >= row.length}
                >
                  <span className="tech-stack__mark grid size-8 shrink-0 place-items-center">
                    <img
                      src={logo.iconUrl}
                      alt=""
                      className="size-5 object-contain"
                      loading="lazy"
                      decoding="async"
                    />
                  </span>
                  <span className="text-sm font-semibold text-slate-100">{logo.name}</span>
                </div>
              ))}
            </div>
          ))}
        </div>

        <ul className="mt-8 hidden flex-wrap justify-center gap-x-14 gap-y-7 sm:flex">
          {techLogos.map((logo) => (
            <li
              key={logo.name}
              className="tech-stack__item flex h-16 basis-40 items-center justify-start gap-3 transition duration-300 hover:text-orange-100"
              style={{ '--logo-color': logo.color } as CSSProperties}
            >
              <span className="tech-stack__mark grid size-10 shrink-0 place-items-center">
                <img
                  src={logo.iconUrl}
                  alt=""
                  className="size-7 object-contain"
                  loading="lazy"
                  decoding="async"
                />
              </span>
              <span className="text-sm font-semibold text-slate-100">{logo.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
