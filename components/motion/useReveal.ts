"use client"

import { useEffect, useRef, useState } from 'react'

/**
 * Scroll reveals that never hide content without JavaScript.
 *
 * The head script in app/layout.tsx puts `js` on <html> before first paint, and
 * the CSS in app/globals.css hides `[data-reveal…]` elements only under `.js`.
 * This module is the code that un-hides them: one IntersectionObserver for the
 * whole page adds `is-in` (through React state, so a re-render can never strip
 * the class again). It also marks <html> as `reveal-ready`; if that never
 * happens within 4s the head script drops `js` and everything simply shows.
 */

let io: IntersectionObserver | null = null
const pending = new Map<Element, () => void>()

function observer() {
  if (io) return io
  io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        // Also reveal anything already scrolled past (a restored scroll
        // position or a deep link), so it is never left hidden above the fold.
        const above = e.boundingClientRect.bottom < 0
        if (!e.isIntersecting && !above) continue
        io!.unobserve(e.target)
        const done = pending.get(e.target)
        pending.delete(e.target)
        done?.()
      }
    },
    { rootMargin: '0px 0px -7% 0px' },
  )
  return io
}

/** Returns a ref for the element to watch, and whether it has been revealed. */
export function useReveal<T extends Element>() {
  const ref = useRef<T>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    document.documentElement.classList.add('reveal-ready')
    const el = ref.current
    if (!el) return
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (calm || !('IntersectionObserver' in window)) {
      setShown(true)
      return
    }
    const o = observer()
    pending.set(el, () => setShown(true))
    o.observe(el)
    return () => {
      o.unobserve(el)
      pending.delete(el)
    }
  }, [])

  return [ref, shown] as const
}
