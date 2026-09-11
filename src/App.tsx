import { useEffect, useState } from 'react'
import { AnimatedBackground } from '@/components/AnimatedBackground'
import { GitHubActivity } from '@/components/GitHubActivity'
import { HeroSection } from '@/components/HeroSection'
import { SiteFooter } from '@/components/SiteFooter'
import { SiteHeader } from '@/components/SiteHeader'
import { SitePreloader } from '@/components/SitePreloader'
import { TechStack } from '@/components/TechStack'
import { WorkExperience } from '@/components/WorkExperience'
import { initialLang, LangContext } from '@/lang'

export function App() {
  const [lang, setLang] = useState(initialLang)

  useEffect(() => localStorage.setItem('lang', lang), [lang])

  return (
    <LangContext value={[lang, setLang]}>
      <SitePreloader />
      <SiteHeader />
      <main
        id="main-content"
        className="relative isolate min-h-screen overflow-x-hidden bg-black px-6 text-white"
      >
        <AnimatedBackground />
        <HeroSection />
        <TechStack />
        <WorkExperience />
        <GitHubActivity />
        <SiteFooter />
      </main>
    </LangContext>
  )
}
