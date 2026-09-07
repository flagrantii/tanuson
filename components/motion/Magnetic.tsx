"use client"

import { ReactNode, useRef } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'

type MagneticProps = {
  children: ReactNode
  /** Maximum travel toward the pointer, in px. */
  strength?: number
  className?: string
}

/** Leans gently toward the pointer while hovered, then springs back. */
export default function Magnetic({ children, strength = 6, className = '' }: MagneticProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const reduced = useReducedMotion()

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const x = useSpring(mx, { stiffness: 260, damping: 20, mass: 0.4 })
  const y = useSpring(my, { stiffness: 260, damping: 20, mass: 0.4 })

  if (reduced) return <span className={className}>{children}</span>

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 2 * strength)
    my.set(((e.clientY - r.top) / r.height - 0.5) * 2 * strength)
  }

  const reset = () => {
    mx.set(0)
    my.set(0)
  }

  return (
    <motion.span
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ x, y, display: 'inline-block' }}
      className={className}
    >
      {children}
    </motion.span>
  )
}
