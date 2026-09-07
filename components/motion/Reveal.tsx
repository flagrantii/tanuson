"use client"

import { ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

type Direction = 'up' | 'down' | 'left' | 'right' | 'none'

type RevealProps = {
  children: ReactNode
  delay?: number
  duration?: number
  /** Travel direction of the entrance. */
  direction?: Direction
  /** Distance in px travelled on entrance. */
  distance?: number
  /** Adds a small focus-pull blur to the entrance. */
  blur?: boolean
  className?: string
  as?: 'div' | 'section' | 'article' | 'li' | 'span'
}

const offset = (direction: Direction, distance: number) => {
  switch (direction) {
    case 'up':
      return { y: distance }
    case 'down':
      return { y: -distance }
    case 'left':
      return { x: distance }
    case 'right':
      return { x: -distance }
    default:
      return {}
  }
}

export default function Reveal({
  children,
  delay = 0,
  duration = 0.55,
  direction = 'up',
  distance = 14,
  blur = false,
  className,
  as = 'div',
}: RevealProps) {
  const reduced = useReducedMotion()
  const MotionTag = motion[as]

  if (reduced) {
    const Tag = as
    return <Tag className={className}>{children}</Tag>
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, ...offset(direction, distance), ...(blur ? { filter: 'blur(6px)' } : {}) }}
      whileInView={{ opacity: 1, x: 0, y: 0, ...(blur ? { filter: 'blur(0px)' } : {}) }}
      viewport={{ once: true, margin: '-8%' }}
      transition={{ duration, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </MotionTag>
  )
}
