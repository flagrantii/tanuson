import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import ProjectDemo from '@/components/projects/ProjectDemo'
import ProjectFeatures from '@/components/projects/ProjectFeatures'
import ProjectGallery from '@/components/projects/ProjectGallery'
import ProjectHero from '@/components/projects/ProjectHero'
import ProjectMeta from '@/components/projects/ProjectMeta'
import ProjectTechStack from '@/components/projects/ProjectTechStack'
import Reveal from '@/components/motion/Reveal'
import SplitText from '@/components/motion/SplitText'
import { findProjectBySlug, getAllProjectSlugs, getProjectNeighbours } from '@/lib/projects'

export async function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = findProjectBySlug(slug)
  if (!project) return { title: 'Project not found' }
  return {
    title: `${project.title} — Tanuson Deachaboonchana`,
    description: project.description,
  }
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const p = findProjectBySlug(slug)
  if (!p) notFound()

  const { prev, next } = getProjectNeighbours(p.slug)

  return (
    <article>
      <div className="gutter pt-5 font-mono text-[12px] text-muted">
        <Link href="/projects" className="group text-muted no-underline hover:text-rust">
          <span className="inline-block transition-transform duration-300 group-hover:-translate-x-1">
            ←
          </span>{' '}
          all projects
        </Link>
      </div>

      <header className="gutter grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-end gap-x-12 gap-y-6 pt-[clamp(24px,3vw,40px)]">
        <h1 className="m-0 font-display text-[clamp(56px,9vw,124px)] leading-[.9] tracking-tightest [text-wrap:balance]">
          <SplitText text={p.title} />
          <span className="text-rust">.</span>
        </h1>
        <Reveal delay={0.2}>
          <p className="m-0 font-body text-[clamp(19px,1.9vw,24px)] font-light leading-[1.35]">
            {p.description}
          </p>
        </Reveal>
      </header>

      <ProjectMeta
        date={p.date}
        type={p.type}
        tagline={p.tagline}
        stackLine={p.stackLine}
        live={p.links.live}
        repo={p.links.repo}
      />

      {/* Prefer a real screenshot; fall back to the brand tile, then the plate. */}
      <ProjectHero title={p.title} cover={p.images[0] || p.cover} />

      <div className="gutter grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-x-10 gap-y-8 pb-10 pt-[clamp(32px,4vw,48px)] font-body text-[18px] font-light leading-[1.5] text-copy">
        <Reveal>
          <div className="mb-2.5 font-mono text-[11px] text-rust">about</div>
          {p.about}
        </Reveal>
        <Reveal delay={0.08}>
          <div className="mb-2.5 font-mono text-[11px] text-rust">what i did</div>
          {p.role}
        </Reveal>
        <Reveal delay={0.16}>
          <div className="mb-2.5 font-mono text-[11px] text-rust">stack</div>
          <ProjectTechStack stack={p.stack} />
        </Reveal>
      </div>

      {p.features.length > 0 && (
        <div className="gutter pb-12">
          <Reveal>
            <div className="mb-2.5 font-mono text-[11px] text-rust">features</div>
            <div className="max-w-2xl">
              <ProjectFeatures features={p.features} />
            </div>
          </Reveal>
        </div>
      )}

      <ProjectDemo liveUrl={p.links.live} title={p.title} />

      <ProjectGallery images={p.images.slice(1)} title={p.title} />

      <nav className="mx-[var(--gutter)] mb-16 flex justify-between gap-4 border-t border-ink pt-5 font-mono text-[12px]">
        {prev ? (
          <Link href={prev.href} className="group text-ink no-underline hover:text-rust">
            <span className="inline-block transition-transform duration-300 group-hover:-translate-x-1">
              ←
            </span>{' '}
            {prev.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={next.href} className="group text-right text-ink no-underline hover:text-rust">
            {next.title}{' '}
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </article>
  )
}
