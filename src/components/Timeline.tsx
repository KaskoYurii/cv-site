import { Fragment, type CSSProperties } from 'react'
import { focusRing } from '@/components/Section'
import { jobs, monthIndex, now, origin, usePeriod } from '@/components/jobs'
import { useLang } from '@/lang'

const totalMonths = monthIndex(now) + 1
const years = Array.from({ length: now[0] - origin[0] }, (_, i) => origin[0] + 1 + i)
const columns = { gridTemplateColumns: `repeat(${totalMonths}, minmax(0, 1fr))` }
// Chronological on the chart, so bars read left to right.
const rows = [...jobs].reverse()

export function Timeline() {
  const { t, lang } = useLang()
  const period = usePeriod(lang, t.timeline.present)

  return (
    <figure className="col-span-4 px-5 py-8 lg:col-span-12 lg:py-10">
      <figcaption className="mb-6 flex items-baseline justify-between gap-4 text-sm text-ink-soft">
        <span>{t.timeline.title}</span>
        <span className="flex items-center gap-2">
          <span className="live relative size-2 rounded-full bg-flare" aria-hidden="true" />
          {t.timeline.current}
        </span>
      </figcaption>

      <div
        className="grid grid-cols-[6.5rem_minmax(0,1fr)] gap-y-2.5 lg:grid-cols-[8rem_minmax(0,1fr)]"
        role="img"
        aria-label={rows.map((job) => `${job.company}: ${period(job)}`).join('; ')}
      >
        <span />
        <div className="grid border-b border-rule pb-2 text-xs text-ink-faint" style={columns}>
          {years.map((year) => (
            <span key={year} className="min-w-0 whitespace-nowrap" style={{ gridColumnStart: monthIndex([year, 1]) + 1 }}>
              {year}
            </span>
          ))}
        </div>

        {rows.map((job, i) => (
          <Fragment key={job.id}>
            <a href={`#${job.id}`} className={`${focusRing} link truncate pr-3 text-sm leading-8 lg:text-base`}>
              {job.company}
            </a>
            <div className="grid h-8 items-center" style={columns}>
              <a
                href={`#${job.id}`}
                aria-label={`${job.company}: ${period(job)}`}
                title={period(job)}
                className={`${focusRing} bar press relative h-5 rounded-xs bg-flare/85 hover:bg-flare`}
                style={{
                  gridColumn: `${monthIndex(job.start) + 1} / ${monthIndex(job.end ?? now) + 2}`,
                  '--i': i,
                } as CSSProperties}
              >
                {job.end === null && (
                  <span className="live absolute top-1/2 -right-1 size-2 -translate-y-1/2 rounded-full bg-flare" aria-hidden="true" />
                )}
              </a>
            </div>
          </Fragment>
        ))}
      </div>
    </figure>
  )
}
