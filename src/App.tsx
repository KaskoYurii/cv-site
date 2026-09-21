import { useEffect, useState, type CSSProperties } from 'react'
import { AnimatedBackground } from '@/components/AnimatedBackground'
import { GitHubActivity } from '@/components/GitHubActivity'
import { HeroSection } from '@/components/HeroSection'
import { SiteFooter } from '@/components/SiteFooter'
import { SiteHeader } from '@/components/SiteHeader'
import { SitePreloader } from '@/components/SitePreloader'
import { TechStack } from '@/components/TechStack'
import { WorkExperience } from '@/components/WorkExperience'
import { initialLang, LangContext } from '@/lang'
import { preloaderDuration, preloaderSessionKey } from '@/lib/hyperspacePreloader'

// The entrance waits for the preloader to start fading (82% of its run) on first visit.
const introDelay = sessionStorage.getItem(preloaderSessionKey) ? 0 : preloaderDuration * 0.82

export function App() {
  const [lang, setLang] = useState(initialLang)

  useEffect(() => localStorage.setItem('lang', lang), [lang])

  return (
    <LangContext value={[lang, setLang]}>
      <SitePreloader />
      <AnimatedBackground />
      <div
        className="relative z-10 mx-auto max-w-7xl"
        style={{ '--intro-delay': `${introDelay}ms` } as CSSProperties}
      >
        <div className="grid-lines" aria-hidden="true">
          {Array.from({ length: 12 }, (_, i) => (
            <span key={i} />
          ))}
        </div>
        <SiteHeader />
        <main>
          <HeroSection />
          <WorkExperience />
          <TechStack />
          <GitHubActivity />
        </main>
        <SiteFooter />
      </div>
    </LangContext>
  )
}
