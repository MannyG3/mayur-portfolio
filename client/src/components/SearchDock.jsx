import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { profile, projects, skillGroups } from '../data/portfolio'
import ThemeControl from './ThemeControl'
import { playClickSound } from '../utils/sound'

// SVG Icons for categories & actions
function SearchIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  )
}

function PageIcon() {
  return (
    <svg className="w-4 h-4 opacity-70 text-indigo-500 dark:text-indigo-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  )
}

function ProjectIcon() {
  return (
    <svg className="w-4 h-4 opacity-70 text-emerald-500 dark:text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
    </svg>
  )
}

function SkillIcon() {
  return (
    <svg className="w-4 h-4 opacity-70 text-amber-500 dark:text-amber-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 01-2 2h-0a2 2 0 01-2-2v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  )
}

function ActionIcon() {
  return (
    <svg className="w-4 h-4 opacity-70 text-rose-500 dark:text-rose-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg className="w-4 h-4 opacity-70 text-sky-500 dark:text-sky-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  )
}

function CopyIcon() {
  return (
    <svg className="w-4 h-4 opacity-70 text-teal-500 dark:text-teal-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
  )
}

function ExternalIcon() {
  return (
    <svg className="w-3.5 h-3.5 opacity-50 shrink-0 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
  )
}

function ArrowRightIcon() {
  return (
    <svg className="w-3.5 h-3.5 opacity-50 shrink-0 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
  )
}

export default function SearchDock() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [copiedToast, setCopiedToast] = useState(false)
  const inputRef = useRef(null)
  const listRef = useRef(null)
  const navigate = useNavigate()

  // Build searchable database
  const allSearchItems = useMemo(() => {
    const items = [
      // Navigation Pages
      { id: 'page-home', category: 'Navigation', label: 'Home', path: '/', subtitle: 'Portfolio main landing page', icon: <PageIcon /> },
      { id: 'page-about', category: 'Navigation', label: 'About', path: '/about', subtitle: 'Background, biography & stoic quotes', icon: <PageIcon /> },
      { id: 'page-projects', category: 'Navigation', label: 'Projects', path: '/projects', subtitle: 'Full-stack & open source projects', icon: <PageIcon /> },
      { id: 'page-experience', category: 'Navigation', label: 'Experience', path: '/experience', subtitle: 'Career history, teaching & roles', icon: <PageIcon /> },
      { id: 'page-skills', category: 'Navigation', label: 'Skills', path: '/skills', subtitle: 'Technical stack & competencies', icon: <PageIcon /> },
      { id: 'page-contact', category: 'Navigation', label: 'Contact', path: '/contact', subtitle: 'Get in touch & contact form', icon: <PageIcon /> },
      { id: 'page-blogs', category: 'Navigation', label: 'Blogs', path: '/blogs', subtitle: 'Technical writing & articles', icon: <PageIcon /> },
      { id: 'page-reading', category: 'Navigation', label: 'Reading List', path: '/reading', subtitle: 'Curated books & resources', icon: <PageIcon /> },

      // Projects
      ...projects.map(proj => ({
        id: `proj-${proj.title}`,
        category: 'Projects',
        label: proj.title,
        subtitle: `${proj.badge} — ${proj.desc.slice(0, 60)}…`,
        path: proj.link,
        external: true,
        tag: proj.tech[0],
        icon: <ProjectIcon />,
      })),

      // Skills
      ...Object.entries(skillGroups).flatMap(([groupName, skills]) =>
        skills.map(skill => {
          const name = typeof skill === 'string' ? skill : skill.name
          const href = typeof skill === 'object' ? skill.href : undefined
          return {
            id: `skill-${name}`,
            category: 'Skills',
            label: name,
            subtitle: `${groupName} technology stack`,
            path: '/skills',
            href,
            external: !!href,
            tag: groupName,
            icon: <SkillIcon />,
          }
        })
      ),

      // Actions & Socials
      {
        id: 'action-copy-email',
        category: 'Actions',
        label: 'Copy Email Address',
        subtitle: profile.email,
        action: 'copy-email',
        icon: <CopyIcon />,
        badge: 'Action',
      },
      {
        id: 'action-send-email',
        category: 'Actions',
        label: 'Email Mayur',
        subtitle: `Send email to ${profile.email}`,
        path: `mailto:${profile.email}`,
        external: true,
        icon: <MailIcon />,
        badge: 'Mail',
      },
      {
        id: 'action-github',
        category: 'Actions',
        label: 'GitHub Profile',
        subtitle: 'github.com/MannyG3',
        path: `https://github.com/${profile.githubUsername}`,
        external: true,
        icon: <ActionIcon />,
        badge: 'Link',
      },
      {
        id: 'action-linkedin',
        category: 'Actions',
        label: 'LinkedIn Profile',
        subtitle: 'linkedin.com/in/mayurgund99',
        path: 'https://www.linkedin.com/in/mayurgund99/',
        external: true,
        icon: <ActionIcon />,
        badge: 'Link',
      },
      {
        id: 'action-top',
        category: 'Actions',
        label: 'Scroll to Top',
        subtitle: 'Jump back to top of current page',
        action: 'scroll-top',
        icon: <ActionIcon />,
        badge: 'Scroll',
      },
    ]

    return items
  }, [])

  // Filtered search results
  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) {
      // Default top suggestions when empty
      return allSearchItems.filter(item =>
        ['page-home', 'page-about', 'page-projects', 'page-skills', 'page-contact', 'action-copy-email'].includes(item.id)
      )
    }
    return allSearchItems
      .filter(item =>
        item.label.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        (item.tag && item.tag.toLowerCase().includes(q))
      )
      .slice(0, 12)
  }, [query, allSearchItems])

  // Reset selection index on query change
  useEffect(() => {
    setSelectedIndex(0)
  }, [query])

  // Group results by category for rendering header labels
  const groupedResults = useMemo(() => {
    const map = new Map()
    results.forEach((item, idx) => {
      if (!map.has(item.category)) map.set(item.category, [])
      map.get(item.category).push({ ...item, globalIndex: idx })
    })
    return Array.from(map.entries())
  }, [results])

  // Open/Close side effects (focus & overflow)
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
      window.setTimeout(() => inputRef.current?.focus(), 40)
    } else {
      document.body.style.overflow = ''
      setQuery('')
      setSelectedIndex(0)
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // Scroll active item into view
  useEffect(() => {
    if (listRef.current && selectedIndex >= 0) {
      const activeEl = listRef.current.querySelector(`[data-index="${selectedIndex}"]`)
      if (activeEl) {
        activeEl.scrollIntoView({ block: 'nearest' })
      }
    }
  }, [selectedIndex])

  // Select item action handler
  function handleSelect(item) {
    playClickSound()

    if (item.action === 'copy-email') {
      navigator.clipboard.writeText(profile.email)
      setCopiedToast(true)
      setTimeout(() => setCopiedToast(false), 2000)
      setOpen(false)
      return
    }

    if (item.action === 'scroll-top') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      setOpen(false)
      return
    }

    setOpen(false)

    if (item.external) {
      window.open(item.path || item.href, '_blank', 'noopener,noreferrer')
    } else if (item.path) {
      navigate(item.path)
    }
  }

  // Keyboard Navigation Listener
  useEffect(() => {
    function handleKeyDown(e) {
      // Toggle Cmd+K / Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        playClickSound()
        setOpen(prev => !prev)
        return
      }

      if (!open) return

      if (e.key === 'Escape') {
        e.preventDefault()
        setOpen(false)
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex(prev => (results.length > 0 ? (prev + 1) % results.length : 0))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex(prev => (results.length > 0 ? (prev - 1 + results.length) % results.length : 0))
      } else if (e.key === 'Enter') {
        e.preventDefault()
        if (results[selectedIndex]) {
          handleSelect(results[selectedIndex])
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open, results, selectedIndex])

  function handleOpenSearch() {
    playClickSound()
    setOpen(true)
  }

  function handleScrollTop() {
    playClickSound()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      {/* Search Modal Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-start sm:items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-md animate-in fade-in-0 duration-200"
          role="presentation"
          onMouseDown={e => {
            if (e.target === e.currentTarget) setOpen(false)
          }}
        >
          <div
            className="w-full max-w-xl bg-surface-100 dark:bg-surface-900 border border-surface-300/80 dark:border-surface-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-200"
            role="dialog"
            aria-modal="true"
            aria-label="Command Search Palette"
          >
            {/* Modal Search Input Header */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-surface-200 dark:border-surface-800 bg-surface-50/50 dark:bg-surface-950/40">
              <SearchIcon className="w-5 h-5 text-ink-muted dark:text-surface-400 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Type a command or search (pages, projects, skills)..."
                className="w-full bg-transparent text-sm sm:text-base text-ink dark:text-surface-100 placeholder:text-ink-muted/60 dark:placeholder:text-surface-500 focus:outline-none font-sans"
                aria-label="Search portfolio"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="p-1 rounded-md text-ink-muted hover:text-ink dark:text-surface-400 dark:hover:text-surface-100 text-xs font-mono"
                  title="Clear input"
                >
                  ✕
                </button>
              )}
              <kbd className="hidden sm:inline-flex items-center px-2 py-0.5 text-[10px] font-mono font-medium text-ink-muted dark:text-surface-400 bg-surface-200/60 dark:bg-surface-800/80 rounded border border-surface-300 dark:border-surface-700">
                ESC
              </kbd>
            </div>

            {/* Results List */}
            <div ref={listRef} className="overflow-y-auto p-2 space-y-4 max-h-[55vh] scrollbar-thin">
              {results.length === 0 ? (
                <div className="py-12 text-center text-ink-muted dark:text-surface-400">
                  <p className="text-sm font-sans">No matching commands or pages found for &quot;<span className="text-ink dark:text-surface-100 font-medium">{query}</span>&quot;</p>
                  <p className="text-xs font-mono mt-1 text-ink-faint">Try searching &quot;React&quot;, &quot;Projects&quot;, or &quot;Contact&quot;</p>
                </div>
              ) : (
                groupedResults.map(([category, items]) => (
                  <div key={category} className="space-y-1">
                    <div className="px-3 py-1 text-[11px] font-mono tracking-wider font-semibold uppercase text-ink-muted/70 dark:text-surface-400/70">
                      {category}
                    </div>
                    {items.map(item => {
                      const isSelected = item.globalIndex === selectedIndex
                      return (
                        <div
                          key={item.id}
                          data-index={item.globalIndex}
                          onMouseEnter={() => setSelectedIndex(item.globalIndex)}
                          onClick={() => handleSelect(item)}
                          className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer text-xs sm:text-sm transition-colors duration-150 ${
                            isSelected
                              ? 'bg-accent/10 dark:bg-accent/20 text-accent font-medium'
                              : 'text-ink dark:text-surface-200 hover:bg-surface-200/50 dark:hover:bg-surface-800/50'
                          }`}
                        >
                          <div className={`p-1.5 rounded-lg transition-colors ${isSelected ? 'bg-accent/15' : 'bg-surface-200/60 dark:bg-surface-800/60'}`}>
                            {item.icon}
                          </div>
                          <div className="flex flex-col min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-sans truncate">{item.label}</span>
                              {item.tag && (
                                <span className="px-1.5 py-0.5 text-[9px] font-mono rounded bg-surface-200 dark:bg-surface-800 text-ink-muted dark:text-surface-400">
                                  {item.tag}
                                </span>
                              )}
                            </div>
                            {item.subtitle && (
                              <span className="text-[11px] font-sans text-ink-muted dark:text-surface-400 truncate">
                                {item.subtitle}
                              </span>
                            )}
                          </div>
                          {item.external ? <ExternalIcon /> : <ArrowRightIcon />}
                        </div>
                      )
                    })}
                  </div>
                ))
              )}
            </div>

            {/* Modal Keyboard Shortcuts Footer */}
            <div className="px-4 py-2.5 bg-surface-200/40 dark:bg-surface-950/60 border-t border-surface-200 dark:border-surface-800 flex items-center justify-between text-[11px] text-ink-muted dark:text-surface-400 font-mono">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <kbd className="px-1 py-0.5 rounded bg-surface-200 dark:bg-surface-800 border border-surface-300 dark:border-surface-700">↑</kbd>
                  <kbd className="px-1 py-0.5 rounded bg-surface-200 dark:bg-surface-800 border border-surface-300 dark:border-surface-700">↓</kbd>
                  <span className="ml-0.5 hidden sm:inline">Navigate</span>
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-surface-200 dark:bg-surface-800 border border-surface-300 dark:border-surface-700">↵</kbd>
                  <span className="ml-0.5 hidden sm:inline">Select</span>
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1 py-0.5 rounded bg-surface-200 dark:bg-surface-800 border border-surface-300 dark:border-surface-700">ESC</kbd>
                  <span className="ml-0.5 hidden sm:inline">Close</span>
                </span>
              </div>
              <div>
                <span>{results.length} results</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Copied Toast Notification */}
      {copiedToast && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-[110] px-4 py-2 bg-ink text-surface-100 dark:bg-surface-100 dark:text-ink text-xs font-mono rounded-full shadow-lg animate-in fade-in slide-in-from-bottom-2 duration-200">
          Email copied to clipboard! ✓
        </div>
      )}

      {/* Floating Bottom Dock Bar matching ashishgogula.in styling */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 rounded-full border border-surface-300/80 dark:border-surface-800 px-3 py-1.5 shadow-xl bg-surface-100/90 dark:bg-surface-900/90 backdrop-blur-xl transition-all duration-300 hover:shadow-2xl">
        <button
          type="button"
          onClick={handleOpenSearch}
          className="flex items-center gap-2 rounded-full px-2.5 py-1 text-xs text-ink-muted hover:text-ink dark:text-surface-400 dark:hover:text-surface-100 transition-colors"
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-label="Ask me anything command palette"
        >
          <SearchIcon className="w-3.5 h-3.5 opacity-80" />
          <span className="font-sans text-xs">Ask me anything</span>
          <div className="ml-1.5 flex items-center gap-0.5">
            <kbd className="rounded border border-surface-300 dark:border-surface-700 px-1 py-0.2 font-mono text-[9px] text-ink-muted dark:text-surface-400">Ctrl</kbd>
            <kbd className="rounded border border-surface-300 dark:border-surface-700 px-1 py-0.2 font-mono text-[9px] text-ink-muted dark:text-surface-400">K</kbd>
          </div>
        </button>

        <span className="h-4 w-px bg-surface-300 dark:bg-surface-700 mx-0.5" aria-hidden />

        <ThemeControl />

        <button
          type="button"
          onClick={handleScrollTop}
          className="p-1 text-ink-muted hover:text-ink dark:text-surface-400 dark:hover:text-surface-100 transition-colors duration-200"
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

