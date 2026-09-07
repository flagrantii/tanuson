"use client"

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { webs, type WebView } from '@/Data/web'
import Reveal from '@/components/motion/Reveal'

const CHIPS = ['All', 'UX/UI', 'Frontend', 'Fullstack', 'AI', 'DevOps', 'Have Demo'] as const
type Chip = (typeof CHIPS)[number]

const matches = (p: WebView, chip: Chip) => {
  if (chip === 'All') return true
  if (chip === 'Have Demo') return p.isDemo
  // UX/UI work lives in the frontend-tagged projects.
  if (chip === 'UX/UI') return p.tags.includes('Frontend')
  return p.tags.includes(chip)
}

export default function ProjectsPage() {
  const [filter, setFilter] = useState<Chip>('All')
  const reduced = useReducedMotion()

  const list = useMemo(() => webs.filter((p) => matches(p, filter)), [filter])

  return (
    <div>
      <div className="gutter grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-end gap-x-8 gap-y-6 pb-7 pt-[clamp(36px,5vw,56px)]">
        <Reveal direction="none" blur>
          <h1 className="m-0 font-display text-[clamp(60px,8vw,96px)] leading-[.95] tracking-tightest">
            Projects<span className="text-rust">.</span>
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="m-0 mb-4 font-body text-[clamp(17px,1.6vw,20px)] font-light leading-[1.4] text-copy">
            Fourteen things shipped since 2023 — from a freshman orientation system serving
            3,000 a day to a browser extension that argues with Shopee. Filter by area.
          </p>
          <div className="flex flex-wrap gap-2">
            {CHIPS.map((c) => {
              const on = filter === c
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => setFilter(c)}
                  aria-pressed={on}
                  className={`cursor-pointer rounded-full border border-ink px-3 py-[7px] font-mono text-[12px] transition-colors duration-300 ${
                    on ? 'bg-ink text-cream' : 'bg-transparent text-ink hover:bg-ink/5'
                  }`}
                >
                  {c}
                </button>
              )
            })}
          </div>
        </Reveal>
      </div>

      <div className="gutter pb-2 font-mono text-[11px] text-muted">
        <motion.span key={list.length} initial={{ opacity: 0.35 }} animate={{ opacity: 1 }}>
          {list.length} / {webs.length} shown
        </motion.span>
      </div>

      <motion.div
        layout={!reduced}
        className="mx-[var(--gutter)] mb-14 grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] border-l border-t border-ink"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {list.map((p) => (
            <motion.div
              key={p.slug}
              layout={!reduced}
              initial={reduced ? undefined : { opacity: 0, scale: 0.97 }}
              animate={reduced ? undefined : { opacity: 1, scale: 1 }}
              exit={reduced ? undefined : { opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="border-b border-r border-ink"
            >
              <Link
                href={p.href}
                className="group flex min-h-[200px] flex-col justify-between px-[22px] pb-[26px] pt-[22px] text-inherit no-underline transition-colors duration-300 hover:bg-white"
              >
                <div className="flex justify-between gap-2 font-mono text-[11px] text-muted">
                  <span>
                    {p.idx} · {p.type}
                  </span>
                  <span className="text-rust">{p.isDemo ? '→ live demo' : ''}</span>
                </div>
                <div>
                  <div className="mb-2.5 mt-[26px] font-display text-[clamp(28px,2.6vw,34px)] leading-none tracking-[-.02em] transition-colors duration-300 group-hover:text-rust">
                    {p.title}
                  </div>
                  <div className="font-body text-[16px] font-light leading-[1.4] text-copy">
                    {p.description}
                  </div>
                </div>
                <div className="mt-[18px] flex justify-between gap-2 font-mono text-[11px] text-muted">
                  <span>{p.tagline}</span>
                  <span className="whitespace-nowrap">{p.date}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
