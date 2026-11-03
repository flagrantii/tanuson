export type EducationItem = {
  period: string
  institution: string
  program: string
  details?: string
}

export const education: EducationItem[] = [
  {
    period: '2017 - 2023',
    institution: 'Princess Chulabhorn Science High School Nakhon Si Thammarat',
    program: 'Science Math Program'
  },
  {
    period: '2023 - 2027',
    institution: 'Chulalongkorn University',
    program: 'Bachelor of Engineering in Computer Engineering',
    details: 'Coursework in data structures and algorithms, databases, computer networks, operating systems and system design.'
  },
] 