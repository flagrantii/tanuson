"use client"

import { motion, useReducedMotion } from 'framer-motion'

type ProjectFeaturesProps = {
  features?: string[]
}

export default function ProjectFeatures({ features }: ProjectFeaturesProps) {
  const reduced = useReducedMotion()
  if (!features || features.length === 0) return null

  return (
    <ul className="list-none">
      {features.map((f, i) => (
        <motion.li
          key={f}
          initial={reduced ? undefined : { opacity: 0, x: -8 }}
          whileInView={reduced ? undefined : { opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.06 }}
          className="border-t border-hair py-2 font-body text-[16px] font-light leading-[1.5] text-copy first:border-t-0 first:pt-0"
        >
          <span className="mr-2.5 font-mono text-[11px] text-rust">
            {String(i + 1).padStart(2, '0')}
          </span>
          {f}
        </motion.li>
      ))}
    </ul>
  )
}
