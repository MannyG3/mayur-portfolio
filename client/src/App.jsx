import { Suspense, useEffect, useState } from 'react'
import { Route, Routes, NavLink } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import Home from './pages/Home'
import About from './pages/About'
import Skills from './pages/Skills'
import Projects from './pages/Projects'
import Experience from './pages/Experience'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import Backdrop from './components/Backdrop'

function getInitialTheme() {
  if (typeof document === 'undefined') return 'dark'
  const stored = localStorage.getItem('theme')
  if (stored === 'light' || stored === 'dark') return stored
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

function SunIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
    </svg>
  )
}

function MoonIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clipRule="evenodd" />
    </svg>
  )
}

function ThemeToggle() {
  const [theme, setTheme] = useState(() => getInitialTheme())
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  useEffect(() => {
    if (!mounted) return
    const root = document.documentElement
    const isDark = theme === 'dark'
    root.classList.toggle('dark', isDark)
    root.classList.add('theme-transition')
    const t = setTimeout(() => root.classList.remove('theme-transition'), 350)
    localStorage.setItem('theme', theme)
    return () => clearTimeout(t)
  }, [theme, mounted])

  function toggleTheme() {
    setTheme(t => (t === 'light' ? 'dark' : 'light'))
  }

  const isDark = theme === 'dark'
  const iconClass = 'h-5 w-5 text-slate-600 dark:text-slate-300'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="inline-flex items-center justify-center h-9 w-9 rounded-md border border-slate-300 dark:border-white/10 bg-slate-100 dark:bg-white/5 hover:border-cyan-400/50 dark:hover:border-neon-cyan/40 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors"
    >
      {isDark ? <MoonIcon className={iconClass} /> : <SunIcon className={iconClass} />}
    </button>
  )
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  const navLinkClass = ({ isActive }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors hover:text-cyan-600 dark:hover:text-neon-cyan border border-transparent hover:border-cyan-400/30 dark:hover:border-neon-cyan/30 ${isActive ? 'text-cyan-600 dark:text-neon-cyan border-cyan-400/40 dark:border-neon-cyan/40' : 'text-slate-600 dark:text-slate-300'}`
  return (
    <header className={`sticky top-0 z-50 bg-slate-50/90 dark:bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-slate-200 dark:border-white/10 transition-[height,background,transform] ${scrolled ? 'shadow-sm shadow-cyan-500/5' : ''}`}>
      <div className={`container flex items-center justify-between ${scrolled ? 'h-12' : 'h-16'} transition-[height]`}>
        <NavLink to="/" className="font-semibold text-slate-800 dark:text-slate-100 hover:text-cyan-600 dark:hover:text-neon-cyan transition-colors">Mayur Gund</NavLink>
        <div className="flex items-center gap-2">
          <nav className="hidden md:flex items-center gap-2">
            <NavLink to="/" className={navLinkClass}>Home</NavLink>
            <NavLink to="/about" className={navLinkClass}>About</NavLink>
            <NavLink to="/skills" className={navLinkClass}>Skills</NavLink>
            <NavLink to="/projects" className={navLinkClass}>Projects</NavLink>
            <NavLink to="/experience" className={navLinkClass}>Experience</NavLink>
            <NavLink to="/contact" className={navLinkClass}>Contact</NavLink>
          </nav>
          <div className="hidden md:block"><ThemeToggle /></div>
          <button aria-label="Toggle menu" aria-expanded={mobileOpen} onClick={()=>setMobileOpen(o=>!o)} className="md:hidden inline-flex items-center justify-center h-9 w-9 rounded border border-slate-300 dark:border-white/10 hover:border-cyan-400 dark:hover:border-neon-cyan/40 hover:bg-slate-100 dark:hover:bg-white/5 text-slate-600 dark:text-slate-300">
            <span className="sr-only">Menu</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
              {mobileOpen ? (
                <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
              ) : (
                <path fillRule="evenodd" d="M3.75 5.25a.75.75 0 000 1.5h16.5a.75.75 0 000-1.5H3.75zm0 6a.75.75 0 000 1.5h16.5a.75.75 0 000-1.5H3.75zm0 6a.75.75 0 000 1.5h16.5a.75.75 0 000-1.5H3.75z" clipRule="evenodd" />
              )}
            </svg>
          </button>
        </div>
      </div>
      {/* Mobile panel */}
      {mobileOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#0a0a0f]/95 backdrop-blur-xl">
          <div className="container py-3">
            <div className="flex items-center justify-between mb-2">
              <ThemeToggle />
              <button aria-label="Close menu" onClick={()=>setMobileOpen(false)} className="inline-flex items-center justify-center h-8 w-8 rounded hover:bg-slate-100 dark:hover:bg-white/5 text-slate-600 dark:text-slate-300">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd"/></svg>
              </button>
            </div>
            <nav className="grid gap-1">
              <NavLink to="/" className={navLinkClass} onClick={()=>setMobileOpen(false)}>Home</NavLink>
              <NavLink to="/about" className={navLinkClass} onClick={()=>setMobileOpen(false)}>About</NavLink>
              <NavLink to="/skills" className={navLinkClass} onClick={()=>setMobileOpen(false)}>Skills</NavLink>
              <NavLink to="/projects" className={navLinkClass} onClick={()=>setMobileOpen(false)}>Projects</NavLink>
              <NavLink to="/experience" className={navLinkClass} onClick={()=>setMobileOpen(false)}>Experience</NavLink>
              <NavLink to="/contact" className={navLinkClass} onClick={()=>setMobileOpen(false)}>Contact</NavLink>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}

const PORTFOLIO_VIEWS_KEY = 'portfolio_views'

function Footer() {
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
    ? views >= 1000
      ? `${(views / 1000).toFixed(1)}k`
      : String(views)
    : '—'

  return (
    <footer className="mt-20 relative overflow-hidden">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent dark:via-cyan-400/80" />
      <div className="h-px w-full mt-px bg-gradient-to-r from-transparent via-fuchsia-400/40 to-transparent dark:via-fuchsia-400/50" />
      <div className="container py-12 md:py-16">
        <div className="rounded-2xl glass border border-slate-200/80 dark:border-white/10 p-8 md:p-10 mb-10 transition-all duration-300 hover:border-cyan-400/20 dark:hover:border-cyan-400/30">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                Mayur Gund
              </h3>
              <p className="mt-2 text-sm md:text-base text-slate-600 dark:text-slate-400 max-w-md font-medium">
                Full Stack · Educator · AI Enthusiast
              </p>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-500">
                Building stuff & mentoring devs. Pune, India.
              </p>
            <a href="mailto:mayurgund3333@gmail.com" className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 rounded-xl bg-cyan-500/15 dark:bg-cyan-500/10 border border-cyan-400/40 text-cyan-700 dark:text-neon-cyan font-semibold text-sm hover:shadow-glow-cyan hover:border-cyan-400/60 transition-all">Let’s build something →</a>
          </div>

          <div className="flex flex-col gap-4 md:items-end">
            <nav className="flex flex-wrap gap-2 justify-start md:justify-end" aria-label="Footer navigation">
                <NavLink to="/" className="px-3 py-1.5 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-neon-cyan hover:bg-slate-100 dark:hover:bg-white/5 transition-colors">Home</NavLink>
                <NavLink to="/about" className="px-3 py-1.5 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-neon-cyan hover:bg-slate-100 dark:hover:bg-white/5 transition-colors">About</NavLink>
                <NavLink to="/skills" className="px-3 py-1.5 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-neon-cyan hover:bg-slate-100 dark:hover:bg-white/5 transition-colors">Skills</NavLink>
                <NavLink to="/projects" className="px-3 py-1.5 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-neon-cyan hover:bg-slate-100 dark:hover:bg-white/5 transition-colors">Projects</NavLink>
                <NavLink to="/experience" className="px-3 py-1.5 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-neon-cyan hover:bg-slate-100 dark:hover:bg-white/5 transition-colors">Experience</NavLink>
                <NavLink to="/contact" className="px-3 py-1.5 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-neon-cyan hover:bg-slate-100 dark:hover:bg-white/5 transition-colors">Contact</NavLink>
              </nav>
              <div className="flex flex-wrap gap-2">
                <a className="px-4 py-2 rounded-xl glass border border-slate-200 dark:border-white/10 hover-glow-cyan hover:border-cyan-400/30 text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-neon-cyan font-medium text-sm transition-all" href="https://www.linkedin.com/in/mayurgund99/" target="_blank" rel="noreferrer">LinkedIn</a>
                <a className="px-4 py-2 rounded-xl glass border border-slate-200 dark:border-white/10 hover-glow-cyan hover:border-cyan-400/30 text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-neon-cyan font-medium text-sm transition-all" href="https://github.com/MannyG3" target="_blank" rel="noreferrer">GitHub</a>
                <a className="px-4 py-2 rounded-xl glass border border-slate-200 dark:border-white/10 hover-glow-cyan hover:border-cyan-400/30 text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-neon-cyan font-medium text-sm transition-all" href="mailto:mayurgund3333@gmail.com">Email</a>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="text-slate-500 dark:text-slate-500 order-2 sm:order-1">
            © {new Date().getFullYear()} Mayur Gund
          </div>
          <div className="flex items-center gap-3 order-1 sm:order-2 flex-wrap justify-center sm:justify-end">
            <span className="px-2.5 py-1 rounded-md bg-slate-200/60 dark:bg-white/5 text-slate-600 dark:text-slate-400 font-mono text-[11px]" title="Tech stack">
              React · Tailwind · Vite
            </span>
            <span className="px-2.5 py-1 rounded-md bg-cyan-500/10 dark:bg-cyan-500/10 border border-cyan-400/20 text-cyan-700 dark:text-neon-cyan font-mono text-[11px]" title="Portfolio views">
              👀 {displayViews} views
            </span>
            <a className="text-slate-500 hover:text-cyan-600 dark:hover:text-neon-cyan transition-colors" href="#">Privacy</a>
            <span className="text-slate-400" aria-hidden>·</span>
            <a className="text-slate-500 hover:text-cyan-600 dark:hover:text-neon-cyan transition-colors" href="#">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <div className="min-h-screen text-slate-900 dark:text-slate-100 bg-slate-50 dark:bg-[#0a0a0f]">
      <Helmet>
        <title>Mayur Gund — Full Stack Developer | Educator | AI Enthusiast</title>
        <meta name="description" content="Portfolio of Mayur Gund — Full Stack Developer, Educator, AI Enthusiast" />
        <meta property="og:title" content="Mayur Gund — Portfolio" />
        <meta property="og:description" content="Full Stack Developer | Educator | AI Enthusiast" />
      </Helmet>
      <Backdrop />
      <Navbar />
      <main className="container py-6">
          <Suspense fallback={<div className="py-20 text-center text-slate-400">Loading…</div>}>
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/skills" element={<Skills />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/experience" element={<Experience />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </motion.div>
          </Suspense>
        </main>
      <Footer />
    </div>
  )
}



