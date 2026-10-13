import Reveal from '@/components/motion/Reveal'

type ProjectFeaturesProps = {
  features?: string[]
}

export default function ProjectFeatures({ features }: ProjectFeaturesProps) {
  if (!features || features.length === 0) return null

  return (
    <ul className="list-none">
      {features.map((f, i) => (
        <Reveal
          key={f}
          as="li"
          direction="right"
          distance={8}
          duration={0.4}
          delay={i * 0.06}
          className="border-t border-hair py-2 font-body text-[16px] font-light leading-[1.5] text-copy first:border-t-0 first:pt-0"
        >
          <span className="mr-2.5 font-mono text-label text-rust">
            {String(i + 1).padStart(2, '0')}
          </span>
          {f}
        </Reveal>
      ))}
    </ul>
  )
}
