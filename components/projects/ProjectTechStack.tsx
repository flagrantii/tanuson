import Reveal from '@/components/motion/Reveal'

type ProjectTechStackProps = {
  stack?: string[]
}

export default function ProjectTechStack({ stack }: ProjectTechStackProps) {
  if (!stack || stack.length === 0) return null

  return (
    <div className="flex flex-wrap gap-1.5">
      {stack.map((s, i) => (
        // The reveal fades the pill in; the inner span owns the hover lift, so
        // the reveal's staggered delay never lags the hover.
        <Reveal key={s} as="span" distance={6} duration={0.35} delay={i * 0.04}>
          <span className="inline-block cursor-default rounded-full border border-ink px-[9px] py-[5px] font-mono text-label transition-transform duration-300 ease-out hover:-translate-y-0.5">
            {s}
          </span>
        </Reveal>
      ))}
    </div>
  )
}
