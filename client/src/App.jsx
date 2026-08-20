import { Suspense, useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
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
import Navbar from './components/Navbar'
import Footer from './components/Footer'

function getInitialTheme() {
  if (typeof document === 'undefined') return 'dark'
  const stored = localStorage.getItem('theme')
  if (stored === 'light' || stored === 'dark') return stored
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

export default function App() {
  const [theme, setTheme] = useState(() => getInitialTheme())
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    if (!mounted) return
    const root = document.documentElement
    const isDark = theme === 'dark'
    root.classList.toggle('dark', isDark)
    root.classList.add('theme-transition')
    const t = setTimeout(() => root.classList.remove('theme-transition'), 300)
    localStorage.setItem('theme', theme)
    return () => clearTimeout(t)
  }, [theme, mounted])

  function toggleTheme() {
    setTheme(t => (t === 'light' ? 'dark' : 'light'))
  }

  return (
    <div className="min-h-screen bg-surface-100 dark:bg-surface-950 text-ink dark:text-surface-100">
      <Helmet>
        <title>Mayur Gund — Full Stack Developer</title>
        <meta name="description" content="Portfolio of Mayur Gund — Full Stack Developer, Educator, AI Enthusiast based in Pune, India." />
        <meta property="og:title" content="Mayur Gund — Portfolio" />
        <meta property="og:description" content="Full Stack Developer · Educator · AI Enthusiast" />
      </Helmet>
      <Backdrop />
      <Navbar theme={theme} onToggleTheme={toggleTheme} />
      <main className="container pt-20 pb-6">
        <Suspense fallback={
          <div className="py-32 flex flex-col items-center gap-3">
            <div className="h-5 w-5 border-2 border-accent border-t-transparent rounded-full animate-spin" />
            <span className="font-display text-xs italic text-ink-faint">Loading…</span>
          </div>
        }>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
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
