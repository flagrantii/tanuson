export type SkillGroup = { title: string; skills: string[] }

export const skillGroups: SkillGroup[] = [
  { title: 'Programming Languages', skills: ['JavaScript', 'TypeScript', 'Golang', 'Java', 'Python', 'C++', 'SQL'] },
  { title: 'Frameworks / Libraries', skills: ['Next.js', 'Nest.js', 'Fiber', 'Gin', 'React', 'Prisma', 'Django', 'GORM', 'Drizzle'] },
  { title: 'Databases', skills: ['PostgreSQL', 'Clickhouse', 'MongoDB', 'Redis', 'MySQL', 'Supabase', 'Qdrant'] },
  { title: 'Cloud', skills: ['AWS', 'GCP', 'DigitalOcean', 'Firebase', 'Vercel'] },
  { title: 'AI', skills: ['Python (ML)', 'PyTorch', 'TensorFlow', 'Spark', 'Kafka','RAG', 'LangChain', 'Agentic AI', 'MCP'] },
  { title: 'DevOps', skills: ['Docker', 'Kubernetes', 'Helm', 'Argo CD', 'Gitlab CI/CD', 'Jenkins', 'Github Actions', 'Prometheus', 'Grafana', 'OpenTelemetry', 'Vector'] },
]