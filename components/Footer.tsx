import { CONTACT } from '@/Data/site'

const LINKS = [
  { label: 'github', href: CONTACT.github, external: true },
  { label: 'linkedin', href: CONTACT.linkedin, external: true },
  { label: 'services', href: '/services', external: false },
  { label: 'blog', href: '/blog', external: false },
  { label: CONTACT.email, href: `mailto:${CONTACT.email}`, external: false },
]

export default function Footer() {
  return (
    <footer
      data-noprint
      className="gutter mt-auto flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-hair py-[18px] font-mono text-[11px] text-muted"
    >
      <span>© {new Date().getFullYear()} Tanuson Deachaboonchana. All rights reserved.</span>
      <div className="flex flex-wrap gap-4">
        {LINKS.map((l) => (
          <a
            key={l.label}
            href={l.href}
            {...(l.external ? { target: '_blank', rel: 'noopener' } : {})}
            className="text-muted no-underline transition-colors hover:text-rust"
          >
            {l.label}
          </a>
        ))}
      </div>
    </footer>
  )
}
