"use client"

import { Fragment, type CSSProperties } from 'react'
import { useReveal } from './useReveal'

type SplitTextProps = {
  /** Text split on spaces; each word animates in sequence. */
  text: string
  className?: string
  delay?: number
  stagger?: number
  /** Trailing words rendered as an accent italic emphasis run. */
  emphasis?: string
}

/**
 * Word-by-word headline entrance. Each word keeps its own inline block so long
 * headlines still wrap naturally. The final word carries no trailing space, so
 * punctuation placed after the component sits tight against it.
 *
 * The rise-and-tilt per word is CSS (`[data-split]` in app/globals.css),
 * staggered by each word's `--i`. Words are hidden only once JavaScript has
 * marked the page.
 */
export default function SplitText({
  text,
  className = '',
  delay = 0.05,
  stagger = 0.045,
  emphasis,
}: SplitTextProps) {
  const [ref, shown] = useReveal<HTMLSpanElement>()

  const plain = text.split(' ').map((w) => ({ w, accent: false }))
  const accented = emphasis ? emphasis.split(' ').map((w) => ({ w, accent: true })) : []
  const words = [...plain, ...accented]
  const last = words.length - 1

  return (
    <span
      ref={ref}
      data-split=""
      className={`${className}${shown ? ' is-in' : ''}`}
      style={{ '--d': `${delay}s`, '--st': `${stagger}s` } as CSSProperties}
    >
      {words.map((item, i) => (
        <Fragment key={`${i}-${item.w}`}>
          <span
            className={`w${item.accent ? ' italic text-rust' : ''}`}
            style={{ '--i': i } as CSSProperties}
          >
            {item.w}
          </span>
          {/*
            A real space, not a margin. Spacing inline-blocks with marginRight
            leaves no whitespace in the text content, so the heading reads as
            "Ashortbiography." to screen readers, text selection and crawlers.
          */}
          {i < last ? ' ' : null}
        </Fragment>
      ))}
    </span>
  )
}
