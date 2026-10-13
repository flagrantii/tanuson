"use client"

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { createFigure, type Figure, type FigureKind } from './figures'
import { getSlots, onSlotsChange } from './slots'
import { REPLOT_EVENT } from './replot'

/**
 * A single fixed-position WebGL canvas that draws every figure on the page.
 *
 * Each `<Figure3D>` renders a transparent placeholder carrying
 * `data-figure="<kind>"` and registers it in ./slots. The stage watches those
 * placeholders with an IntersectionObserver and, each frame, draws the figure
 * of every slot near the screen into that slot's rect using scissor +
 * viewport, so any number of 3D marks costs one WebGL context instead of N.
 *
 * The frame loop only runs while at least one slot is on screen and the tab
 * is visible; only those slots are measured. With reduced motion there is no
 * loop at all: one finished still frame is drawn whenever the slots move.
 */
export default function Stage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
    } catch {
      return
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    renderer.setClearAlpha(0)
    // Each figure is drawn into its own scissor rect, so clearing is manual.
    renderer.autoClear = false

    const figures = new Map<FigureKind, Figure>()
    const getFigure = (kind: FigureKind) => {
      let f = figures.get(kind)
      if (!f) {
        f = createFigure(kind)
        figures.set(kind, f)
      }
      return f
    }

    const size = { w: 0, h: 0 }
    const resize = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      if (w === size.w && h === size.h) return
      size.w = w
      size.h = h
      renderer.setSize(w, h, false)
    }
    resize()

    const pointer = { x: 0, y: 0 }
    const target = { x: 0, y: 0 }
    const onPointerMove = (e: PointerEvent) => {
      target.x = (e.clientX / window.innerWidth - 0.5) * 2
      target.y = (e.clientY / window.innerHeight - 0.5) * 2
    }

    // Document scroll progress, refreshed only when the page scrolls or resizes.
    let scroll = 0
    const readScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      scroll = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
    }
    readScroll()

    // Slots near the screen, kept in document order: the stage composites in
    // that order, so the ambient field (first in the DOM) stays underneath.
    const visible = new Set<HTMLElement>()
    let ordered: HTMLElement[] = []
    const reorder = () => {
      ordered = Array.from(visible).sort((a, b) =>
        a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1,
      )
    }

    const clock = new THREE.Clock()
    let raf = 0
    // Whether the canvas holds pixels that must be cleared once nothing is drawn.
    let painted = false

    const drawFrame = (t: number) => {
      resize()
      renderer.setScissorTest(false)
      renderer.clear()
      painted = false

      const ctx = {
        pointerX: pointer.x,
        pointerY: pointer.y,
        scroll,
        still: reduced,
      }

      for (const el of ordered) {
        const kind = el.dataset.figure as FigureKind | undefined
        if (!kind) continue

        const r = el.getBoundingClientRect()
        if (r.width < 2 || r.height < 2) continue
        // The observer's margin admits slots just off-screen; don't draw those.
        if (r.bottom < 0 || r.top > size.h || r.right < 0 || r.left > size.w) continue

        const f = getFigure(kind)
        f.update(t, ctx)
        // Fat lines convert their pixel linewidth through `resolution`, which
        // must match the viewport actually being drawn, not the whole canvas.
        f.materials.forEach((m) => m.resolution.set(r.width, r.height))

        // WebGL's origin is bottom-left; the DOM's is top-left.
        const x = r.left
        const y = size.h - r.bottom
        renderer.setViewport(x, y, r.width, r.height)
        renderer.setScissor(x, y, r.width, r.height)
        renderer.setScissorTest(true)
        // Slots may overlap (the hero figure sits inside the hero's field), and
        // `autoClear` is off; without this the earlier slot's depth occludes.
        renderer.clearDepth()

        f.camera.aspect = r.width / r.height
        f.camera.updateProjectionMatrix()
        renderer.render(f.scene, f.camera)
        painted = true
      }

      renderer.setScissorTest(false)
    }

    const live = () => ordered.length > 0 && !document.hidden

    // Animated: one frame per rAF while something is on screen, then stop.
    const loop = () => {
      raf = 0
      if (!live()) {
        // Every slot has left: wipe the last frame so no figure lingers where
        // its slot used to be. (A hidden tab just stops; nothing shows anyway.)
        if (painted && ordered.length === 0) drawFrame(0)
        return
      }
      pointer.x += (target.x - pointer.x) * 0.055
      pointer.y += (target.y - pointer.y) * 0.055
      drawFrame(clock.getElapsedTime())
      raf = requestAnimationFrame(loop)
    }

    // Reduced motion: a single finished frame per change, no loop.
    const still = () => {
      raf = 0
      if (document.hidden) return
      if (ordered.length > 0 || painted) drawFrame(0.6)
    }

    const wake = () => {
      if (!raf) raf = requestAnimationFrame(reduced ? still : loop)
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const el = e.target as HTMLElement
          if (e.isIntersecting) visible.add(el)
          else visible.delete(el)
        }
        reorder()
        wake()
      },
      // Start drawing a little before a slot scrolls in, so it never pops.
      { rootMargin: '12% 0px' },
    )

    const observed = new Set<HTMLElement>()
    const syncSlots = () => {
      const current = getSlots()
      current.forEach((el) => {
        if (observed.has(el)) return
        observed.add(el)
        io.observe(el)
      })
      observed.forEach((el) => {
        if (current.has(el)) return
        observed.delete(el)
        visible.delete(el)
        io.unobserve(el)
      })
      reorder()
      wake()
    }
    const offSlots = onSlotsChange(syncSlots)
    syncSlots()

    const onScroll = () => {
      readScroll()
      // The animated loop redraws every frame anyway; still frames need a nudge.
      if (reduced) wake()
    }
    const onResize = () => {
      readScroll()
      wake()
    }
    // A figure's caption asks for a replot (see components/three/replot.ts).
    // With reduced motion the figure stays a finished still, so nothing to do.
    const onReplot = (e: Event) => {
      if (reduced) return
      const kind = (e as CustomEvent<{ kind: FigureKind }>).detail?.kind
      if (!kind) return
      getFigure(kind).replot?.()
      wake()
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    document.addEventListener('visibilitychange', wake)
    window.addEventListener(REPLOT_EVENT, onReplot)
    if (!reduced) window.addEventListener('pointermove', onPointerMove, { passive: true })

    return () => {
      cancelAnimationFrame(raf)
      offSlots()
      io.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', wake)
      window.removeEventListener(REPLOT_EVENT, onReplot)
      window.removeEventListener('pointermove', onPointerMove)
      figures.forEach((f) => f.dispose())
      renderer.dispose()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      data-noprint
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
    />
  )
}
