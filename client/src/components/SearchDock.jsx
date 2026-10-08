import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { profile, projects, skillGroups } from '../data/portfolio'
import ThemeControl from './ThemeControl'

const routes = [
  { label: 'About', path: '/about' },
  { label: 'Projects', path: '/projects' },
  { label: 'Experience', path: '/experience' },
  { label: 'Skills', path: '/skills' },
  { label: 'Contact', path: '/contact' },
  { label: 'Blogs', path: '/blogs' },
  { label: 'Reading', path: '/reading' },
]

export default function SearchDock() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [progress, setProgress] = useState(0)
  const inputRef = useRef(null)

  useEffect(() => {
    function updateProgress() {
      const total = document.documentElement.scrollHeight - window.innerHeight
      setProgress(total > 0 ? Math.round((window.scrollY / total) * 100) : 0)
    }
    updateProgress()
    window.addEventListener('scroll', updateProgress, { passive: true })
    window.addEventListener('resize', updateProgress)
    return () => {
      window.removeEventListener('scroll', updateProgress)
      window.removeEventListener('resize', updateProgress)
    }
  }, [])

  useEffect(() => {
    function onKeyDown(event) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
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

  return (
    <>
      {open && (
        <div className="search-overlay" role="presentation" onMouseDown={event => { if (event.target === event.currentTarget) setOpen(false) }}>
          <div className="search-modal" role="dialog" aria-modal="true" aria-label="Search portfolio">
            <div className="search-modal-input">
              <span aria-hidden>⌕</span>
              <input ref={inputRef} value={query} onChange={event => setQuery(event.target.value)} placeholder="Search" aria-label="Search portfolio" />
              <button type="button" onClick={() => setOpen(false)} aria-label="Close search">Esc</button>
            </div>
            <div className="search-results">
              {results.map(result => result.external ? (
                <a key={`${result.label}-${result.path}`} href={result.path} target={result.path.startsWith('http') ? '_blank' : undefined} rel={result.path.startsWith('http') ? 'noreferrer' : undefined} onClick={() => setOpen(false)}>{result.label}<span aria-hidden>↗</span></a>
              ) : (
                <Link key={`${result.label}-${result.path}`} to={result.path} onClick={() => setOpen(false)}>{result.label}<span aria-hidden>→</span></Link>
              ))}
            </div>
          </div>
        </div>
      )}
      <div className="search-dock">
        <button type="button" className="search-trigger" onClick={() => setOpen(true)} aria-haspopup="dialog" aria-expanded={open} aria-label="Ask me anything">
          <span aria-hidden>⌕</span>
          <span>Ask me anything</span>
          <kbd>Ctrl K</kbd>
        </button>
        <ThemeControl />
        <div className="page-progress" role="progressbar" aria-label="Page scroll progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow={progress} title={`${progress}% viewed`}>
          <svg viewBox="0 0 32 32" aria-hidden="true">
            <circle className="page-progress-track" cx="16" cy="16" r="11" />
            <circle className="page-progress-value" cx="16" cy="16" r="11" pathLength="100" style={{ strokeDashoffset: 100 - progress }} />
          </svg>
        </div>
      </div>
    </>
  )
}
