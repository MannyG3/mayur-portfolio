import { motion } from 'framer-motion'
import TiltCard from '../components/TiltCard'
import Reveal from '../components/Reveal'
import { SectionHeader } from '../components/Section'

const roles = [
  {
    title: 'Full-Stack Developer & TPO',
    company: 'RIT Polytechnic Pune',
    status: 'present',
    period: '2024 — Present',
    points: [
      'Built and maintained full-stack web apps using React, Node.js, and REST APIs',
      'Led hands-on development sessions in Python, client-side scripting, and data structures',
      'Designed industry-aligned practical projects focused on real-world problem solving',
      'Managed placement drives, aptitude training, and employer engagement as TPO',
      'Administered RedHat lab infrastructure and conducted AI/full-stack workshops',
    ],
  },
  {
    title: 'Technical Trainer & Mentor',
    company: 'Acumen AiTech',
    status: 'past',
    period: '2023 — 2024',
    points: [
      'Hands-on training in UI/UX, Frontend, and JavaScript',
      'Mentored students to build portfolio-ready React apps',
      'Created custom learning paths and project assignments',
      'Simplified complex topics through real-world analogies',
      'Promoted growth mindset and continuous upskilling',
    ],
  },
  {
    title: 'Full Stack Developer Intern',
    company: 'ByteEagle Infotech',
    status: 'past',
    period: '2022 — 2023',
    points: [
      'Built web apps with React, Node.js, Express, MongoDB',
      'Developed and integrated RESTful APIs',
      'Created reusable React components for better UX',
      'Worked in agile team with sprint planning',
      'Focused on scalability and clean code practices',
    ],
  },
]

function StatusBadge({ status }) {
  if (status === 'present') {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 border border-accent/30 bg-accent-muted text-xs font-display italic text-accent">
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-50" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent" />
        </span>
        Present
      </span>
    )
  }
  return (
    <span className="px-3 py-1 border border-surface-300/70 dark:border-surface-700 text-xs font-display italic text-ink-faint dark:text-surface-500">
      Past
    </span>
  )
}

function ExperienceCard({ role, index }) {
  return (
    <TiltCard className="h-full" intensity={3}>
      <article className="accent-card p-7 h-full">
        <div className="flex items-start justify-between gap-3 mb-5">
          <div>
            <span className="font-display text-xs text-accent italic tracking-wide">
              Chapter {String(index + 1).padStart(2, '0')}
            </span>
            <h3 className="mt-1 font-display text-xl font-semibold text-ink dark:text-surface-50">
              {role.title}
            </h3>
            <p className="text-sm text-ink-muted dark:text-surface-400 font-sans italic">{role.company}</p>
          </div>
          <StatusBadge status={role.status} />
        </div>

        <span className="inline-block font-display text-xs text-ink-faint dark:text-surface-500 bg-surface-100 dark:bg-surface-900 border border-surface-300/60 dark:border-surface-800 px-3 py-1 mb-5 tracking-wide">
          {role.period}
        </span>

        <ul className="space-y-3">
          {role.points.map((point, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.08 * i }}
              className="flex items-start gap-3 text-sm text-ink-muted dark:text-surface-400 leading-relaxed font-sans"
            >
              <span className="mt-2.5 text-accent text-[8px]">◆</span>
              {point}
            </motion.li>
          ))}
        </ul>
      </article>
    </TiltCard>
  )
}

export default function Experience() {
  return (
    <section className="py-12 md:py-20">
      <SectionHeader
        label="experience"
        title="Where I've worked."
        subtitle="Roles where I built, taught, and shipped — each one shaped how I approach development and mentorship."
      />

      <div className="relative">
        <div className="hidden md:block absolute left-[19px] top-0 bottom-0 w-px bg-surface-300/70 dark:bg-surface-800" />

        <div className="space-y-10">
          {roles.map((role, index) => (
            <Reveal key={role.title} delay={index * 0.1}>
              <div className="relative md:pl-12">
                <div className="hidden md:block absolute left-3 top-8 h-2.5 w-2.5 bg-accent ring-4 ring-surface-100 dark:ring-surface-950" />
                <ExperienceCard role={role} index={index} />
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-20 surface-card p-8 md:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 corner-brackets"
      >
        <div>
          <p className="font-display text-xl font-semibold text-ink dark:text-surface-50">Shall we collaborate?</p>
          <p className="text-sm text-ink-muted dark:text-surface-400 mt-2 font-sans italic">Presently accepting new engagements.</p>
        </div>
        <a href="mailto:mayurgund3333@gmail.com" className="btn-primary shrink-0">
          Write to me
        </a>
      </motion.div>
    </section>
  )
}
