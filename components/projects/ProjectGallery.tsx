"use client"

import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

type ProjectGalleryProps = {
  images?: string[]
  title: string
}

/** Plate grid with a keyboard-navigable lightbox. */
export default function ProjectGallery({ images, title }: ProjectGalleryProps) {
  const [index, setIndex] = useState<number | null>(null)
  const reduced = useReducedMotion()
  const count = images?.length ?? 0

  const close = useCallback(() => setIndex(null), [])
  const step = useCallback(
    (d: number) => setIndex((i) => (i === null ? null : (i + d + count) % count)),
    [count],
  )

  useEffect(() => {
    if (index === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [index, close, step])

  if (!images || images.length === 0) return null

  return (
    <section data-noprint className="mx-[var(--gutter)] mb-14">
      <div className="mb-2.5 font-mono text-[11px] text-rust">plates</div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] border-l border-t border-ink">
        {images.map((src, i) => (
          <motion.button
            key={src}
            type="button"
            onClick={() => setIndex(i)}
            initial={reduced ? undefined : { opacity: 0 }}
            whileInView={reduced ? undefined : { opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className="group relative block cursor-pointer overflow-hidden border-b border-r border-ink bg-transparent p-0"
          >
            <img
              src={src}
              alt={`${title} — plate ${i + 1}`}
              className="block h-44 w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
            />
            <span className="absolute left-2 top-2 bg-cream px-1.5 py-0.5 font-mono text-[10px] text-muted">
              pl. {String(i + 1).padStart(2, '0')}
            </span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {index !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label={`${title} plate viewer`}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-ink/90 p-6"
          >
            <motion.img
              key={images[index]}
              src={images[index]}
              alt={`${title} — plate ${index + 1}`}
              initial={reduced ? undefined : { scale: 0.96, opacity: 0 }}
              animate={reduced ? undefined : { scale: 1, opacity: 1 }}
              exit={reduced ? undefined : { scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[78vh] max-w-[92vw] border border-cream/25 object-contain"
            />
            <div
              className="flex items-center gap-6 font-mono text-[12px] text-cream"
              onClick={(e) => e.stopPropagation()}
            >
              <button type="button" onClick={() => step(-1)} className="text-cream hover:text-rust">
                ← prev
              </button>
              <span className="text-cream/60">
                pl. {String(index + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
              </span>
              <button type="button" onClick={() => step(1)} className="text-cream hover:text-rust">
                next →
              </button>
              <button type="button" onClick={close} className="text-cream/60 hover:text-rust">
                close
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
