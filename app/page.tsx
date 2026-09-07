import Link from 'next/link'
import Figure3D from '@/components/three/Figure3D'
import Reveal from '@/components/motion/Reveal'
import LineReveal from '@/components/motion/LineReveal'
import HairlineRule from '@/components/motion/HairlineRule'
import Magnetic from '@/components/motion/Magnetic'
import { CLOSING, CONTACT, HERO, NOW, PRACTICE, STATEMENT } from '@/Data/site'
import { getRecentProjects } from '@/lib/projects'

export default function Home() {
  // Front page shows only work with real cover art; hatched plates read as
  // missing content here, however honest they are on a detail page.
  const selected = getRecentProjects(14)
    .filter((p) => p.images[0] || p.cover)
    .slice(0, 4)

  return (
    <div>
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="gutter pt-[clamp(40px,7vw,88px)]">
        <h1 className="m-0 font-display text-[clamp(52px,10.5vw,136px)] leading-[.92] tracking-headline">
          <LineReveal>{HERO.line1}</LineReveal>
          <LineReveal delay={0.09}>
            <em className="italic text-rust">{HERO.line2}</em>
          </LineReveal>
        </h1>

        <Reveal delay={0.34} className="mt-[clamp(24px,3vw,40px)] max-w-2xl">
          <p className="m-0 font-body text-[clamp(18px,1.7vw,21px)] font-light leading-[1.45] text-copy [text-wrap:pretty]">
            {HERO.lead}
          </p>
        </Reveal>
      </section>

      {/* The hero figure — the shared stage draws the knot into this slot. */}
      <div className="gutter pt-[clamp(20px,3vw,36px)]">
        <Figure3D kind="knot" className="h-[clamp(300px,48vw,600px)] w-full" />
      </div>

      {/* ── Statement ─────────────────────────────────────────────────── */}
      <section className="gutter border-t border-hair py-[clamp(40px,6vw,80px)]">
        <p className="m-0 max-w-5xl font-display text-[clamp(28px,4.4vw,62px)] leading-[1.06] tracking-[-.025em] [text-wrap:balance]">
          <LineReveal duration={1.05}>
            <span>
              {STATEMENT.before}
              <em className="italic text-rust">{STATEMENT.accent}</em>
              {STATEMENT.after}
            </span>
          </LineReveal>
        </p>
      </section>

      {/* ── Practice + Now, each with its own figure ──────────────────── */}
      <section className="gutter grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-x-16 gap-y-14 border-t border-hair py-[clamp(36px,5vw,64px)]">
        <Reveal>
          <div className="flex items-start gap-6">
            <Figure3D kind="helix" className="h-44 w-32 shrink-0" />
            <div>
              <div className="mb-3.5 font-mono text-[12px] text-muted">§ 01 — practice</div>
              <p className="m-0 font-body text-[clamp(18px,1.7vw,22px)] font-light leading-[1.4] [text-wrap:pretty]">
                {PRACTICE}
              </p>
              <div className="mt-7 flex flex-wrap gap-7 font-mono text-[13px] font-medium">
                <Magnetic>
                  <Link
                    href="/projects"
                    className="group text-ink underline decoration-1 underline-offset-[5px]"
                  >
                    View projects{' '}
                    <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                </Magnetic>
                <Magnetic>
                  <Link
                    href="/about"
                    className="group text-ink underline decoration-1 underline-offset-[5px]"
                  >
                    About me{' '}
                    <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                </Magnetic>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="flex items-start gap-6">
            <Figure3D kind="lattice" className="h-44 w-32 shrink-0" />
            <div className="flex-1">
              <div className="mb-3.5 font-mono text-[12px] text-muted">§ 02 — now</div>
              <div className="flex flex-col gap-3.5">
                {NOW.map((n, i) => (
                  <div key={n.org}>
                    <HairlineRule delay={0.08 + i * 0.08} />
                    <div className="pt-2.5">
                      <div className="font-display text-[21px]">{n.org}</div>
                      <div className="font-body text-[15px] text-muted">{n.line}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── Selected work ─────────────────────────────────────────────── */}
      <section className="border-t border-hair py-[clamp(36px,5vw,64px)]">
        <div className="gutter flex flex-wrap items-end justify-between gap-6">
          <div className="flex items-center gap-5">
            <Figure3D kind="orbit" className="h-32 w-32 shrink-0" />
            <div>
              <div className="mb-2 font-mono text-[12px] text-muted">§ 03 — selected work</div>
              <h2 className="m-0 font-display text-[clamp(34px,4.6vw,64px)] leading-[.98] tracking-tightest">
                Recent things<span className="text-rust">.</span>
              </h2>
            </div>
          </div>
          <Magnetic>
            <Link
              href="/projects"
              className="group font-mono text-[13px] underline decoration-1 underline-offset-[5px]"
            >
              all fourteen{' '}
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </Magnetic>
        </div>

        <div className="mx-[var(--gutter)] mt-10 grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] border-l border-t border-ink">
          {selected.map((p, i) => {
            const cover = p.images[0] || p.cover
            return (
              <Reveal key={p.slug} delay={i * 0.07}>
                <Link
                  href={p.href}
                  className="group flex h-full flex-col border-b border-r border-ink text-inherit no-underline"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-ink">
                    {cover ? (
                      <img
                        src={cover}
                        alt={`${p.title} — cover`}
                        loading="lazy"
                        className="h-full w-full object-cover object-top transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
                      />
                    ) : (
                      <div className="hatch h-full w-full" />
                    )}
                    <span className="absolute left-3 top-3 bg-cream px-2 py-1 font-mono text-[10px] text-muted">
                      {p.idx}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col justify-between gap-5 p-[22px]">
                    <div>
                      <div className="font-display text-[clamp(26px,2.4vw,32px)] leading-[1.02] tracking-[-.02em] transition-colors duration-300 group-hover:text-rust">
                        {p.title}
                      </div>
                      <p className="m-0 mt-2.5 font-body text-[16px] font-light leading-[1.4] text-copy">
                        {p.description}
                      </p>
                    </div>
                    <div className="flex justify-between gap-3 font-mono text-[11px] text-muted">
                      <span>{p.tagline}</span>
                      <span className="whitespace-nowrap">{p.date}</span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            )
          })}
        </div>
      </section>

      {/* ── Closing ───────────────────────────────────────────────────── */}
      <section className="gutter grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] items-center gap-x-16 gap-y-10 border-t border-hair py-[clamp(48px,7vw,96px)]">
        <div>
          <p className="m-0 font-display text-[clamp(32px,4.4vw,60px)] leading-[1.04] tracking-tightest [text-wrap:balance]">
            <LineReveal duration={1}>
              <span>
                {CLOSING.before}
                <em className="italic text-rust">{CLOSING.accent}</em>
              </span>
            </LineReveal>
          </p>
          <Reveal delay={0.2}>
            <div className="mt-8 flex flex-wrap gap-7 font-mono text-[13px]">
              <Magnetic>
                <Link href="/contacts" className="underline decoration-1 underline-offset-[5px]">
                  Get in touch →
                </Link>
              </Magnetic>
              <Magnetic>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="text-muted underline decoration-1 underline-offset-[5px] hover:text-rust"
                >
                  {CONTACT.email}
                </a>
              </Magnetic>
            </div>
          </Reveal>
        </div>
        <Figure3D kind="coil" className="h-[clamp(200px,26vw,320px)] w-full" />
      </section>
    </div>
  )
}
