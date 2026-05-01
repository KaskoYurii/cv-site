import { HeroConsolePreview } from '@/components/HeroConsolePreview'

export function HeroSection() {
  return (
    <section
      id="about"
      className="relative z-10 mx-auto grid min-h-screen max-w-6xl scroll-mt-24 items-start gap-14 pt-32 sm:pt-40 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-center lg:pt-20"
    >
      <div className="max-w-3xl lg:max-w-2xl">
        <p className="animate-[hero-fade_500ms_ease-out_80ms_both] text-sm font-semibold uppercase tracking-wider text-orange-400">
          Front-End Developer
        </p>

        <h1 className="mt-5 animate-[hero-fade_600ms_ease-out_140ms_both] text-5xl font-semibold leading-tight text-balance text-white sm:text-7xl">
          Yurii Kasko
        </h1>

        <p className="mt-6 animate-[hero-fade_600ms_ease-out_200ms_both] text-lg leading-8 text-pretty text-slate-300 sm:text-xl sm:leading-9">
          I create fast, reliable interfaces for complex web products. Most of my work is around
          Vue.js, dashboards, reusable components, and frontend architecture that can grow without
          becoming hard to maintain.
        </p>

        <p className="mt-6 animate-[hero-fade_600ms_ease-out_260ms_both] text-sm leading-7 text-slate-400">
          4+ years experience with Vue 2/3, TypeScript, Pinia, Vuex, Vuetify, Quasar, Vitest,
          Chart.js, and AmCharts.
        </p>

        <div className="mt-8 flex animate-[hero-fade_600ms_ease-out_320ms_both] flex-col gap-3 text-sm text-slate-400 sm:flex-row sm:flex-wrap sm:items-center">
          <span>Ukraine</span>
          <a
            className="rounded-sm transition-colors duration-200 hover:text-orange-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-400"
            href="mailto:hellokasko@gmail.com"
          >
            hellokasko@gmail.com
          </a>
          <a
            className="rounded-sm transition-colors duration-200 hover:text-orange-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-400"
            href="https://t.me/whoisyurii"
            rel="noreferrer"
            target="_blank"
          >
            @whoisyurii
          </a>
          <a
            className="rounded-sm transition-colors duration-200 hover:text-orange-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-400"
            href="#linkedin"
          >
            Linkedin
          </a>
        </div>

        <div className="mt-10 flex animate-[hero-fade_600ms_ease-out_380ms_both] flex-col gap-3 sm:flex-row">
          <a
            href="/CV-Yurii_kasko.pdf"
            className="inline-flex h-12 items-center justify-center rounded-md bg-white px-6 text-sm font-semibold text-black shadow-lg shadow-white/10 transition-[background-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:bg-orange-100 hover:shadow-orange-400/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-400 active:translate-y-0"
          >
            Load CV
          </a>
          <a
            href="#examples"
            className="inline-flex h-12 items-center justify-center rounded-md border border-white/15 px-6 text-sm font-semibold text-white transition-[background-color,border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-orange-400/50 hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-400 active:translate-y-0"
          >
            View examples
          </a>
        </div>
      </div>

      <HeroConsolePreview />
    </section>
  )
}
