export type GitHubContribution = {
  count: number
  date: string
  level: 0 | 1 | 2 | 3 | 4
}

export type GitHubContributionResponse = {
  contributions: GitHubContribution[]
  total: Record<string, number>
}

export type ContributionDay = GitHubContribution & {
  isOutsideRange: boolean
}
