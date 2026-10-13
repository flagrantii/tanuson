"use client"

import dynamic from 'next/dynamic'
import { useSyncExternalStore } from 'react'
import { hasSlots, onSlotsChange } from './slots'

// three is ~520 kB; keep it out of routes that never draw a figure.
const Stage = dynamic(() => import('./Stage'), { ssr: false })

/**
 * Mounts the shared 3D stage only while the page actually has figure slots.
 * `<Figure3D>` registers its placeholder in ./slots, so routes without figures
 * never load three at all.
 */
export default function StageMount() {
  const needed = useSyncExternalStore(onSlotsChange, hasSlots, () => false)
  return needed ? <Stage /> : null
}
