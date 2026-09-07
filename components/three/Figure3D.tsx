"use client"

import { useEffect, useState } from 'react'
import type { FigureKind } from './figures'

type Figure3DProps = {
  kind: FigureKind
  className?: string
  /** Shown instead of the slot when WebGL is unavailable. */
  fallback?: 'hatch' | 'none'
}

/**
 * A transparent slot the shared <Stage> draws into. Renders nothing itself —
 * the fixed stage canvas shows through, positioned to this element's rect.
 */
export default function Figure3D({ kind, className = '', fallback = 'none' }: Figure3DProps) {
  const [webgl, setWebgl] = useState<boolean | null>(null)

  useEffect(() => {
    try {
      const c = document.createElement('canvas')
      setWebgl(!!(c.getContext('webgl2') || c.getContext('webgl')))
    } catch {
      setWebgl(false)
    }
  }, [])

  if (webgl === false) {
    return fallback === 'hatch' ? (
      <div className={`hatch border border-ink ${className}`} aria-hidden />
    ) : null
  }

  return <div data-figure={kind} className={className} aria-hidden />
}
