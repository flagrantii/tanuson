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
    role: "Software Engineer, platform",
    type: "Part-Time",
    period: "Aug 2025 – Now",
    bullets: ["Developed Observability system"],
  },
  {
    id: 2,
    company: "LINE MAN Wongnai",
    role: "Software Engineer, backend",
    type: "Internship",
    period: "May 2025 – July 2025",
    bullets: [
      "Designed and implemented scalable backend services in Go handling 200k+ RPS and >1M DB ops.",
      "Implemented fault‑tolerant services to ensure seamless UX during traffic surges.",
    ],
  },
  {
    id: 3,
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
    id: 4,
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
    id: 5,
    company: "Freelance",
    role: "Solo Full-Stack Operator",
    type: "Since 2022",
    period: "Since 2022",
    bullets: [
      "Collected client requirements and translated them into technical solutions.",
      "Designed UI/UX flows and architected backend systems for scalability.",
      "Built full-stack applications (Next.js, Node.js) with custom dashboards and secure payments.",
      "Set up CI/CD pipelines and deployed to cloud platforms with monitoring.",
      "Led small teams: task delegation, code reviews, and technical guidance.",
      "Delivered projects end-to-end — from client briefing to production launch.",
    ],
  },
];
