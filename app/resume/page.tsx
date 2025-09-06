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
        <a className="underline" href="https://personal.tanuson.work" target="_blank" rel="noopener">tanuson-page.vercel.app</a>
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
  const sectionDefs: Array<{ key: SectionKey; label: string }> = [
    { key: 'header', label: 'Header' },
    { key: 'objective', label: 'Objective' },
    { key: 'work', label: 'Work' },
    { key: 'tech', label: 'Technologies' },
    { key: 'education', label: 'Education' },
    { key: 'activities', label: 'Activities' },
    { key: 'projects', label: 'Projects' },
  ]

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
  const noneChecked = useMemo(() => Object.values(selected).every((v) => !v), [selected])
  const printRef = useRef<HTMLDivElement>(null)

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    pageStyle: `
      @page { size: A4; margin: 12mm; }
      html, body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      body { animation: none !important; opacity: 1 !important; }
      [data-print-root] { display: block !important; overflow: visible !important; }
      [data-print-root] section,
      [data-print-root] div,
      [data-print-root] li { 
        break-inside: avoid; page-break-inside: avoid; 
        -webkit-column-break-inside: avoid; 
        -webkit-region-break-inside: avoid; 
      }
      img { max-width: 100% !important; page-break-inside: avoid; break-inside: avoid; }
    `,
  })

  const setPreset = (preset: 'full' | 'core' | 'minimal') => {
    if (preset === 'full') {
      setSelected({ header: true, objective: true, work: true, tech: true, education: true, activities: true, projects: true })
    } else if (preset === 'core') {
      setSelected({ header: true, objective: true, work: true, tech: true, education: true, activities: false, projects: false })
    } else {
      setSelected({ header: true, objective: false, work: true, tech: true, education: true, activities: false, projects: false })
    }
  }

  const toggle = (key: SectionKey) => setSelected((s) => ({ ...s, [key]: !s[key] }))
  const toggleAll = () => setSelected((s) => {
    const next = !allChecked
    return Object.keys(s).reduce((acc, k) => ({ ...acc, [k]: next }), {} as Record<SectionKey, boolean>)
  })

  const labelFor = (k: SectionKey) => sectionDefs.find((d) => d.key === k)?.label || ''

  const Wrapper = ({ k, children }: { k: SectionKey; children: React.ReactNode }) => (
    <div className={`${selected[k] ? '' : 'opacity-50'} transition-opacity`}>
      <div className="mb-2 flex items-center gap-2 text-xs text-gray-600">
        <input
          type="checkbox"
          checked={selected[k]}
          onChange={() => toggle(k)}
          className="h-4 w-4 rounded border-gray-300"
          aria-label={`Include ${labelFor(k)} in export`}
        />
        <span>Include in export</span>
        <span className="ml-auto text-gray-400">{selected[k] ? 'Included' : 'Excluded'}</span>
      </div>
      {children}
    </div>
  )

  return (
    <div className="px-6 lg:px-8 mx-auto max-w-4xl py-16">
      <h1 className="text-3xl sm:text-4xl font-semibold">Resume</h1>
      <p className="mt-3 text-gray-600">Choose sections to export as PDF. Toggles are above each section; preview dims excluded sections.</p>

      <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={allChecked}
            onChange={toggleAll}
            className="h-4 w-4 rounded border-gray-300"
            aria-label="Select all sections"
          />
          <span>{allChecked ? 'All selected' : 'Select all'}</span>
        </label>
        <div className="h-4 w-px bg-gray-300" />
        <button onClick={() => setPreset('full')} className="rounded-full border px-3 py-1">Full</button>
        <button onClick={() => setPreset('core')} className="rounded-full border px-3 py-1">Core</button>
        <button onClick={() => setPreset('minimal')} className="rounded-full border px-3 py-1">Minimal</button>
        <div className="h-4 w-px bg-gray-300" />
        <span className="text-xs text-gray-500">Included: {Object.values(selected).filter(Boolean).length}/{sectionDefs.length}</span>
        <button onClick={handlePrint} disabled={noneChecked} className={`ml-auto rounded-full border px-3 py-1 ${noneChecked ? 'opacity-50 cursor-not-allowed' : 'bg-orange-500 text-white border-orange-500'}`}>Export selected</button>
      </div>

      <div className="mt-8 space-y-6">
        <Wrapper k="header"><ResumeHeader /></Wrapper>
        <Wrapper k="objective"><ObjectiveSection /></Wrapper>
        <Wrapper k="work"><WorkSection /></Wrapper>
        <Wrapper k="tech"><TechSection /></Wrapper>
        <Wrapper k="education"><EducationSection /></Wrapper>
        <Wrapper k="activities"><ActivitiesSection /></Wrapper>
        <Wrapper k="projects"><ProjectsSection /></Wrapper>
      </div>

      {/* Hidden print container */}
      <div>
        <div
          ref={printRef}
          data-print-root
          style={{ display: 'none' }}
          className="p-6 w-[794px] bg-white"
        >
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