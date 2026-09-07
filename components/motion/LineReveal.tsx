"use client"

import { ReactNode, useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

type LineRevealProps = {
  children: ReactNode
  delay?: number
  duration?: number
  className?: string
}

/**
 * Slides a line up from behind its own baseline — the typographic reveal, where
 * the text appears to rise out of the page rather than fade onto it. Needs one
 * wrapper per visual line, since the mask clips at the element's box.
 *
 * The viewport is watched on the *wrapper*, never on the sliding span. The span
 * starts translated fully below the mask, where `overflow: hidden` clips it out
 * of view — an IntersectionObserver on the span itself would therefore report it
 * as off-screen and the reveal would never fire, leaving the line permanently
 * hidden. That deadlock only showed up on remount (navigating back to a page),
 * because on first paint the observer sometimes sampled before the initial
 * transform was applied.
 */
export default function LineReveal({
  children,
  delay = 0,
  duration = 0.95,
  className = '',
}: LineRevealProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-6%' })
  const reduced = useReducedMotion()

  if (reduced) return <span className={`block ${className}`}>{children}</span>

  return (
    <span
      ref={ref}
      className={`block overflow-hidden ${className}`}
      style={{ paddingBottom: '0.06em' }}
    >
      <motion.span
        className="block"
        initial={{ y: '110%' }}
        animate={inView ? { y: '0%' } : { y: '110%' }}
        transition={{ duration, ease: [0.16, 1, 0.3, 1], delay }}
      >
        {children}
      </motion.span>
    </span>
  )
}
