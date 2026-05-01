import type { CSSProperties } from 'react'
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll'

const experiences = [
  {
    company: 'Freelance',
    location: 'Ukraine',
    period: 'Apr 2025 - Present',
    role: 'Front-End Developer',
    summary: [
      'Created a full-cycle admin platform for an auto service to manage the complete car repair workflow.',
      'Built flows for repair intake, service tracking, customer records, work statuses, and operational admin tasks.',
      'Managed backend implementation with AI-driven development tools to support the platform end to end.',
      'Added Google integration and CI/CD workflow for smoother delivery and operations.',
      'Designed reusable UI patterns for forms, tables, and dashboard views to keep daily work fast and consistent.',
      'Delivered frontend architecture and implementation independently, from initial structure to production-ready screens.',
    ],
  },
  {
    company: 'Quardex',
    location: 'Ukraine',
    period: 'Jul 2021 - Apr 2025',
    role: 'Front-End Developer',
    summary: [
      'Designed and maintained scalable frontend architecture for dashboard systems.',
      'Built a reusable component system used across multiple modules.',
      'Integrated Chart.js and AmCharts for data visualization.',
      'Improved UI performance, responsiveness, and review quality across key pages.',
    ],
  },
  {
    company: 'NSOC360',
    location: 'Netherlands',
    period: 'Sep 2021 - Apr 2025',
    role: 'Front-End Developer, contract via Quardex',
    summary: [
      'Developed UI for a monitoring and analytics platform.',
      'Worked with Vue 2 and Vue 3 in a hybrid architecture.',
      'Implemented and optimized state management with Vuex and Pinia.',
      'Collaborated with cross-functional teams in an agile environment.',
    ],
  },
  {
    company: 'NDA Startup',
    location: 'Ukraine',
    period: 'Jun 2025 - Apr 2026',
    role: 'Front-End Developer, part-time',
    summary: [
      'Built the frontend from scratch, including architecture and component system.',
      'Developed custom form components and validation logic.',
      'Worked closely with the product team to define UI and UX.',
      'Delivered a production-ready frontend independently.',
    ],
  },
]

type RevealStyle = CSSProperties & {
  '--reveal-delay': string
}

export function WorkExperience() {
  const sectionRef = useRevealOnScroll<HTMLElement>()

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative z-10 mx-auto max-w-6xl py-24 sm:py-32"
    >
      <p
        className="reveal-up text-sm font-semibold uppercase tracking-wider text-orange-400"
        data-reveal
      >
        Work experience
      </p>

      <div className="mt-8 space-y-5">
        {experiences.map((experience, index) => (
          <article
            key={`${experience.company}-${experience.period}`}
            className="reveal-up border-l border-orange-400/35 bg-black/40 px-5 py-5 backdrop-blur-sm transition-[border-color,background-color] duration-300 hover:border-orange-300/70 hover:bg-black/55 sm:px-6"
            data-reveal
            style={{ '--reveal-delay': `${index * 120}ms` } as RevealStyle}
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-white">{experience.company}</h2>
                <p className="mt-1 text-sm text-slate-400">
                  {experience.role} · {experience.location}
                </p>
              </div>
              <p className="text-sm font-medium text-orange-200">{experience.period}</p>
            </div>

            <ul className="mt-5 grid gap-3 text-sm leading-6 text-slate-300 sm:grid-cols-2">
              {experience.summary.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-orange-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  )
}
