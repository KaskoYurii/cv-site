import { Row, SectionTitle } from '@/components/Section'
import { useLang } from '@/lang'

const items = [
  'Vue 3', 'TypeScript', 'Pinia', 'React',
  'Vuetify', 'Quasar', 'Chart.js', 'AmCharts',
  'Vite', 'Vitest', 'Docker', 'Git',
  'CI/CD', 'Figma', 'Cursor', 'Claude Code',
  'Codex',
]

export function TechStack() {
  const { t } = useLang()

  return (
    <section>
      <Row>
        <div className="col-span-4 lg:col-span-12">
          <SectionTitle id="stack">{t.stack.title}</SectionTitle>
        </div>
      </Row>
      <Row className="border-t-0">
        {items.map((item, i) => (
          <p
            key={item}
            className={`col-span-2 border-t border-rule px-5 py-4 text-lg font-medium lg:col-span-3 ${i % 2 ? 'border-l' : ''} ${i % 4 ? 'lg:border-l' : 'lg:border-l-0'}`}
          >
            {item}
          </p>
        ))}
      </Row>
    </section>
  )
}
