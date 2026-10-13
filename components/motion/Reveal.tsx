"use client"

import type { CSSProperties, ReactNode } from 'react'
import { useReveal } from './useReveal'

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

const offset = (direction: Direction, distance: number): [number, number] => {
  switch (direction) {
    case 'up':
      return [0, distance]
    case 'down':
      return [0, -distance]
    case 'left':
      return [distance, 0]
    case 'right':
      return [-distance, 0]
    default:
      return [0, 0]
  }
}

/**
 * Fades its content up into place when scrolled into view. The motion is CSS
 * (`[data-reveal]` in app/globals.css); this only marks the element `is-in`.
 * Without JavaScript nothing is hidden in the first place.
 */
export default function Reveal({
  children,
  delay = 0,
  duration = 0.55,
  direction = 'up',
  distance = 14,
  blur = false,
  className = '',
  as: Tag = 'div',
}: RevealProps) {
  const [ref, shown] = useReveal<HTMLElement>()
  const [x, y] = offset(direction, distance)
  const style = {
    '--d': `${delay}s`,
    '--dur': `${duration}s`,
    '--rx': `${x}px`,
    '--ry': `${y}px`,
  } as CSSProperties

  return (
    <Tag
      // The intrinsic tags can't share one ref type; all of them are HTMLElements.
      ref={ref as never}
      data-reveal=""
      data-blur={blur ? '' : undefined}
      className={`${className}${shown ? ' is-in' : ''}`}
      style={style}
    >
      {children}
    </Tag>
  )
}
