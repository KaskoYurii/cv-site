import { useState } from 'react'
import { focusRing, SectionTitle } from '@/components/Section'
import { jobs, usePeriod } from '@/components/jobs'
import { useLang } from '@/lang'

export function WorkExperience() {
  const { t, lang } = useLang()
  const period = usePeriod(lang, t.timeline.present)
  const [open, setOpen] = useState<string | null>(jobs[0].id)

  return (
    <section className="rounded-t-4xl bg-ink px-5 pt-24 pb-32 text-white lg:rounded-t-[3rem] lg:px-10 lg:pt-36 lg:pb-44">
      <SectionTitle id="experience">{t.experience.title}</SectionTitle>
      <ol className="mt-14 border-t border-white/20 lg:mt-20">
        {jobs.map((job) => {
          const isOpen = open === job.id
          return (
            <li key={job.id} id={job.id} className="border-b border-white/20">
              <h3>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`${job.id}-panel`}
                  onClick={() => setOpen(isOpen ? null : job.id)}
                  className={`${focusRing} group grid w-full cursor-pointer grid-cols-[1fr_auto] items-center gap-x-6 gap-y-2 py-7 text-left lg:grid-cols-12 lg:py-9`}
                >
                  <span className="text-[15px] text-white/60 tabular-nums lg:col-span-3">
                    {period(job)}
                    {job.end === null && (
                      <span className="ml-3 rounded-full bg-accent px-2.5 py-0.5 text-sm text-white">{t.timeline.current}</span>
                    )}
                  </span>
                  <span className="col-start-1 font-display text-3xl font-semibold tracking-tight uppercase transition-[translate,color] duration-500 ease-out-strong lg:col-span-6 lg:col-start-4 lg:text-5xl group-hover:lg:translate-x-3 group-hover:lg:text-accent-soft">
                    {job.company}
                  </span>
                  <span
                    className="col-start-2 row-span-2 row-start-1 grid size-11 place-items-center justify-self-end rounded-full border border-white/30 text-2xl transition-transform duration-300 ease-out-strong lg:col-span-1 lg:col-start-12 lg:row-span-1"
                    style={{ transform: isOpen ? 'rotate(45deg)' : undefined }}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>
              </h3>
              <div id={`${job.id}-panel`} className="panel" data-open={isOpen}>
                <div className="overflow-hidden" inert={!isOpen}>
                  <div className="grid gap-6 pb-10 lg:grid-cols-12">
                    <p className="text-white/60 lg:col-span-3">
                      {t.experience.roles[job.id]}
                      <br />
                      {job.id === 'nsoc360' ? t.experience.netherlands : t.hero.country}
                    </p>
                    <ul className="grid gap-x-10 gap-y-4 text-lg leading-7 lg:col-span-8 lg:col-start-4 lg:grid-cols-2">
                      {t.experience.summaries[job.id].map((item) => (
                        <li key={item} className="border-t border-white/15 pt-4">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
