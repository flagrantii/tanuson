"use client"

import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { timelineItems } from '@/Data/timeline'
import { skillGroups } from '@/Data/skills'
import { skillToTimelineMapping } from '@/Data/link'

type Point = { x: number; y: number }

/**
 * Experience ledger and skill map side by side. Hovering a skill draws a curve
 * to every role that used it — the connection is measured from the live DOM, so
 * it survives reflow, and it only runs where there's room for it (desktop).
 */
export default function ExperienceSkills() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState<string | null>(null)
  const [skillPos, setSkillPos] = useState<Record<string, Point>>({})
  const [jobPos, setJobPos] = useState<Record<number, Point>>({})
  const [isDesktop, setIsDesktop] = useState(false)
  const reduced = useReducedMotion()

  const measure = useCallback(() => {
    const root = containerRef.current
    if (!root) return
    const base = root.getBoundingClientRect()

    const skills: Record<string, Point> = {}
    root.querySelectorAll<HTMLElement>('[data-skill]').forEach((el) => {
      const r = el.getBoundingClientRect()
      // Anchor on the chip's left edge — lines come in from the ledger.
      skills[el.dataset.skill!] = {
        x: r.left - base.left,
        y: r.top + r.height / 2 - base.top,
      }
    })

    const jobs: Record<number, Point> = {}
    root.querySelectorAll<HTMLElement>('[data-job]').forEach((el) => {
      const r = el.getBoundingClientRect()
      jobs[Number(el.dataset.job)] = {
        x: r.right - base.left,
        y: r.top + 18 - base.top,
      }
    })

    setSkillPos(skills)
    setJobPos(jobs)
  }, [])

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024)
    check()
    measure()

    const ro = new ResizeObserver(() => {
      check()
      measure()
    })
    if (containerRef.current) ro.observe(containerRef.current)
    window.addEventListener('resize', check)

    // Positions settle after fonts and entrance animations land.
    const t1 = setTimeout(measure, 250)
    const t2 = setTimeout(measure, 1200)

    return () => {
      ro.disconnect()
      window.removeEventListener('resize', check)
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [measure])

  const active = hovered && isDesktop && !reduced ? skillToTimelineMapping[hovered] || [] : []

  return (
    <div ref={containerRef} className="relative">
      {/* Connection overlay */}
      <svg className="pointer-events-none absolute inset-0 z-10 h-full w-full" aria-hidden>
        <AnimatePresence>
          {active.map((id) => {
            const from = jobPos[id]
            const to = hovered ? skillPos[hovered] : undefined
            if (!from || !to) return null
            const midX = (from.x + to.x) / 2
            const midY = (from.y + to.y) / 2
            return (
              <motion.g key={`${hovered}-${id}`}>
                <motion.path
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.75 }}
                  exit={{ pathLength: 0, opacity: 0 }}
                  transition={{ duration: 0.45, ease: 'easeInOut' }}
                  d={`M ${from.x} ${from.y} Q ${midX} ${midY - 46} ${to.x} ${to.y}`}
                  stroke="#b8442a"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                  fill="none"
                />
                <motion.circle
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ duration: 0.25 }}
                  cx={from.x}
                  cy={from.y}
                  r={2.5}
                  fill="#b8442a"
                />
              </motion.g>
            )
          })}
        </AnimatePresence>
      </svg>

      <div className="grid grid-cols-1 gap-x-14 gap-y-12 lg:grid-cols-[1fr_minmax(280px,380px)]">
        {/* Experience ledger */}
        <div>
          <div className="mb-6 font-mono text-[12px] text-muted">§ 02 — experience</div>
          <div className="flex flex-col">
            {timelineItems.map((j) => {
              const lit = active.includes(j.id)
              return (
                <div
                  key={j.id}
                  data-job={j.id}
                  className={`grid grid-cols-1 gap-5 border-t py-[18px] transition-colors duration-300 sm:grid-cols-[minmax(120px,150px)_1fr] ${
                    lit ? 'border-rust' : 'border-hair'
                  }`}
                >
                  <div className="font-mono text-[12px] leading-[1.6] text-muted">
                    {j.period}
                    <br />
                    {j.type}
                  </div>
                  <div>
                    <div
                      className={`font-display text-[clamp(21px,2vw,26px)] transition-colors duration-300 ${
                        lit ? 'text-rust' : ''
                      }`}
                    >
                      {j.role}
                    </div>
                    <div className="mb-2 font-body text-[16px] text-copy">{j.company}</div>
                    <ul className="list-disc pl-[18px] font-body text-[16px] font-light leading-[1.5] text-copy">
                      {j.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Skill map */}
        <div>
          <div className="mb-6 font-mono text-[12px] text-muted">
            § 03 — skill map
            {isDesktop && !reduced && (
              <span className="ml-2 text-muted/60">· hover to trace</span>
            )}
          </div>
          <div className="flex flex-col gap-6">
            {skillGroups.map((group) => (
              <div key={group.title}>
                <div className="mb-2.5 font-mono text-[11px] text-rust">
                  {group.title.toLowerCase()}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {group.skills.map((s) => {
                    const linked = !!skillToTimelineMapping[s]
                    const on = hovered === s
                    return (
                      <motion.span
                        key={s}
                        data-skill={s}
                        onMouseEnter={() => isDesktop && linked && setHovered(s)}
                        onMouseLeave={() => setHovered(null)}
                        whileHover={reduced ? undefined : { y: -2 }}
                        transition={{ type: 'spring', stiffness: 320, damping: 22 }}
                        className={`relative z-20 inline-flex select-none items-center rounded-full border px-[9px] py-[5px] font-mono text-[11px] transition-colors duration-300 ${
                          on
                            ? 'border-rust bg-rust text-cream'
                            : linked && isDesktop
                              ? 'cursor-pointer border-ink hover:bg-ink hover:text-cream'
                              : 'border-hair text-copy'
                        }`}
                      >
                        {s}
                      </motion.span>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
