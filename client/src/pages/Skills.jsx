import { useMemo, useState } from 'react'
import {
  siReact, siJavascript, siHtml5, siCss, siTailwindcss, siBootstrap,
  siNodedotjs, siExpress, siFlask, siMongodb, siMysql, siSqlite,
  siPython, siGit, siGithub, siVscodium, siPostman, siFigma,
} from 'simple-icons/icons'
import TiltCard from '../components/TiltCard'
import Reveal from '../components/Reveal'
import { Section, SectionHeader } from '../components/Section'

const SKILLS = [
  { name: 'React', group: 'Frontend' },
  { name: 'JavaScript (ES6+)', group: 'Frontend' },
  { name: 'HTML5', group: 'Frontend' },
  { name: 'CSS3', group: 'Frontend' },
  { name: 'TailwindCSS', group: 'Frontend' },
  { name: 'Bootstrap', group: 'Frontend' },
  { name: 'Node.js', group: 'Backend' },
  { name: 'Express.js', group: 'Backend' },
  { name: 'Flask', group: 'Backend' },
  { name: 'MongoDB', group: 'Database' },
  { name: 'MySQL', group: 'Database' },
  { name: 'SQLite', group: 'Database' },
  { name: 'Python', group: 'Languages' },
  { name: 'JavaScript', group: 'Languages' },
  { name: 'Java (basic)', group: 'Languages' },
  { name: 'Git', group: 'Tools' },
  { name: 'GitHub', group: 'Tools' },
  { name: 'VS Code', group: 'Tools' },
  { name: 'Postman', group: 'Tools' },
  { name: 'Figma', group: 'Tools' },
  { name: 'Canva', group: 'Tools' },
  { name: 'DSA', group: 'Other' },
  { name: 'REST API', group: 'Other' },
  { name: 'JWT Auth', group: 'Other' },
  { name: 'AI/ML basics', group: 'Other' },
  { name: 'NLP', group: 'Other' },
  { name: 'UI/UX', group: 'Other' },
]

const GROUP_ORDER = ['All', 'Frontend', 'Backend', 'Database', 'Languages', 'Tools', 'Other']

const ICONS_BY_SKILL = {
  React: siReact, 'JavaScript (ES6+)': siJavascript, JavaScript: siJavascript,
  HTML5: siHtml5, CSS3: siCss, TailwindCSS: siTailwindcss, Bootstrap: siBootstrap,
  'Node.js': siNodedotjs, 'Express.js': siExpress, Flask: siFlask,
  MongoDB: siMongodb, MySQL: siMysql, SQLite: siSqlite, Python: siPython,
  Git: siGit, GitHub: siGithub, 'VS Code': siVscodium, Postman: siPostman, Figma: siFigma,
}

function SkillLogo({ name }) {
  const icon = ICONS_BY_SKILL[name]
  if (!icon) {
    return (
      <div className="h-10 w-10 bg-surface-200/60 dark:bg-surface-800 border border-surface-300/70 dark:border-surface-700 grid place-items-center">
        <span className="font-display text-[10px] font-semibold text-ink-muted dark:text-surface-400">
          {name.slice(0, 2).toUpperCase()}
        </span>
      </div>
    )
  }
  return (
    <div className="h-10 w-10 bg-surface-200/60 dark:bg-surface-800 border border-surface-300/70 dark:border-surface-700 grid place-items-center">
      <svg viewBox="0 0 24 24" className="h-4 w-4 text-ink-muted dark:text-surface-300" aria-hidden>
        <path d={icon.path} fill="currentColor" />
      </svg>
    </div>
  )
}

function SkillCard({ name, group }) {
  return (
    <TiltCard className="h-full" intensity={3}>
      <div className="accent-card p-5 h-full">
        <div className="flex items-center gap-4">
          <SkillLogo name={name} />
          <div className="min-w-0">
            <div className="font-display text-[10px] tracking-widest uppercase text-ink-faint dark:text-surface-500">{group}</div>
            <div className="mt-0.5 font-medium text-sm text-ink dark:text-surface-100 truncate font-sans" title={name}>{name}</div>
          </div>
        </div>
      </div>
    </TiltCard>
  )
}

const filterBtn = (active) =>
  active
    ? 'border-accent/40 bg-accent-muted text-accent'
    : 'border-surface-300/70 dark:border-surface-700 text-ink-muted dark:text-surface-400 hover:border-accent/30'

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
        label="skills"
        title="The instruments of my craft."
        subtitle="Technologies honed through practice — from frontend frameworks to backend APIs and all between."
      />

      <div className="flex flex-col md:flex-row md:items-center gap-5 justify-between mb-10">
        <div className="relative w-full md:w-80">
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
          {groups.map(g => (
            <button
              key={g}
              onClick={() => setFilter(g)}
              className={`px-3 py-1.5 text-xs font-display tracking-widest uppercase border transition-all duration-300 ${filterBtn(filter === g)}`}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {visible.map((s, i) => (
          <Reveal key={`${s.group}-${s.name}`} delay={i * 0.02}>
            <SkillCard name={s.name} group={s.group} />
          </Reveal>
        ))}
        {visible.length === 0 && (
          <div className="col-span-full py-16 text-center font-display italic text-ink-faint dark:text-surface-500">
            No instruments match your query.
          </div>
        )}
      </div>
    </Section>
  )
}
