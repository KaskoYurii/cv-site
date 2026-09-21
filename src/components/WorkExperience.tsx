import { Row, SectionTitle } from '@/components/Section'
import { jobs, usePeriod } from '@/components/jobs'
import { useLang } from '@/lang'

export function WorkExperience() {
  const { t, lang } = useLang()
  const period = usePeriod(lang, t.timeline.present)

  return (
    <section>
      <Row>
        <div className="col-span-4 lg:col-span-12">
          <SectionTitle id="experience">{t.experience.title}</SectionTitle>
        </div>
      </Row>
      <Row className="lg:[&>*:nth-child(even)]:border-l">
        {jobs.map((job, i) => (
          <article
            key={job.id}
            id={job.id}
            className={`col-span-4 scroll-mt-14 px-5 py-8 lg:col-span-6 lg:py-10 ${i > 0 ? 'border-t border-rule' : ''} ${i === 1 ? 'lg:border-t-0' : ''} ${i >= 2 ? 'lg:border-t' : ''}`}
          >
            <p className="text-sm text-ink-soft">{period(job)}</p>
            <h3 className="mt-2 font-display text-2xl font-bold tracking-tight lg:text-3xl">
              {job.company}
              <span className="text-ink-soft">, {job.id === 'nsoc360' ? t.experience.netherlands : t.hero.country}</span>
            </h3>
            <p className="mt-1 text-ink-soft">{t.experience.roles[job.id]}</p>
            <ul className="mt-6 space-y-3 leading-7">
              {t.experience.summaries[job.id].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-3 h-px w-3 shrink-0 bg-flare" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </Row>
    </section>
  )
}
