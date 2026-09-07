"use client"

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Reveal from '@/components/motion/Reveal'
import {
  CONTACT,
  EDUCATION_RESUME,
  EXTRA,
  JOBS,
  MODE_SECTIONS,
  OBJECTIVE,
  RESUME_MODES,
  RESUME_PROJECT_SLUGS,
  SECTION_KEYS,
  SECTION_LABELS,
  TECH,
  type ResumeMode,
  type SectionKey,
} from '@/Data/site'
import { webs } from '@/Data/web'

/** Two-column row used throughout the résumé body: meta rail + content. */
function Row({
  meta,
  children,
  className = '',
}: {
  meta: React.ReactNode
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={`resume-row print-avoid-break grid grid-cols-1 gap-5 border-t border-hair py-[18px] sm:grid-cols-[minmax(120px,150px)_1fr] ${className}`}
    >
      <div className="resume-meta font-mono text-[12px] leading-[1.6] text-muted">{meta}</div>
      <div className="resume-body">{children}</div>
    </div>
  )
}

/**
 * Section heading. The number is dropped when printing, where the label becomes
 * a centred uppercase rule-underlined heading in the conventional résumé style.
 */
function SectionLabel({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <div className="resume-section-label mb-2.5 font-mono text-[11px] text-rust">
      <span className="resume-section-num">{n} </span>
      <span className="resume-section-text">{children}</span>
    </div>
  )
}

export default function ResumePage() {
  const [mode, setMode] = useState<ResumeMode>('Full')
  const [sections, setSections] = useState<Set<SectionKey>>(new Set(SECTION_KEYS))

  const show = (k: SectionKey) => sections.has(k)
  const showBullets = mode !== 'Minimal'
  const jobs = mode === 'Minimal' ? JOBS.filter((j) => j.core) : JOBS

  const resumeProjects = useMemo(
    () =>
      RESUME_PROJECT_SLUGS.map((s) => webs.find((p) => p.slug === s)).filter(
        (p): p is (typeof webs)[number] => !!p,
      ),
    [],
  )

  const pickMode = (m: ResumeMode) => {
    setMode(m)
    setSections(new Set(MODE_SECTIONS[m]))
  }

  const toggle = (k: SectionKey) =>
    setSections((prev) => {
      const next = new Set(prev)
      if (next.has(k)) next.delete(k)
      else next.add(k)
      return next
    })

  return (
    <div
      data-resume
      className="grid grid-cols-1 gap-x-14 gap-y-10 px-[var(--gutter)] pb-16 pt-[clamp(32px,4vw,48px)] lg:grid-cols-[minmax(240px,320px)_minmax(0,1fr)]"
    >
      {/* Sidebar ---------------------------------------------------------- */}
      <div className="resume-aside flex max-w-[400px] flex-col gap-7">
        <div>
          <h1 className="resume-name m-0 font-display text-[clamp(38px,3.6vw,48px)] leading-none tracking-tightest">
            Tanuson Deachaboonchana
          </h1>
          <p className="resume-tagline m-0 mt-3.5 font-body text-[17px] font-light leading-[1.45] text-copy">
            Software engineer — platform, backend, and the interfaces on top.{' '}
            {CONTACT.location}.
          </p>
        </div>

        {show('contact') && (
        <div className="resume-contact flex flex-col border-t border-hair pt-3.5 font-mono text-[12px] leading-[1.9] text-copy">
          <a href={CONTACT.phoneHref} className="no-underline hover:text-rust">
            {CONTACT.phone}
          </a>
          <a href={`mailto:${CONTACT.email}`} className="no-underline hover:text-rust">
            {CONTACT.email}
          </a>
          <a href={CONTACT.github} target="_blank" rel="noopener" className="no-underline hover:text-rust">
            {CONTACT.githubLabel}
          </a>
          <a href={CONTACT.linkedin} target="_blank" rel="noopener" className="no-underline hover:text-rust">
            linkedin<span className="print-hide"> ↗</span>
          </a>
          <a href={CONTACT.site} className="no-underline hover:text-rust">
            {CONTACT.siteLabel}
          </a>
        </div>
        )}

        {/* Export controls — never printed */}
        <div data-noprint className="border-t border-hair pt-3.5">
          <div className="mb-2.5 font-mono text-[11px] text-muted">version</div>
          <div className="flex flex-col gap-1.5">
            {RESUME_MODES.map((m) => {
              const on = mode === m
              return (
                <button
                  key={m}
                  type="button"
                  onClick={() => pickMode(m)}
                  aria-pressed={on}
                  className={`flex cursor-pointer items-center justify-between border border-ink px-3 py-2.5 text-left font-mono text-[12px] transition-colors duration-300 ${
                    on ? 'bg-ink text-cream' : 'bg-transparent text-ink hover:bg-ink/5'
                  }`}
                >
                  <span>{m}</span>
                  <span className="opacity-60">{MODE_SECTIONS[m].length}/7</span>
                </button>
              )
            })}
          </div>

          <div className="mb-2 mt-[18px] font-mono text-[11px] text-muted">include in export</div>
          <div className="flex flex-col">
            {SECTION_KEYS.map((k) => {
              const on = show(k)
              return (
                <button
                  key={k}
                  type="button"
                  onClick={() => toggle(k)}
                  role="checkbox"
                  aria-checked={on}
                  className={`flex cursor-pointer items-center gap-2.5 border-0 bg-transparent py-[7px] text-left font-mono text-[12px] transition-colors ${
                    on ? 'text-ink' : 'text-muted'
                  }`}
                >
                  <motion.span
                    aria-hidden
                    animate={{ backgroundColor: on ? '#17150f' : 'rgba(0,0,0,0)' }}
                    transition={{ duration: 0.2 }}
                    className="inline-block h-3 w-3 shrink-0 border border-ink"
                  />
                  {SECTION_LABELS[k]}
                </button>
              )
            })}
          </div>

          <div className="mb-3.5 mt-2.5 font-mono text-[11px] text-muted">
            {sections.size} / 7 sections included
          </div>

          <motion.button
            type="button"
            onClick={() => window.print()}
            whileHover={{ y: -1 }}
            whileTap={{ y: 0 }}
            className="w-full cursor-pointer border-0 bg-ink px-4 py-3.5 font-mono text-[12px] font-medium text-cream"
          >
            Export selected as PDF →
          </motion.button>

          <a
            href="/resume/Tanuson-Deachaboonchana_Resume_Mar2025.pdf"
            target="_blank"
            rel="noopener"
            className="mt-3 block text-center font-mono text-[11px] text-muted no-underline hover:text-rust"
          >
            or download the Mar 2025 PDF ↗
          </a>
        </div>
      </div>

      {/* Body ------------------------------------------------------------- */}
      <div className="resume-main flex flex-col gap-10">
        {show('objective') && (
          <Reveal>
            <SectionLabel n="01">objective</SectionLabel>
            <p className="m-0 font-body text-[clamp(19px,1.8vw,22px)] font-light leading-[1.4]">
              {OBJECTIVE}
            </p>
          </Reveal>
        )}

        {show('experience') && (
          <Reveal>
            <SectionLabel n="02">work experience</SectionLabel>
            <div className="flex flex-col">
              {jobs.map((j) => (
                <Row
                  key={`${j.co}-${j.role}`}
                  meta={
                    <>
                      {j.range}
                      <br />
                      {j.kind}
                    </>
                  }
                >
                  <div className="font-display text-[clamp(22px,2vw,26px)]">{j.role}</div>
                  <div className="mb-2 font-body text-[16px] text-copy">{j.co}</div>
                  {showBullets && (
                    <ul className="list-disc pl-[18px] font-body text-[16px] font-light leading-[1.5] text-copy">
                      {j.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  )}
                </Row>
              ))}
            </div>
          </Reveal>
        )}

        {show('tech') && (
          <Reveal>
            <SectionLabel n="03">technologies and languages</SectionLabel>
            <div className="flex flex-col">
              {TECH.map((t) => (
                <Row key={t.k} meta={t.k} className="tech-row !py-2.5">
                  <span className="font-body text-[16px] font-light leading-[1.45]">{t.v}</span>
                </Row>
              ))}
            </div>
          </Reveal>
        )}

        {show('education') && (
          <Reveal>
            <SectionLabel n="04">education</SectionLabel>
            <Row meta={EDUCATION_RESUME.range}>
              <div className="font-display text-[clamp(22px,2vw,26px)]">
                {EDUCATION_RESUME.degree}
              </div>
              <div className="font-body text-[16px] text-copy">{EDUCATION_RESUME.school}</div>
              {showBullets && (
                <p className="m-0 mt-2 font-body text-[16px] font-light leading-[1.5] text-copy">
                  {EDUCATION_RESUME.coursework}
                </p>
              )}
            </Row>
          </Reveal>
        )}

        {show('extra') && (
          <Reveal>
            <SectionLabel n="05">extracurricular activities</SectionLabel>
            <div className="flex flex-col">
              {EXTRA.map((e) => (
                <Row key={e.org} meta={e.range}>
                  <div className="font-display text-[clamp(20px,1.8vw,22px)]">{e.org}</div>
                  <div className="mb-1.5 font-body text-[16px] text-copy">{e.role}</div>
                  {showBullets && (
                    <ul className="list-disc pl-[18px] font-body text-[16px] font-light leading-[1.5] text-copy">
                      {e.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  )}
                </Row>
              ))}
            </div>
          </Reveal>
        )}

        {show('projects') && (
          <Reveal>
            <SectionLabel n="06">projects</SectionLabel>
            <div className="flex flex-col">
              {resumeProjects.map((p) => (
                <Row key={p.slug} meta={p.date} className="project-row !py-3">
                  <Link href={p.href} className="text-inherit no-underline">
                    <div className="resume-proj-title font-display text-[clamp(20px,1.8vw,22px)] hover:text-rust">
                      {p.title}{' '}
                      <span className="resume-proj-stack font-mono text-[11px] text-muted">
                        {p.stackLine}
                      </span>
                    </div>
                    <div className="resume-proj-desc font-body text-[16px] font-light leading-[1.45] text-copy">
                      {p.description}
                    </div>
                  </Link>
                </Row>
              ))}
            </div>
          </Reveal>
        )}

      </div>
    </div>
  )
}
