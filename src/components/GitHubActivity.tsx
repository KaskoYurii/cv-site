import { useEffect, useState } from 'react'
import { SectionTitle } from '@/components/Section'
import { useLang } from '@/lang'

type GitHubContribution = {
  count: number
  date: string
  level: 0 | 1 | 2 | 3 | 4
}

type ContributionDay = GitHubContribution & {
  isOutsideRange: boolean
}

const contributionsUrl = 'https://github-contributions-api.jogruber.de/v4/KaskoYurii?y=last'
const monthFormatter = new Intl.DateTimeFormat('en', { month: 'short' })
const levelColors = [
  'rgb(0 0 0 / 0.07)',
  'rgb(47 60 255 / 0.3)',
  'rgb(47 60 255 / 0.55)',
  'rgb(47 60 255 / 0.8)',
  '#2f3cff',
]

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

  return (await response.json()) as {
    contributions: GitHubContribution[]
    total: { lastYear: number }
  }
}

export function GitHubActivity() {
  const { t } = useLang()
  const [weeks, setWeeks] = useState<ContributionDay[][]>([])
  const [total, setTotal] = useState<number | null>(null)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    loadContributions()
      .then((data) => {
        setWeeks(buildContributionWeeks(data.contributions))
        setTotal(data.total.lastYear)
      })
      .catch(() => setHasError(true))
  }, [])

  return (
    <section className="px-5 py-32 lg:px-10 lg:py-44">
      <SectionTitle id="github">{t.github.title}</SectionTitle>
      <p className="mt-10 flex flex-wrap items-baseline gap-x-4" data-reveal>
        <span className="font-display text-6xl font-bold tracking-tighter tabular-nums lg:text-8xl">
          {total === null ? '…' : total.toLocaleString()}
        </span>
        <span className="text-lg text-muted">{t.github.lastYear}</span>
      </p>
      {hasError ? <p className="mt-4 text-muted">{t.github.error}</p> : null}

      <div className="mt-12 overflow-x-auto">
        <div className="min-w-[46rem]">
          <div
            className="grid gap-[3px] text-xs text-muted"
            style={{ gridTemplateColumns: `repeat(${Math.max(weeks.length, 53)}, minmax(0, 1fr))` }}
          >
            {weeks.map((week, index) => (
              <span key={week[0].date} className="min-w-0 whitespace-nowrap">
                {getMonthLabel(week, weeks[index - 1])}
              </span>
            ))}
          </div>
          <div
            className="mt-2 grid grid-flow-col grid-rows-7 gap-[3px]"
            style={{ gridTemplateColumns: `repeat(${Math.max(weeks.length, 53)}, minmax(0, 1fr))` }}
          >
            {weeks.flat().map((day) => (
              <span
                key={day.date}
                title={`${day.count} contributions on ${day.date}`}
                className="aspect-square rounded-[3px]"
                style={{ backgroundColor: levelColors[day.level], opacity: day.isOutsideRange ? 0 : 1 }}
              />
            ))}
          </div>
        </div>
      </div>
      <p className="mt-4 flex items-center gap-1.5 text-xs text-muted">
        <span className="mr-1">{t.github.less}</span>
        {levelColors.map((color) => (
          <span key={color} className="size-[12px] rounded-[3px]" style={{ backgroundColor: color }} />
        ))}
        <span className="ml-1">{t.github.more}</span>
      </p>
    </section>
  )
}
