"use client"
import { useMemo, useRef, useState } from 'react'
import { useReactToPrint } from 'react-to-print'
import { ActivityItem, activities } from '@/Data/activites'
import { TimelineItem, timelineItems } from '@/Data/timeline'
import { WebItem, webItems } from '@/Data/web'
import { formatDate } from '@/lib/utils/date'
import { SkillGroup, skillGroups } from '@/Data/skills'

type SectionKey =
  | 'header'
  | 'objective'
  | 'work'
  | 'tech'
  | 'education'
  | 'activities'
  | 'projects'

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-[13px] font-semibold tracking-wide uppercase mt-6 mb-2">{children}</h2>
)

function ResumeHeader() {
  return (
    <header>
      <h1 className="text-3xl font-bold tracking-tight">Tanuson Deachaboonchana</h1>
      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[12px] text-gray-700">
        <span>+66 614839393</span>
        <span>tanuson679@gmail.com</span>
        <a className="underline" href="https://www.linkedin.com/in/tanuson-deachaboonchana-743a3029b/" target="_blank" rel="noopener">linkedin</a>
        <a className="underline" href="https://github.com/flagrantii" target="_blank" rel="noopener">github</a>
        <a className="underline" href="https://tanuson-page.vercel.app" target="_blank" rel="noopener">tanuson-page.vercel.app</a>
        <span>Suan luang, Bangkok, Thailand</span>
      </div>
    </header>
  )
}

function ObjectiveSection() {
  return (
    <section>
      <SectionTitle>Objective</SectionTitle>
      <p className="text-[12px] leading-5 text-gray-800">
        Dedicated software developer focused on building scalable, high‑performance web applications. Proven experience across full‑stack development, backend architecture, frontend engineering, and cloud infrastructure. I aim to leverage my expertise to create impactful digital solutions that enhance user experiences and drive business outcomes.
      </p>
    </section>
  )
}

function WorkSection() {
  return (
    <section>
      <SectionTitle>Work Experience</SectionTitle>
      <div className="space-y-3">
        {timelineItems.map((w: TimelineItem) => (
          <div key={w.company} className="text-[12px]">
            <div className="flex items-baseline justify-between">
              <p className="font-semibold">{w.role} <span className="text-gray-500 font-normal">— {w.type}</span></p>
              <p className="text-gray-500">{w.period}</p>
            </div>
            <p className="text-gray-800">{w.company}</p>
            <ul className="mt-1 list-disc ml-5 space-y-1">
              {w.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}

function TechSection() {
  return (
    <section>
      <SectionTitle>Technologies and Languages</SectionTitle>
      <div className="grid sm:grid-cols-2 gap-4 text-[12px]">
        {skillGroups.map((g: SkillGroup) => (
          <div key={g.title}>
            <p className="font-medium">{g.title}</p>
            <p className="text-gray-800 mt-1">{g.skills.join(', ')}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function EducationSection() {
  return (
    <section>
      <SectionTitle>Education</SectionTitle>
      <div className="text-[12px]">
        <div className="flex items-baseline justify-between">
          <p className="font-semibold">Bachelor of Engineering Program in Computer Engineering</p>
          <p className="text-gray-500">Aug 2023 – Present</p>
        </div>
        <p className="text-gray-800">Chulalongkorn University <span className="text-gray-500">(Not graduated yet)</span></p>
        <p className="mt-1 text-gray-700">Related Courseworks: Data Structures and Algorithms, Database Systems, OOP, Software Engineering, Computer Networks, Operating Systems, Data Science, System Design</p>
      </div>
    </section>
  )
}

function ActivitiesSection() {
  return (
    <section>
      <SectionTitle>Extracurricular Activities</SectionTitle>
      <div className="space-y-3 text-[12px]">
        {activities.map((a: ActivityItem) => (
          <div key={a.org}>
            <div className="flex items-baseline justify-between">
              <p className="font-semibold">{a.role}</p>
              <p className="text-gray-500">{a.period}</p>
            </div>
            <p className="text-gray-800">{a.org}</p>
            <ul className="mt-1 list-disc ml-5 space-y-1">
              {a.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}

function ProjectsSection() {
  return (
    <section>
      <SectionTitle>Projects</SectionTitle>
      <div className="space-y-2 text-[12px]">
        {webItems.filter((p: WebItem) => p.isShowResume).map((p: WebItem) => (
          <div key={p.title}>
            <div className="flex items-baseline justify-between">
              <p className="font-semibold">{p.title} <span className="text-gray-500">{p.techStackResume.join(', ')}</span></p>
              <p className="text-gray-500">{formatDate(p.datetime)}</p>
            </div>
            <p className="text-gray-700">{p.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default function ResumePage() {
  const [selected, setSelected] = useState<Record<SectionKey, boolean>>({
    header: true,
    objective: true,
    work: true,
    tech: true,
    education: true,
    activities: true,
    projects: true,
  })

  const allChecked = useMemo(() => Object.values(selected).every(Boolean), [selected])
  const printRef = useRef<HTMLDivElement>(null)

  const handlePrint = useReactToPrint({ contentRef: printRef , preserveAfterPrint: true})

  const toggle = (key: SectionKey) => setSelected((s) => ({ ...s, [key]: !s[key] }))
  const toggleAll = () => setSelected((s) => {
    const next = !allChecked
    return Object.keys(s).reduce((acc, k) => ({ ...acc, [k]: next }), {} as Record<SectionKey, boolean>)
  })

  return (
    <div className="px-6 lg:px-8 mx-auto max-w-4xl py-16">
      <h1 className="text-3xl sm:text-4xl font-semibold">Resume</h1>
      <p className="mt-3 text-gray-600">Select sections to export as PDF.</p>

      <div className="mt-4 flex flex-wrap gap-3 text-sm">
        {(
          [
            ['header','Header'],
            ['objective','Objective'],
            ['work','Work'],
            ['tech','Technologies'],
            ['education','Education'],
            ['activities','Activities'],
            ['projects','Projects'],
          ] as [SectionKey, string][]
        ).map(([key, label]) => (
          <button
            key={key}
            onClick={() => toggle(key)}
            className={`rounded-full border px-3 py-1 ${selected[key] ? 'bg-black text-white border-black' : 'border-gray-300 hover:bg-black hover:text-white'}`}
          >
            {label}
          </button>
        ))}
        <button onClick={toggleAll} className="rounded-full border border-black px-3 py-1">{allChecked ? 'Unselect all' : 'Select all'}</button>
        <button onClick={handlePrint} className="rounded-full border px-3 py-1 bg-orange-500 text-white">Export selected</button>
      </div>

      <div className="mt-8 space-y-6">
        <ResumeHeader />
        <ObjectiveSection />
        <WorkSection />
        <TechSection />
        <EducationSection />
        <ActivitiesSection />
        <ProjectsSection />
      </div>

      {/* Hidden print container */}
      <div className="fixed -left-[10000px] top-0 w-[794px] bg-white">
        <div ref={printRef} className="p-6 max-w-4xl">
          {selected.header && <ResumeHeader />}
          {selected.objective && <ObjectiveSection />}
          {selected.work && <WorkSection />}
          {selected.tech && <TechSection />}
          {selected.education && <EducationSection />}
          {selected.activities && <ActivitiesSection />}
          {selected.projects && <ProjectsSection />}
        </div>
      </div>
    </div>
  )
} 