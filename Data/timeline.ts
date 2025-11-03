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
    company: "Mee Palnag Mai",
    role: "Techinical Lead & Co-Founder",
    type: "Co-Founder",
    period: "Nov-2025 – Now",
    bullets: ["My first Software House Startup Company",
    ],
  },
  {
    id: 2,
    company: "LINE MAN Wongnai",
    role: "Software Engineer, platform",
    type: "Part-Time",
    period: "Aug 2025 – Now",
    bullets: ["Developed and implemented observability migration design to handle large-scale transactions, supporting 200K+ logs per second.",
      "Designed a seamless migration strategy ensuring zero disruption to user experience during platform transition.",
      "Enhanced monitoring and alerting capabilities to proactively identify and resolve issues in massive log processing pipelines."
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
