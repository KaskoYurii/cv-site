import type { CSSProperties } from 'react'
import { focusRing } from '@/components/Section'
import { cvHref } from '@/components/SiteHeader'
import { useLang } from '@/lang'

const step = (i: number) => ({ '--i': i }) as CSSProperties

export function HeroSection() {
  const { t } = useLang()

  return (
    <section id="about" className="flex min-h-dvh flex-col justify-end px-5 pt-28 pb-10 lg:px-10 lg:pb-14">
      <h1
        aria-label="Yurii Kasko"
        className="font-display text-[clamp(4.25rem,19.5vw,22rem)] leading-[0.84] font-bold tracking-tighter uppercase"
      >
        <span className="mask-line" aria-hidden="true">
          <span style={step(0)}>Yurii</span>
        </span>
        <span className="mask-line" aria-hidden="true">
          <span style={step(1)}>Kasko</span>
        </span>
      </h1>

      <div className="mt-10 grid items-end gap-8 lg:mt-14 lg:grid-cols-12">
        <p className="fade-in text-lg text-muted lg:col-span-3" style={step(0)}>
          {t.hero.role}
          <br />
          {t.hero.country}
        </p>
        <p
          className="fade-in max-w-[30ch] text-2xl leading-tight font-medium tracking-tight text-balance lg:col-span-6 lg:text-[2rem]"
          style={step(1)}
        >
          {t.hero.description}
        </p>
        <div className="fade-in lg:col-span-3 lg:justify-self-end" style={step(2)}>
          <a
            href={cvHref}
            download
            className={`${focusRing} press flex size-32 items-center justify-center rounded-full bg-accent p-4 text-center leading-tight font-medium text-white hover:bg-ink lg:size-36`}
          >
            {t.header.loadCV}
          </a>
        </div>
      </div>
    </section>
  )
}
