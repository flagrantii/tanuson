"use client"

import Link from 'next/link'
import Estimator from '@/components/Estimator'
import Reveal from '@/components/motion/Reveal'
import SplitText from '@/components/motion/SplitText'

const SERVICES = [
  {
    title: 'Platform & Observability',
    desc: 'Telemetry your team will actually open — traces, logs and dashboards that answer the question someone is asking at 2am.',
  },
  {
    title: 'Backend & Scale',
    desc: 'Services built for the busiest morning rather than the average one, so the people using them never find out there was a peak.',
  },
  {
    title: 'Product & Frontend',
    desc: 'Next.js and TypeScript from Figma to production, with design systems and the performance budget kept honest.',
  },
  {
    title: 'AI Integration',
    desc: 'RAG systems, agentic workflows and LLM features wired into real products — with retrieval you can debug and citations you can trust.',
  },
  {
    title: 'DevOps & Delivery',
    desc: 'Kubernetes, Helm, Argo CD and CI/CD pipelines, plus the monitoring that makes a deploy boring.',
  },
  {
    title: 'Technical Leadership',
    desc: 'Architecture reviews, standards and mentoring for small teams — the part that decides whether the codebase survives next year.',
  },
]

export default function ServicesPage() {
  return (
    <div>
      <div className="gutter grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-end gap-x-12 gap-y-6 pb-8 pt-[clamp(36px,5vw,56px)]">
        <h1 className="m-0 font-display text-[clamp(56px,8.5vw,110px)] leading-[.93] tracking-tightest">
          <SplitText text="Ways to" emphasis="work together." />
        </h1>
        <Reveal delay={0.18}>
          <p className="m-0 font-body text-[clamp(17px,1.6vw,20px)] font-light leading-[1.4] text-copy">
            Available for selected freelance and consulting work through Mee Palang Mai — from
            a single service to an entire platform.
          </p>
        </Reveal>
      </div>

      <div className="mx-[var(--gutter)] grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] border-l border-t border-ink">
        {SERVICES.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.06}>
            <div className="flex h-full min-h-[220px] flex-col justify-between border-b border-r border-ink p-[22px] transition-colors duration-300 hover:bg-white">
              <div className="font-mono text-[11px] text-muted">
                {String(i + 1).padStart(2, '0')}
              </div>
              <div>
                <div className="mb-2.5 mt-6 font-display text-[clamp(26px,2.5vw,32px)] leading-[1.05]">
                  {s.title}
                </div>
                <p className="m-0 font-body text-[16px] font-light leading-[1.45] text-copy">
                  {s.desc}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* The real AI quote estimator lives here. */}
      <section id="ai-estimator" className="gutter border-t border-hair py-[clamp(36px,5vw,64px)]">
        <div className="mb-8">
          <div className="mb-2 font-mono text-[12px] text-muted">§ 02 — estimate</div>
          <h2 className="m-0 font-display text-[clamp(32px,4.2vw,56px)] leading-[.98] tracking-tightest">
            Scope it in a minute<span className="text-rust">.</span>
          </h2>
        </div>
        <Estimator />
      </section>

      <div className="gutter py-[clamp(40px,6vw,72px)]">
        <Reveal>
          <div className="border-t border-ink pt-6">
            <p className="m-0 max-w-3xl font-body text-[clamp(22px,2.6vw,34px)] font-light leading-[1.25]">
              Have something that needs building properly?{' '}
              <Link href="/contacts" className="italic text-rust underline underline-offset-4">
                Start a conversation
              </Link>
              .
            </p>
            <div className="mt-6 flex flex-wrap gap-6 font-mono text-[12px]">
              <Link href="/projects" className="underline underline-offset-[5px]">
                see the work →
              </Link>
              <Link href="/resume" className="underline underline-offset-[5px]">
                résumé →
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  )
}
