import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import TerminalHero from '../components/TerminalHero'
import BugFeatureToggle from '../components/BugFeatureToggle'
import AvailabilityBar from '../components/JobUrgencyMeter'
import { Badge, StatusDot } from '../components/Section'

const QUICK_LINKS = [
  { to: '/projects', label: 'Projects', desc: 'Selected works' },
  { to: '/experience', label: 'Experience', desc: 'Three chapters' },
  { to: '/skills', label: 'Skills', desc: 'The craft' },
]

const TECH_STACK = ['React', 'Node.js', 'TypeScript', 'MongoDB', 'Python', 'Tailwind']

export default function Home() {
  const [avatarSrc, setAvatarSrc] = useState('/profile.png')

  return (
    <>
      <section className="pt-10 md:pt-20 pb-14 md:pb-24">
        <div className="ornament mb-10 md:mb-14 max-w-md" aria-hidden>
          <span className="font-display text-xs tracking-[0.3em] uppercase text-ink-faint dark:text-surface-500">Portfolio</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-7 order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              <StatusDot label="Accepting new work" />

              <h1 className="mt-8 font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tight text-ink dark:text-surface-50 leading-[1.0]">
                Mayur
                <br />
                <span className="text-gradient">Gund</span>
              </h1>

              <p className="mt-6 text-lg md:text-xl text-ink-muted dark:text-surface-400 max-w-lg leading-relaxed font-sans italic">
                A full stack developer who crafts scalable web applications,
                guides aspiring engineers, and ships with quiet precision.
              </p>

              <div className="mt-6 flex flex-wrap gap-2.5">
                <Badge>Full Stack</Badge>
                <Badge variant="muted">Educator</Badge>
                <Badge variant="brand">AI Enthusiast</Badge>
              </div>

              <div className="mt-10 flex flex-wrap gap-4">
                <a href="mailto:mayurgund3333@gmail.com" className="btn-primary">
                  Correspond
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
                <Link to="/projects" className="btn-ghost">
                  View works
                </Link>
              </div>

              <div className="mt-10 max-w-sm">
                <AvailabilityBar />
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-5 order-1 lg:order-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="hidden lg:block"
            >
              <div className="portrait-frame mx-auto max-w-[280px]">
                <img
                  src={avatarSrc}
                  alt="Mayur Gund"
                  className="w-full aspect-[4/5] object-cover sepia-[0.2] hover:sepia-0 transition-all duration-700"
                  onError={() => setAvatarSrc('/profile.svg')}
                />
              </div>
              <p className="mt-4 text-center font-display text-sm italic text-ink-faint dark:text-surface-500">
                Pune, Maharashtra — India
              </p>
            </motion.div>
            <TerminalHero />
          </div>
        </div>
      </section>

      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="py-10 border-y border-surface-300/60 dark:border-surface-800/80"
      >
        <div className="flex flex-col sm:flex-row sm:items-center gap-5">
          <span className="font-display text-xs tracking-[0.25em] uppercase text-ink-faint dark:text-surface-500 shrink-0">
            Instruments
          </span>
          <div className="flex flex-wrap gap-2">
            {TECH_STACK.map(tech => (
              <span key={tech} className="tag">{tech}</span>
            ))}
          </div>
        </div>
      </motion.section>

      <section className="py-14 md:py-20">
        <p className="section-label mb-8 text-center">Further reading</p>
        <div className="grid sm:grid-cols-3 gap-5">
          {QUICK_LINKS.map((link, i) => (
            <motion.div
              key={link.to}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i, duration: 0.5 }}
            >
              <Link to={link.to} className="accent-card block p-6 group corner-brackets">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-display text-xl font-semibold text-ink dark:text-surface-50 group-hover:text-accent transition-colors duration-300">
                      {link.label}
                    </h3>
                    <p className="mt-1.5 font-display text-sm italic text-ink-faint dark:text-surface-500">{link.desc}</p>
                  </div>
                  <span className="text-accent/50 group-hover:text-accent transition-colors duration-300 text-lg">→</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <BugFeatureToggle />
    </>
  )
}
