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

function ThemeToggle() {
  const [theme, setTheme] = useState('light')
  const [flip, setFlip] = useState(false)
  // initialize from storage or system
  useEffect(() => {
    const stored = localStorage.getItem('theme')
    if (stored === 'light' || stored === 'dark') {
      setTheme(stored)
      return
    }
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    setTheme(prefersDark ? 'dark' : 'light')
  }, [])
  useEffect(() => {
    const root = document.documentElement
    const isDark = theme === 'dark'
    root.classList.toggle('dark', isDark)
    root.classList.add('theme-transition')
    window.setTimeout(() => root.classList.remove('theme-transition'), 350)
    localStorage.setItem('theme', theme)
  }, [theme])

  function toggleTheme() {
    setFlip(f => !f)
    setTheme(t => (t === 'light' ? 'dark' : 'light'))
  }

  return (
    <button onClick={toggleTheme} aria-label="Toggle theme" className="relative h-9 w-9 [perspective:800px] group">
      <span className="sr-only">Toggle theme</span>
      <div className={`absolute inset-0 rounded-md border border-slate-300 dark:border-white/10 grid place-items-center bg-white dark:bg-white/5 transition-colors [transform-style:preserve-3d] duration-300 ${flip ? '[transform:rotateY(180deg)]' : ''}`}>
        {/* front: current icon */}
        <div className="[backface-visibility:hidden]">
          {theme === 'light' ? '☀️' : '🌙'}
        </div>
        {/* back: next icon */}
        <div className="absolute inset-0 rotate-y-180 grid place-items-center [backface-visibility:hidden]">
          {theme === 'light' ? '🌙' : '☀️'}
        </div>
      </div>
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
  const navLinkClass = ({ isActive }) => `px-3 py-2 rounded-md text-sm font-medium hover:text-brand-400 ${isActive ? 'text-brand-400' : ''}`
  return (
    <header className={`sticky top-0 z-50 bg-white/70 dark:bg-slate-950/60 backdrop-blur border-b border-slate-200 dark:border-white/10 transition-[height,background,transform] ${scrolled ? 'shadow-sm' : ''}`}>
      <div className={`container flex items-center justify-between ${scrolled ? 'h-12' : 'h-16'} transition-[height]`}>
        <NavLink to="/" className="font-semibold">Mayur Gund</NavLink>
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
          <button aria-label="Toggle menu" aria-expanded={mobileOpen} onClick={()=>setMobileOpen(o=>!o)} className="md:hidden inline-flex items-center justify-center h-9 w-9 rounded border border-slate-300 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/5">
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
        <div className="md:hidden border-t border-slate-200 dark:border-white/10 bg-white/90 dark:bg-slate-950/80 backdrop-blur">
          <div className="container py-3">
            <div className="flex items-center justify-between mb-2">
              <ThemeToggle />
              <button aria-label="Close menu" onClick={()=>setMobileOpen(false)} className="inline-flex items-center justify-center h-8 w-8 rounded hover:bg-slate-100 dark:hover:bg-white/5">
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

function Footer() {
  return (
    <footer className="mt-16">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="container py-12">
        <div className="grid gap-10 md:grid-cols-4 items-center md:items-start text-center md:text-left">
          <div className="md:col-span-2">
            <div className="text-lg font-semibold">Mayur Gund</div>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 max-w-md">
              Computer Engineer · Full Stack Developer · Educator · AI Enthusiast. I build scalable web apps and mentor developers.
            </p>
            <a href="mailto:mayurgund3333@gmail.com" className="inline-block mt-5 px-4 py-2 rounded bg-brand-400 text-white hover:bg-brand-500">Let’s Collaborate</a>
          </div>

          <div>
            <div className="text-sm font-semibold tracking-wide text-slate-500 dark:text-slate-400">Navigation</div>
            <nav className="mt-3 grid gap-2 text-sm justify-center md:justify-start">
              <NavLink to="/" className="hover:text-brand-400">Home</NavLink>
              <NavLink to="/about" className="hover:text-brand-400">About</NavLink>
              <NavLink to="/skills" className="hover:text-brand-400">Skills</NavLink>
              <NavLink to="/projects" className="hover:text-brand-400">Projects</NavLink>
              <NavLink to="/experience" className="hover:text-brand-400">Experience</NavLink>
              <NavLink to="/contact" className="hover:text-brand-400">Contact</NavLink>
            </nav>
          </div>

          <div>
            <div className="text-sm font-semibold tracking-wide text-slate-500 dark:text-slate-400">Connect</div>
            <div className="mt-3 flex flex-wrap gap-2 justify-center md:justify-start">
              <a className="px-3 py-2 rounded bg-white/5 border border-white/10 hover:border-brand-400/50 hover:text-brand-400" href="https://www.linkedin.com/in/mayurgund99/" target="_blank" rel="noreferrer">LinkedIn ↗</a>
              <a className="px-3 py-2 rounded bg-white/5 border border-white/10 hover:border-brand-400/50 hover:text-brand-400" href="https://github.com/MannyG3" target="_blank" rel="noreferrer">GitHub ↗</a>
              <a className="px-3 py-2 rounded bg-white/5 border border-white/10 hover:border-brand-400/50 hover:text-brand-400" href="mailto:mayurgund3333@gmail.com">Email ↗</a>
            </div>
            <div className="mt-4 text-sm text-slate-600 dark:text-slate-300">
              <div>📍 Pune, India</div>
              <div className="mt-1">📮 mayurgund3333@gmail.com</div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500 text-center md:text-left">
          <div>© {new Date().getFullYear()} Mayur Gund. All rights reserved.</div>
          <div className="flex gap-3">
            <span className="opacity-70">Built with React + Tailwind</span>
            <span aria-hidden>•</span>
            <a className="hover:text-brand-400" href="#">Privacy</a>
            <a className="hover:text-brand-400" href="#">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <div>
      <Helmet>
        <title>Mayur Gund — Full Stack Developer | Educator | AI Enthusiast</title>
        <meta name="description" content="Portfolio of Mayur Gund — Full Stack Developer, Educator, AI Enthusiast" />
        <meta property="og:title" content="Mayur Gund — Portfolio" />
        <meta property="og:description" content="Full Stack Developer | Educator | AI Enthusiast" />
      </Helmet>
      <Backdrop />
      <Navbar />
      <main className="container">
        <Suspense fallback={<div className="py-20 text-center">Loading…</div>}>
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



