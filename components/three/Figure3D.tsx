"use client"

import { useEffect, useRef, useState } from 'react'
import type { FigureKind } from './figures'
import { addSlot, removeSlot } from './slots'

type Figure3DProps = {
  kind: FigureKind
  className?: string
  /** Shown instead of the slot when WebGL is unavailable. */
  fallback?: 'hatch' | 'none'
}

/**
 * A transparent slot the shared <Stage> draws into. Renders nothing itself:
 * the fixed stage canvas shows through, positioned to this element's rect.
 * The slot registers itself so the stage knows what to watch.
 */
export default function Figure3D({ kind, className = '', fallback = 'none' }: Figure3DProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [webgl, setWebgl] = useState<boolean | null>(null)

  useEffect(() => {
    try {
      const c = document.createElement('canvas')
      setWebgl(!!(c.getContext('webgl2') || c.getContext('webgl')))
    } catch {
      setWebgl(false)
    }
  }, [])

  const drawable = webgl !== false
  useEffect(() => {
    const el = ref.current
    if (!el || !drawable) return
    addSlot(el)
    return () => removeSlot(el)
  }, [drawable])

  if (!drawable) {
    return fallback === 'hatch' ? (
      <div className={`hatch border border-ink ${className}`} aria-hidden />
    ) : null
  }

  return <div ref={ref} data-figure={kind} className={className} aria-hidden />
}
