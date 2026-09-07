"use client"

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { createFigure, type Figure, type FigureKind } from './figures'

/**
 * A single fixed-position WebGL canvas that draws every figure on the page.
 *
 * Each `<Figure3D>` renders a transparent placeholder carrying
 * `data-figure="<kind>"`. Every frame the stage measures those placeholders and
 * draws the matching figure into their screen rect using scissor + viewport, so
 * an arbitrary number of 3D marks costs one WebGL context instead of N.
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

    const scrollProgress = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      return max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
    }

    const clock = new THREE.Clock()
    let raf = 0

    const drawFrame = (t: number) => {
      const slots = document.querySelectorAll<HTMLElement>('[data-figure]')
      // Most routes have no figures; don't touch the GPU on those at all.
      if (slots.length === 0) return

      resize()
      renderer.clear()

      const ctx = { pointerX: pointer.x, pointerY: pointer.y, scroll: scrollProgress() }

      slots.forEach((el) => {
        const kind = el.dataset.figure as FigureKind | undefined
        if (!kind) return

        const r = el.getBoundingClientRect()
        if (r.width < 2 || r.height < 2) return
        // Skip anything fully off-screen.
        if (r.bottom < 0 || r.top > size.h || r.right < 0 || r.left > size.w) return

        const f = getFigure(kind)
        f.update(t, ctx)
        // Fat lines convert their pixel linewidth through `resolution`, which
        // must match the viewport actually being drawn — not the whole canvas.
        f.materials.forEach((m) => m.resolution.set(r.width, r.height))

        // WebGL's origin is bottom-left; the DOM's is top-left.
        const x = r.left
        const y = size.h - r.bottom
        renderer.setViewport(x, y, r.width, r.height)
        renderer.setScissor(x, y, r.width, r.height)
        renderer.setScissorTest(true)

        f.camera.aspect = r.width / r.height
        f.camera.updateProjectionMatrix()
        renderer.render(f.scene, f.camera)
      })

      renderer.setScissorTest(false)
    }

    if (reduced) {
      // Static frames only — but scroll still moves the slots, so redraw then.
      let queued = false
      const redraw = () => {
        if (queued) return
        queued = true
        raf = requestAnimationFrame(() => {
          queued = false
          drawFrame(0.6)
        })
      }
      redraw()
      window.addEventListener('scroll', redraw, { passive: true })
      window.addEventListener('resize', redraw)
      return () => {
        cancelAnimationFrame(raf)
        window.removeEventListener('scroll', redraw)
        window.removeEventListener('resize', redraw)
        figures.forEach((f) => f.dispose())
        renderer.dispose()
      }
    }

    const loop = () => {
      if (!document.hidden) {
        pointer.x += (target.x - pointer.x) * 0.055
        pointer.y += (target.y - pointer.y) * 0.055
        drawFrame(clock.getElapsedTime())
      }
      raf = requestAnimationFrame(loop)
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true })
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
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
