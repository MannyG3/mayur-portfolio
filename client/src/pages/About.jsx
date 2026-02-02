import { motion } from 'framer-motion'
import TiltCard from '../components/TiltCard'
import Reveal from '../components/Reveal'

const QUICK_FACTS = [
  { icon: '💻', label: 'Code Editor', value: 'VS Code' },
  { icon: '☕', label: 'Fuel', value: 'Coffee + Lo-fi' },
  { icon: '🎮', label: 'Off-hours', value: 'Anime + Gaming' },
  { icon: '📍', label: 'Based in', value: 'Pune, India' },
]

const FOCUS_AREAS = [
  { name: 'Full Stack Development', icon: '🚀', desc: 'MERN, REST APIs, scalable apps' },
  { name: 'AI Integrations', icon: '🤖', desc: 'LLMs, automation, smart tools' },
  { name: 'Mentorship', icon: '🎓', desc: 'Teaching, workshops, guidance' },
  { name: 'UI/UX Design', icon: '✨', desc: 'Clean interfaces, great UX' },
]

const STATS = [
  { value: '2+', label: 'Years Coding' },
  { value: '50+', label: 'Students Mentored' },
  { value: '15+', label: 'Projects Built' },
  { value: '∞', label: 'Cups of Coffee' },
]

export default function About() {
  return (
    <section className="py-12 md:py-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <div className="inline-block px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider bg-cyan-500/10 text-cyan-600 dark:text-neon-cyan border border-cyan-400/30 mb-4">
          Get to know me
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-3">
          About Me
        </h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl">
          A brief on my journey, interests, and what drives me to build cool stuff.
        </p>
      </motion.div>

      {/* Main Bio Card */}
      <Reveal>
        <TiltCard className="mb-10">
          <div className="glass rounded-2xl p-6 md:p-8 border border-slate-200/80 dark:border-white/10 hover-glow-cyan transition-all">
            <div className="flex flex-col md:flex-row gap-6 md:gap-8">
              {/* Left: Bio text */}
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-neon-cyan" />
                  The TL;DR
                </h2>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  Passionate Computer Engineer and Full Stack Developer skilled in MERN Stack, Data Structures and Algorithms, and Python. Experienced in teaching programming and guiding students as a lecturer and mentor.
                </p>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  Adept at building scalable web applications, integrating AI tools, and delivering hands-on learning experiences. Currently open to full-time roles and exciting collaboration opportunities.
                </p>
              </div>
              
              {/* Right: Quick Facts */}
              <div className="md:w-64 shrink-0">
                <h3 className="text-sm font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">Quick Facts</h3>
                <div className="grid grid-cols-2 md:grid-cols-1 gap-2">
                  {QUICK_FACTS.map((fact) => (
                    <div
                      key={fact.label}
                      className="flex items-center gap-3 p-2.5 rounded-lg bg-slate-100/50 dark:bg-white/5 border border-slate-200/50 dark:border-white/5"
                    >
                      <span className="text-lg">{fact.icon}</span>
                      <div className="min-w-0">
                        <div className="text-[10px] uppercase tracking-wide text-slate-500 dark:text-slate-500">{fact.label}</div>
                        <div className="text-sm font-medium text-slate-800 dark:text-slate-200 truncate">{fact.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </TiltCard>
      </Reveal>

      {/* Stats Row */}
      <Reveal delay={0.1}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="glass rounded-xl p-5 text-center border border-slate-200/80 dark:border-white/10 hover:border-fuchsia-400/30 dark:hover:border-fuchsia-400/30 transition-all group"
            >
              <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-500 to-fuchsia-500 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 mt-1">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </Reveal>

      {/* Focus Areas */}
      <Reveal delay={0.2}>
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-5 flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-fuchsia-500" />
          What I Focus On
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {FOCUS_AREAS.map((area, i) => (
            <TiltCard key={area.name}>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="glass rounded-xl p-5 border border-slate-200/80 dark:border-white/10 hover-glow-magenta hover:border-fuchsia-400/30 transition-all h-full"
              >
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-fuchsia-500/20 to-cyan-500/20 flex items-center justify-center text-xl shrink-0">
                    {area.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white">{area.name}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{area.desc}</p>
                  </div>
                </div>
              </motion.div>
            </TiltCard>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
