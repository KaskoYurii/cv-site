import { useLang } from '@/lang'

const items = [
  'Vue 3', 'Nuxt', 'React', 'Next.js', 'TypeScript',
  'Pinia', 'Vuex', 'Vuetify', 'Quasar', 'Tailwind CSS',
  'TanStack Query', 'Chart.js', 'AmCharts', 'WebSocket', 'Node.js', 'PostgreSQL',
  'Supabase', 'Vite', 'Vitest', 'Docker', 'Git',
  'CI/CD', 'Figma', 'Cursor', 'Claude Code', 'Codex',
]

function List(props: { hidden?: boolean }) {
  return (
    <ul className="flex shrink-0 items-center gap-x-10 gap-y-4 pr-10" aria-hidden={props.hidden}>
      {items.map((item) => (
        <li key={item} className="flex items-center gap-10 whitespace-nowrap">
          {item}
          <span className="size-3 rounded-full bg-accent" aria-hidden="true" />
        </li>
      ))}
    </ul>
  )
}

export function TechStack() {
  const { t } = useLang()

  return (
    <section aria-labelledby="stack" className="scroll-mt-24 overflow-hidden border-y border-ink py-6 lg:py-8">
      <h2 id="stack" className="sr-only">
        {t.stack.title}
      </h2>
      <div className="marquee flex w-max font-display text-4xl font-semibold tracking-tight uppercase lg:text-7xl">
        <List />
        <List hidden />
      </div>
    </section>
  )
}
