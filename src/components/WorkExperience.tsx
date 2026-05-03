import type { CSSProperties } from 'react'
import { useTranslation } from 'react-i18next'
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll'

type RevealStyle = CSSProperties & {
  '--reveal-delay': string
}

export function WorkExperience() {
  const { t } = useTranslation()
  const sectionRef = useRevealOnScroll<HTMLElement>()

  const experiences = [
    {
      company: 'Freelance',
      location: t('hero.country'),
      period: 'Apr 2025 - Present',
      role: t('experience.roles.freelance'),
      summary: t('experience.summaries.freelance', { returnObjects: true }) as string[],
    },
    {
      company: 'Quardex',
      location: t('hero.country'),
      period: 'Jul 2021 - Apr 2025',
      role: t('experience.roles.quardex'),
      summary: t('experience.summaries.quardex', { returnObjects: true }) as string[],
    },
    {
      company: 'NSOC360',
      location: 'Netherlands',
      period: 'Sep 2021 - Apr 2025',
      role: t('experience.roles.nsoc360'),
      summary: t('experience.summaries.nsoc360', { returnObjects: true }) as string[],
    },
    {
      company: 'NDA Startup',
      location: t('hero.country'),
      period: 'Jun 2025 - Apr 2026',
      role: t('experience.roles.nda'),
      summary: t('experience.summaries.nda', { returnObjects: true }) as string[],
    },
  ]

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative z-10 mx-auto max-w-6xl py-24 sm:py-32"
    >
      <p
        className="reveal-up text-sm font-semibold uppercase tracking-wider text-orange-400"
        data-reveal
      >
        {t('experience.title')}
      </p>

      <div className="mt-8 space-y-5">
        {experiences.map((experience, index) => (
          <article
            key={`${experience.company}-${experience.period}`}
            className="reveal-up border-l border-orange-400/35 bg-black/40 px-5 py-5 backdrop-blur-sm transition-[border-color,background-color] duration-300 hover:border-orange-300/70 hover:bg-black/55 sm:px-6"
            data-reveal
            style={{ '--reveal-delay': `${index * 120}ms` } as RevealStyle}
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-white">{experience.company}</h2>
                <p className="mt-1 text-sm text-slate-400">
                  {experience.role} · {experience.location}
                </p>
              </div>
              <p className="text-sm font-medium text-orange-200">{experience.period}</p>
            </div>

            <ul className="mt-5 grid gap-3 text-sm leading-6 text-slate-300 sm:grid-cols-2">
              {experience.summary.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-orange-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  )
}
