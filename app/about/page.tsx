"use client"
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { timelineItems } from '@/Data/timeline'
import { skillGroups } from '@/Data/skills'
import { education } from '@/Data/education'
import { cers } from '@/Data/cert'
import { activities } from '@/Data/activites'

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
}

export default function AboutPage() {
  const [certModal, setCertModal] = useState<string | null>(null)
  return (
    <div className="px-6 lg:px-8 mx-auto max-w-5xl py-16">
      <motion.h1 initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} className="text-3xl sm:text-4xl font-semibold">About Me</motion.h1>
      <motion.p initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{delay:0.05}} className="mt-4 text-gray-600">
        I design and build products end-to-end — from research and UX to performant frontend, solid backends, and smart automation.
      </motion.p>

      <div className="mt-12 grid gap-12 md:grid-cols-2">
        <div>
          <h2 className="text-xl font-medium mb-4">Timeline</h2>
          <ol className="relative border-l border-gray-200">
            {timelineItems.map((item, idx) => (
              <motion.li
                key={item.id}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="mb-8 ml-4"
              >
                <div className="absolute w-3 h-3 bg-black rounded-full -left-1.5 border border-white"></div>
                <time className="mb-1 text-sm font-normal leading-none text-gray-500">{item.period}</time>
                <h3 className="text-base font-semibold">{item.role}</h3>
                <p className="text-sm text-gray-600">{item.type} — {item.company}</p>
                <p className="mt-2 text-sm text-gray-700">{item.bullets.join('\n')}</p>
              </motion.li>
            ))}
          </ol>
        </div>
        <div>
          <h2 className="text-xl font-medium mb-4">Skill Map</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {skillGroups.map((group, gi) => (
              <motion.div
                key={group.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: gi * 0.05 }}
                className="rounded-lg border p-4"
              >
                <h3 className="text-sm font-semibold">{group.title}</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {group.skills.map((s, si) => (
                    <motion.span
                      key={s}
                      whileHover={{ scale: 1.06 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      className="select-none inline-flex items-center rounded-full border border-gray-300 px-3 py-1 text-xs text-gray-800 hover:bg-black hover:text-white transition-colors"
                    >
                      {s}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-xl font-medium mb-4">Education</h2>
        <div className="grid gap-4">
          {education.map((e, idx) => (
            <motion.div
              key={e.institution + idx}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="rounded-lg border p-4"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{e.period}</p>
                  <h3 className="text-base font-semibold">{e.institution}</h3>
                </div>
                <p className="text-sm text-gray-700">{e.program}</p>
              </div>
              {e.details && <p className="mt-2 text-sm text-gray-600">{e.details}</p>}
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-xl font-medium mb-4">Extracurricular Activities</h2>
        <div className="grid gap-4">
          {activities.map((a, idx) => (
            <motion.div
              key={a.org + idx}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="rounded-lg border p-4"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{a.period}</p>
                  <h3 className="text-base font-semibold">{a.role}</h3>
                  <p className="text-sm text-gray-600">{a.org}</p>
                </div>
              </div>
              <ul className="mt-2 list-disc ml-5 text-sm text-gray-700 space-y-1">
                {a.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-xl font-medium mb-4">Certificates</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {cers.map((c, idx) => (
            <motion.article
              key={c.id}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="rounded-lg border p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <img src={c.author.imageUrl} alt="provider" className="h-8 w-8 sm:h-9 sm:w-9 rounded" />
                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold line-clamp-2"><a href={c.href} target="_blank" rel="noopener">{c.title}</a></h3>
                    <p className="text-xs text-gray-500">{c.category.title} — {c.category.org}</p>
                  </div>
                </div>
              </div>
              <p className="mt-3 text-sm text-gray-700 line-clamp-4">{c.description}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {c.skills?.slice(0,6).map((s: string) => (
                  <span key={s} className="rounded-full border border-gray-300 px-2 py-0.5 text-[11px]">{s}</span>
                ))}
              </div>
              <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-gray-600">
                <time className="order-2 sm:order-1">{c.date}</time>
                <div className="order-1 sm:order-2 flex flex-wrap items-center gap-3">
                  <a className="underline underline-offset-4" href={c.href} target="_blank" rel="noopener">Credential</a>
                  {c.author.cersimage && (
                    <button onClick={() => setCertModal(c.author.cersimage)} className="underline underline-offset-4">Preview</button>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <AnimatePresence>
          {certModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-6"
              onClick={() => setCertModal(null)}
            >
              <motion.img
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                src={certModal}
                alt="certificate"
                className="max-h-[80vh] max-w-[90vw] rounded-lg shadow-2xl"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
} 