"use client"

import { useEffect, useRef, useState, type ReactNode } from 'react'

type CursorPlateProps = {
  children: ReactNode
  className?: string
}

const W = 300
const H = 188
const GAP = 28

/**
 * Wraps a list of project cards. Hovering a card that carries `data-cover`
 * floats that cover beside the pointer as a small printed plate, so the
 * index can stay text-first and still show the work.
 *
 * Fine pointers only, and not under reduced motion. The follow loop runs only
 * while a plate is showing and stops itself once it has settled.
 */
export default function CursorPlate({ children, className = '' }: CursorPlateProps) {
  const wrap = useRef<HTMLDivElement>(null)
  const plate = useRef<HTMLDivElement>(null)
  const [cover, setCover] = useState<{ src: string; label: string } | null>(null)
  // Rendered only where it can follow a pointer, so it is never dead markup.
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setEnabled(fine && !calm)
  }, [])

  useEffect(() => {
    const root = wrap.current
    const el = plate.current
    if (!enabled || !root || !el) return

    const at = { x: 0, y: 0 }
    const to = { x: 0, y: 0 }
    let raf = 0
    let active = false

    const place = () => {
      el.style.transform = `translate3d(${at.x}px, ${at.y}px, 0)`
    }
    const step = () => {
      raf = 0
      at.x += (to.x - at.x) * 0.18
      at.y += (to.y - at.y) * 0.18
      place()
      if (Math.abs(to.x - at.x) + Math.abs(to.y - at.y) > 0.5) raf = requestAnimationFrame(step)
    }
    const aim = (e: PointerEvent) => {
      // Sit below-right of the pointer; flip when that would leave the screen.
      const right = e.clientX + GAP + W < window.innerWidth
      const below = e.clientY + GAP + H < window.innerHeight
      to.x = right ? e.clientX + GAP : e.clientX - GAP - W
      to.y = below ? e.clientY + GAP : e.clientY - GAP - H
    }

    const onMove = (e: PointerEvent) => {
      const card = (e.target as Element).closest<HTMLElement>('[data-cover]')
      if (!card || !root.contains(card)) {
        if (active) {
          active = false
          setCover(null)
        }
        return
      }
      aim(e)
      if (!active) {
        active = true
        // Appear where the pointer is rather than sliding in from the last spot.
        at.x = to.x
        at.y = to.y
        place()
      }
      setCover((c) =>
        c?.src === card.dataset.cover ? c : { src: card.dataset.cover!, label: card.dataset.label ?? '' },
      )
      if (!raf) raf = requestAnimationFrame(step)
    }
    const onLeave = () => {
      active = false
      setCover(null)
    }

    root.addEventListener('pointermove', onMove)
    root.addEventListener('pointerleave', onLeave)
    window.addEventListener('scroll', onLeave, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      root.removeEventListener('pointermove', onMove)
      root.removeEventListener('pointerleave', onLeave)
      window.removeEventListener('scroll', onLeave)
    }
  }, [enabled])

  return (
    <div ref={wrap} className={className}>
      {children}
      {enabled && (
        <div
          ref={plate}
          aria-hidden
          className={`cursor-plate pointer-events-none fixed left-0 top-0 z-30 border border-ink bg-cream ${
            cover ? 'is-on' : ''
          }`}
          style={{ width: W }}
        >
          <div className="relative overflow-hidden border-b border-ink" style={{ height: H }}>
            {cover && <img src={cover.src} alt="" className="h-full w-full object-cover object-top" />}
          </div>
          <div className="px-2.5 py-1.5 font-mono text-label text-muted">
            <span className="text-accent">pl.</span> {cover?.label}
          </div>
        </div>
      )}
    </div>
  )
}
