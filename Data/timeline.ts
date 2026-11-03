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
      "Shipped deterministic field-level encryption for merchant contact data and moved more than 1.7M user records onto it with no interruption to merchants, using flag-gated dual-write, Airflow backfill and a staged rollout reviewed with SRE.",
      "Carried production on-call for the merchant platform through more than 50 incidents: root-caused GraphQL error-rate spikes, Redis circuit-breaker trips and payment status mismatches, then shipped the fixes and the guardrails.",
      "Built the engineering AI toolkit (wma-docs): shared skills for design docs, RFCs and implementation, installable through npm or the Claude plugin marketplace and now used by 4 squads and more than 20 engineers.",
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
      "Delivered an HR and field operations platform for a client end to end, running around the clock for 10,000 staff across the country: attendance, leave, OT, payroll and expenses, on NestJS, Prisma, PostgreSQL, AWS Cognito and LINE LIFF.",
      "Built CUrious, a real-time classroom quiz platform in Go with MongoDB, Redis and WebSocket, including score write-back to the university LMS.",
      "Provisioned the infrastructure from bare metal up: Proxmox VMs with OpenTofu, k3s with Ansible, and a repeatable CloudFront and S3 pipeline now serving 10 live domains.",
      "Run a multi-agent AI engineering fleet managed as GitOps, which the team uses for design docs, review and operations.",
      "Led a team of 10: set direction, reviewed code and mentored the engineers.",
    ],
  },
  {
    id: 3,
    company: "LINE MAN Wongnai",
    role: "Software Engineer, platform",
    type: "Part-Time",
    period: "Aug 2025 – Apr 2026",
    bullets: [
      "Built the organization's unified observability pipeline on OpenTelemetry and ClickHouse, and load-tested the ingestion path at 200K+ logs/sec and 400K+ traces/sec.",
      "Tuned schemas, retention and queries to halve storage cost and hold full-text log search under a second.",
      "Designed and built the Platform Portal, now the starting point for around 500 engineers across the organization, from requirements gathered across several teams.",
      "Helped design the near-real-time check that catches a regression in the minutes after a deploy.",
    ],
  },
  {
    id: 4,
    company: "LINE MAN Wongnai",
    role: "Software Engineer, backend",
    type: "Internship",
    period: "May 2025 – Jul 2025",
    bullets: [
      "Built Announcement V1 in Go, the service that delivers announcements to merchants, handling 200K+ RPS and over 1M database operations.",
      "Made it degrade gracefully under a traffic surge instead of failing outright.",
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
      "Built the PWA for a map-based restaurant discovery product, where people browse reviews, reviewers and review photos by location, from Figma designs in Next.js, TypeScript, MUI and Redux.",
      "Shipped the APIs behind it, and tuned the frontend for load time and responsiveness.",
    ],
  },
  {
    id: 6,
    company: "Blockfint",
    role: "Software Developer",
    type: "Internship",
    period: "May 2024 – Jul 2024",
    bullets: [
      "Built a carbon credit offset calculator in Next.js and TypeScript, and reworked its UX.",
      "Used concurrency to speed up the API endpoints behind it.",
    ],
  },
  {
    id: 7,
    company: "Freelance",
    role: "Full-Stack Developer",
    type: "Self-employed",
    period: "2022 – 2025",
    bullets: [
      "Delivered seven client projects in Next.js and Node.js, with custom dashboards, payments and third-party integrations.",
      "Set up the CI/CD pipelines, cloud deployments and monitoring behind them.",
      "Led small teams: set direction, reviewed code, mentored developers.",
    ],
  },
];
