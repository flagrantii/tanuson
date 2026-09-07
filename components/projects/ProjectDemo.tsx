"use client"

import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

type ProjectDemoProps = {
  liveUrl?: string
  title: string
}

/**
 * Embedded live demo. Loads the iframe only on request — many sites refuse
 * framing, and an unrequested third-party frame is a slow, noisy default.
 */
export default function ProjectDemo({ liveUrl, title }: ProjectDemoProps) {
  const [load, setLoad] = useState(false)
  const reduced = useReducedMotion()

  if (!liveUrl) return null

  return (
    <section data-noprint className="mx-[var(--gutter)] mb-14">
      <div className="mb-2.5 font-mono text-[11px] text-rust">live demo</div>
      <div className="border border-ink">
        <div className="flex items-center gap-2 border-b border-ink px-3 py-2 font-mono text-[11px] text-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-ink/25" />
          <span className="h-1.5 w-1.5 rounded-full bg-ink/25" />
          <span className="h-1.5 w-1.5 rounded-full bg-rust" />
          <span className="ml-2 truncate">{liveUrl}</span>
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener"
            className="ml-auto whitespace-nowrap text-muted underline underline-offset-2 hover:text-rust"
          >
            open ↗
          </a>
        </div>
        <div className="relative aspect-[16/9] w-full overflow-hidden">
          {load ? (
            // .demo-iframe scales a desktop-width viewport down to fit.
            <motion.iframe
              initial={reduced ? undefined : { opacity: 0 }}
              animate={reduced ? undefined : { opacity: 1 }}
              transition={{ duration: 0.5 }}
              src={liveUrl}
              title={`${title} — live demo`}
              className="demo-iframe border-none"
              loading="lazy"
              allow="clipboard-write; encrypted-media; fullscreen"
            />
          ) : (
            <button
              type="button"
              onClick={() => setLoad(true)}
              className="hatch flex h-full w-full cursor-pointer items-center justify-center bg-transparent font-mono text-[12px] text-muted transition-colors hover:text-rust"
            >
              [ load live preview ↵ ]
            </button>
          )}
        </div>
      </div>
    </section>
  )
}
