import { AnimatedBackground } from '@/components/AnimatedBackground'
import { GitHubActivity } from '@/components/GitHubActivity'
import { HeroSection } from '@/components/HeroSection'
import { SiteFooter } from '@/components/SiteFooter'
import { SiteHeader } from '@/components/SiteHeader'
import { TechStack } from '@/components/TechStack'
import { WorkExperience } from '@/components/WorkExperience'

export function HomePage() {
  return (
    <>
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
    </>
  )
}
