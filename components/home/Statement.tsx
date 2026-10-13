"use client"

import { Fragment, useEffect, useRef, type ReactNode } from 'react'
import Link from 'next/link'
import { STATEMENT } from '@/Data/site'
import { webs } from '@/Data/web'

/** Splits a run of copy into word spans, keeping the spaces between them. */
function words(text: string, start: number): [ReactNode[], number] {
  const out: ReactNode[] = []
  let i = start
  for (const part of text.split(/(\s+)/)) {
    if (!part) continue
    if (/^\s+$/.test(part)) out.push(part)
    else out.push(<span key={i} className="ink-w">{part}</span>), i++
  }
  return [out, i]
}

/**
 * The home statement, set like a journal's lead paragraph: the words take the
 * ink as the reader scrolls through it, and each example carries a footnote to
 * the project behind it.
 *
 * The ink-in only applies once this component has armed the paragraph
 * (`data-armed`, styled under `html.js` in app/globals.css), so without
 * JavaScript, under reduced motion, or before hydration every word is already
 * printed. It runs off scroll events, never a standing animation loop.
 */
export default function Statement() {
  const ref = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const p = ref.current
    if (!p) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ws = Array.from(p.querySelectorAll<HTMLElement>('.ink-w'))
    let lit = -1
    let queued = 0

    const update = () => {
      queued = 0
      const vh = window.innerHeight
      const r = p.getBoundingClientRect()
      // Starts as the paragraph's top enters the lower tenth of the screen;
      // fully inked by the time its last line reaches 60% of the screen.
      const progress = (vh * 0.9 - r.top) / (vh * 0.3 + r.height)
      const next = Math.round(Math.min(1, Math.max(0, progress)) * ws.length)
      if (next === lit) return
      const [from, to] = lit < 0 ? [0, ws.length] : [Math.min(lit, next), Math.max(lit, next)]
      for (let i = from; i < to; i++) ws[i].classList.toggle('on', i < next)
      lit = next
    }
    const onScroll = () => {
      if (!queued) queued = requestAnimationFrame(update)
    }

    update()
    p.dataset.armed = ''
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(queued)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      delete p.dataset.armed
    }
  }, [])

  const notes = STATEMENT.examples.map((ex, k) => {
    const project = webs.find((w) => w.slug === ex.slug)
    return { ...ex, n: k + 1, project }
  })

  let i = 0
  const [lead, i1] = words(STATEMENT.before, i)
  const [accent, i2] = words(STATEMENT.accent, i1)
  i = i2

  return (
    <section className="statement gutter border-t border-hair py-[clamp(40px,6vw,80px)]">
      <p
        ref={ref}
        className="ink-in m-0 max-w-5xl font-display text-[clamp(28px,4.4vw,62px)] leading-[1.06] tracking-[-.025em] [text-wrap:balance]"
      >
        {lead}
        <em className="italic text-accent">{accent}</em>
        <span className="ink-w">:</span>{' '}
        {notes.map((note, k) => {
          // The mark follows the punctuation, as a printed footnote does.
          const last = k === notes.length - 1
          const [phrase, next] = words(note.text + (last ? '.' : ','), i)
          i = next
          return (
            <Fragment key={note.slug}>
              <span className="fn-phrase" data-n={note.n}>
                {phrase}
              </span>
              {note.project && (
                <sup className="fn-mark">
                  <a href={`#fn-${note.n}`} aria-label={`Footnote ${note.n}`}>
                    {note.n}
                  </a>
                </sup>
              )}
              {last ? '' : ' '}
            </Fragment>
          )
        })}
      </p>

      <ol className="fn-notes m-0 mt-[clamp(32px,4vw,56px)] grid list-none gap-x-10 gap-y-6 p-0 md:grid-cols-3">
        {notes.map(
          (note) =>
            note.project && (
              <li key={note.slug} id={`fn-${note.n}`} className="border-t border-hair pt-3.5">
                <Link
                  href={note.project.href}
                  className="fn-note group block text-inherit no-underline"
                  data-n={note.n}
                >
                  <span className="flex items-baseline justify-between gap-3 font-mono text-label text-muted">
                    <span>
                      <span className="text-accent">{note.n}</span> · {note.project.title}
                    </span>
                    <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                  <span className="mt-2 block font-body text-[16px] font-light leading-[1.45] text-copy [text-wrap:pretty]">
                    {note.project.about}
                  </span>
                </Link>
              </li>
            ),
        )}
      </ol>
    </section>
  )
}
