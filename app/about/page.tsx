"use client"
import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { timelineItems } from '@/Data/timeline'
import { skillGroups } from '@/Data/skills'
import { education } from '@/Data/education'
import { cers } from '@/Data/cert'
import { activities } from '@/Data/activites'
import { skillToTimelineMapping } from '@/Data/link'

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
}

export default function AboutPage() {
  const [certModal, setCertModal] = useState<string | null>(null)
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)
  const [skillPositions, setSkillPositions] = useState<Record<string, { x: number; y: number }>>({})
  const [timelinePositions, setTimelinePositions] = useState<Record<number, { x: number; y: number }>>({})
  const [isDesktop, setIsDesktop] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Check if device is desktop
  useEffect(() => {
    const checkIsDesktop = () => {
      // Check for touch capability and screen size
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
      const isLargeScreen = window.innerWidth >= 1024 // lg breakpoint
      setIsDesktop(!hasTouch && isLargeScreen)
    }
    
    checkIsDesktop()
    window.addEventListener('resize', checkIsDesktop)
    
    return () => window.removeEventListener('resize', checkIsDesktop)
  }, [])

  // Update positions when component mounts or window resizes
  useEffect(() => {
    const updatePositions = () => {
      if (!containerRef.current) return
      
      const container = containerRef.current
      const containerRect = container.getBoundingClientRect()
      
      // Get skill positions
      const skillElements = container.querySelectorAll('[data-skill]')
      const newSkillPositions: Record<string, { x: number; y: number }> = {}
      
      skillElements.forEach((element) => {
        const skill = element.getAttribute('data-skill')
        if (skill) {
          const rect = element.getBoundingClientRect()
          newSkillPositions[skill] = {
            x: rect.left + rect.width / 2 - containerRect.left,
            y: rect.top + rect.height / 2 - containerRect.top
          }
        }
      })
      
      // Get timeline positions
      const timelineElements = container.querySelectorAll('[data-timeline-id]')
      const newTimelinePositions: Record<number, { x: number; y: number }> = {}
      
      timelineElements.forEach((element) => {
        const id = element.getAttribute('data-timeline-id')
        if (id) {
          const rect = element.getBoundingClientRect()
          newTimelinePositions[parseInt(id)] = {
            x: rect.left + rect.width / 2 - containerRect.left,
            y: rect.top + rect.height / 2 - containerRect.top
          }
        }
      })
      
      setSkillPositions(newSkillPositions)
      setTimelinePositions(newTimelinePositions)
    }
    
    // Initial position calculation
    setTimeout(updatePositions, 100)
    // Additional update after animations likely complete
    setTimeout(updatePositions, 1000)
    
    // Update on window resize
    window.addEventListener('resize', updatePositions)
    
    return () => window.removeEventListener('resize', updatePositions)
  }, [])
  // Get connected timeline items for hovered skill (only on desktop)
  const connectedTimelineIds = (hoveredSkill && isDesktop) ? (skillToTimelineMapping[hoveredSkill] || []) : []
  
  return (
    <div ref={containerRef} className="relative px-6 lg:px-8 mx-auto max-w-5xl py-16">
      {/* SVG overlay for connection lines */}
      <svg 
        className="absolute inset-0 pointer-events-none z-10 w-full h-full"
      >
        <AnimatePresence>
          {isDesktop && hoveredSkill && connectedTimelineIds.map((timelineId) => {
            const skillPos = skillPositions[hoveredSkill]
            const timelinePos = timelinePositions[timelineId]
            
            if (!skillPos || !timelinePos) return null
            
            // Create a curved path
            const midX = (skillPos.x + timelinePos.x) / 2
            const midY = (skillPos.y + timelinePos.y) / 2
            const controlOffset = 50
            
            return (
              <motion.g key={`${hoveredSkill}-${timelineId}`}>
                {/* Main line */}
                <motion.path
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.6 }}
                  exit={{ pathLength: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  d={`M ${skillPos.x} ${skillPos.y} Q ${midX} ${midY - controlOffset} ${timelinePos.x} ${timelinePos.y}`}
                  stroke="#000000"
                  strokeWidth="1"
                  fill="none"
                  strokeDasharray="4 4"
                />
                {/* Simple dots */}
                <motion.circle
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ duration: 0.3 }}
                  cx={skillPos.x}
                  cy={skillPos.y}
                  r="2"
                  fill="#000000"
                />
                <motion.circle
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ duration: 0.3 }}
                  cx={timelinePos.x}
                  cy={timelinePos.y}
                  r="2"
                  fill="#000000"
                />
              </motion.g>
            )
          })}
        </AnimatePresence>
        
        {/* Simple definitions */}
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
      </svg>

      <motion.h1 initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} className="text-3xl sm:text-4xl font-semibold">About Me</motion.h1>
      <motion.p initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{delay:0.05}} className="mt-4 text-gray-600">
        I design and build products end-to-end — from research and UX to performant frontend, solid backends, and smart automation.
      </motion.p>

      <div className="mt-12 grid gap-12 md:grid-cols-2">
        <div>
          <h2 className="text-xl font-medium mb-4">Timeline</h2>
          <ol className="relative border-l border-gray-200">
            {timelineItems.map((item, idx) => {
              const isConnected = connectedTimelineIds.includes(item.id)
              
              return (
                <motion.li
                  key={item.id}
                  data-timeline-id={item.id}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  onAnimationComplete={() => {
                    // Update timeline positions after animation
                    setTimeout(() => {
                      if (containerRef.current) {
                        const container = containerRef.current
                        const containerRect = container.getBoundingClientRect()
                        const timelineElement = container.querySelector(`[data-timeline-id="${item.id}"]`)
                        
                        if (timelineElement) {
                          const rect = timelineElement.getBoundingClientRect()
                          setTimelinePositions(prev => ({
                            ...prev,
                            [item.id]: {
                              x: rect.left + rect.width / 2 - containerRect.left,
                              y: rect.top + rect.height / 2 - containerRect.top
                            }
                          }))
                        }
                      }
                    }, 50)
                  }}
                  className={`mb-8 ml-4 transition-all duration-300 ${
                    isConnected 
                      ? 'scale-105 bg-gray-50 p-4 rounded-lg border-l-2 border-black' 
                      : hoveredSkill && connectedTimelineIds.length > 0 
                        ? 'opacity-30' 
                        : ''
                  }`}
                >
                  <div className={`absolute w-3 h-3 rounded-full -left-1.5 border border-white transition-all duration-300 ${
                    isConnected 
                      ? 'bg-black scale-125' 
                      : 'bg-black'
                  }`}></div>
                  <time className="mb-1 text-sm font-normal leading-none text-gray-500">{item.period}</time>
                  <h3 className={`text-base font-semibold transition-colors duration-300 ${
                    isConnected ? 'text-black' : ''
                  }`}>{item.role}</h3>
                  <p className="text-sm text-gray-600">{item.type} — {item.company}</p>
                  <p className="mt-2 text-sm text-gray-700">{item.bullets.join('\n')}</p>
                </motion.li>
              )
            })}
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
                onAnimationComplete={() => {
                  // Update positions after skill animations complete
                  setTimeout(() => {
                    if (containerRef.current) {
                      const container = containerRef.current
                      const containerRect = container.getBoundingClientRect()
                      const skillElements = container.querySelectorAll('[data-skill]')
                      const newSkillPositions: Record<string, { x: number; y: number }> = {}
                      
                      skillElements.forEach((element) => {
                        const skill = element.getAttribute('data-skill')
                        if (skill) {
                          const rect = element.getBoundingClientRect()
                          newSkillPositions[skill] = {
                            x: rect.left + rect.width / 2 - containerRect.left,
                            y: rect.top + rect.height / 2 - containerRect.top
                          }
                        }
                      })
                      
                      setSkillPositions(prev => ({ ...prev, ...newSkillPositions }))
                    }
                  }, 50)
                }}
                className="rounded-lg border p-4"
              >
                <h3 className="text-sm font-semibold">{group.title}</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {group.skills.map((s, si) => {
                    const hasConnection = skillToTimelineMapping[s]
                    const isHovered = hoveredSkill === s
                    
                    return (
                      <motion.span
                        key={s}
                        data-skill={s}
                        whileHover={{ scale: 1.06 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        onMouseEnter={() => isDesktop && hasConnection && setHoveredSkill(s)}
                        onMouseLeave={() => setHoveredSkill(null)}
                        className={`select-none inline-flex items-center rounded-full border px-3 py-1 text-xs transition-all duration-300 cursor-pointer relative z-20 ${
                          isHovered
                            ? 'bg-black text-white border-black scale-105'
                            : hasConnection && isDesktop
                              ? 'border-gray-400 text-gray-700 hover:bg-black hover:text-white hover:border-black'
                              : 'border-gray-300 text-gray-800 hover:bg-black hover:text-white'
                        }`}
                      >
                        {s}
                      </motion.span>
                    )
                  })}
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