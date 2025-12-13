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
    company: "Mee Palang Mai Co., Ltd.",
    role: "Technical Lead & Co-Founder",
    type: "Co-Founder",
    period: "Nov-2025 – Now",
    bullets: [
      "Co-founded a software development startup, establishing the company’s technical direction and development standards.",
      "Led end-to-end technical execution for a client project, from requirements discovery to deployment.",
      "Designed system architectures and selected appropriate technologies to ensure scalability and maintainability.",
      "Mentored engineers, reviewed code, and created workflows that improved team efficiency and software quality.",
      "Collaborated with clients to translate business needs into actionable technical solutions."
    ],    
  },
  {
    id: 2,
    company: "LINE MAN Wongnai",
    role: "Software Engineer, platform",
    type: "Part-Time",
    period: "Aug 2025 – Now",
    bullets: [
      "Developed a unified observability pipeline using OpenTelemetry and ClickHouse to improve telemetry completeness and system scalability.",
      "Implemented high-throughput ingestion pipelines and performed load tests supporting 200K+ logs/sec and 400K+ traces/sec.",
      "Optimized system architecture, schemas, and retention strategies to reduce query latency and operational costs.",
      "Contributed to the design of a near-real-time deployment regression detection system to improve platform reliability.",
      "Designed UX/UI, system architecture, and implemented a centralized Platform Portal serving as a single source of truth for all engineers across the organization.",
      "Collaborated with multiple engineering teams to gather requirements, identify pain points, and design an intuitive platform portal that improves developer experience and operational efficiency."
    ],
  },
  {
    id: 3,
    company: "LINE MAN Wongnai",
    role: "Software Engineer, backend",
    type: "Internship",
    period: "May 2025 – July 2025",
    bullets: [
      "Designed and implemented scalable backend services in Go handling 200k+ RPS and >1M DB ops.",
      "Implemented fault‑tolerant services to ensure seamless UX during traffic surges.",
      "Reduced database load spike by designing new infrastructure to handle large-scale transactions."
    ],
  },
  {
    id: 4,
    company: "Swipe",
    role: "Full‑Stack Developer",
    type: "Part‑Time",
    period: "Apr 2024 – Nov 2024",
    bullets: [
      "Developed responsive PWA from detailed Figma designs using Next.js, TypeScript, MUI, Redux.",
      "Enhanced performance through efficient coding practices and tuning by best‑practice solutions.",
      "Built and shipped APIs for the main product to extend capabilities and performance.",
    ],
  },
  {
    id: 5,
    company: "Blockfint",
    role: "Software Developer",
    type: "Internship",
    period: "May 2024 – Jul 2024",
    bullets: [
      "Implemented concurrency techniques to boost API speed and strengthen security.",
      "Built a user‑friendly carbon credit offset calculator in Next.js and TypeScript.",
      "Improved UX for core-product modules to solve critical challenges with innovative solutions.",
    ],
  },
  {
    id: 6,
    company: "Freelance",
    role: "Solo Full-Stack Operator",
    type: "Since 2022",
    period: "Since 2022",
    bullets: [
      "Translated diverse client needs into clear, scalable technical solutions that directly supported business goals.",
      "Designed intuitive UI/UX flows and scalable backend systems, balancing user experience with performance.",
      "Built and launched full-stack applications (Next.js, Node.js) featuring custom dashboards, secure payments, and smooth integrations.",
      "Engineered CI/CD pipelines and cloud deployments with real-time monitoring, ensuring reliability at scale.",
      "Led small cross-functional teams setting direction, reviewing code, and mentoring developers.",
      "Delivered end-to-end projects: from client briefing and system design to final production launch, on time and within scope.",
    ],
  },
];
