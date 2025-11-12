export type CertItem = {
  id: number
  title: string
  href: string
  description: string
  date: string
  datetime: string
  category: { title: string; org: string }
  author: { href: string; imageUrl: string; cersimage: string }
  skills: string[]
}

export const cers = [
  {
    id: 1,
    title: 'Supervised Machine Learning: Regression and Classification',
    href: 'https://coursera.org/share/1c1244c494a980fd62448707b52a2cab',
    description:
      'Principles of supervised machine learning By in-depth look at regression and classification methods. Gain practical skills in model training and evaluation. Learn to use algorithms for predictive analytics.',
    date: 'October 2022',
    datetime: '2020-03-16',
    category: { title: 'Coursera', org: 'DeepLearning.AI' },
      author: {
      href: '#',
      imageUrl:
          '/icon/coursera.png',
      cersimage: '/cert/cer_deepai.jpeg',
  },
    skills: ["Linear Regression", 
    "Regularization to Avoid Overfitting", 
    "Logistic Regression for Classification",
    "Gradient Descent",
    "Supervised Learning",
  ],
  },
   {
    id: 2,
    title: 'Technical Support Fundamentals',
    href: 'https://coursera.org/share/116e66fe61fc085dd32998deaf5dfabe',
    description:
      'gain expertise in Technical Support Fundamentals, mastering troubleshooting, effective customer communication, and problem-solving techniques. Develop a strong foundation in hardware and software support',
    date: 'October 2022',
    datetime: '2020-03-16',
    category: { title: 'Coursera', org: 'Google' },
    author: {
      href: '#',
      imageUrl:
        '/icon/coursera.png',
      cersimage: '/cert/cer_googleit.jpeg',
    },
    skills: ["Binary Code", "Customer Support", "Linux","Troubleshooting"],
  },
  {
    id: 3,
    title: 'Build LookML Objects in Looker',
    href: 'https://www.cloudskillsboost.google/public_profiles/4070637f-c92e-424f-a35e-c071938698cf/badges/9421029',
    description:
      'Certificate in "Build LookML Objects in Looker" validates proficiency in constructing LookML models within Looker, empowering data analysts to create robust data models for business intelligence.',
    date: 'June 2024',
    datetime: '2020-03-16',
    category: { title: 'Google', org: 'Google Cloud' },
    author: {
      href: '#',
      imageUrl:
        '/icon/google1.jpg',
      cersimage: '/cert/cer_lookml.png',
    },
    skills: ["ML", "AI", "LookML","SQL","Data Analysis","Data Visualization"],
  },
  {
    id: 4,
    title: 'AI Engineer Agentic Track: The Complete Agent & MCP Course',
    href: 'https://www.udemy.com/certificate/UC-38ae6e43-1326-41c8-b5c6-12bd25424b1a/',
    description:
      'Learners develop a deep understanding of agentic AI architectures, including multi-agent collaboration, memory systems, feedback loops, and real-time tool integrations. Through 8 real-world projects, students build advanced AI systems capable of web search, file handling, Python execution, and automated decision-making — similar to real digital assistants or AI copilots.',
    date: 'May 2025',
    datetime: '2020-03-16',
    category: { title: 'Udemy', org: 'Udemy' },
    author: {
      href: '#',
      imageUrl:
        '/icon/udemy.png',
      cersimage: '/cert/cer_aiagent.jpg',
    },
    skills: ["AI", "Agentic", "MCP"],
  },
  {
    id: 5,
    title: 'Software Architecture & Technology of Large-Scale Systems',
    href: 'https://www.udemy.com/certificate/UC-0e982c08-430a-456e-969b-e1ce3ae0d817/',
    description:
      'This advanced course guides experienced software developers through the transition from developer to solution architect. It covers the architecture of large-scale systems, deep dives into non-functional requirements (performance, scalability, reliability, security), and the internal workings of key tools and platforms like Node.js, Redis, Kafka, Cassandra, ELK, Hadoop, Docker, and Kubernetes. By the end you’ll understand how to make meaningful architectural decisions, build high-performance production systems, and lead system design with confidence.',
    date: 'Nov 2025',
    datetime: '2020-03-16',
    category: { title: 'Udemy', org: 'Udemy' },
    author: {
      href: '#',
      imageUrl:
      '/icon/udemy.png',
      cersimage: '/cert/cer_arch.png',
    },
    skills: ["Software Architecture", "System Design", "System Architecture", "Software Engineering"],
  },
  ]
