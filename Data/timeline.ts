export type TimelineItem = {
  id: number;
  company: string;
  role: string;
  type: string;
  period: string;
  bullets: string[];
};

export const timelineItems: TimelineItem[] = [
  {
    id: 1,
    company: "LINE MAN Wongnai",
    role: "Software Engineer, backend",
    type: "Full-Time",
    period: "May 2026 – Present",
    bullets: [
      "Built the merchant-message service behind the Merchant App inbox and in-app notice banners, now serving millions of gRPC calls a day, and moved merchant messaging off the legacy monolith with dual-write and a feature-flagged rollout to every merchant.",
      "Chose the datastore layout for high-volume merchant messaging: shard-key analysis, index and TTL policy, and a written decision to stay on one replica set instead of sharding.",
      "Shipped deterministic field-level encryption for merchant contact data, with flag-gated dual-write, Airflow backfill, and a staged rollout reviewed with SRE.",
      "Carried production on-call for the merchant platform. Root-caused GraphQL error-rate spikes, Redis circuit-breaker trips and payment status mismatches, then shipped the fixes and the guardrails.",
      "Built the engineering AI toolkit (wma-docs): shared skills for design docs, RFCs and implementation, installable through npm or the Claude plugin marketplace, and rolled it out across the organization.",
      "Mentored the 2026 intern cohort: scoped their tickets, reviewed their code, ran feedback sessions.",
    ],
  },
  {
    id: 2,
    company: "Mee Palang Mai Co., Ltd.",
    role: "Technical Lead & Co-Founder",
    type: "Co-Founder",
    period: "Nov 2025 – Present",
    bullets: [
      "Co-founded a software studio and set its technical direction and development standards.",
      "Delivered a workforce management platform for a client end to end: attendance, leave, OT, payroll and expenses plus field operations, on NestJS, Prisma, PostgreSQL, AWS Cognito and LINE LIFF.",
      "Built CUrious, a real-time classroom quiz platform in Go with MongoDB, Redis and WebSocket, including score write-back to the university LMS.",
      "Provisioned the infrastructure from bare metal up: Proxmox VMs with OpenTofu, k3s with Ansible, and a repeatable CloudFront and S3 pipeline now serving 10 live domains.",
      "Run a fleet of 7 AI engineering agents managed as GitOps, which the team uses for design docs, review and operations.",
      "Reviewed code and mentored the engineers on the team.",
    ],
  },
  {
    id: 3,
    company: "LINE MAN Wongnai",
    role: "Software Engineer, platform",
    type: "Part-Time",
    period: "Aug 2025 – Apr 2026",
    bullets: [
      "Load-tested the ingestion pipeline at 200K+ logs/sec and 400K+ traces/sec.",
      "Built a unified observability pipeline on OpenTelemetry and ClickHouse.",
      "Tuned schemas, retention and queries to cut query latency and storage cost.",
      "Helped design near-real-time regression detection for deploys.",
      "Designed and built the Platform Portal, the one place engineers across the organization start from, after collecting requirements from several teams.",
    ],
  },
  {
    id: 4,
    company: "LINE MAN Wongnai",
    role: "Software Engineer, backend",
    type: "Internship",
    period: "May 2025 – Jul 2025",
    bullets: [
      "Built Go backend services handling 200K+ RPS and over 1M database operations.",
      "Made the services degrade gracefully instead of failing when traffic surged.",
      "Cut a database load spike by redesigning the infrastructure that handles large-scale transactions.",
    ],
  },
  {
    id: 5,
    company: "Swipe",
    role: "Full-Stack Developer",
    type: "Part-Time",
    period: "Apr 2024 – Nov 2024",
    bullets: [
      "Built a responsive PWA from Figma designs in Next.js, TypeScript, MUI and Redux.",
      "Shipped the APIs behind the main product.",
      "Tuned frontend performance.",
    ],
  },
  {
    id: 6,
    company: "Blockfint",
    role: "Software Developer",
    type: "Internship",
    period: "May 2024 – Jul 2024",
    bullets: [
      "Used concurrency to speed up the API endpoints.",
      "Built a carbon credit offset calculator in Next.js and TypeScript.",
      "Reworked the UX of the core product modules.",
    ],
  },
  {
    id: 7,
    company: "Freelance",
    role: "Full-Stack Developer",
    type: "Self-employed",
    period: "2022 – Present",
    bullets: [
      "Built and shipped full-stack apps in Next.js and Node.js with custom dashboards, payments and third-party integrations.",
      "Set up the CI/CD pipelines, cloud deployments and monitoring behind them.",
      "Led small teams: set direction, reviewed code, mentored developers.",
    ],
  },
];
