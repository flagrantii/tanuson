"use client"

import type { CSSProperties } from 'react'
import { useReveal } from './useReveal'

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

/**
 * A 1px rule that draws itself left-to-right when scrolled into view. The draw
 * is CSS (`[data-rule]` in app/globals.css); without JavaScript the rule is
 * simply there.
 */
export default function HairlineRule({ className = '', delay = 0, tone = 'hair' }: HairlineRuleProps) {
  const [ref, shown] = useReveal<HTMLDivElement>()

  return (
    <div
      ref={ref}
      aria-hidden
      data-rule=""
      className={`h-px w-full origin-left ${className}${shown ? ' is-in' : ''}`}
      style={{ background: TONE[tone], '--d': `${delay}s` } as CSSProperties}
    />
  )
}
