    // Mapping skills to timeline items based on their content.
    // IDs match `Data/timeline.ts`: 1 LMWN full-time · 2 Mee Palang Mai · 3 LMWN part-time
    // 4 LMWN internship · 5 Swipe · 6 Blockfint · 7 Freelance
export const skillToTimelineMapping: Record<string, number[]> = {
    'Golang': [1, 2, 3, 4], // LINE MAN Wongnai roles + Mee Palang Mai
    'Next.js': [2, 5, 6, 7], // Mee Palang Mai, Swipe, Blockfint, Freelance
    'TypeScript': [2, 5, 6, 7], // Mee Palang Mai, Swipe, Blockfint, Freelance
    'JavaScript': [2, 5, 6, 7], // Frontend roles
    'React': [2, 5, 6, 7], // Mee Palang Mai, Swipe, Blockfint, Freelance
    'PostgreSQL': [4, 7], // LINE MAN backend, freelance projects
    'MySQL': [1, 4], // LINE MAN backends
    'MongoDB': [1, 2, 3], // merchant-message datastore, platform work, studio projects
    'Redis': [1, 3, 4], // caching and circuit breakers on the merchant platform
    'Clickhouse': [3], // observability pipeline
    'Docker': [1, 2, 3, 4, 5, 6, 7], // containerised everywhere
    'Kubernetes': [1, 2, 3], // platform + merchant services
    'AWS': [2, 3, 7], // Cloud infrastructure
    'Python': [1, 7], // Airflow backfill pipelines, freelance projects
    'SQL': [1, 4, 7], // Database work
    'OpenTelemetry': [3], // unified observability pipeline
  }
