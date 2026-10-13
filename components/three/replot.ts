import type { FigureKind } from './figures'

/**
 * Asks the shared stage to plot a figure again from nothing. Kept free of
 * three, like ./slots, so a caption can import it without the WebGL bundle.
 */
export const REPLOT_EVENT = 'figure:replot'

export function replot(kind: FigureKind) {
  window.dispatchEvent(new CustomEvent(REPLOT_EVENT, { detail: { kind } }))
}
