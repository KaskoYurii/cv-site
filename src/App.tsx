import { useEffect } from 'react'
import Lenis from 'lenis'
import { Cursor } from '@/components/Cursor'
import { GitHubActivity } from '@/components/GitHubActivity'
import { HeroSection } from '@/components/HeroSection'
import { Projects } from '@/components/Projects'
import { SiteFooter } from '@/components/SiteFooter'
import { SiteHeader } from '@/components/SiteHeader'
import { Statement } from '@/components/Statement'
import { TechStack } from '@/components/TechStack'
import { WorkExperience } from '@/components/WorkExperience'
import { useLang } from '@/lang'

export function App() {
  const { lang } = useLang()

  useEffect(() => {
    document.documentElement.lang = lang === 'ua' ? 'uk' : 'en'
  }, [lang])

  // Smooth, inertial scroll; anchors glide too. Skipped under reduced motion.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
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
    <>
      <Cursor />
      <SiteHeader />
      <main>
        <HeroSection />
        <TechStack />
        <Statement />
        <Projects />
        <WorkExperience />
        <GitHubActivity />
      </main>
      <SiteFooter />
    </>
  )
}
