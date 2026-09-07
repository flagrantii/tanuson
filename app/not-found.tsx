import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="gutter flex min-h-[60vh] flex-col justify-center py-20">
      <div className="font-mono text-[12px] text-muted">error 404</div>
      <h1 className="m-0 mt-3 font-display text-[clamp(56px,9vw,120px)] leading-[.92] tracking-tightest">
        Nothing set on <em className="text-rust">this page.</em>
      </h1>
      <p className="mt-5 max-w-lg font-body text-[18px] font-light leading-[1.45] text-copy">
        The link may be old, or the piece may have moved. The catalogue is the best place to
        start again.
      </p>
      <div className="mt-8 flex flex-wrap gap-6 font-mono text-[12px]">
        <Link href="/" className="underline underline-offset-[5px]">
          ← index
        </Link>
        <Link href="/projects" className="underline underline-offset-[5px]">
          projects →
        </Link>
      </div>
    </div>
  )
}
