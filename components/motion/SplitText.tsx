"use client"

import { Fragment } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

type SplitTextProps = {
  /** Text split on spaces; each word animates in sequence. */
  text: string
  className?: string
  delay?: number
  stagger?: number
  /** Trailing words rendered as a rust italic emphasis run. */
  emphasis?: string
}

const word = {
  hidden: { opacity: 0, y: '0.45em', rotateX: -35 },
  show: { opacity: 1, y: '0em', rotateX: 0 },
}

/**
 * Word-by-word headline entrance. Each word keeps its own inline block so long
 * headlines still wrap naturally. The final word carries no trailing space, so
 * punctuation placed after the component sits tight against it.
 */
export default function SplitText({
  text,
  className,
  delay = 0.05,
  stagger = 0.045,
  emphasis,
}: SplitTextProps) {
  const reduced = useReducedMotion()

  if (reduced) {
    return (
      <span className={className}>
        {text}
        {emphasis ? <em className="text-rust"> {emphasis}</em> : null}
      </span>
    )
  }

  const plain = text.split(' ').map((w) => ({ w, accent: false }))
  const accented = emphasis ? emphasis.split(' ').map((w) => ({ w, accent: true })) : []
  const words = [...plain, ...accented]
  const last = words.length - 1

  return (
    <motion.span
      className={className}
      initial="hidden"
      animate="show"
      variants={{ show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
      style={{ display: 'inline', perspective: 600 }}
    >
      {words.map((item, i) => (
        <Fragment key={`${i}-${item.w}`}>
          <motion.span
            variants={word}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className={`inline-block [transform-style:preserve-3d] ${
              item.accent ? 'italic text-rust' : ''
            }`}
          >
            {item.w}
          </motion.span>
          {/*
            A real space, not a margin. Spacing inline-blocks with marginRight
            leaves no whitespace in the text content, so the heading reads as
            "Ashortbiography." to screen readers, text selection and crawlers.
          */}
          {i < last ? ' ' : null}
        </Fragment>
      ))}
    </motion.span>
  )
}
