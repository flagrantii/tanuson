"use client"

import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { useReveal } from './useReveal'

type PrintPlateProps = {
  src: string
  alt: string
  delay?: number
  className?: string
}

/**
 * A cover printed onto the page: in ink on the paper until the reader reaches
 * for it, then in colour. On arrival a 1px accent print head passes down the
 * plate and leaves the picture behind it.
 *
 * Hover and keyboard focus bring the colour on fine pointers (CSS, keyed off
 * the enclosing `.group`). Touch screens have no hover, so there the plate
 * takes its colour while it sits in the middle of the screen.
 *
 * All motion is CSS (`.print-plate` in app/globals.css) and only applies under
 * `html.js`; without JavaScript the cover is simply there.
 */
export default function PrintPlate({ src, alt, delay = 0, className = '' }: PrintPlateProps) {
  const [ref, shown] = useReveal<HTMLDivElement>()
  const img = useRef<HTMLImageElement>(null)
  // The head waits for the picture, or it would pass over an empty plate.
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    if (img.current?.complete) setLoaded(true)
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) el.dataset.colour = ''
        else delete el.dataset.colour
      },
      { rootMargin: '-35% 0px -35% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [ref])

  return (
    <div
      ref={ref}
      className={`print-plate absolute inset-0 overflow-hidden${shown && loaded ? ' is-in' : ''} ${className}`}
      style={{ '--d': `${delay}s` } as CSSProperties}
    >
      <img
        ref={img}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
        src={src}
        alt={alt}
        loading="lazy"
        className="h-full w-full object-cover object-top group-hover:scale-[1.06]"
      />
      <span className="print-mask" aria-hidden />
      <span className="print-head" aria-hidden />
    </div>
  )
}
