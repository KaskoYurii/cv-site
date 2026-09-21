import type { CSSProperties } from 'react'
import { focusRing, Row } from '@/components/Section'
import { cvHref } from '@/components/SiteHeader'
import { Timeline } from '@/components/Timeline'
import { useLang } from '@/lang'

const contacts = [
  { label: 'hellokasko@gmail.com', href: 'mailto:hellokasko@gmail.com' },
  { label: 'Telegram', href: 'https://t.me/whoisyurii' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/yurii-kasko/' },
]

const step = (i: number) => ({ '--i': i }) as CSSProperties

export function HeroSection() {
  const { t } = useLang()

  return (
    <section id="about" className="scroll-mt-14">
      <Row className="border-t-0">
        <div className="col-span-4 px-5 pt-16 pb-10 lg:col-span-8 lg:pt-24 lg:pb-14">
          <p className="rise text-lg text-ink-soft" style={step(0)}>
            {t.hero.role}
          </p>
          <h1
            className="rise mt-3 font-display text-[clamp(3.75rem,15vw,9.5rem)] leading-[0.92] font-extrabold tracking-[-0.035em]"
            style={step(1)}
          >
            Yurii Kasko
          </h1>
        </div>

        <dl className="rise col-span-4 grid content-end gap-y-4 border-t border-rule px-5 py-6 lg:col-span-4 lg:border-t-0 lg:border-l lg:py-14" style={step(2)}>
          {t.hero.facts.map(([label, value]) => (
            <div key={label} className="flex items-baseline justify-between gap-4 border-b border-rule pb-3 last:border-b-0 last:pb-0">
              <dt className="text-sm text-ink-soft">{label}</dt>
              <dd className="text-right font-medium">{value}</dd>
            </div>
          ))}
        </dl>
      </Row>

      <Row>
        <div className="rise col-span-4 px-5 py-8 lg:col-span-7 lg:py-10" style={step(3)}>
          <p className="max-w-[36rem] text-lg leading-8 lg:text-xl lg:leading-9">{t.hero.description}</p>
          <p className="mt-4 max-w-[36rem] leading-7 text-ink-soft">{t.hero.experience}</p>
        </div>
        <div
          className="rise col-span-4 flex flex-col justify-end gap-6 border-t border-rule px-5 py-8 lg:col-span-5 lg:border-t-0 lg:border-l lg:py-10"
          style={step(4)}
        >
          <a
            href={cvHref}
            download
            className={`${focusRing} press inline-flex h-12 items-center self-start rounded-sm bg-flare px-6 font-semibold text-black hover:bg-ink`}
          >
            {t.header.loadCV}
          </a>
          <ul className="flex flex-wrap gap-x-5">
            {contacts.map((contact) => (
              <li key={contact.href}>
                <a
                  href={contact.href}
                  className={`${focusRing} link inline-flex min-h-11 items-center text-sm`}
                  {...(contact.href.startsWith('http') && { target: '_blank', rel: 'noreferrer' })}
                >
                  {contact.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Row>

      <Row>
        <Timeline />
      </Row>
    </section>
  )
}
