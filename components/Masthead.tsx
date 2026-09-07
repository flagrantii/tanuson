"use client"

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { CONTACT } from '@/Data/site'

const NAV = [
  { label: 'index', href: '/' },
  { label: 'projects', href: '/projects' },
  { label: 'about', href: '/about' },
  { label: 'resume', href: '/resume' },
  { label: 'contact', href: '/contacts' },
]

/** Bangkok wall clock, HH:MM, ticking every second. */
function useBangkokClock() {
  const [clock, setClock] = useState<string>('')

  useEffect(() => {
    const tick = () => {
      const d = new Date(Date.now() + 7 * 3600e3)
      setClock(
        `${String(d.getUTCHours()).padStart(2, '0')}:${String(d.getUTCMinutes()).padStart(2, '0')}`,
      )
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return clock
}

export default function Masthead() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const clock = useBangkokClock()
  const reduced = useReducedMotion()

  // Close the sheet on navigation.
  useEffect(() => setMenuOpen(false), [pathname])

  // Lock scroll behind the mobile sheet.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <header data-noprint>
      <div className="gutter flex items-center justify-between gap-4 border-b border-hair py-[clamp(16px,2.5vw,26px)] font-mono text-[13px]">
        <Link
          href="/"
          className="whitespace-nowrap font-display text-[clamp(20px,2vw,24px)] italic text-ink no-underline"
        >
          Tanuson Deachaboonchana
        </Link>

        {/* Desktop nav */}
        <nav className="hidden gap-8 text-muted md:flex" aria-label="Primary">
          {NAV.map((item) => {
            const active = isActive(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative border-b border-transparent no-underline transition-colors duration-300 ${
                  active ? 'text-ink' : 'text-muted hover:text-ink'
                }`}
              >
                {item.label}
                {active &&
                  (reduced ? (
                    <span className="absolute -bottom-px left-0 h-px w-full bg-ink" />
                  ) : (
                    <motion.span
                      layoutId="nav-rule"
                      className="absolute -bottom-px left-0 h-px w-full bg-ink"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  ))}
              </Link>
            )
          })}
        </nav>

        <div className="hidden text-muted md:block" suppressHydrationWarning>
          vol. 2026 · bangkok{clock ? ` · ${clock}` : ''}
        </div>

        {/* Mobile trigger */}
        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          className="cursor-pointer rounded-full border border-ink bg-transparent px-3 py-1.5 font-mono text-[12px] text-ink md:hidden"
        >
          {menuOpen ? 'close' : 'menu'}
        </button>
      </div>

      {/* Mobile sheet */}
      <AnimatePresence initial={false}>
        {menuOpen && (
          <motion.nav
            id="mobile-nav"
            aria-label="Primary"
            key="sheet"
            initial={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
            animate={reduced ? { opacity: 1 } : { height: 'auto', opacity: 1 }}
            exit={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-b border-ink bg-cream md:hidden"
          >
            <div className="flex flex-col">
              {NAV.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={reduced ? undefined : { opacity: 0, x: -12 }}
                  animate={reduced ? undefined : { opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 + i * 0.05, duration: 0.35, ease: 'easeOut' }}
                >
                  <Link
                    href={item.href}
                    className={`block border-t border-hair px-5 py-4 font-display text-[28px] no-underline ${
                      isActive(item.href) ? 'text-rust' : 'text-ink'
                    }`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <a
                href={`mailto:${CONTACT.email}`}
                className="block border-t border-hair px-5 py-4 font-mono text-[12px] text-muted no-underline"
              >
                {CONTACT.email}
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
