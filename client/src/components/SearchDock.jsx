import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { profile, projects, skillGroups } from '../data/portfolio'
import ThemeControl from './ThemeControl'
import { playClickSound } from '../utils/sound'

const routes = [
  { label: 'About', path: '/about' },
  { label: 'Projects', path: '/projects' },
  { label: 'Experience', path: '/experience' },
  { label: 'Skills', path: '/skills' },
  { label: 'Contact', path: '/contact' },
]

export default function SearchDock() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    function onKeyDown(event) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        playClickSound()
        setOpen(true)
      }
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  useEffect(() => {
    if (open) window.setTimeout(() => inputRef.current?.focus(), 50)
    else setQuery('')
  }, [open])

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    const items = [
      ...routes,
      ...projects.map(project => ({ label: project.title, path: project.link, external: true })),
      ...Object.values(skillGroups).flat().map(skill => ({ label: skill, path: '/skills' })),
      { label: profile.email, path: `mailto:${profile.email}`, external: true },
    ]
    return normalized ? items.filter(item => item.label.toLowerCase().includes(normalized)).slice(0, 8) : items.slice(0, 6)
  }, [query])

  function handleScrollTop() {
    playClickSound()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleOpenSearch() {
    playClickSound()
    setOpen(true)
  }

  return (
    <>
      {open && (
        <div
          className="search-overlay"
          role="presentation"
          onMouseDown={event => {
            if (event.target === event.currentTarget) setOpen(false)
          }}
        >
          <div className="search-modal" role="dialog" aria-modal="true" aria-label="Search portfolio">
            <div className="search-modal-input">
              <span aria-hidden className="text-muted-foreground text-base">⌕</span>
              <input
                ref={inputRef}
                value={query}
                onChange={event => setQuery(event.target.value)}
                placeholder="Search portfolio, skills, projects…"
                aria-label="Search portfolio"
              />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close search"
              >
                Esc
              </button>
            </div>
            <div className="search-results">
              {results.map(result =>
                result.external ? (
                  <a
                    key={`${result.label}-${result.path}`}
                    href={result.path}
                    target={result.path.startsWith('http') ? '_blank' : undefined}
                    rel={result.path.startsWith('http') ? 'noreferrer' : undefined}
                    onClick={() => {
                      playClickSound()
                      setOpen(false)
                    }}
                  >
                    {result.label}
                    <span aria-hidden>↗</span>
                  </a>
                ) : (
                  <Link
                    key={`${result.label}-${result.path}`}
                    to={result.path}
                    onClick={() => {
                      playClickSound()
                      setOpen(false)
                    }}
                  >
                    {result.label}
                    <span aria-hidden>→</span>
                  </Link>
                )
              )}
            </div>
          </div>
        </div>
      )}

      {/* Floating Bottom Dock Bar matching ashishgogula.in screenshot */}
      <div className="search-dock flex items-center gap-1.5 rounded-full border px-3 py-1.5 shadow-lg backdrop-blur-xl transition-all duration-300">
        <button
          type="button"
          className="search-trigger flex items-center gap-2 rounded-full px-2.5 py-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
          onClick={handleOpenSearch}
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-label="Ask me anything"
        >
          <svg className="w-3.5 h-3.5 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <span className="font-sans text-xs">Ask me anything</span>
          <div className="ml-2 flex items-center gap-0.5">
            <kbd className="rounded border border-border px-1 py-0.2 font-mono text-[9px] text-muted-foreground">Ctrl</kbd>
            <kbd className="rounded border border-border px-1 py-0.2 font-mono text-[9px] text-muted-foreground">K</kbd>
          </div>
        </button>

        <span className="h-4 w-px bg-border/80 mx-1" aria-hidden />

        <ThemeControl />

        <button
          type="button"
          onClick={handleScrollTop}
          className="p-1 text-muted-foreground hover:text-foreground transition-colors duration-200"
          title="Scroll to top"
          aria-label="Scroll to top"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
            <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
            <path d="M21 3v5h-5" />
          </svg>
        </button>
      </div>
    </>
  )
}
