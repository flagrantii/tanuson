import HairlineRule from '@/components/motion/HairlineRule'

type Cell = { k: string; v: React.ReactNode }

type ProjectMetaProps = {
  date: string
  type: string
  tagline: string
  stackLine: string
  live?: string
  repo?: string
}

/** The rule-bounded meta strip: date / type / area / stack / links. */
export default function ProjectMeta({
  date,
  type,
  tagline,
  stackLine,
  live,
  repo,
}: ProjectMetaProps) {
  const links: React.ReactNode =
    !live && !repo ? (
      <span className="text-muted">—</span>
    ) : (
      <>
        {live && (
          <a href={live} target="_blank" rel="noopener" className="underline underline-offset-2">
            live demo
          </a>
        )}
        {live && repo && ' · '}
        {repo && (
          <a href={repo} target="_blank" rel="noopener" className="underline underline-offset-2">
            github
          </a>
        )}
      </>
    )

  const cells: Cell[] = [
    { k: 'date', v: date },
    { k: 'type', v: type },
    { k: 'area', v: tagline },
    { k: 'stack', v: stackLine },
    { k: 'links', v: links },
  ]

  return (
    <div className="mx-[var(--gutter)] mt-10">
      <HairlineRule tone="ink" />
      <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] border-b border-ink font-mono text-[12px] leading-[1.7] text-copy">
        {cells.map((c, i) => (
          <div key={c.k} className={i === cells.length - 1 ? 'py-3.5' : 'py-3.5 pr-4'}>
            <span className="text-muted">{c.k}</span>
            <br />
            {c.v}
          </div>
        ))}
      </div>
    </div>
  )
}
