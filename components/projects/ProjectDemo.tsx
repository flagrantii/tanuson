import React from 'react'

type ProjectDemoProps = {
  isDemo?: boolean
  liveUrl?: string
}

export default function ProjectDemo({ isDemo, liveUrl }: ProjectDemoProps) {
  if (!isDemo || !liveUrl) return null
  return (
    <section className="mt-8">
      <h2 className="text-xl font-semibold">Live Demo</h2>
      <div className="mt-3 rounded-lg border bg-white overflow-hidden">
        <div className="flex items-center gap-2 px-3 py-2 border-b bg-gray-50">
          <span className="h-2 w-2 rounded-full bg-red-400" />
          <span className="h-2 w-2 rounded-full bg-yellow-400" />
          <span className="h-2 w-2 rounded-full bg-green-400" />
          <div className="ml-3 truncate text-xs text-gray-500">{liveUrl}</div>
        </div>
        <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
          <iframe
            src={liveUrl}
            title="Live Demo"
            allow="clipboard-write; encrypted-media; fullscreen"
          />
        </div>
      </div>
    </section>
  )
} 