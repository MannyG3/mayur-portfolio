import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'
import TiltCard from '../components/TiltCard'
import Reveal from '../components/Reveal'

const fallbackProjects = [
  { 
    title: 'Space Traffic Dashboard', 
    desc: 'Real-time satellite monitoring and collision detection system with interactive world map and WebSocket updates.', 
    tech: ['React', 'TypeScript', 'Node.js', 'Socket.IO', 'Tailwind'], 
    link: 'https://space-traffic-dashboard.vercel.app', 
    emoji: '🛰️',
    highlights: ['Live satellite tracking', 'Collision detection alerts', 'Glass morphism UI']
  },
  { 
    title: 'Crop & Fertilizer Recommendation', 
    desc: 'ML-powered system that recommends optimal crops and fertilizers based on soil nutrients, pH, moisture, and climate data.', 
    tech: ['Python', 'Scikit-learn', 'Pandas', 'NumPy', 'Streamlit'], 
    link: 'https://github.com/MannyG3/Crop-and-fertilizer-recommendation', 
    emoji: '🌾',
    highlights: ['Random Forest model', '100% accuracy on test set', 'Soil analysis']
  },
  { 
    title: 'Pokémon Search App', 
    desc: 'Search Pokémon by name or ID using the PokéAPI. Displays stats, types, and sprites with a clean interface.', 
    tech: ['HTML', 'CSS', 'JavaScript'], 
    link: 'https://pokemonsearchapp-sandy.vercel.app', 
    emoji: '⚡'
  },
  { 
    title: 'Be My Valentine', 
    desc: 'A fun Valentine-themed web app with interactive UI. Deployed on Vercel.', 
    tech: ['HTML', 'CSS', 'JavaScript'], 
    link: 'https://beemyvalentine.vercel.app', 
    emoji: '💝'
  },
  { 
    title: 'Face Mask Detector', 
    desc: 'Real-time face mask detection using webcam feed with Haar Cascade classifier and TensorFlow model. Alerts when no mask detected.', 
    tech: ['Python', 'OpenCV', 'TensorFlow', 'NumPy'], 
    link: 'https://github.com/MannyG3/Mask-Detector', 
    emoji: '😷',
    highlights: ['Real-time webcam detection', 'Audio alerts', 'Pre-trained model']
  },
]

function SearchIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  )
}

function ArrowIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
    </svg>
  )
}

function ProjectCard({ project, index }) {
  return (
    <TiltCard className="h-full">
      <a
        href={project.link}
        target="_blank"
        rel="noreferrer"
        className="block h-full"
      >
        <div className="relative h-full glass rounded-2xl border border-slate-200/80 dark:border-white/10 p-6 hover-glow-cyan hover:border-cyan-400/40 transition-all group overflow-hidden">
          {/* Gradient accent */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-cyan-500/10 via-transparent to-transparent rounded-bl-full" />
          
          {/* Header */}
          <div className="flex items-start justify-between gap-3 mb-4 relative">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-fuchsia-500/20 flex items-center justify-center text-xl">
                {project.emoji || '🚀'}
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-neon-cyan transition-colors">
                  {project.title}
                </h3>
              </div>
            </div>
            <div className="h-8 w-8 rounded-lg bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-400 group-hover:text-cyan-500 dark:group-hover:text-neon-cyan group-hover:bg-cyan-500/10 transition-all">
              <ArrowIcon />
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">
            {project.desc}
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-1.5">
            {(project.tech || []).map((t) => (
              <span
                key={t}
                className="px-2 py-1 text-xs font-medium rounded-md bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 border border-slate-200/50 dark:border-white/5"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Highlights */}
          {project.highlights?.length > 0 && (
            <ul className="mt-4 space-y-1">
              {project.highlights.map((h) => (
                <li key={h} className="text-xs text-slate-500 dark:text-slate-500 flex items-start gap-2">
                  <span className="text-cyan-500 mt-0.5">•</span>
                  {h}
                </li>
              ))}
            </ul>
          )}
        </div>
      </a>
    </TiltCard>
  )
}

export default function Projects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('All')

  useEffect(() => {
    let mounted = true
    async function load() {
      try {
        const baseUrl = import.meta.env.VITE_API_URL || ''
        const { data } = await axios.get(`${baseUrl}/api/projects`, { timeout: 5000 })
        if (mounted) setProjects(Array.isArray(data) ? data : fallbackProjects)
      } catch (e) {
        setError('Showing offline projects')
        if (mounted) setProjects(fallbackProjects)
      } finally {
        if (mounted) setLoading(false)
      }
    }
    load()
    return () => { mounted = false }
  }, [])

  const allTags = useMemo(() => {
    const t = new Set()
    ;(projects || []).forEach((p) => (p.tech || []).forEach((tag) => t.add(tag)))
    return ['All', ...Array.from(t)]
  }, [projects])

  const visible = useMemo(() => {
    return (projects || []).filter((p) => {
      const matchesQuery = (p.title + ' ' + p.desc).toLowerCase().includes(query.toLowerCase())
      const matchesTag = filter === 'All' || (p.tech || []).includes(filter)
      return matchesQuery && matchesTag
    })
  }, [projects, query, filter])

  return (
    <section className="py-12 md:py-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="inline-block px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider bg-cyan-500/10 text-cyan-600 dark:text-neon-cyan border border-cyan-400/30 mb-4">
          Selected Work
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-3">
          Projects
        </h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl">
          A mix of production, learning, and experimental builds. Each one taught me something new.
        </p>
      </motion.div>

      {/* Search and Filter */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <div className="glass rounded-xl p-4 border border-slate-200/80 dark:border-white/10">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-3 flex items-center text-slate-400">
                <SearchIcon />
              </div>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search projects..."
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-slate-100/50 dark:bg-white/5 border border-slate-200/50 dark:border-white/5 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/30 transition-all"
              />
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {allTags.slice(0, 8).map((t) => (
                <button
                  key={t}
                  onClick={() => setFilter(t)}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-all ${
                    filter === t
                      ? 'bg-cyan-500/20 text-cyan-600 dark:text-neon-cyan border border-cyan-400/40'
                      : 'bg-slate-100/50 dark:bg-white/5 text-slate-600 dark:text-slate-400 border border-slate-200/50 dark:border-white/5 hover:border-cyan-400/30'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="h-8 w-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Error Notice */}
      {error && (
        <div className="mb-6 px-4 py-2 rounded-lg bg-amber-500/10 border border-amber-400/30 text-amber-600 dark:text-amber-400 text-sm">
          {error}
        </div>
      )}

      {/* Projects Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {visible.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.05}>
            <ProjectCard project={p} index={i} />
          </Reveal>
        ))}
      </div>

      {/* Empty State */}
      {!loading && visible.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="text-4xl mb-3">🔍</div>
          <p className="text-slate-500 dark:text-slate-400">No projects match your filters.</p>
          <button
            onClick={() => { setQuery(''); setFilter('All') }}
            className="mt-3 text-sm text-cyan-600 dark:text-neon-cyan hover:underline"
          >
            Clear filters
          </button>
        </motion.div>
      )}
    </section>
  )
}
