"use client"

import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import Reveal from '@/components/motion/Reveal'
import SplitText from '@/components/motion/SplitText'
import HairlineRule from '@/components/motion/HairlineRule'
import ExperienceSkills from '@/components/about/ExperienceSkills'
import { BIO, EXTRA, PRINCIPLES } from '@/Data/site'
import { education } from '@/Data/education'
import { cers } from '@/Data/cert'

export default function AboutPage() {
  const [cert, setCert] = useState<string | null>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (!cert) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setCert(null)
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [cert])

  return (
    <div>
      <div className="gutter grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-end gap-x-12 gap-y-6 pb-8 pt-[clamp(36px,5vw,56px)]">
        <h1 className="m-0 font-display text-[clamp(56px,8.5vw,110px)] leading-[.93] tracking-tightest [text-wrap:balance]">
          <SplitText text="A short" emphasis="biography." />
        </h1>
        <Reveal delay={0.18}>
          <p className="m-0 font-body text-[clamp(18px,1.7vw,21px)] font-light leading-[1.4] text-copy">
            Twenty-something engineer from Nakhon Si Thammarat, living in Bangkok, mostly
            building things for people who are in a hurry.
          </p>
        </Reveal>
      </div>

      {/* Biography */}
      <section className="gutter border-t border-hair py-[clamp(32px,4vw,48px)]">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-x-12 gap-y-6">
          {BIO.map((para, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <p className="m-0 font-body text-[clamp(17px,1.6vw,19px)] font-light leading-[1.55] text-copy">
                {para}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* How I work */}
      <section className="gutter border-t border-hair py-[clamp(32px,4vw,48px)]">
        <div className="mb-6 font-mono text-[12px] text-muted">§ 01 — how i work</div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-x-10 gap-y-8">
          {PRINCIPLES.map((pr, i) => (
            <Reveal key={pr.title} delay={i * 0.06}>
              <div className="mb-2 font-mono text-[11px] text-rust">
                {String(i + 1).padStart(2, '0')}
              </div>
              <div className="font-display text-[clamp(22px,2.1vw,26px)] leading-[1.15]">
                {pr.title}
              </div>
              <p className="m-0 mt-2 font-body text-[16px] font-light leading-[1.5] text-copy">
                {pr.body}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Experience + skills, with the hover connection lines */}
      <section className="gutter border-t border-hair py-[clamp(32px,4vw,48px)]">
        <ExperienceSkills />
      </section>

      {/* Education */}
      <section className="gutter border-t border-hair py-[clamp(32px,4vw,48px)]">
        <div className="mb-6 font-mono text-[12px] text-muted">§ 04 — education</div>
        <div className="flex flex-col">
          {[...education].reverse().map((e, i) => (
            <Reveal key={e.institution} delay={i * 0.06}>
              <HairlineRule delay={i * 0.06} />
              <div className="grid grid-cols-1 gap-5 py-[18px] sm:grid-cols-[minmax(120px,160px)_1fr]">
                <div className="font-mono text-[12px] text-muted">{e.period}</div>
                <div>
                  <div className="font-display text-[clamp(20px,2vw,24px)]">{e.institution}</div>
                  <div className="font-body text-[16px] text-copy">{e.program}</div>
                  {e.details && (
                    <p className="m-0 mt-1.5 font-body text-[16px] font-light leading-[1.5] text-muted">
                      {e.details}
                    </p>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Extracurricular */}
      <section className="gutter border-t border-hair py-[clamp(32px,4vw,48px)]">
        <div className="mb-6 font-mono text-[12px] text-muted">§ 05 — extracurricular</div>
        <div className="flex flex-col">
          {EXTRA.map((e, i) => (
            <Reveal key={e.org} delay={i * 0.05}>
              <HairlineRule delay={i * 0.05} />
              <div className="grid grid-cols-1 gap-5 py-[18px] sm:grid-cols-[minmax(120px,160px)_1fr]">
                <div className="font-mono text-[12px] text-muted">{e.range}</div>
                <div>
                  <div className="font-display text-[clamp(20px,2vw,24px)]">{e.org}</div>
                  <div className="mb-1.5 font-body text-[16px] text-copy">{e.role}</div>
                  <ul className="list-disc pl-[18px] font-body text-[16px] font-light leading-[1.5] text-copy">
                    {e.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Certificates */}
      <section className="gutter border-t border-hair py-[clamp(32px,4vw,48px)] pb-16">
        <div className="mb-6 font-mono text-[12px] text-muted">§ 06 — certificates</div>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] border-l border-t border-ink">
          {cers.map((c, i) => (
            <motion.article
              key={c.id}
              initial={reduced ? undefined : { opacity: 0 }}
              whileInView={reduced ? undefined : { opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="flex flex-col justify-between border-b border-r border-ink p-[22px] transition-colors duration-300 hover:bg-white"
            >
              <div>
                <div className="mb-4 flex justify-between gap-2 font-mono text-[11px] text-muted">
                  <span>
                    {c.category.title} · {c.category.org}
                  </span>
                  <span>{c.date}</span>
                </div>
                <a
                  href={c.href}
                  target="_blank"
                  rel="noopener"
                  className="font-display text-[clamp(22px,2.2vw,26px)] leading-[1.1] no-underline hover:text-rust"
                >
                  {c.title}
                </a>
                <p className="mt-3 font-body text-[15px] font-light leading-[1.45] text-copy">
                  {c.description}
                </p>
              </div>
              <div>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {c.skills.slice(0, 6).map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-hair px-2 py-0.5 font-mono text-[10px] text-muted"
                    >
                      {s}
                    </span>
                  ))}
                </div>
                <div className="mt-4 flex gap-4 font-mono text-[11px]">
                  <a
                    href={c.href}
                    target="_blank"
                    rel="noopener"
                    className="text-muted underline underline-offset-2 hover:text-rust"
                  >
                    credential ↗
                  </a>
                  {c.author.cersimage && (
                    <button
                      type="button"
                      onClick={() => setCert(c.author.cersimage)}
                      className="cursor-pointer border-0 bg-transparent p-0 text-muted underline underline-offset-2 hover:text-rust"
                    >
                      preview
                    </button>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <AnimatePresence>
          {cert && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setCert(null)}
              role="dialog"
              aria-modal="true"
              aria-label="Certificate preview"
              className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-ink/90 p-6"
            >
              <motion.img
                src={cert}
                alt="Certificate"
                initial={reduced ? undefined : { scale: 0.96, opacity: 0 }}
                animate={reduced ? undefined : { scale: 1, opacity: 1 }}
                exit={reduced ? undefined : { scale: 0.96, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="max-h-[78vh] max-w-[92vw] border border-cream/25 object-contain"
              />
              <button
                type="button"
                onClick={() => setCert(null)}
                className="font-mono text-[12px] text-cream/70 hover:text-rust"
              >
                close
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  )
}
