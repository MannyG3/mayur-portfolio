import { useEffect, useMemo, useState } from 'react'

import { motion } from 'framer-motion'

import axios from 'axios'

import TiltCard from '../components/TiltCard'

import Reveal from '../components/Reveal'

import { SectionHeader } from '../components/Section'



const fallbackProjects = [
  {
    title: 'AttendanceWala',
    desc: 'Comprehensive attendance management and tracking system for educational institutions with real-time reporting, student analytics, and cloud sync.',
    tech: ['TypeScript', 'React', 'Node.js', 'Express', 'TailwindCSS'],
    link: 'https://github.com/MannyG3/AttendanceWala',
    highlights: ['Automated attendance tracking & reports', 'Role-based access control', 'Deployed live on Vercel'],
  },
  {
    title: 'Space Traffic Dashboard',
    desc: 'Real-time satellite monitoring and collision detection system with interactive world map, orbital visualization, and WebSocket updates.',
    tech: ['React', 'TypeScript', 'Node.js', 'Socket.IO', 'TailwindCSS'],
    link: 'https://space-traffic-dashboard.vercel.app',
    highlights: ['Live satellite tracking', 'Collision detection alerts', 'Real-time WebSocket feed'],
  },
  {
    title: 'myfpl.ai',
    desc: 'AI-powered Fantasy Premier League manager assistant providing predictive player point modeling, transfer recommendations, and captaincy analysis.',
    tech: ['TypeScript', 'React', 'Next.js', 'TailwindCSS', 'AI/LLM'],
    link: 'https://github.com/MannyG3/myfpl.ai',
    highlights: ['Predictive player points', 'Optimized transfer algorithm', 'Deployed live on Vercel'],
  },
  {
    title: 'Training & Placement Portal',
    desc: 'Comprehensive T&P cell web application managing student registration, placement drives, aptitude scores, and recruiter scheduling.',
    tech: ['TypeScript', 'React', 'Node.js', 'MongoDB', 'Express'],
    link: 'https://github.com/MannyG3/T-P-Cell',
    highlights: ['Student profile verification', 'Automated drive status tracking', 'Deployed live on Vercel'],
  },
  {
    title: 'Kettle',
    desc: 'Full-stack TypeScript application with PostgreSQL-backed workflow logic, typed data access layer, and production deployment.',
    tech: ['TypeScript', 'PostgreSQL', 'PLpgSQL', 'Node.js', 'Express'],
    link: 'https://github.com/MannyG3/Kettle',
    highlights: ['TypeScript-first architecture', 'PostgreSQL-backed data layer', 'Live on Vercel'],
  },
  {
    title: 'Intellix AI Club Platform',
    desc: 'Official platform for Intellix AI Club featuring event registration, hackathon leaderboards, project showcases, and student resources.',
    tech: ['JavaScript', 'React', 'Node.js', 'TailwindCSS'],
    link: 'https://github.com/MannyG3/IntellixAI-Club',
    highlights: ['Event registration & hackathons', 'Curated AI learning resources', 'Deployed live on Vercel'],
  },
  {
    title: 'Fort Weather',
    desc: 'Real-time trek verdict engine assessing weather safety, rainfall warnings, and trail feasibility for popular Sahyadri forts in Maharashtra.',
    tech: ['TypeScript', 'React', 'OpenWeather API', 'TailwindCSS'],
    link: 'https://github.com/MannyG3/fortweather',
    highlights: ['Sahyadri fort safety index', 'Micro-climate rainfall alerts', 'Open-source GitHub project'],
  },
  {
    title: 'Crop & Fertilizer Recommendation',
    desc: 'Machine learning system recommending optimal crops and fertilizers based on soil N-P-K nutrients, pH, and climate data.',
    tech: ['Python', 'Scikit-learn', 'Pandas', 'NumPy', 'Flask'],
    link: 'https://github.com/MannyG3/Crop-and-fertilizer-recommendation',
    highlights: ['Random Forest classification model', 'Soil analysis pipeline', '100% test accuracy'],
  },
  {
    title: 'Face Mask Detector',
    desc: 'Computer vision system detecting face mask compliance via real-time webcam streams using Haar Cascades and TensorFlow neural networks.',
    tech: ['Python', 'OpenCV', 'TensorFlow', 'NumPy'],
    link: 'https://github.com/MannyG3/Mask-Detector',
    highlights: ['Real-time webcam detection', 'Audio alerts for unmasked state', 'Deep learning classifier'],
  },
]



const filterBtn = (active) =>

  active

    ? 'border-accent/40 bg-accent-muted text-accent'

    : 'border-surface-300/70 dark:border-surface-700 text-ink-muted dark:text-surface-400 hover:border-accent/30'



function ProjectCard({ project }) {

  return (

    <TiltCard className="h-full" intensity={3}>

      <a href={project.link} target="_blank" rel="noreferrer" className="block h-full group">

        <article className="accent-card p-6 md:p-7 h-full flex flex-col">

          <div className="flex items-start justify-between gap-3 mb-7">

            <div>

              <span className="font-mono text-[10px] text-accent tracking-widest uppercase">

                {project.tech?.[0] || 'Work'}

              </span>

              <h3 className="mt-1 font-display text-xl font-semibold text-ink dark:text-surface-50 group-hover:text-accent transition-colors duration-300">

                {project.title}

              </h3>

            </div>

            <span className="text-surface-500 group-hover:text-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 text-lg shrink-0">↗</span>

          </div>



          <p className="text-sm text-ink-muted dark:text-surface-400 leading-relaxed flex-1 line-clamp-3 font-sans">

            {project.desc}

          </p>



          <div className="mt-5 flex flex-wrap gap-1.5">

            {(project.tech || []).map(t => (

              <span key={t} className="tag">{t}</span>

            ))}

          </div>



          {project.highlights?.length > 0 && (

            <ul className="mt-5 pt-5 border-t border-surface-300/50 dark:border-surface-800 space-y-2">

              {project.highlights.map(h => (

                <li key={h} className="text-xs text-ink-faint dark:text-surface-500 flex items-start gap-2 font-sans">

                  <span className="text-accent text-[8px] mt-1">◆</span>

                  {h}

                </li>

              ))}

            </ul>

          )}

        </article>

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

      } catch {

        setError('Showing catalogue from memory')

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

    ;(projects || []).forEach(p => (p.tech || []).forEach(tag => t.add(tag)))

    return ['All', ...Array.from(t)]

  }, [projects])



  const visible = useMemo(() => {

    return (projects || []).filter(p => {

      const matchesQuery = (p.title + ' ' + p.desc).toLowerCase().includes(query.toLowerCase())

      const matchesTag = filter === 'All' || (p.tech || []).includes(filter)

      return matchesQuery && matchesTag

    })

  }, [projects, query, filter])



  return (

    <section className="py-12 md:py-20">

      <SectionHeader

        label="projects"

        title="Selected works."

        subtitle="Production applications, machine learning experiments, and side endeavours — each a lesson in craft."

      />



      <div className="surface-card p-5 mb-10">

        <div className="flex flex-col md:flex-row gap-5">

          <div className="relative flex-1">

            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-faint" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>

              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />

            </svg>

            <input

              value={query}

              onChange={e => setQuery(e.target.value)}

              placeholder="Search the catalogue…"

              className="input-field pl-10"

            />

          </div>

          <div className="flex flex-wrap gap-2">

            {allTags.slice(0, 8).map(t => (

              <button

                key={t}

                onClick={() => setFilter(t)}

                className={`px-3 py-1.5 text-xs font-display tracking-widest uppercase border transition-all duration-300 ${filterBtn(filter === t)}`}

              >

                {t}

              </button>

            ))}

          </div>

        </div>

      </div>



      {loading && (

        <div className="flex flex-col items-center justify-center py-20 gap-4">

          <div className="h-5 w-5 border-2 border-accent border-t-transparent rounded-full animate-spin" />

          <span className="font-display text-sm italic text-ink-faint">Retrieving works…</span>

        </div>

      )}



      {error && (

        <div className="mb-8 px-5 py-3 border border-accent/30 bg-accent-muted text-accent text-xs font-display italic">

          {error}

        </div>

      )}



      <div className="grid md:grid-cols-2 gap-6">

        {visible.map((p, i) => (

          <Reveal key={p.title} delay={i * 0.05}>

            <ProjectCard project={p} />

          </Reveal>

        ))}

      </div>



      {!loading && visible.length === 0 && (

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">

          <p className="font-display italic text-ink-faint">No works match your query.</p>

          <button

            onClick={() => { setQuery(''); setFilter('All') }}

            className="mt-4 text-sm text-accent hover:underline font-display tracking-wide"

          >

            Clear filters

          </button>

        </motion.div>

      )}

    </section>

  )

}

