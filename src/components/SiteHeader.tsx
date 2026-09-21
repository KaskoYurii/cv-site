import { focusRing } from '@/components/Section'
import { useActiveSection } from '@/hooks/useActiveSection'
import { useLang } from '@/lang'

export const cvHref = '/CV-Yurii_kasko.pdf'
const sectionIds = ['about', 'experience', 'stack', 'github'] as const

export function SiteHeader() {
  const { t, lang, setLang } = useLang()
  const active = useActiveSection(sectionIds)

  return (
    <header className="sticky top-0 z-20 grid h-14 grid-cols-4 border-b border-rule bg-black text-sm lg:grid-cols-12">
      <a href="#about" className={`${focusRing} col-span-2 flex items-center px-5 font-semibold lg:col-span-3`}>
        Yurii Kasko
      </a>

      <nav className="col-span-6 hidden items-stretch lg:flex" aria-label="Sections">
        {sectionIds.map((id) => (
          <a
            key={id}
            href={`#${id}`}
            aria-current={active === id ? 'location' : undefined}
            className={`${focusRing} press relative flex items-center px-5 text-ink-soft hover:text-ink aria-[current]:text-ink after:absolute after:inset-x-5 after:bottom-0 after:h-0.5 after:bg-flare after:opacity-0 after:transition-opacity aria-[current]:after:opacity-100`}
          >
            {t.nav[id]}
          </a>
        ))}
      </nav>

      <div className="col-span-2 flex items-stretch justify-end lg:col-span-3">
        <button
          type="button"
          lang={lang === 'ua' ? 'en' : 'uk'}
          onClick={() => setLang(lang === 'ua' ? 'en' : 'ua')}
          className={`${focusRing} press cursor-pointer border-l border-rule px-4 text-ink-soft hover:text-ink lg:px-5`}
        >
          {t.header.switchLang}
        </button>
        <a
          href={cvHref}
          download
          className={`${focusRing} press flex items-center border-l border-rule px-4 font-medium hover:bg-ink hover:text-black lg:px-5`}
        >
          <span className="lg:hidden">CV</span>
          <span className="hidden lg:inline">{t.header.loadCV}</span>
        </a>
      </div>
    </header>
  )
}
