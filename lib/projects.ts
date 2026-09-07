import { webs, type WebView } from '@/Data/web'

export type WebSummary = WebView

export function findProjectBySlug(slug: string): WebView | undefined {
  return webs.find((w) => w.slug === slug)
}

export function getAllProjectSlugs(): string[] {
  return webs.map((w) => w.slug)
}

/** Previous/next in catalogue order, wrapping at the ends. */
export function getProjectNeighbours(slug: string) {
  const i = webs.findIndex((w) => w.slug === slug)
  if (i < 0) return { prev: undefined, next: undefined }
  return {
    prev: webs[(i - 1 + webs.length) % webs.length],
    next: webs[(i + 1) % webs.length],
  }
}

/** Most recent N projects by date, for the home page "recent" column. */
export function getRecentProjects(n = 4): WebView[] {
  return [...webs]
    .sort((a, b) => +new Date(b.datetime) - +new Date(a.datetime))
    .slice(0, n)
}
