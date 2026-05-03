import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useActiveSection } from '@/hooks/useActiveSection'

const cvHref = '/CV-Yurii_kasko.pdf'

export function SiteHeader() {
  const { t, i18n } = useTranslation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const currentLang = i18n.resolvedLanguage || i18n.language

  const menuItems = [
    { id: 'about', label: t('header.about'), href: '#about' },
    { id: 'stack', label: t('header.stack'), href: '#stack' },
    { id: 'experience', label: t('header.experience'), href: '#experience' },
  ]

  const activeSection = useActiveSection(menuItems.map((item) => item.id))

  const toggleLanguage = () => {
    i18n.changeLanguage(currentLang === 'ua' ? 'en' : 'ua')
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/86 text-white shadow-2xl shadow-black/15 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a
          href="/"
          className="group inline-flex items-center gap-3 rounded-md text-lg font-bold tracking-wide text-white outline-none transition duration-300 hover:text-orange-200 focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-4 focus-visible:ring-offset-black"
        >
          <span className="grid size-9 place-items-center rounded-md border border-white/10 bg-white/6 text-sm transition duration-300 group-hover:border-orange-400/50 group-hover:bg-orange-500/10">
            YK
          </span>
          <span>Y.Kasko</span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {menuItems.map((item) => {
            const isActive = activeSection === item.id

            return (
              <a
                key={item.href}
                href={item.href}
                aria-current={isActive ? 'page' : undefined}
                className={`group relative rounded-sm py-2 text-sm font-medium outline-none transition duration-300 hover:text-white focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-4 focus-visible:ring-offset-black ${
                  isActive ? 'text-white' : 'text-slate-300'
                }`}
              >
                <span>{item.label}</span>
                <span
                  className={`absolute inset-x-0 -bottom-0.5 h-px origin-left bg-orange-400 transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100 ${
                    isActive ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </a>
            )
          })}
        </div>

        <div className="hidden items-center gap-4 md:flex">
          <button
            type="button"
            onClick={toggleLanguage}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/15 text-sm font-semibold text-slate-200 outline-none transition duration-300 hover:border-orange-400/40 hover:bg-white/5 hover:text-white focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-4 focus-visible:ring-offset-black"
          >
            {currentLang === 'ua' ? 'EN' : 'UA'}
          </button>
          <a
            href={cvHref}
            className="inline-flex h-10 items-center justify-center rounded-md bg-white px-5 text-sm font-semibold text-black shadow-lg shadow-white/10 outline-none transition duration-300 hover:-translate-y-0.5 hover:bg-orange-100 hover:shadow-orange-400/25 focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-4 focus-visible:ring-offset-black active:translate-y-0"
          >
            {t('header.loadCV')}
          </a>
        </div>

        <div className="flex items-center gap-4 md:hidden">
          <button
            type="button"
            onClick={toggleLanguage}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/15 text-sm font-semibold text-slate-200 outline-none transition duration-300 hover:border-orange-400/40 hover:bg-white/5 hover:text-white focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-4 focus-visible:ring-offset-black"
          >
            {currentLang === 'ua' ? 'EN' : 'UA'}
          </button>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/15 text-slate-200 outline-none transition duration-300 hover:border-orange-400/40 hover:bg-white/5 hover:text-white focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-4 focus-visible:ring-offset-black"
            aria-label={t('header.toggleMenu')}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsMenuOpen((current) => !current)}
          >
            <span className="sr-only">{t('header.toggleMenu')}</span>
            <span className="relative h-5 w-5">
              <span
                className={`absolute left-0 top-1 block h-0.5 w-5 rounded-full bg-current transition duration-300 ${
                  isMenuOpen ? 'translate-y-2 rotate-45' : ''
                }`}
              />
              <span
                className={`absolute left-0 top-2.5 block h-0.5 w-5 rounded-full bg-current transition duration-200 ${
                  isMenuOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`absolute left-0 top-4 block h-0.5 w-5 rounded-full bg-current transition duration-300 ${
                  isMenuOpen ? '-translate-y-1.5 -rotate-45' : ''
                }`}
              />
            </span>
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        aria-hidden={!isMenuOpen}
        className={`overflow-hidden border-t border-white/10 bg-black/95 px-6 transition-[max-height,opacity] duration-300 ease-out md:hidden ${
          isMenuOpen ? 'max-h-72 opacity-100' : 'pointer-events-none max-h-0 opacity-0'
        }`}
      >
        <div
          className={`mx-auto flex max-w-6xl flex-col gap-3 py-5 transition duration-300 ${
            isMenuOpen ? 'translate-y-0' : '-translate-y-3'
          }`}
        >
          {menuItems.map((item) => {
            const isActive = activeSection === item.id

            return (
              <a
                key={item.href}
                href={item.href}
                aria-current={isActive ? 'page' : undefined}
                className={`rounded-md px-3 py-3 text-base font-medium outline-none transition duration-300 hover:bg-white/5 hover:text-white focus-visible:ring-2 focus-visible:ring-orange-400 ${
                  isActive ? 'bg-orange-500/10 text-white' : 'text-slate-200'
                }`}
                tabIndex={isMenuOpen ? 0 : -1}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </a>
            )
          })}
          <a
            href={cvHref}
            className="mt-2 inline-flex h-11 items-center justify-center rounded-md bg-white px-5 text-sm font-semibold text-black outline-none transition duration-300 hover:bg-orange-100 focus-visible:ring-2 focus-visible:ring-orange-400"
            tabIndex={isMenuOpen ? 0 : -1}
            onClick={() => setIsMenuOpen(false)}
          >
            {t('header.loadCV')}
          </a>
        </div>
      </div>
    </header>
  )
}
