import { focusRing, SectionTitle } from '@/components/Section'
import { useLang } from '@/lang'

// Texts (name, role, one-line summary, achievements) live under projects.items.<id> in the locales.
// `image` is a 1200×750 screenshot in public/projects.
const projects = [
  {
    id: 'unifiedone',
    url: 'https://app.unifiedone.com/signup',
    image: '/projects/unifiedone.jpg',
    stack: ['Vue', 'Vuetify', 'Docker'],
  },
  {
    id: 'autoservice',
    stack: ['Vue 3', 'Vuetify', 'Pinia', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL', 'WebSocket', 'Docker'],
  },
  {
    id: 'repairservice',
    url: 'https://repair-service-admin.vercel.app/',
    image: '/projects/repair-service.jpg',
    stack: ['React 19', 'TypeScript', 'Tailwind CSS', 'TanStack Query', 'Go', 'PostgreSQL', 'Docker', 'Playwright'],
  },
  {
    id: 'vibewaller',
    url: 'https://app.vibewaller.xyz/',
    image: '/projects/vibewaller.jpg',
    stack: ['Vue 3', 'TypeScript', 'Tailwind CSS', 'Chart.js', 'TanStack Query', 'Supabase', 'Vitest', 'Docker'],
  },
] as const

const domain = (url: string) => new URL(url).host

export function Projects() {
  const { t } = useLang()

  return (
    <section className="px-5 pb-32 lg:px-10 lg:pb-44">
      <SectionTitle id="projects">{t.projects.title}</SectionTitle>
      <ul className="mt-14 space-y-20 lg:mt-20 lg:space-y-28">
        {projects.map((project) => {
          const text = t.projects.items[project.id]
          const url = 'url' in project ? project.url : undefined
          const visual =
            'image' in project ? (
              <img
                src={project.image}
                alt={`${t.projects.shot} ${text.name}`}
                width={1200}
                height={750}
                loading="lazy"
                decoding="async"
                className="aspect-[16/10] w-full object-cover object-top transition-transform duration-700 ease-out-strong group-hover:scale-[1.03]"
              />
            ) : (
              <div className="flex aspect-[16/10] w-full items-center justify-center bg-ink font-display text-3xl font-semibold tracking-tight text-white uppercase lg:text-5xl">
                {t.projects.nda}
              </div>
            )

          return (
            <li key={project.id} className="grid gap-8 lg:grid-cols-12 lg:gap-10">
              <div className="lg:col-span-7">
                {url ? (
                  <a href={url} target="_blank" rel="noreferrer" className={`${focusRing} group block overflow-hidden rounded-2xl ring-1 ring-rule`}>
                    {visual}
                  </a>
                ) : (
                  <div className="overflow-hidden rounded-2xl ring-1 ring-rule">{visual}</div>
                )}
              </div>

              <div className="lg:col-span-5">
                <h3 className="font-display text-2xl font-semibold tracking-tight uppercase lg:text-3xl">{text.name}</h3>
                <p className="mt-1.5 text-muted">{text.role}</p>
                <p className="mt-4 max-w-[55ch] leading-6">{text.summary}</p>
                <ul className="mt-4 space-y-1.5 leading-6">
                  {text.points.map((point) => (
                    <li key={point} className="flex gap-3">
                      <span className="mt-3 h-px w-3 shrink-0 bg-accent" aria-hidden="true" />
                      {point}
                    </li>
                  ))}
                </ul>
                <ul className="mt-5 flex flex-wrap gap-1.5" aria-label={t.stack.title}>
                  {project.stack.map((tech) => (
                    <li key={tech} className="rounded-full border border-rule px-2.5 py-0.5 text-sm">
                      {tech}
                    </li>
                  ))}
                </ul>
                {'note' in text && <p className="mt-5 max-w-[55ch] text-sm leading-5 text-muted">{text.note}</p>}
                {url && (
                  <a href={url} target="_blank" rel="noreferrer" className={`${focusRing} link mt-4 inline-flex min-h-11 items-center text-muted`}>
                    {domain(url)}
                  </a>
                )}
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
