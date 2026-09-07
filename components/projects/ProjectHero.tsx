"use client"

import { motion, useReducedMotion } from 'framer-motion'

type ProjectHeroProps = {
  title: string
  cover: string
}

/** Wide plate: the real cover screenshot, or the hatched placeholder. */
export default function ProjectHero({ title, cover }: ProjectHeroProps) {
  const reduced = useReducedMotion()

  return (
    <motion.div
      initial={reduced ? undefined : { opacity: 0, y: 18 }}
      animate={reduced ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      className="mx-[var(--gutter)] mt-8 overflow-hidden border border-ink"
    >
      {cover ? (
        <div className="aspect-[16/8] w-full overflow-hidden">
          <motion.img
            src={cover}
            alt={`${title} — cover`}
            className="h-full w-full object-cover object-top"
            initial={reduced ? undefined : { scale: 1.06 }}
            animate={reduced ? undefined : { scale: 1 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      ) : (
        <div className="hatch flex aspect-[16/8] w-full items-center justify-center p-4 text-center font-mono text-[12px] text-muted">
          [ {title} — hero screenshot ]
        </div>
      )}
    </motion.div>
  )
}
