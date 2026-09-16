// Résumé + site content. Source of truth for the editorial refactor.

import { timelineItems } from './timeline'
import { skillGroups } from './skills'
import { activities } from './activites'

/*
 * Résumé view models derived from the canonical data files, so job history and
 * skills have exactly one source of truth. `Data/timeline.ts` also drives the
 * about page's skill-connection lines, which index roles by `id`.
 */

export type Job = {
  id: number
  role: string
  kind: string
  co: string
  range: string
  /** Included in the "Minimal" résumé mode. */
  core: boolean
  bullets: string[]
}

/** The three most recent roles carry the Minimal résumé. */
const CORE_ROLE_IDS = [1, 2, 3]

export const JOBS: Job[] = timelineItems.map((t) => ({
  id: t.id,
  role: t.role,
  kind: t.type,
  co: t.company,
  range: t.period,
  core: CORE_ROLE_IDS.includes(t.id),
  bullets: t.bullets,
}))

export type TechRow = { k: string; v: string }

/** Short mono labels for the résumé's technology rail. */
const TECH_LABELS: Record<string, string> = {
  'Programming Languages': 'languages',
  'Frameworks / Libraries': 'frameworks',
  Databases: 'databases',
  Cloud: 'cloud',
  AI: 'ai',
  DevOps: 'devops',
}

export const TECH: TechRow[] = skillGroups.map((g) => ({
  k: TECH_LABELS[g.title] ?? g.title.toLowerCase(),
  v: g.skills.join(', '),
}))

export type Extra = { org: string; role: string; range: string; bullets: string[] }

export const EXTRA: Extra[] = activities.map((a) => ({
  org: a.org,
  role: a.role,
  range: a.period,
  bullets: a.bullets,
}))

export const OBJECTIVE =
  'Dedicated software developer focused on building scalable, high-performance web applications. Proven experience across full-stack development, backend architecture, frontend engineering, and cloud infrastructure. I aim to leverage my expertise to create impactful digital solutions that enhance user experiences and drive business outcomes.'

export const EDUCATION_RESUME = {
  range: 'Aug 2023 — present',
  degree: 'Bachelor of Engineering, Computer Engineering',
  school: 'Chulalongkorn University (not graduated yet)',
  coursework:
    'Coursework: Data Structures and Algorithms, Database Systems, OOP, Software Engineering, Computer Networks, Operating Systems, Data Science, System Design.',
}

export const SECTION_KEYS = [
  'objective',
  'experience',
  'tech',
  'education',
  'extra',
  'projects',
  'contact',
] as const

export type SectionKey = (typeof SECTION_KEYS)[number]

export const MODE_SECTIONS: Record<ResumeMode, readonly SectionKey[]> = {
  Full: SECTION_KEYS,
  Core: ['experience', 'tech', 'education', 'projects', 'contact'],
  Minimal: ['experience', 'tech', 'contact'],
}

export type ResumeMode = 'Full' | 'Core' | 'Minimal'

export const RESUME_MODES: ResumeMode[] = ['Full', 'Core', 'Minimal']

export const SECTION_LABELS: Record<SectionKey, string> = {
  objective: 'objective',
  experience: 'experience',
  tech: 'technologies',
  education: 'education',
  extra: 'extracurricular',
  projects: 'projects',
  contact: 'contact',
}

export const RESUME_PROJECT_SLUGS = [
  'rub-puen-kao-mai-2024',
  'nodi',
  'shoppo',
  'smart-parking',
  'cu-openhouse',
  'tucu-football-match',
]

export const CONTACT = {
  phone: '+66 61 483 9393',
  phoneHref: 'tel:+66614839393',
  email: 'tanuson679@gmail.com',
  github: 'https://github.com/flagrantii',
  githubLabel: 'github.com/flagrantii',
  linkedin: 'https://www.linkedin.com/in/tanuson-deachaboonchana-743a3029b/',
  site: 'https://personal.tanuson.work',
  siteLabel: 'personal.tanuson.work',
  location: 'Suan Luang, Bangkok',
}

export const NOW = [
  { org: 'LINE MAN Wongnai', line: 'Software Engineer, Backend · May 2026 —' },
  { org: 'Mee Palang Mai Co., Ltd.', line: 'Technical Lead & Co-Founder · Nov 2025 —' },
  { org: 'Chulalongkorn University', line: 'B.Eng. Computer Engineering · 2023 —' },
]

export const PRACTICE =
  "I'm Tanuson — a software engineer in Bangkok. Most of what I've built has been for people I actually run into: registration for the morning a whole cohort signs up at once, orientation for a class of freshmen, a bot that answers the question you were too shy to ask a professor. Currently at LINE MAN Wongnai, and co-founder at Mee Palang Mai."

/** First-person biography for the about page. */
export const BIO = [
  'I grew up in Nakhon Si Thammarat and moved to Bangkok to study computer engineering at Chulalongkorn. I started taking freelance work in 2022, partway through school, and learned most of this job the way people usually do — by shipping something to people who were already waiting for it.',
  'A lot of my work has been for my own university: the site freshmen use before they have friends yet, the queue on open-house morning, the registration everyone opens at the same minute. When it works, nobody notices it. That is the part I like.',
  'These days I split my time between the merchant platform at LINE MAN Wongnai and Mee Palang Mai, the studio I co-founded. The part I have come to enjoy most is not writing the code — it is reading someone else\'s, and watching them get faster.',
]

/** How I work — the human version of a methodology section. */
export const PRINCIPLES = [
  {
    title: 'Someone is waiting at the end of it',
    body:
      'Every service has a person on the other side, usually in a hurry and usually on a phone. I design backwards from them rather than forwards from the architecture.',
  },
  {
    title: 'Build for the worst morning',
    body:
      'Averages are comfortable and useless. The day that matters is the one where everyone arrives at once, so that is the day I plan for.',
  },
  {
    title: 'Leave it better for the next person',
    body:
      'Most code is read by someone who did not write it, often under pressure. Reviews, naming and documentation are the actual deliverable.',
  },
  {
    title: 'Finish things',
    body:
      'A shipped thing that is slightly wrong teaches you more than a perfect thing that never launched. I would rather learn in public and fix it.',
  },
]

/** Home page hero and section copy. */
export const HERO = {
  line1: 'Designing intelligence',
  line2: 'that feels human.',
  lead:
    "I'm Tanuson — a software engineer in Bangkok. I build the systems people lean on when they are in a hurry, and try to make them feel like nothing at all.",
}

export const STATEMENT = {
  before: 'Most of what I build is ',
  accent: 'invisible on purpose',
  after:
    ' — the registration that holds at nine in the morning, the queue that keeps moving, the answer that lands before you think to refresh.',
}

export const CLOSING = {
  before: 'Got something that deserves building properly? ',
  accent: "Let's talk.",
}
