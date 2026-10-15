import { useEffect, useState } from 'react'
import Lenis from 'lenis'
import { Cursor } from '@/components/Cursor'
import { GitHubActivity } from '@/components/GitHubActivity'
import { HeroSection } from '@/components/HeroSection'
import { SiteFooter } from '@/components/SiteFooter'
import { SiteHeader } from '@/components/SiteHeader'
import { Statement } from '@/components/Statement'
import { TechStack } from '@/components/TechStack'
import { WorkExperience } from '@/components/WorkExperience'
import { initialLang, LangContext } from '@/lang'

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function App() {
  const [lang, setLang] = useState(initialLang)

  useEffect(() => localStorage.setItem('lang', lang), [lang])

  // Smooth, inertial scroll; anchors glide too. Skipped under reduced motion.
  useEffect(() => {
    if (reducedMotion) {
      return
    }
    const lenis = new Lenis({ anchors: true, autoRaf: true })
    return () => lenis.destroy()
  }, [])

  // Reveal [data-reveal] blocks once as they enter the viewport.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in')
            observer.unobserve(entry.target)
          }
        }
      },
      { rootMargin: '0px 0px -12% 0px' },
    )
    document.querySelectorAll('[data-reveal]').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <LangContext value={[lang, setLang]}>
      <Cursor />
      <SiteHeader />
      <main>
        <HeroSection />
        <TechStack />
        <Statement />
        <WorkExperience />
        <GitHubActivity />
      </main>
      <SiteFooter />
    </LangContext>
  )
}
