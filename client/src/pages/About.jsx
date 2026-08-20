import { motion } from 'framer-motion'
import TiltCard from '../components/TiltCard'
import Reveal from '../components/Reveal'
import { SectionHeader } from '../components/Section'

const QUICK_FACTS = [
  { label: 'Editor', value: 'VS Code', icon: '⌨' },
  { label: 'Fuel', value: 'Coffee & Lo-fi', icon: '☕' },
  { label: 'Off-hours', value: 'Anime & Gaming', icon: '🎮' },
  { label: 'Location', value: 'Pune, India', icon: '📍' },
]

const FOCUS_AREAS = [
  { name: 'Full Stack Development', desc: 'MERN, REST APIs, scalable architecture' },
  { name: 'AI Integrations', desc: 'LLMs, automation, intelligent tooling' },
  { name: 'Mentorship', desc: 'Teaching, workshops, career guidance' },
  { name: 'UI/UX Design', desc: 'Refined interfaces, thoughtful interactions' },
]

const STATS = [
  { value: '2+', label: 'Years of craft' },
  { value: '50+', label: 'Students guided' },
  { value: '15+', label: 'Works delivered' },
  { value: '∞', label: 'Cups of coffee' },
]

export default function About() {
  return (
    <section className="py-12 md:py-20">
      <SectionHeader
        label="about"
        title="Building things & teaching others how."
        subtitle="Computer engineer, full stack developer, and lecturer — I write code by day and mentor the next generation of devs."
      />

      <Reveal>
        <TiltCard className="mb-12" intensity={3}>
          <div className="surface-card-hover p-7 md:p-10 corner-brackets">
            <div className="flex flex-col md:flex-row gap-10">
              <div className="flex-1">
                <h2 className="font-display text-xl font-semibold text-ink dark:text-surface-50 mb-5 flex items-center gap-3">
                  <span className="text-accent font-display italic text-base">I.</span>
                  The short version
                </h2>
                <div className="space-y-5 text-ink-muted dark:text-surface-400 leading-relaxed font-sans">
                  <p className="first-letter:text-4xl first-letter:font-display first-letter:text-accent first-letter:mr-1 first-letter:float-left first-letter:leading-none">
                    Passionate Computer Engineer and Full Stack Developer skilled in MERN Stack,
                    Data Structures and Algorithms, and Python. Experienced in teaching programming
                    and guiding students as a lecturer and mentor.
                  </p>
                  <p className="italic">
                    I build scalable web applications, integrate AI tools, and deliver hands-on
                    learning experiences. Currently open to full-time roles and collaboration.
                  </p>
                </div>
              </div>

              <div className="md:w-60 shrink-0">
                <h3 className="font-display text-xs tracking-widest uppercase text-ink-faint dark:text-surface-500 mb-4">
                  Particulars
                </h3>
                <div className="space-y-2.5">
                  {QUICK_FACTS.map(fact => (
                    <div
                      key={fact.label}
                      className="flex items-center gap-3 p-3 bg-surface-100/80 dark:bg-surface-900/60 border border-surface-300/60 dark:border-surface-800/80"
                    >
                      <span className="text-base opacity-80">{fact.icon}</span>
                      <div>
                        <div className="text-[10px] uppercase tracking-widest text-ink-faint dark:text-surface-500 font-display">{fact.label}</div>
                        <div className="text-sm font-medium text-ink dark:text-surface-200 font-sans">{fact.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </TiltCard>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.08 }}
              className="surface-card p-6 text-center"
            >
              <div className="stat-value">{stat.value}</div>
              <div className="mt-2 text-xs font-display tracking-widest uppercase text-ink-faint dark:text-surface-500">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.2}>
        <h2 className="font-display text-xl font-semibold text-ink dark:text-surface-50 mb-6 flex items-center gap-3">
          <span className="text-accent font-display italic text-base">II.</span>
          Domains of focus
        </h2>
        <div className="grid md:grid-cols-2 gap-5">
          {FOCUS_AREAS.map((area, i) => (
            <TiltCard key={area.name} intensity={3}>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 + i * 0.08 }}
                className="accent-card p-6 h-full"
              >
                <h3 className="font-display text-lg font-semibold text-ink dark:text-surface-50">{area.name}</h3>
                <p className="mt-2 text-sm text-ink-muted dark:text-surface-400 font-sans italic">{area.desc}</p>
              </motion.div>
            </TiltCard>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
