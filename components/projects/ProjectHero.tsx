import Reveal from '@/components/motion/Reveal'

type ProjectHeroProps = {
  title: string
  cover: string
}

/**
 * Wide plate: the real cover screenshot, or the hatched placeholder. It rises
 * in while the screenshot settles from a slight zoom (`.reveal-zoom`).
 */
export default function ProjectHero({ title, cover }: ProjectHeroProps) {
  return (
    <Reveal
      delay={0.1}
      duration={0.7}
      distance={18}
      className="mx-[var(--gutter)] mt-8 overflow-hidden border border-ink"
    >
      {cover ? (
        <div className="aspect-[16/8] w-full overflow-hidden">
          <img
            src={cover}
            alt={`${title}, cover`}
            className="reveal-zoom h-full w-full object-cover object-top"
          />
        </div>
      ) : (
        <div className="hatch flex aspect-[16/8] w-full items-center justify-center p-4 text-center font-mono text-[12px] text-muted">
          [ {title}: hero screenshot ]
        </div>
      )}
    </Reveal>
  )
}
