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
      items = await fetchViaProxy(MEDIUM_FEED)
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
        {items.map((item) => {
          const snippet = buildSnippet(item)
          return (
            <article key={item.link} className="rounded-lg border p-5">
              <h3 className="text-lg font-semibold"><a href={item.link} target="_blank" rel="noreferrer">{item.title}</a></h3>
              <p className="text-xs text-gray-500 mt-1">{item.pubDate}</p>
              {snippet && (
                <p className="text-sm text-gray-600 mt-3">{snippet}</p>
              )}
              <a className="mt-3 inline-block text-sm underline underline-offset-4" href={item.link} target="_blank" rel="noreferrer">Read more on Medium</a>
            </article>
          )
        })}
      </div>
    </div>
  )
} 