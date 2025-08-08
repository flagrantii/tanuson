  export type ActivityItem = { role: string; org: string; period: string; bullets: string[] }

  export const activities: ActivityItem[] = [
    {
      role: 'Software Engineer',
      org: 'Information System Development, SGCU',
      period: 'Jun 2024 – Present',
      bullets: [
        'Developed user selection group feature for incoming students website; up to 3,000 users/day.',
        'Designed DB model and project structure for CU Council; scalable and efficient system.',
        'Led development for Chu News website for university news and highlights.',
      ],
    },
    {
      role: 'Core Team',
      org: 'Thinc. (Thailand Incubator)',
      period: 'Aug 2024 – Present',
      bullets: [
        'Contributed to student‑run community focused on societal impact and real‑world skills.',
        'Supervised multiple projects and engineering teams for successful outcomes.',
      ],
    },
    {
      role: 'Core Team',
      org: 'Google Developer Student Club CU',
      period: 'Sep 2023 – Present',
      bullets: [
        'Leveraged Google tools to enhance teaching and learning experiences campus‑wide.',
      ],
    },
  ]
