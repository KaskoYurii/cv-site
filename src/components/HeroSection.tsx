import { useTranslation } from 'react-i18next'
import { HeroConsolePreview } from '@/components/HeroConsolePreview'

export function HeroSection() {
  const { t } = useTranslation()

  return (
    <section
      id="about"
      className="relative z-10 mx-auto grid min-h-screen max-w-6xl scroll-mt-24 items-start gap-14 pt-32 sm:pt-40 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-center lg:pt-20"
    >
      <div className="max-w-3xl lg:max-w-2xl">
        <p className="animate-[hero-fade_500ms_ease-out_80ms_both] text-sm font-semibold uppercase tracking-wider text-orange-400">
          {t('hero.role')}
        </p>

        <h1 className="mt-5 animate-[hero-fade_600ms_ease-out_140ms_both] text-4xl font-semibold leading-tight text-balance text-white sm:text-7xl">
          Yurii Kasko
        </h1>

        <p className="mt-6 animate-[hero-fade_600ms_ease-out_200ms_both] text-lg leading-8 text-pretty text-slate-300 sm:text-xl sm:leading-9">
          {t('hero.description')}
        </p>

        <p className="mt-6 animate-[hero-fade_600ms_ease-out_260ms_both] text-sm leading-7 text-slate-400">
          {t('hero.experience')}
        </p>

        <div className="mt-8 flex animate-[hero-fade_600ms_ease-out_320ms_both] flex-col gap-3 text-sm text-slate-400 sm:flex-row sm:flex-wrap sm:items-center">
          <span>{t('hero.country')}</span>
          <a
            className="rounded-sm transition-colors duration-200 hover:text-orange-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-4 focus-visible:ring-offset-black"
            href="mailto:hellokasko@gmail.com"
          >
            hellokasko@gmail.com
          </a>
          <a
            className="rounded-sm transition-colors duration-200 hover:text-orange-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-4 focus-visible:ring-offset-black"
            href="https://t.me/whoisyurii"
            rel="noreferrer"
            target="_blank"
          >
            @whoisyurii
          </a>
          <a
            className="rounded-sm transition-colors duration-200 hover:text-orange-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-4 focus-visible:ring-offset-black"
            href="https://www.linkedin.com/in/yurii-kasko/"
            rel="noreferrer"
            target="_blank"
          >
            Linkedin
          </a>
        </div>

        <div className="mt-10 flex animate-[hero-fade_600ms_ease-out_380ms_both] flex-col gap-3 sm:flex-row">
          <a
            href="/CV-Yurii_kasko.pdf"
            className="inline-flex h-12 items-center justify-center rounded-md bg-white px-6 text-sm font-semibold text-black shadow-lg shadow-white/10 transition-[background-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:bg-orange-100 hover:shadow-orange-400/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-4 focus-visible:ring-offset-black active:translate-y-0"
          >
            {t('hero.loadCV')}
          </a>
        </div>
      </div>

      <HeroConsolePreview />
    </section>
  )
}
