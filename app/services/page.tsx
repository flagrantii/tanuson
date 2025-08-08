"use client"
import { motion } from 'framer-motion'

const services = [
  { title: 'UX Audits', desc: 'Heuristic reviews, research synthesis, and actionable recommendations.' },
  { title: 'Fullstack Development', desc: 'Design systems, performant frontends, robust APIs and databases.' },
  { title: 'AI Automation', desc: 'Integrate LLMs and automation into products and workflows.' },
  { title: 'CI/CD Setup', desc: 'Pipelines, environments, and DevOps best practices.' },
]

export default function ServicesPage() {
  return (
    <div className="px-6 lg:px-8 mx-auto max-w-6xl py-16">
      <h1 className="text-3xl sm:text-4xl font-semibold">Services</h1>
      <p className="mt-3 text-gray-600">Ways I can help your team ship better products.</p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {services.map((s) => (
          <motion.div key={s.title} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} className="rounded-lg border p-6">
            <h3 className="text-lg font-semibold">{s.title}</h3>
            <p className="text-sm text-gray-600 mt-2">{s.desc}</p>
            <div className="mt-4 flex gap-3">
              <a href="/contacts" className="rounded-full border border-black px-4 py-1.5 text-sm hover:bg-black hover:text-white transition-colors">Request a Quote</a>
              <a href="/contacts" className="rounded-full px-4 py-1.5 text-sm underline underline-offset-4">Hire Me</a>
            </div>
          </motion.div>
        ))}
      </div>

      <div id="ai-estimator" className="mt-12 rounded-lg border p-6">
        <h2 className="text-xl font-medium">AI-powered Auto-Quote Estimator (Coming soon)</h2>
        <p className="text-sm text-gray-600 mt-2">A quick way to scope and estimate your project using structured prompts.</p>
      </div>
    </div>
  )
} 