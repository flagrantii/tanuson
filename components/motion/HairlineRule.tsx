"use client"

import { motion, useReducedMotion } from 'framer-motion'

type HairlineRuleProps = {
  className?: string
  delay?: number
  /** Rule colour; defaults to the hairline token. */
  tone?: 'hair' | 'ink' | 'rust'
}

const TONE = {
  hair: 'var(--hair)',
  ink: 'var(--ink)',
  rust: 'var(--rust)',
}

/** A 1px rule that draws itself left-to-right when scrolled into view. */
export default function HairlineRule({ className = '', delay = 0, tone = 'hair' }: HairlineRuleProps) {
  const reduced = useReducedMotion()

  return (
    <motion.div
      aria-hidden
      className={`h-px w-full origin-left ${className}`}
      style={{ background: TONE[tone] }}
      initial={reduced ? undefined : { scaleX: 0 }}
      whileInView={reduced ? undefined : { scaleX: 1 }}
      viewport={{ once: true, margin: '-4%' }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay }}
    />
  )
}
