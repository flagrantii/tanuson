"use client"

import React, { useCallback, useEffect, useRef } from "react"
import dynamic from "next/dynamic"
import Spline from "@splinetool/react-spline"

type SplineHeroProps = {
  scene: string
  className?: string
}

export default function SplineHero({ scene, className }: SplineHeroProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const appRef = useRef<any>(null)

  const applyResponsiveZoom = useCallback(() => {
    const app = appRef.current
    const el = containerRef.current
    if (!app || !el) return

    const width = el.clientWidth
    // Simple responsive zoom mapping by width breakpoints
    let zoom = 1
    if (width < 480) zoom = 0.75
    else if (width < 640) zoom = 0.85
    else if (width < 768) zoom = 0.95
    else if (width < 1024) zoom = 1.05
    else if (width < 1440) zoom = 1.15
    else zoom = 1.25

    try {
      app.setZoom?.(zoom)
    } catch {}
  }, [])

  useEffect(() => {
    const onResize = () => applyResponsiveZoom()
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [applyResponsiveZoom])

  return (
    <div
      ref={containerRef}
      className={[
        "w-full h-[32vh] sm:h-[36vh] md:h-[40vh] lg:h-[44vh] xl:h-[48vh] max-h-[500px]",
        "overflow-hidden rounded-xl border border-gray-200 bg-white",
        className ?? "",
      ].join(" ")}
    >
      <Spline
        className="h-full w-full"
        scene={scene}
        onLoad={(app: any) => {
          appRef.current = app
          // Defer to next frame so container sizes are settled
          requestAnimationFrame(() => applyResponsiveZoom())
        }}
      />
    </div>
  )
}
