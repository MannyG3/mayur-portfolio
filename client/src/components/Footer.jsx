import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

const PORTFOLIO_VIEWS_KEY = 'portfolio_views'

const FOOTER_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/skills', label: 'Skills' },
  { to: '/projects', label: 'Projects' },
  { to: '/experience', label: 'Experience' },
  { to: '/contact', label: 'Contact' },
]

const SOCIAL_LINKS = [
  { href: 'https://www.linkedin.com/in/mayurgund99/', label: 'LinkedIn' },
  { href: 'https://github.com/MannyG3', label: 'GitHub' },
  { href: 'mailto:mayurgund3333@gmail.com', label: 'Email' },
]

export default function Footer() {
  const [views, setViews] = useState(null)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(PORTFOLIO_VIEWS_KEY)
      const count = raw ? Math.max(0, parseInt(raw, 10) + 1) : 1
      localStorage.setItem(PORTFOLIO_VIEWS_KEY, String(count))
      setViews(count)
    } catch {
      setViews(1)
    }
  }, [])

  const displayViews = views != null
    ? views >= 1000 ? `${(views / 1000).toFixed(1)}k` : String(views)
    : '—'

  return (
    <footer className="mt-28 border-t border-surface-300/70 dark:border-surface-800">
      <div className="container py-14 md:py-20">
        <div className="mb-14 p-8 md:p-12 surface-card corner-brackets">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div>
              <p className="section-label mb-3">Correspondence</p>
              <h3 className="font-display text-3xl md:text-4xl font-semibold text-ink dark:text-surface-50 leading-tight">
                Shall we collaborate?
              </h3>
              <p className="mt-3 text-ink-muted dark:text-surface-400 text-sm md:text-base font-sans italic max-w-md">
                Open to full-time roles, freelance commissions, and mentoring engagements.
              </p>
            </div>
            <a href="mailto:mayurgund3333@gmail.com" className="btn-primary shrink-0">
              Write to me
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>

        <div className="ornament mb-12" aria-hidden>
          <span className="text-accent/60 text-xs">◆</span>
        </div>

        <div className="grid md:grid-cols-3 gap-10 mb-12">
          <div>
            <p className="font-display text-xl font-semibold text-ink dark:text-surface-50">Mayur Gund</p>
            <p className="mt-2 text-sm text-ink-muted dark:text-surface-400 font-sans italic">Full Stack Developer · Educator</p>
            <p className="mt-1 text-xs font-display tracking-widest text-ink-faint dark:text-surface-500 uppercase">Pune, India</p>
          </div>

          <nav className="flex flex-wrap gap-x-5 gap-y-2" aria-label="Footer navigation">
            {FOOTER_LINKS.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className="font-display text-sm text-ink-muted dark:text-surface-400 hover:text-accent transition-colors duration-300"
              >
                {label}
              </NavLink>
            ))}
          </nav>

          <div className="flex flex-wrap gap-3 md:justify-end">
            {SOCIAL_LINKS.map(({ href, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noreferrer' : undefined}
                className="font-display text-xs tracking-widest uppercase text-ink-muted dark:text-surface-400 hover:text-accent border border-surface-300/70 dark:border-surface-700/70 hover:border-accent/40 px-3 py-1.5 transition-all duration-300"
              >
                {label}
              </a>
            ))}
          </div>
        </div>

        <div className="pt-8 border-t border-surface-300/60 dark:border-surface-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ink-faint dark:text-surface-500">
          <span className="font-display italic">© {new Date().getFullYear()} Mayur Gund</span>
          <div className="flex items-center gap-4 font-display tracking-wide">
            <span className="tag text-[10px]">Est. MMXXIV</span>
            <span className="text-accent">{displayViews} visits</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
