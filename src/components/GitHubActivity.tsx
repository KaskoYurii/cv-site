import { useEffect, useMemo, useState } from 'react'
import type {
  ContributionDay,
  GitHubContribution,
  GitHubContributionResponse,
} from '@/types/github'

const contributionsUrl = 'https://github-contributions-api.jogruber.de/v4/KaskoYurii?y=last'
const monthFormatter = new Intl.DateTimeFormat('en', { month: 'short' })
const levelColors = ['rgba(255,255,255,0.06)', '#3a1608', '#7c2d12', '#ea580c', '#fb923c']

function toDateKey(date: Date) {
  return date.toISOString().slice(0, 10)
}

function startOfWeek(date: Date) {
  const nextDate = new Date(date)
  nextDate.setDate(date.getDate() - date.getDay())
  return nextDate
}

function addDays(date: Date, days: number) {
  const nextDate = new Date(date)
  nextDate.setDate(date.getDate() + days)
  return nextDate
}

function buildContributionWeeks(contributions: GitHubContribution[]) {
  if (contributions.length === 0) {
    return []
  }

  const sortedContributions = [...contributions].sort((a, b) => a.date.localeCompare(b.date))
  const contributionMap = new Map(sortedContributions.map((day) => [day.date, day]))
  const firstDate = new Date(`${sortedContributions[0].date}T00:00:00`)
  const lastDate = new Date(`${sortedContributions[sortedContributions.length - 1].date}T00:00:00`)
  const startDate = startOfWeek(firstDate)
  const weeks: ContributionDay[][] = []

  for (let cursor = startDate; cursor <= lastDate; cursor = addDays(cursor, 7)) {
    const week = Array.from({ length: 7 }, (_, dayIndex) => {
      const date = addDays(cursor, dayIndex)
      const dateKey = toDateKey(date)
      const contribution = contributionMap.get(dateKey)

      return {
        count: contribution?.count ?? 0,
        date: dateKey,
        isOutsideRange: date < firstDate || date > lastDate,
        level: contribution?.level ?? 0,
      } satisfies ContributionDay
    })

    weeks.push(week)
  }

  return weeks
}

function getMonthLabel(week: ContributionDay[], previousWeek?: ContributionDay[]) {
  const firstVisibleDay = week.find((day) => !day.isOutsideRange)

  if (!firstVisibleDay) {
    return ''
  }

  const month = new Date(`${firstVisibleDay.date}T00:00:00`).getMonth()
  const previousVisibleDay = previousWeek?.find((day) => !day.isOutsideRange)
  const previousMonth = previousVisibleDay
    ? new Date(`${previousVisibleDay.date}T00:00:00`).getMonth()
    : null

  return month !== previousMonth
    ? monthFormatter.format(new Date(`${firstVisibleDay.date}T00:00:00`))
    : ''
}

async function loadContributions() {
  const response = await fetch(contributionsUrl)

  if (!response.ok) {
    throw new Error('Contribution request failed')
  }

  return (await response.json()) as GitHubContributionResponse
}

export function GitHubActivity() {
  const [contributions, setContributions] = useState<GitHubContribution[]>([])
  const [total, setTotal] = useState<number | null>(null)
  const [hasError, setHasError] = useState(false)
  const weeks = useMemo(() => buildContributionWeeks(contributions), [contributions])

  useEffect(() => {
    let isMounted = true

    loadContributions()
      .then((data) => {
        if (!isMounted) {
          return
        }

        setContributions(data.contributions)
        setTotal(data.total.lastYear ?? Object.values(data.total).at(-1) ?? null)
        setHasError(false)
      })
      .catch(() => {
        if (isMounted) {
          setHasError(true)
        }
      })

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <section id="examples" className="relative z-10 mx-auto max-w-6xl py-24 sm:py-32">
      <p className="text-sm font-semibold uppercase tracking-wider text-orange-400">
        GitHub activity
      </p>

      <div className="mt-8 overflow-hidden border-y border-orange-400/20 bg-black/45 py-6 backdrop-blur-sm">
        <div className="flex flex-col gap-4 px-1 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-4xl font-semibold tracking-tight text-white">
              {total === null ? '...' : total.toLocaleString()}
            </p>
            <p className="mt-1 text-sm uppercase tracking-wider text-slate-500">
              contributions in the last year
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-slate-500">
            <span>Quiet</span>
            {levelColors.map((color, index) => (
              <span
                key={color}
                className="size-2.5 rounded-full"
                style={{ backgroundColor: color }}
                aria-label={`Activity level ${index}`}
              />
            ))}
            <span>Active</span>
          </div>
        </div>

        <div className="mt-8 overflow-x-auto pb-2">
          <div className="min-w-[880px]">
          <div
            className="grid gap-1 text-xs uppercase tracking-wider text-slate-600"
            style={{ gridTemplateColumns: `repeat(${Math.max(weeks.length, 53)}, 12px)` }}
          >
            {weeks.map((week, index) => (
              <span key={week[0].date}>{getMonthLabel(week, weeks[index - 1])}</span>
            ))}
          </div>

          <div className="mt-3">
            <div
              className="grid grid-flow-col grid-rows-7 gap-1"
              style={{ gridTemplateColumns: `repeat(${Math.max(weeks.length, 53)}, 12px)` }}
            >
              {weeks.flat().map((day) => (
                <span
                  key={day.date}
                  title={`${day.count} contributions on ${day.date}`}
                  className="size-3 rounded-full shadow-[0_0_14px_rgba(249,115,22,0.08)]"
                  style={{
                    backgroundColor: day.isOutsideRange ? 'transparent' : levelColors[day.level],
                    opacity: day.isOutsideRange ? 0 : 1,
                  }}
                />
              ))}
            </div>
          </div>
          </div>
        </div>

        {hasError ? (
          <p className="mt-4 text-sm text-slate-500">Contribution graph is temporarily unavailable.</p>
        ) : null}
      </div>
    </section>
  )
}
