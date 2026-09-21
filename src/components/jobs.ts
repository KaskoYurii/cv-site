export type Month = [year: number, month: number]

// Most recent first; `end: null` means still going.
export const jobs = [
  { id: 'nda', company: 'NDA startup', start: [2025, 6], end: [2026, 4] },
  { id: 'freelance', company: 'Freelance', start: [2025, 4], end: null },
  { id: 'nsoc360', company: 'NSOC360', start: [2021, 9], end: [2025, 4] },
  { id: 'quardex', company: 'Quardex', start: [2021, 7], end: [2025, 4] },
] as const satisfies { id: string; company: string; start: Month; end: Month | null }[]

export type Job = (typeof jobs)[number]

const today = new Date()
export const now: Month = [today.getFullYear(), today.getMonth() + 1]
export const origin = jobs[jobs.length - 1].start
export const monthIndex = ([year, month]: Month) => (year - origin[0]) * 12 + (month - origin[1])

export function usePeriod(lang: string, present: string) {
  const format = new Intl.DateTimeFormat(lang === 'ua' ? 'uk' : 'en', { month: 'short', year: 'numeric' })
  const month = ([y, m]: Month) => format.format(new Date(y, m - 1))
  return ({ start, end }: { start: Month; end: Month | null }) =>
    `${month(start)} – ${end ? month(end) : present}`
}
