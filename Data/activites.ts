  export type ActivityItem = { role: string; org: string; period: string; bullets: string[] }

  export const activities: ActivityItem[] = [
    {
      role: 'Lead Software Engineer',
      org: 'Information System Development, SGCU',
      period: 'Jun 2024 – Present',
      bullets: [
        'Built the group selection feature on the incoming students site, used by up to 3,000 people a day.',
        'Designed the data model and project structure for the CU Council system.',
        'Led the build of Chu News, the university news site.',
      ],
    },
    {
      role: 'Core Team & Lead Software Engineer',
      org: 'Thinc. (Thailand Incubator)',
      period: 'Aug 2024 – Present',
      bullets: [
        'Core team of a student-run tech community that builds for social causes.',
        'Supervised several project teams and the engineers on them.',
      ],
    },
    {
      role: 'Core Team',
      org: 'Google Developer Student Club CU',
      period: 'Sep 2023 – Present',
      bullets: [
        'Introduced Google developer tools to students across campus.',
      ],
    },
    {
      role: 'Lead Software Engineer',
      org: 'Engineering Student Committee, Chulalongkorn University',
      period: 'Aug 2025 – Present',
      bullets: [
        "Led the engineering team building the committee's product: architecture, code review and troubleshooting.",
        'Set up the development environment and workflow the team works in.',
      ],
    }
  ]
