import { motion } from 'framer-motion'
import TiltCard from '../components/TiltCard'
import Reveal from '../components/Reveal'

const roles = [
  {
    title: 'Full-Stack Developer & TPO',
    company: 'RIT Polytechnic Pune',
    status: 'present',
    period: '2024 - Present',
    icon: '💻',
    color: 'cyan',
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
    period: '2023 - 2024',
    icon: '💡',
    color: 'fuchsia',
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
    period: '2022 - 2023',
    icon: '🚀',
    color: 'emerald',
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
      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/30">
        <div className="relative">
          <div className="h-2 w-2 rounded-full bg-emerald-500" />
          <div className="absolute inset-0 h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
        </div>
        <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">Current</span>
      </div>
    )
  }
  return (
    <div className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200/50 dark:border-white/5">
      <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Past</span>
    </div>
  )
}

function ExperienceCard({ role, index }) {
  const glowClass = {
    cyan: 'hover-glow-cyan hover:border-cyan-400/40',
    fuchsia: 'hover-glow-magenta hover:border-fuchsia-400/40',
    emerald: 'hover:shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:border-emerald-400/40',
  }[role.color]

  const gradientClass = {
    cyan: 'from-cyan-500/20 to-fuchsia-500/20',
    fuchsia: 'from-fuchsia-500/20 to-cyan-500/20',
    emerald: 'from-emerald-500/20 to-cyan-500/20',
  }[role.color]

  return (
    <TiltCard className="h-full">
      <div className={`relative h-full glass rounded-2xl border border-slate-200/80 dark:border-white/10 p-6 ${glowClass} transition-all overflow-hidden`}>
        {/* Gradient accent */}
        <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl ${gradientClass} via-transparent to-transparent rounded-bl-full opacity-50`} />

        {/* Header */}
        <div className="relative flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${gradientClass} flex items-center justify-center text-2xl`}>
              {role.icon}
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white">
                {role.title}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {role.company}
              </p>
            </div>
          </div>
          <StatusBadge status={role.status} />
        </div>

        {/* Period */}
        <div className="mb-4">
          <span className="text-xs font-mono text-slate-500 dark:text-slate-500 bg-slate-100 dark:bg-white/5 px-2 py-1 rounded">
            {role.period}
          </span>
        </div>

        {/* Points */}
        <ul className="space-y-2">
          {role.points.map((point, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * i }}
              className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400"
            >
              <span className={`mt-1.5 h-1.5 w-1.5 rounded-full shrink-0 ${
                role.color === 'cyan' ? 'bg-cyan-500' :
                role.color === 'fuchsia' ? 'bg-fuchsia-500' : 'bg-emerald-500'
              }`} />
              {point}
            </motion.li>
          ))}
        </ul>
      </div>
    </TiltCard>
  )
}

export default function Experience() {
  return (
    <section className="py-12 md:py-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <div className="inline-block px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider bg-cyan-500/10 text-cyan-600 dark:text-neon-cyan border border-cyan-400/30 mb-4">
          Career Journey
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-3">
          Experience
        </h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl">
          Roles where I built, taught, and shipped. Each position shaped my approach to development and mentorship.
        </p>
      </motion.div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical Line (desktop) */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/50 via-fuchsia-500/50 to-emerald-500/50" />

        {/* Experience Cards */}
        <div className="space-y-8">
          {roles.map((role, index) => (
            <Reveal key={role.title} delay={index * 0.1}>
              <div className={`md:grid md:grid-cols-2 md:gap-8 ${index % 2 === 1 ? 'md:[&>*:first-child]:order-2' : ''}`}>
                {/* Card */}
                <div className={index % 2 === 1 ? 'md:pl-8' : 'md:pr-8'}>
                  <ExperienceCard role={role} index={index} />
                </div>

                {/* Timeline Node (desktop) */}
                <div className="hidden md:flex items-center justify-center">
                  <div className="relative">
                    <div className={`h-4 w-4 rounded-full ${
                      role.color === 'cyan' ? 'bg-cyan-500 shadow-glow-cyan' :
                      role.color === 'fuchsia' ? 'bg-fuchsia-500 shadow-glow-magenta' :
                      'bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.4)]'
                    }`} />
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-16 text-center"
      >
        <div className="inline-flex flex-col sm:flex-row items-center gap-4 glass rounded-2xl p-6 border border-slate-200/80 dark:border-white/10">
          <div className="text-left">
            <div className="font-semibold text-slate-900 dark:text-white">
              Want to work together?
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-400">
              I'm always open to new opportunities
            </div>
          </div>
          <a
            href="mailto:mayurgund3333@gmail.com"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white font-semibold hover:shadow-glow-cyan transition-all whitespace-nowrap"
          >
            Get in Touch
          </a>
        </div>
      </motion.div>
    </section>
  )
}
