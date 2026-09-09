"use client"

import { ReactNode } from 'react'
import { usePathname } from 'next/navigation'

type PageTransitionProps = {
  children: ReactNode
}

/**
 * Fades each route in on mount, keyed by pathname.
 *
 * Deliberately a CSS animation rather than Framer Motion. The previous version
 * used `AnimatePresence mode="wait"` with an exit animation, which is unsafe in
 * the App Router: the layout swaps `children` for the incoming route while
 * AnimatePresence is still exiting the old wrapper, so the exit values
 * (opacity 0) landed on the *new* page and it never animated back in — every
 * few navigations rendered a blank page. A keyframe with `both` fill is driven
 * by the browser, always completes, and cannot strand content invisible.
 */
export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()

  return (
    <div key={pathname} className="page-enter">
      {children}
    </div>
  )
}
