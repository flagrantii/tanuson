"use client"

import { useState } from 'react'
import Reveal from '@/components/motion/Reveal'
import SplitText from '@/components/motion/SplitText'
import { CONTACT } from '@/Data/site'

const formEndpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT || ''

type Status = 'idle' | 'loading' | 'success' | 'error'

const field =
  'mt-1.5 w-full border border-ink bg-transparent px-3 py-2.5 font-body text-[16px] outline-none transition-shadow placeholder:text-muted/60 focus:shadow-[inset_0_-2px_0_0_#b8442a]'

export default function ContactPage() {
  const [status, setStatus] = useState<Status>('idle')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formEndpoint) {
      setStatus('error')
      return
    }
    setStatus('loading')
    try {
      const fd = new FormData()
      fd.append('name', name)
      fd.append('email', email)
      fd.append('message', message)
      const res = await fetch(formEndpoint, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: fd,
      })
      if (!res.ok) throw new Error('request failed')
      setStatus('success')
      setName('')
      setEmail('')
      setMessage('')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div>
      <div className="gutter grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-end gap-x-12 gap-y-6 pb-8 pt-[clamp(36px,5vw,56px)]">
        <h1 className="m-0 font-display text-[clamp(56px,8.5vw,110px)] leading-[.93] tracking-tightest">
          <SplitText text="Say" emphasis="hello." />
        </h1>
        <Reveal delay={0.18}>
          <p className="m-0 font-body text-[clamp(17px,1.6vw,20px)] font-light leading-[1.4] text-copy">
            Freelance work, platform problems, or just a good argument about observability —
            all welcome. I read everything.
          </p>
        </Reveal>
      </div>

      <div className="gutter grid grid-cols-1 gap-x-14 gap-y-12 border-t border-hair py-[clamp(32px,4vw,48px)] pb-20 lg:grid-cols-[minmax(0,1fr)_minmax(240px,320px)]">
        {/* Form */}
        <Reveal>
          <div className="mb-6 font-mono text-[11px] text-rust">send a message</div>
          <form onSubmit={onSubmit} className="max-w-xl">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="font-mono text-[11px] text-muted">name</span>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={field}
                  required
                />
              </label>
              <label className="block">
                <span className="font-mono text-[11px] text-muted">email</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={field}
                  required
                />
              </label>
            </div>
            <label className="mt-5 block">
              <span className="font-mono text-[11px] text-muted">message</span>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={6}
                className={`${field} resize-y`}
                required
              />
            </label>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="mt-6 w-full cursor-pointer border-0 bg-ink px-4 py-3.5 font-mono text-[12px] font-medium text-cream transition-opacity disabled:opacity-60 sm:w-auto sm:px-8"
            >
              {status === 'loading' ? 'sending…' : 'Send message →'}
            </button>

            {status === 'success' && (
              <p className="mt-4 font-mono text-[12px] text-rust">
                Sent. I&apos;ll come back to you shortly.
              </p>
            )}
            {status === 'error' && (
              <p className="mt-4 max-w-md font-mono text-[12px] leading-[1.6] text-muted">
                {formEndpoint
                  ? 'Something went wrong. Try again, or email me directly below.'
                  : `The form isn't wired up yet — email me directly at ${CONTACT.email}.`}
              </p>
            )}
          </form>
        </Reveal>

        {/* Direct */}
        <Reveal delay={0.1}>
          <div className="mb-6 font-mono text-[11px] text-rust">or reach me directly</div>
          <div className="flex flex-col">
            {[
              { k: 'email', v: CONTACT.email, href: `mailto:${CONTACT.email}` },
              { k: 'phone', v: CONTACT.phone, href: CONTACT.phoneHref },
              { k: 'github', v: CONTACT.githubLabel, href: CONTACT.github },
              { k: 'linkedin', v: 'in/tanuson-deachaboonchana', href: CONTACT.linkedin },
              { k: 'based', v: `${CONTACT.location}, Thailand`, href: '' },
            ].map((r) => (
              <div key={r.k} className="border-t border-hair py-3">
                <div className="font-mono text-[11px] text-muted">{r.k}</div>
                {r.href ? (
                  <a
                    href={r.href}
                    {...(r.href.startsWith('http') ? { target: '_blank', rel: 'noopener' } : {})}
                    className="font-body text-[17px] no-underline hover:text-rust"
                  >
                    {r.v}
                  </a>
                ) : (
                  <span className="font-body text-[17px]">{r.v}</span>
                )}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </div>
  )
}
