"use client"

import { motion, useReducedMotion } from 'framer-motion'

type ProjectTechStackProps = {
  stack?: string[]
}

export default function ProjectTechStack({ stack }: ProjectTechStackProps) {
  const reduced = useReducedMotion()
  if (!stack || stack.length === 0) return null

  return (
    <div className="flex flex-wrap gap-1.5">
      {stack.map((s, i) => (
        <motion.span
          key={s}
          initial={reduced ? undefined : { opacity: 0, y: 6 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: i * 0.04 }}
          whileHover={reduced ? undefined : { y: -2 }}
          className="cursor-default rounded-full border border-ink px-[9px] py-[5px] font-mono text-[11px]"
        >
          {s}
        </motion.span>
      ))}
    </div>
  )
}
