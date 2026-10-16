export type Month = [year: number, month: number]

// Ongoing first, then by end date, newest first; `end: null` means still going.
export const jobs = [
  { id: 'freelance', company: 'Freelance', start: [2025, 4], end: null, stack: ['Vue 3', 'Vuetify', 'Pinia', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker'] },
  { id: 'nda', company: 'NDA startup', start: [2025, 6], end: [2026, 4], stack: ['Vue 3', 'Vuetify', 'Docker'] },
  { id: 'nsoc360', company: 'NSOC360', start: [2021, 9], end: [2025, 4], stack: ['Vue 2', 'Vue 3', 'Vuex', 'Pinia', 'Docker'] },
  { id: 'quardex', company: 'Quardex', start: [2021, 7], end: [2025, 4], stack: ['Vue 2', 'Vue 3', 'Nuxt', 'React', 'Next.js', 'Chart.js', 'AmCharts', 'Docker'] },
] as const satisfies { id: string; company: string; start: Month; end: Month | null; stack: readonly string[] }[]


export function usePeriod(lang: string, present: string) {
  const format = new Intl.DateTimeFormat(lang === 'ua' ? 'uk' : 'en', { month: 'short', year: 'numeric' })
  const month = ([y, m]: Month) => format.format(new Date(y, m - 1))
  return ({ start, end }: { start: Month; end: Month | null }) =>
    `${month(start)} – ${end ? month(end) : present}`
}
