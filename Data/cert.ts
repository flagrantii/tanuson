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
      'Regression and classification: training models, evaluating them, and the gradient descent and regularization behind both.',
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
      'Troubleshooting, hardware and software support, and how to talk to the person reporting the problem.',
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
      'Building data models in LookML inside Looker, for analysts to query from.',
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
      'Agentic AI architectures: multi-agent collaboration, memory, feedback loops and real-time tool integrations, across 8 projects covering web search, file handling and Python execution.',
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
      'Architecture of large-scale systems: performance, scalability, reliability and security, and how Node.js, Redis, Kafka, Cassandra, ELK, Hadoop, Docker and Kubernetes work underneath.',
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
