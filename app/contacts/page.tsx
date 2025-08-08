"use client"
import { useState } from 'react'

const formEndpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT || ''

export default function ContactPage() {
  const [state, setState] = useState<'idle'|'loading'|'success'|'error'>('idle')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formEndpoint) {
      alert('Form endpoint not configured. Set NEXT_PUBLIC_FORMSPREE_ENDPOINT.')
      return
    }
    try {
      setState('loading')
      const res = await fetch(formEndpoint, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(Object.assign(document.createElement('form'), { elements: [] }))
      })
      const fd = new FormData()
      fd.append('name', name)
      fd.append('email', email)
      fd.append('message', message)
      const r2 = await fetch(formEndpoint, { method: 'POST', body: fd })
      if (r2.ok) {
        setState('success')
        setName(''); setEmail(''); setMessage('')
      } else throw new Error('Failed')
    } catch (e) {
      setState('error')
    }
  }

  return (
    <div className="px-6 lg:px-8 mx-auto max-w-md py-16">
      <h1 className="text-3xl sm:text-4xl font-semibold">Contact</h1>
      <p className="mt-3 text-gray-600">Send a message and I’ll get back soon.</p>

      {!formEndpoint && (
        <div className="mt-4 rounded-md border p-3 text-sm text-gray-600">Set <code className="px-1 py-0.5 bg-gray-100">NEXT_PUBLIC_FORMSPREE_ENDPOINT</code> to enable the form.</div>
      )}

      <form onSubmit={onSubmit} className="mt-8 space-y-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input title="Name" value={name} onChange={e=>setName(e.target.value)} className="mt-1 w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" required />
        </div>
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input type="email" title="Email" value={email} onChange={e=>setEmail(e.target.value)} className="mt-1 w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" required />
        </div>
        <div>
          <label className="block text-sm font-medium">Message</label>
          <textarea title="Message" value={message} onChange={e=>setMessage(e.target.value)} rows={5} className="mt-1 w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" required />
        </div>
        <button disabled={state==='loading'} className="rounded-full border border-black px-5 py-2 text-sm hover:bg-black hover:text-white transition-colors">
          {state==='loading' ? 'Sending...' : 'Send Message'}
        </button>
        {state==='success' && <p className="text-sm text-green-600">Message sent!</p>}
        {state==='error' && <p className="text-sm text-red-600">Something went wrong. Try again.</p>}
      </form>

      <div className="mt-8 flex gap-4">
        <a href="https://github.com/flagrantii" target="_blank" rel="noopener" className="underline underline-offset-4">GitHub</a>
        <a href="https://www.linkedin.com/in/tanuson-deachaboonchana-743a3029b/" target="_blank" rel="noopener" className="underline underline-offset-4">LinkedIn</a>
        <a href="https://twitter.com/TanusonD10318" target="_blank" rel="noopener" className="underline underline-offset-4">Twitter</a>
      </div>
    </div>
  )
}
