import { useEffect, useState } from 'react'
import { Row, SectionTitle } from '@/components/Section'
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
const levelColors = ['rgb(255 255 255 / 0.08)', 'rgb(255 91 0 / 0.3)', 'rgb(255 91 0 / 0.55)', 'rgb(255 91 0 / 0.8)', '#ff5b00']

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
    <section>
      <Row>
        <div className="col-span-4 lg:col-span-12">
          <SectionTitle id="github">{t.github.title}</SectionTitle>
        </div>
      </Row>
      <Row>
        <div className="col-span-4 px-5 py-8 lg:col-span-3 lg:py-10">
          <p className="font-display text-5xl font-extrabold tracking-tight lg:text-6xl">
            {total === null ? '…' : total.toLocaleString()}
          </p>
          <p className="mt-2 text-ink-soft">{t.github.lastYear}</p>
          {hasError ? <p className="mt-4 text-sm text-ink-soft">{t.github.error}</p> : null}
        </div>

        <div className="col-span-4 border-t border-rule px-5 py-8 lg:col-span-9 lg:border-t-0 lg:border-l lg:py-10">
          <div className="overflow-x-auto pb-2">
            <div className="min-w-[46rem]">
              <div
                className="grid gap-[3px] text-xs text-ink-faint"
                style={{ gridTemplateColumns: `repeat(${Math.max(weeks.length, 53)}, 12px)` }}
              >
                {weeks.map((week, index) => (
                  <span key={week[0].date} className="min-w-0 whitespace-nowrap">
                    {getMonthLabel(week, weeks[index - 1])}
                  </span>
                ))}
              </div>
              <div
                className="mt-2 grid grid-flow-col grid-rows-7 gap-[3px]"
                style={{ gridTemplateColumns: `repeat(${Math.max(weeks.length, 53)}, 12px)` }}
              >
                {weeks.flat().map((day) => (
                  <span
                    key={day.date}
                    title={`${day.count} contributions on ${day.date}`}
                    className="size-[12px] rounded-[3px]"
                    style={{ backgroundColor: levelColors[day.level], opacity: day.isOutsideRange ? 0 : 1 }}
                  />
                ))}
              </div>
            </div>
          </div>
          <p className="mt-4 flex items-center gap-1.5 text-xs text-ink-faint">
            <span className="mr-1">{t.github.less}</span>
            {levelColors.map((color) => (
              <span key={color} className="size-[12px] rounded-[3px]" style={{ backgroundColor: color }} />
            ))}
            <span className="ml-1">{t.github.more}</span>
          </p>
        </div>
      </Row>
    </section>
  )
}
