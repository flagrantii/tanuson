"use client"

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

// three is ~520 kB; keep it out of routes that never draw a figure.
const Stage = dynamic(() => import('./Stage'), { ssr: false })

/**
 * Mounts the shared 3D stage only on routes that actually contain figure
 * slots. `<Figure3D>` renders inert placeholder divs without the stage, so the
 * DOM can be probed after paint to decide whether three is needed at all.
 */
export default function StageMount() {
  const pathname = usePathname()
  const [needed, setNeeded] = useState(false)

  useEffect(() => {
    setNeeded(!!document.querySelector('[data-figure]'))
  }, [pathname])

  return needed ? <Stage /> : null
}
