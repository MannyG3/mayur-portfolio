import { useMemo, useState } from 'react'
import {
  siReact,
  siJavascript,
  siHtml5,
  siCss,
  siTailwindcss,
  siBootstrap,
  siNodedotjs,
  siExpress,
  siFlask,
  siMongodb,
  siMysql,
  siSqlite,
  siPython,
  siGit,
  siGithub,
  siVscodium,
  siPostman,
  siFigma,
} from 'simple-icons/icons'
import TiltCard from '../components/TiltCard'
import Reveal from '../components/Reveal'
import { Section, SectionHeader } from '../components/Section'

const SKILLS = [
  // Frontend
  { name: 'React', group: 'Frontend', level: 85 },
  { name: 'JavaScript (ES6+)', group: 'Frontend', level: 82 },
  { name: 'HTML5', group: 'Frontend', level: 80 },
  { name: 'CSS3', group: 'Frontend', level: 78 },
  { name: 'TailwindCSS', group: 'Frontend', level: 80 },
  { name: 'Bootstrap', group: 'Frontend', level: 65 },

  // Backend
  { name: 'Node.js', group: 'Backend', level: 78 },
  { name: 'Express.js', group: 'Backend', level: 76 },
  { name: 'Flask', group: 'Backend', level: 62 },

  // Database
  { name: 'MongoDB', group: 'Database', level: 72 },
  { name: 'MySQL', group: 'Database', level: 60 },
  { name: 'SQLite', group: 'Database', level: 58 },

  // Languages
  { name: 'Python', group: 'Languages', level: 75 },
  { name: 'JavaScript', group: 'Languages', level: 82 },
  { name: 'Java (basic)', group: 'Languages', level: 45 },

  // Tools
  { name: 'Git', group: 'Tools', level: 78 },
  { name: 'GitHub', group: 'Tools', level: 78 },
  { name: 'VS Code', group: 'Tools', level: 80 },
  { name: 'Postman', group: 'Tools', level: 70 },
  { name: 'Figma', group: 'Tools', level: 62 },
  { name: 'Canva', group: 'Tools', level: 60 },

  // Other
  { name: 'DSA', group: 'Other', level: 72 },
  { name: 'REST API', group: 'Other', level: 76 },
  { name: 'JWT Auth', group: 'Other', level: 66 },
  { name: 'AI/ML basics', group: 'Other', level: 55 },
  { name: 'NLP', group: 'Other', level: 52 },
  { name: 'UI/UX', group: 'Other', level: 65 },
]

const GROUP_ORDER = ['All', 'Frontend', 'Backend', 'Database', 'Languages', 'Tools', 'Other']

const ICONS_BY_SKILL = {
  React: siReact,
  'JavaScript (ES6+)': siJavascript,
  JavaScript: siJavascript,
  HTML5: siHtml5,
  CSS3: siCss,
  TailwindCSS: siTailwindcss,
  Bootstrap: siBootstrap,
  'Node.js': siNodedotjs,
  'Express.js': siExpress,
  Flask: siFlask,
  MongoDB: siMongodb,
  MySQL: siMysql,
  SQLite: siSqlite,
  Python: siPython,
  Git: siGit,
  GitHub: siGithub,
  'VS Code': siVscodium,
  Postman: siPostman,
  Figma: siFigma,
}

function SkillLogo({ name }) {
  const icon = ICONS_BY_SKILL[name]
  if (!icon) {
    return (
      <div className="h-10 w-10 rounded-xl bg-slate-200/60 dark:bg-white/5 border border-slate-200 dark:border-white/10 grid place-items-center">
        <span className="font-mono text-xs text-slate-600 dark:text-slate-400">
          {name.slice(0, 2).toUpperCase()}
        </span>
      </div>
    )
  }

  return (
    <div className="h-10 w-10 rounded-xl bg-slate-200/60 dark:bg-white/5 border border-slate-200 dark:border-white/10 grid place-items-center">
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5 text-slate-700 dark:text-slate-200"
        aria-hidden
      >
        <path d={icon.path} fill="currentColor" />
      </svg>
    </div>
  )
}

function SkillCard({ name, group }) {
  return (
    <TiltCard className="h-full">
      <div className="relative h-full rounded-2xl glass border border-slate-200 dark:border-white/10 p-5 hover-glow-magenta hover:border-fuchsia-400/30 transition-all">
        <div className="flex items-center gap-3">
          <SkillLogo name={name} />
          <div className="min-w-0">
            <div className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {group}
            </div>
            <div className="mt-1 font-semibold text-slate-900 dark:text-slate-100 truncate" title={name}>
              {name}
            </div>
          </div>
        </div>
      </div>
    </TiltCard>
  )
}

export default function Skills() {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('All')

  const groups = useMemo(() => {
    const present = new Set(SKILLS.map(s => s.group))
    return GROUP_ORDER.filter(g => g === 'All' || present.has(g))
  }, [])

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    return SKILLS
      .filter(s => filter === 'All' || s.group === filter)
      .filter(s => !q || s.name.toLowerCase().includes(q))
      .sort((a, b) => a.name.localeCompare(b.name))
  }, [query, filter])

  return (
    <Section>
      <SectionHeader
        eyebrow="Capabilities"
        title="Skills"
        subtitle="A curated snapshot of what I use to ship clean, fast, and reliable builds."
      />

      {/* Controls */}
      <div className="mt-6 flex flex-col md:flex-row md:items-center gap-3 justify-between">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search skills..."
          className="input w-full md:w-80"
        />
        <div className="flex flex-wrap gap-2">
          {groups.map((g) => (
            <button
              key={g}
              onClick={() => setFilter(g)}
              className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${
                filter === g
                  ? 'border-cyan-400/50 bg-cyan-500/10 text-cyan-700 dark:text-neon-cyan'
                  : 'border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/5 text-slate-600 dark:text-slate-300'
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {visible.map((s, i) => (
          <Reveal key={`${s.group}-${s.name}`} delay={i * 0.03}>
            <SkillCard name={s.name} group={s.group} />
          </Reveal>
        ))}
        {visible.length === 0 && (
          <div className="col-span-full text-sm text-slate-500">
            No skills match your filters.
          </div>
        )}
      </div>
    </Section>
  )
}



