"use client"
import Reveal from '@/components/Reveal'
import SplineHero from '@/components/SplineHero'

export default function Main() {
  return (
    <div className="bg-white">
      <section className="relative isolate px-6 lg:px-8">
        <div className="mx-auto max-w-5xl py-28 sm:py-40">
          <div className="text-center">
            <Reveal>
              <h1 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-6xl">
                Building thoughtful experiences across UX, Frontend, Backend, AI and DevOps
              </h1>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Minimal, fast, and deliberate. Explore my work, process, and writing.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-10 flex items-center justify-center gap-x-4">
                <a href='/projects' className="rounded-full border border-black px-5 py-2 text-sm font-medium hover:bg-black hover:text-white transition-colors">View Projects</a>
                <a href='/resume' className="rounded-full px-5 py-2 text-sm font-medium underline underline-offset-4">Resume</a>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <div className="mt-16 sm:mt-24">
              <SplineHero scene="https://prod.spline.design/XC3QU6uKeiLLeHRv/scene.splinecode" />
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}



