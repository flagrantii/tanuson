import Parser from 'rss-parser'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

type FeedItem = {
  title?: string
  link?: string
  pubDate?: string
  contentSnippet?: string
  categories?: string[]
}

const MEDIUM_FEED = process.env.NEXT_PUBLIC_MEDIUM_RSS || ''

async function fetchText(url: string) {
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (compatible; TanusonSite/1.0; +https://personal.tanuson.work)',
      'Accept': 'application/rss+xml, application/xml;q=0.9,*/*;q=0.8',
    },
    cache: 'no-store',
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const contentType = res.headers.get('content-type') || ''
  const text = await res.text()
  return { text, contentType }
}

function extractRssLinkFromHtml(html: string): string | null {
  const linkRegex = /<link[^>]*rel=["']alternate["'][^>]*type=["']application\/(?:rss\+xml|atom\+xml)["'][^>]*href=["']([^"']+)["'][^>]*>/i
  const match = html.match(linkRegex)
  return match ? match[1] : null
}

export default async function BlogPage() {
  const parser: Parser = new Parser()
  let items: FeedItem[] = []
  let errorMsg: string | null = null

  if (MEDIUM_FEED) {
    try {
      // First fetch whatever URL is provided
      let { text, contentType } = await fetchText(MEDIUM_FEED)

      // If not XML, try to discover an RSS link from the HTML
      if (!/xml|rss|atom/i.test(contentType)) {
        const rssUrl = extractRssLinkFromHtml(text)
        if (!rssUrl) throw new Error('Provided URL did not return RSS/XML and no RSS link was found in HTML.')
        const second = await fetchText(rssUrl)
        text = second.text
        contentType = second.contentType
      }

      // Safeguard: trim leading junk before XML (some proxies inject chars)
      const xmlStart = text.indexOf('<')
      const xml = xmlStart > 0 ? text.slice(xmlStart) : text

      const feed = await parser.parseString(xml)
      items = (feed.items as FeedItem[]).slice(0, 10)
      if (!items || items.length === 0) {
        errorMsg = 'No posts found from the configured feed.'
      }
    } catch (e: any) {
      errorMsg = `Failed to fetch RSS feed. ${e?.message ?? 'Check the URL or network.'}`
      items = []
    }
  }

  return (
    <div className="px-6 lg:px-8 mx-auto max-w-5xl py-16">
      <h1 className="text-3xl sm:text-4xl font-semibold">Blog</h1>
      <p className="mt-3 text-gray-600">Latest writing on design, engineering, and process.</p>

      {!MEDIUM_FEED && (
        <div className="mt-6 rounded-md border p-4 text-sm text-gray-600">
          Set <code className="px-1 py-0.5 bg-gray-100">NEXT_PUBLIC_MEDIUM_RSS</code> to your Medium RSS URL (e.g. https://medium.com/feed/@username or publication feed).
        </div>
      )}

      {MEDIUM_FEED && errorMsg && (
        <div className="mt-6 rounded-md border p-4 text-sm text-gray-600">{errorMsg}</div>
      )}

      <div className="mt-8 grid gap-6">
        {items.map((item) => (
          <article key={item.link} className="rounded-lg border p-5">
            <h3 className="text-lg font-semibold"><a href={item.link} target="_blank" rel="noreferrer">{item.title}</a></h3>
            <p className="text-xs text-gray-500 mt-1">{item.pubDate}</p>
            {item.contentSnippet && (
              <p className="text-sm text-gray-600 mt-3">{item.contentSnippet}</p>
            )}
            <a className="mt-3 inline-block text-sm underline underline-offset-4" href={item.link} target="_blank" rel="noreferrer">Read more on Medium</a>
          </article>
        ))}
      </div>
    </div>
  )
} 