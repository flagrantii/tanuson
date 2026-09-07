export type WebItem = {
  id: number
  slug: string
  title: string
  /** Editorial category shown in the meta strip, e.g. "Web", "Chrome Extension". */
  type: string
  href: {
    demoUrl: string
    repoUrl: string
  }
  description: string
  /** ISO date used for sorting. */
  datetime: string
  tags: string[]
  /** Curated display stack — meta strip, pills, résumé line. */
  stack: string[]
  /** Long-form context for the detail page. */
  about: string
  /** What I actually did on it. */
  role: string
  /** Wide cover image, or '' to fall back to the hatch plate. */
  cover: string
  images: string[]
  features: string[]
  isShowResume: boolean
}

// Source of truth: WebItem[]
export const webItems: WebItem[] = [
  {
    id: 1,
    slug: 'trip-recommendation',
    title: 'Trip Recommendation',
    type: 'Web',
    href: { demoUrl: '', repoUrl: 'https://github.com/flagrantii/TripRecommend' },
    description: 'AI-powered travel itinerary planner.',
    datetime: '2025-03-01',
    tags: ['Frontend', 'AI'],
    stack: ['Next.js', 'TypeScript', 'OpenAI API'],
    about:
      'A planner that turns a destination, a date range and a few preferences into a day-by-day itinerary, with places grouped by proximity so the plan is actually walkable.',
    role:
      'Designed the flow and built the frontend end-to-end, including the prompt orchestration that drafts and revises itineraries.',
    cover: '/background/trip.png',
    images: ['/projects/trip/trip-1.png', '/projects/trip/trip-2.png'],
    features: [
      'AI-powered personalized recommendations',
      'Local insights and hidden gems',
      'Smart budget optimization',
    ],
    isShowResume: false,
  },
  {
    id: 2,
    slug: 'carbon-credits-marketplace',
    title: 'Carbon Credits Marketplace',
    type: 'Web',
    href: { demoUrl: '', repoUrl: 'https://github.com/flagrantii/CaronCredit-main' },
    description: 'Eco-friendly shopping via carbon credit trading.',
    datetime: '2024-05-01',
    tags: ['Frontend', 'Fullstack'],
    stack: ['Next.js', 'TypeScript', 'PostgreSQL'],
    about:
      'A marketplace where shoppers offset purchases by buying verified carbon credits at checkout, with a calculator that makes the offset legible.',
    role: 'Built the storefront, the offset calculator and the backend for listings and orders.',
    cover: '/background/carbon.png',
    images: [
      '/projects/carbon/carbon-1.png',
      '/projects/carbon/carbon-2.png',
      '/projects/carbon/carbon-3.png',
    ],
    features: ['Carbon credit tracking', 'Integrated marketplace', 'User-friendly interface'],
    isShowResume: false,
  },
  {
    id: 3,
    slug: 'cunext-event',
    title: 'CUNEXT Event',
    type: 'Mobile',
    href: { demoUrl: '', repoUrl: 'https://github.com/flagrantii/cunext-event' },
    description: 'Campus-wide event management app.',
    datetime: '2024-02-01',
    tags: ['Frontend', 'Mobile'],
    stack: ['React Native', 'TypeScript', 'Firebase'],
    about:
      'One place for students to discover, register for and check into events across the Chulalongkorn campus.',
    role: 'Owned the mobile frontend — discovery, registration and check-in screens.',
    cover: '/background/event.png',
    images: [
      '/projects/event/event-1.png',
      '/projects/event/event-2.png',
      '/projects/event/event-3.png',
      '/projects/event/event-4.png',
      '/projects/event/event-5.png',
    ],
    features: [
      'Event discovery',
      'Streamlined organization',
      'Seamless participant engagement',
      'Real-time data syncing',
    ],
    isShowResume: false,
  },
  {
    id: 4,
    slug: 'massage-reservation',
    title: 'Massage Reservation',
    type: 'Web',
    href: {
      demoUrl: 'https://swdevprac2-project-get-a-good-rest-api-gules.vercel.app/',
      repoUrl: 'https://github.com/flagrantii/Massage-Reservation-2',
    },
    description: 'Effortless massage appointment management.',
    datetime: '2024-06-01',
    tags: ['Fullstack', 'DevOps'],
    stack: ['Next.js', 'Node.js', 'PostgreSQL', 'Docker'],
    about:
      'Booking and staff scheduling for a massage shop: customers pick a therapist and slot, staff see the day at a glance.',
    role: 'Full-stack build plus containerised deployment and CI/CD.',
    cover: '/background/massage.png',
    images: [
      '/projects/massage/massage-1.png',
      '/projects/massage/massage-2.png',
      '/projects/massage/massage-3.png',
    ],
    features: [
      'Booking management',
      'User-practitioner communication',
      'Efficient scheduling system',
    ],
    isShowResume: false,
  },
  {
    id: 5,
    slug: 'golang-concurrency-api',
    title: 'Golang Concurrency API',
    type: 'Server',
    href: { demoUrl: '', repoUrl: '' },
    description: 'High-performance API with Golang.',
    datetime: '2024-04-01',
    tags: ['Backend', 'DevOps'],
    stack: ['Golang', 'Fiber', 'Redis', 'Docker'],
    about:
      'An API server built to study Go concurrency patterns under load — worker pools, bounded channels, graceful shutdown.',
    role: 'Designed, benchmarked and deployed the service.',
    cover: '/background/golang.png',
    images: [],
    features: [
      'Concurrency management',
      'Optimized resource utilization',
      'Scalable system architecture',
    ],
    isShowResume: false,
  },
  {
    id: 6,
    slug: 'rub-puen-kao-mai-2024',
    title: 'Rub Puen Kao Mai 2024',
    type: 'Web',
    href: {
      demoUrl: 'https://cufreshy2024.com/',
      repoUrl: 'https://github.com/isd-sgcu/rpkm67-backend',
    },
    description:
      'Freshmen orientation registration website; supports up to 3,000 daily users with a robust distributed system.',
    datetime: '2024-07-01',
    tags: ['Fullstack', 'DevOps'],
    stack: ['Golang', 'Microservices', 'PostgreSQL', 'Kubernetes'],
    about:
      "Registration and group selection for Chulalongkorn's freshman orientation, built to absorb the burst when thousands of students log in at once.",
    role: 'Led the backend architecture as microservices in Go and the deployment pipeline.',
    cover: '/background/rpkm.png',
    images: ['/projects/rpkm/rpkm-1.png', '/projects/rpkm/rpkm-2.png'],
    features: [
      'Student registration',
      'Event information management',
      'User-friendly platform',
    ],
    isShowResume: true,
  },
  {
    id: 7,
    slug: 'nodi',
    title: 'Nodi',
    type: 'Web',
    href: {
      demoUrl: 'https://thenodi.vercel.app/',
      repoUrl: 'https://github.com/flagrantii/dsde-web',
    },
    description:
      'Web app for discovering research papers via intelligent conversations using RAG techniques.',
    datetime: '2024-12-01',
    tags: ['AI', 'Frontend', 'Fullstack'],
    stack: ['RAG', 'Qdrant', 'Python', 'Vercel', 'OpenAI API', 'Scopus API', 'Vertex AI'],
    about:
      'Discover research papers through conversation — a RAG system over Scopus that answers like a colleague and cites like a librarian.',
    role:
      'Designed the interface and built the retrieval pipeline: chunked abstracts embedded into Qdrant, re-ranked with Vertex AI, streamed answers with inline citations.',
    cover: '/background/nodi.png',
    images: [
      '/projects/nodi/nodi-1.png',
      '/projects/nodi/nodi-2.png',
      '/projects/nodi/nodi-3.png',
      '/projects/nodi/nodi-4.png',
    ],
    features: [
      'Intelligent conversation with research papers',
      'Paper recommendation based on conversation history',
      'User-friendly interface',
    ],
    isShowResume: true,
  },
  {
    id: 8,
    slug: 'kasalong',
    title: 'Kasalong',
    type: 'Web',
    href: { demoUrl: 'https://www.kasalongrice.com/en/home/', repoUrl: '' },
    description: 'Premium Thai rice brand static website.',
    datetime: '2023-05-01',
    tags: ['Frontend'],
    stack: ['Next.js', 'Tailwind CSS', 'Vercel'],
    about:
      'A brand site for a premium Thai rice label — product story, origin and where to buy.',
    role: 'Designed and built the static site.',
    cover: '/background/rice.png',
    images: ['/projects/rice/rice-1.png', '/projects/rice/rice-2.png'],
    features: [
      'Showcase premium Thai rice',
      'Interactive product catalog',
      'Responsive design',
    ],
    isShowResume: false,
  },
  {
    id: 9,
    slug: 'zongggd',
    title: 'Zongggd',
    type: 'Web',
    href: { demoUrl: 'https://www.zongggd.com/th', repoUrl: '' },
    description: 'Sticker and print shop e-commerce website.',
    datetime: '2023-09-01',
    tags: ['Fullstack'],
    stack: ['Next.js', 'Node.js', 'Stripe', 'PostgreSQL'],
    about:
      'An e-commerce store for custom stickers and prints, with uploads, previews and order tracking.',
    role: 'Full-stack build including payments and the admin order dashboard.',
    cover: '/background/sticker.png',
    images: [
      '/projects/sticker/sticker-1.png',
      '/projects/sticker/sticker-2.png',
      '/projects/sticker/sticker-3.png',
    ],
    features: [
      'Sticker and print shop',
      'User-friendly interface',
      'Responsive design',
      'Efficient product management',
    ],
    isShowResume: false,
  },
  {
    id: 10,
    slug: 'shoppo',
    title: 'Shoppo',
    type: 'Chrome Extension',
    href: { demoUrl: '', repoUrl: 'https://github.com/flagrantii/ChatKan-MVP' },
    description:
      'Browser extension that recommends products and alternatives; supports Shopee.',
    datetime: '2024-11-01',
    tags: ['AI', 'Frontend', 'Fullstack'],
    stack: ['Chrome Extension', 'Python', 'Selenium', 'OpenAI API', 'Golang'],
    about:
      'While you browse Shopee, Shoppo reads the listing and suggests better-rated or cheaper alternatives in a side panel.',
    role: 'Built the extension UI, the scraping service and the recommendation backend.',
    cover: '/background/shoppo.png',
    images: [
      '/projects/shoppo/shoppo-1.png',
      '/projects/shoppo/shoppo-2.png',
      '/projects/shoppo/shoppo-3.png',
    ],
    features: [
      'Recommendation and alternative suggestions',
      'Shopee and Amazon support',
      'User-friendly interface',
    ],
    isShowResume: true,
  },
  {
    id: 11,
    slug: 'smart-parking',
    title: 'Smart Parking',
    type: 'Hardware',
    href: {
      demoUrl: 'https://embedded-ui-three.vercel.app/',
      repoUrl: 'https://github.com/flagrantii/embedded-ui',
    },
    description:
      'System and web app for parking lot status reporting and real-time slot visualization.',
    datetime: '2024-11-01',
    tags: ['AI', 'Hardware', 'Frontend'],
    stack: ['C++', 'Firebase', 'Hardware'],
    about:
      'Sensors on each bay report occupancy to Firebase; a web map shows free slots in real time.',
    role: 'Firmware in C++, the realtime data model and the visualisation frontend.',
    cover: '/background/parking.png',
    images: [
      '/projects/parking/parking-1.png',
      '/projects/parking/parking-2.png',
      '/projects/parking/parking-3.png',
      '/projects/parking/parking-4.png',
    ],
    features: ['Web-app', 'Real-time data', 'Report Data', 'AI integration'],
    isShowResume: true,
  },
  {
    id: 12,
    slug: 'servus',
    title: 'Servus',
    type: 'Discord Bot',
    href: { demoUrl: 'https://servus-page.vercel.app/', repoUrl: '' },
    description: 'Close-professor for students (Discord Bot).',
    datetime: '2023-12-01',
    tags: ['AI', 'Integration'],
    stack: ['Discord API', 'Python', 'OpenAI API'],
    about:
      'A Discord bot that answers course questions, tracks deadlines and nudges students like a friendly TA.',
    role: 'Designed and built the bot and its integrations.',
    cover: '/background/servus.png',
    images: ['/projects/servus/Servus-1.png', '/projects/servus/Servus-2.png'],
    features: ['AI integration', 'Discord integration', 'User-friendly interface'],
    isShowResume: false,
  },
  {
    id: 13,
    slug: 'cu-openhouse',
    title: 'CU Openhouse',
    type: 'Web',
    href: { demoUrl: '', repoUrl: '' },
    description:
      'Scalable service for Chulalongkorn Openhouse 2025 supporting 12,000 concurrent users and 120,000 registered users. QR scanning, real-time updates.',
    datetime: '2025-01-01',
    tags: ['Fullstack', 'DevOps', 'Integration'],
    stack: ['Next.js', 'Golang', 'LINE LIFF', 'PostgreSQL'],
    about:
      'Registration, QR check-in and live schedule updates for the university open house — 120,000 registered, 12,000 concurrent on the day.',
    role: 'Architected the Go backend for the traffic peak and built the LINE LIFF frontend.',
    cover: '',
    images: [],
    features: ['QR scanning', 'Real-time updates', 'Scalable system'],
    isShowResume: true,
  },
  {
    id: 14,
    slug: 'tucu-football-match',
    title: 'TUCU Football Match',
    type: 'Web',
    href: { demoUrl: '', repoUrl: '' },
    description:
      'Announcements and registration platform supporting up to 3,000 concurrent registrations; user base over 20,000.',
    datetime: '2025-01-01',
    tags: ['Fullstack', 'DevOps', 'Integration'],
    stack: ['Golang', 'AWS S3', 'PostgreSQL'],
    about:
      'Ticket registration and announcements for the Thammasat—Chula football match, with 3,000 students registering at the same moment.',
    role: 'Backend in Go with S3-backed assets; capacity planning for the registration window.',
    cover: '',
    images: [],
    features: [
      'Announcements',
      'Registration',
      'User-friendly interface',
      'Scalable system',
    ],
    isShowResume: true,
  },
]

const monthYear = (iso: string) =>
  new Date(iso).toLocaleString('en-US', { month: 'short', year: 'numeric' })

/**
 * View model for the UI: adds the editorial derivations the design needs
 * (zero-padded index, tagline, demo flag, stack line, href).
 */
export const webs = webItems.map((item, i) => ({
  ...item,
  idx: String(i + 1).padStart(2, '0'),
  href: `/projects/${item.slug}`,
  date: monthYear(item.datetime),
  tagline: item.tags.join(' · ').toLowerCase(),
  stackLine: item.stack.join(' · '),
  isDemo: !!item.href.demoUrl,
  links: {
    live: item.href.demoUrl,
    repo: item.href.repoUrl,
  },
}))

export type WebView = (typeof webs)[number]
