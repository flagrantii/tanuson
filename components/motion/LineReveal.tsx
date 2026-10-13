"use client"

import type { CSSProperties, ReactNode } from 'react'
import { useReveal } from './useReveal'

type LineRevealProps = {
  children: ReactNode
  delay?: number
  duration?: number
  className?: string
}

/**
 * Slides a line up from behind its own baseline: the typographic reveal, where
 * the text appears to rise out of the page rather than fade onto it. Needs one
 * wrapper per visual line, since the mask clips at the element's box.
 *
 * The viewport is watched on the *wrapper*, never on the sliding span. The span
 * starts translated fully below the mask, where `overflow: hidden` clips it out
 * of view, so an observer on the span itself would report it as off-screen and
 * the reveal would never fire.
 *
 * The mask and the slide are CSS (`[data-reveal-line]` in app/globals.css) and
 * only apply once JavaScript has marked the page, so without it the line is
 * simply there.
 */
export default function LineReveal({
  children,
  delay = 0,
  duration = 0.95,
  className = '',
}: LineRevealProps) {
  const [ref, shown] = useReveal<HTMLSpanElement>()

  return (
    <span
      ref={ref}
      data-reveal-line=""
      className={`block ${className}${shown ? ' is-in' : ''}`}
      style={{ '--d': `${delay}s`, '--dur': `${duration}s` } as CSSProperties}
    >
      <span className="block">{children}</span>
    </span>
  )
}
