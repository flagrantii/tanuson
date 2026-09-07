import Masthead from '@/components/Masthead'
import StageMount from '@/components/three/StageMount'
import Footer from '@/components/Footer'
import './globals.css'
import type { Metadata } from 'next'
import { Instrument_Serif, JetBrains_Mono, Newsreader } from 'next/font/google'
import PageTransition from '@/components/PageTransition'

const display = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
  // Next has no metric overrides for this face; skip the synthetic fallback.
  adjustFontFallback: false,
})

const body = Newsreader({
  subsets: ['latin'],
  weight: ['300', '400'],
  style: ['normal', 'italic'],
  variable: '--font-body',
  display: 'swap',
  adjustFontFallback: false,
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Tanuson Deachaboonchana',
  description:
    'Software engineer — platform, backend, and the interfaces on top. Bangkok.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="bg-cream text-ink antialiased">
        {/* One shared WebGL canvas behind the page; figure slots draw into it. */}
        <StageMount />
        <div className="relative z-10 flex min-h-screen flex-col">
          <Masthead />
          <main className="flex-1">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
