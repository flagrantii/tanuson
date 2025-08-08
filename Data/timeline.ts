export type TimelineItem = {
    company: string
    role: string
    type: string
    period: string
    bullets: string[]
  }
  
  export const timelineItems: TimelineItem[] = [
    {
      company: 'LINE MAN Wongnai',
      role: 'Software Engineer',
      type: 'Internship',
      period: 'May 2025 – Now',
      bullets: [
        'Designed and implemented scalable backend services in Go handling 200k+ RPS and >1M DB ops.',
        'Implemented fault‑tolerant services to ensure seamless UX during traffic surges.',
      ],
    },
    {
      company: 'Swipe',
      role: 'Full‑Stack Developer',
      type: 'Part‑Time',
      period: 'Apr 2024 – Nov 2024',
      bullets: [
        'Developed responsive PWA from detailed Figma designs using Next.js, TypeScript, MUI, Redux.',
        'Enhanced performance through efficient coding practices and tuning by best‑practice solutions.',
        'Built and shipped APIs for the main product to extend capabilities and performance.',
      ],
    },
    {
      company: 'Blockfint',
      role: 'Software Developer',
      type: 'Internship',
      period: 'May 2024 – Jul 2024',
      bullets: [
        'Implemented concurrency techniques to boost API speed and strengthen security.',
        'Built a user‑friendly carbon credit offset calculator in Next.js and TypeScript.',
        'Improved UX for core-product modules to solve critical challenges with innovative solutions.',
      ],
    },
    {
      company: 'Freelance',
      role: 'Software Engineer / Project Manager',
      type: 'Since 2022',
      period: 'Since 2022',
      bullets: [
        'Built bespoke websites for businesses and startups; ensured consistent branding and UX.',
        'Developed e‑commerce solutions with secure payments; custom dashboards in Next.js.',
        'Implemented inventory and order systems handling 5,000+ monthly transactions.',
      ],
    },
  ]