import { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import TiltCard from '../components/TiltCard'
import Reveal from '../components/Reveal'
import { Section, SectionHeader } from '../components/Section'

const fallbackProjects = [
  { title: 'Face Mask Detection', desc: 'OpenCV + Python real-time detection using Haar cascades.', tech: ['Python', 'OpenCV', 'NumPy'], link: '#' },
  { title: 'To-Do List App', desc: 'MERN CRUD app with responsive UI and persistence.', tech: ['React', 'Node', 'Express', 'MongoDB'], link: '#' },
  { title: 'Student Feedback Analyzer', desc: 'Flask + NLP sentiment analysis with visualizations.', tech: ['Flask', 'Python', 'NLTK', 'Matplotlib'], link: '#' },
  { title: 'Link-in-Bio Web App', desc: 'Full stack alternative to Linktree with analytics.', tech: ['React', 'Node', 'MongoDB', 'Express'], link: '#' },
]

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
        setError('Loading live projects failed. Showing offline list.')
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
    <Section>
      <SectionHeader eyebrow="Selected Work" title="Projects" subtitle="A mix of production, learning, and experimental builds." />
      {loading && <div className="mt-8">Loading…</div>}
      {error && <div className="mt-4 text-amber-500 text-sm">{error}</div>}

      <div className="mt-6 flex flex-wrap gap-3 items-center">
        <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search projects…" className="input w-64" />
        <div className="flex flex-wrap gap-2">
          {allTags.map(t => (
            <button key={t} onClick={()=>setFilter(t)} className={`px-2 py-1 text-sm rounded border ${filter===t? 'border-brand-400 text-brand-400 bg-brand-400/10':'border-white/10 hover:bg-white/5'}`}>{t}</button>
          ))}
        </div>
      </div>

      <div className="mt-8 grid md:grid-cols-2 gap-6">
        {visible.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.05}>
            <TiltCard className="[transform-style:preserve-3d]">
              <a href={p.link} className="card p-6 rounded-xl block hover:border-brand-400/40" target="_blank" rel="noreferrer">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-lg">{p.title}</h3>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{p.desc}</p>
                  </div>
                  <span>↗</span>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {(p.tech || []).map(t => (
                    <span key={t} className="chip">{t}</span>
                  ))}
                </div>
                {(p.highlights?.length) ? (
                  <ul className="mt-4 list-disc pl-6 text-sm text-slate-600 dark:text-slate-300 space-y-1">
                    {p.highlights.map(h => <li key={h}>{h}</li>)}
                  </ul>
                ) : null}
              </a>
            </TiltCard>
          </Reveal>
        ))}
        {!loading && visible.length === 0 && (
          <div className="col-span-full text-sm text-slate-500">No projects match your filters.</div>
        )}
      </div>
    </Section>
  )
}


