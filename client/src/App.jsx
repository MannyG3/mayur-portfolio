import { Suspense } from 'react'
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
import SearchDock from './components/SearchDock'
import ReferencePlaceholder from './pages/ReferencePlaceholder'

export default function App() {
  return (
    <div className="min-h-screen bg-surface-100 dark:bg-surface-950 text-ink dark:text-surface-100">
      <Helmet>
        <title>Mayur Gund — Full Stack Developer</title>
        <meta name="description" content="Portfolio of Mayur Gund — Full Stack Developer, Educator, AI Enthusiast based in Pune, India." />
        <meta property="og:title" content="Mayur Gund — Portfolio" />
        <meta property="og:description" content="Full Stack Developer · Educator · AI Enthusiast" />
      </Helmet>
      <Backdrop />
      <SearchDock />
      <main className="container max-w-[820px] pt-8 pb-6">
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
              <Route path="/blogs" element={<ReferencePlaceholder title="Blogs" description="Technical writing and notes." />} />
              <Route path="/reading" element={<ReferencePlaceholder title="Reading" description="Resources and reading list." />} />
              <Route path="/renders" element={<ReferencePlaceholder title="Renders" description="Interactive experiments and visual studies." />} />
              <Route path="/renders/tunnel" element={<ReferencePlaceholder title="Tunnel" description="Interactive render placeholder." />} />
              <Route path="/renders/maze" element={<ReferencePlaceholder title="Maze" description="Interactive render placeholder." />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </motion.div>
        </Suspense>
      </main>
    </div>
  )
}
