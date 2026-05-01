import { AnimatedBackground } from '@/components/AnimatedBackground'
import { GitHubActivity } from '@/components/GitHubActivity'
import { HeroSection } from '@/components/HeroSection'
import { SiteHeader } from '@/components/SiteHeader'
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
        <WorkExperience />
        <GitHubActivity />
      </main>
    </>
  )
}
