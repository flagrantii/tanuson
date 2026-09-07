import Reveal from '@/components/motion/Reveal'
import SplitText from '@/components/motion/SplitText'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

type FeedItem = {
  title?: string
  link?: string
  pubDate?: string
  contentSnippet?: string
  description?: string
  categories?: string[]
  [key: string]: any
}

type Rss2JsonResponse = {
  status: string
  feed: {
    url: string
    title: string
    link: string
    author: string
    description: string
    image: string
  }
  items: Array<{
    title: string
    pubDate: string
    link: string
    guid: string
    author: string
    thumbnail: string
    description: string
    content: string
    categories: string[]
  }>
}

const MEDIUM_FEED = process.env.NEXT_PUBLIC_MEDIUM_RSS || ''

// Convert Medium profile/publication URL to RSS feed URL
function getMediumFeedUrl(url: string): string {
  if (!url) return url
  
  // Already a feed URL
  if (url.includes('/feed/')) return url
  
  // Handle @username format: https://medium.com/@username -> https://medium.com/feed/@username
  const userMatch = url.match(/medium\.com\/@([^\/\?]+)/)
  if (userMatch) {
    return `https://medium.com/feed/@${userMatch[1]}`
  }
  
  // Handle publication: https://medium.com/publication-name -> https://medium.com/feed/publication-name
  const pubMatch = url.match(/medium\.com\/([^@\/\?][^\/\?]*)/)
  if (pubMatch && !['feed', 'tag', 'search', 'me', 'new-story'].includes(pubMatch[1])) {
    return `https://medium.com/feed/${pubMatch[1]}`
  }
  
  // Return as-is if we can't parse it
  return url
}

function extractTextFromHtml(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, ' ')
    .trim()
}

function buildSnippet(item: FeedItem): string {
  const candidates: string[] = []
  if (item.contentSnippet) candidates.push(item.contentSnippet)
  if (item.description) candidates.push(item.description)
  if (item['content:encodedSnippet']) candidates.push(item['content:encodedSnippet'])
  if (item['content:encoded']) candidates.push(extractTextFromHtml(String(item['content:encoded'])))
  if (item.content) candidates.push(item.content)

  let text = candidates.find(Boolean) || ''
  text = extractTextFromHtml(text)

  const MIN = 300
  const MAX = 500
  const TARGET = 400

  if (text.length <= MIN) return text

  let slice = text.slice(0, Math.min(MAX, Math.max(TARGET, MIN)))
  const period = slice.lastIndexOf('. ')
  const space = slice.lastIndexOf(' ')
  const cut = period >= MIN ? period + 1 : space >= MIN ? space : slice.length
  slice = slice.slice(0, cut)
  return slice + (text.length > slice.length ? '…' : '')
}

async function fetchViaProxy(feedUrl: string): Promise<FeedItem[]> {
  // Use rss2json.com as a proxy to bypass Medium's 403 block
  const proxyUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feedUrl)}`
  
  const res = await fetch(proxyUrl, {
    cache: 'no-store',
    headers: {
      'Accept': 'application/json',
    },
  })
  
  if (!res.ok) throw new Error(`Proxy HTTP ${res.status}`)
  
  const data: Rss2JsonResponse = await res.json()
  
  if (data.status !== 'ok') {
    throw new Error('RSS proxy returned error status')
  }
  
  return data.items.map(item => ({
    title: item.title,
    link: item.link,
    pubDate: item.pubDate,
    description: item.description,
    content: item.content,
    contentSnippet: extractTextFromHtml(item.description || item.content || ''),
    categories: item.categories,
  }))
}

export default async function BlogPage() {
  let items: FeedItem[] = []
  let errorMsg: string | null = null

  if (MEDIUM_FEED) {
    try {
      const feedUrl = getMediumFeedUrl(MEDIUM_FEED)
      items = await fetchViaProxy(feedUrl)
      items = items.slice(0, 10)
      
      if (!items || items.length === 0) {
        errorMsg = 'No posts found from the configured feed.'
      }
    } catch (e: any) {
      errorMsg = `Failed to fetch RSS feed. ${e?.message ?? 'Check the URL or network.'}`
      items = []
    }
  }

  return (
    <div>
      <div className="gutter grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-end gap-x-12 gap-y-6 pb-8 pt-[clamp(36px,5vw,56px)]">
        <h1 className="m-0 font-display text-[clamp(56px,8.5vw,110px)] leading-[.93] tracking-tightest">
          <SplitText text="Notes &" emphasis="writing." />
        </h1>
        <Reveal delay={0.18}>
          <p className="m-0 font-body text-[clamp(17px,1.6vw,20px)] font-light leading-[1.4] text-copy">
            Occasional writing on platform engineering, Go, and the parts of design that
            survive contact with production.
          </p>
        </Reveal>
      </div>

      {items.length === 0 ? (
        <div className="gutter pb-20">
          <div className="hatch flex min-h-[220px] items-center justify-center border border-ink p-8 text-center font-mono text-[12px] leading-[1.8] text-muted">
            {!MEDIUM_FEED
              ? '[ no feed configured · set NEXT_PUBLIC_MEDIUM_RSS ]'
              : `[ ${errorMsg ?? 'the feed returned nothing — check back shortly'} ]`}
          </div>
        </div>
      ) : (
        <div className="gutter flex flex-col border-t border-hair pb-20">
          {items.map((item, i) => {
            const snippet = buildSnippet(item)
            return (
              <Reveal key={item.link ?? i} delay={i * 0.04}>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                  className="group grid grid-cols-1 gap-5 border-b border-hair py-6 text-inherit no-underline sm:grid-cols-[minmax(120px,160px)_1fr]"
                >
                  <div className="font-mono text-[11px] text-muted">
                    <span className="mr-2 text-rust">{String(i + 1).padStart(2, '0')}</span>
                    {item.pubDate
                      ? new Date(item.pubDate).toLocaleDateString('en-US', {
                          month: 'short',
                          year: 'numeric',
                        })
                      : ''}
                  </div>
                  <div>
                    <div className="font-display text-[clamp(24px,2.6vw,32px)] leading-[1.1] transition-colors group-hover:text-rust">
                      {item.title}
                    </div>
                    {snippet && (
                      <p className="m-0 mt-2 max-w-2xl font-body text-[16px] font-light leading-[1.5] text-copy">
                        {snippet}
                      </p>
                    )}
                    <span className="mt-3 inline-block font-mono text-[11px] text-muted">
                      read on medium{' '}
                      <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                        ↗
                      </span>
                    </span>
                  </div>
                </a>
              </Reveal>
            )
          })}
        </div>
      )}
    </div>
  )
}
