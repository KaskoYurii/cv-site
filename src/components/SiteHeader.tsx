import { focusRing } from '@/components/Section'
import { useLang } from '@/lang'

export const cvHref = '/CV-Yurii_kasko.pdf'
const sections = ['experience', 'stack'] as const

// White + difference blending keeps the bar legible over the light page and the black section.
export function SiteHeader() {
  const { t, lang, setLang } = useLang()

  return (
    <header className="fixed inset-x-0 top-0 z-40 flex h-20 items-center justify-between gap-4 px-5 text-[15px] text-white mix-blend-difference lg:px-10">
      <a href="#about" className={`${focusRing} font-display font-semibold tracking-tight uppercase`}>
        Yurii Kasko
      </a>
      <nav aria-label="Sections" className="hidden gap-8 md:flex">
        {sections.map((id) => (
          <a key={id} href={`#${id}`} className={`${focusRing} link`}>
            {t.nav[id]}
          </a>
        ))}
      </nav>
      <div className="flex items-center gap-1">
        <button
          type="button"
          lang={lang === 'ua' ? 'en' : 'uk'}
          onClick={() => setLang(lang === 'ua' ? 'en' : 'ua')}
          className={`${focusRing} link min-h-11 cursor-pointer px-3`}
        >
          {t.header.switchLang}
        </button>
        <a
          href={cvHref}
          download
          className={`${focusRing} press flex h-10 items-center rounded-full border border-white px-5 font-medium hover:bg-white hover:text-black`}
        >
          CV
        </a>
      </div>
    </header>
  )
}
