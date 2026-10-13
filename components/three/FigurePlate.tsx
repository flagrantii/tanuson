"use client"

import Figure3D from './Figure3D'
import type { FigureKind } from './figures'
import { replot } from './replot'

type FigurePlateProps = {
  kind: FigureKind
  /** Figure number in the journal's own sequence, e.g. "1". */
  n: string
  /** What the figure is, in the caption's plain words. */
  caption: string
  /** Sizes the drawing area. */
  className?: string
}

/**
 * A figure set as a printed plate: crop marks at its corners and a numbered
 * caption under it. Clicking the drawing, or the caption's "replot", lifts the
 * pen and plots the figure again from nothing.
 *
 * The replot control only exists for readers who can see it work: it is hidden
 * without JavaScript and under reduced motion (see `.plate-replot` in
 * app/globals.css), where the figure is a finished still.
 */
export default function FigurePlate({ kind, n, caption, className = '' }: FigurePlateProps) {
  return (
    <figure className="figure-plate m-0">
      <div className="plate-crop relative" onClick={() => replot(kind)}>
        <Figure3D kind={kind} className={className} />
      </div>
      <figcaption className="mt-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 font-mono text-label text-muted">
        <span>
          <span className="text-accent">fig. {n}</span> · {caption}
        </span>
        <button
          type="button"
          onClick={() => replot(kind)}
          className="plate-replot cursor-pointer whitespace-nowrap border-0 bg-transparent p-0 font-mono text-label text-ink underline decoration-1 underline-offset-[5px] hover:text-accent"
        >
          replot ↺
        </button>
      </figcaption>
    </figure>
  )
}
