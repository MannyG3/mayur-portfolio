import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import TerminalHero from '../components/TerminalHero'
import BugFeatureToggle from '../components/BugFeatureToggle'
import JobUrgencyMeter from '../components/JobUrgencyMeter'
import { Badge } from '../components/Section'

export default function Home() {
  return (
    <>
      {/* Hero: intro left, terminal right; Job Urgency Meter integrated below CTAs */}
      <section className="py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7">
            <motion.h1
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 mb-1"
            >
              Mayur Gund
            </motion.h1>
            <p className="text-slate-600 dark:text-slate-400 text-lg mb-4">
              <span className="text-cyan-600 dark:text-neon-cyan font-medium">Full Stack Developer</span> · Educator · AI Enthusiast
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Badge>Full Stack</Badge>
              <Badge>Educator</Badge>
              <Badge>AI Enthusiast</Badge>
            </div>
            <p className="mt-6 text-slate-600 dark:text-slate-400 max-w-lg">
              Passionate about building scalable web apps and mentoring developers. Open to full-time roles and mentoring opportunities.
            </p>
            <div className="mt-8 flex gap-3">
              <a
                href="mailto:mayurgund3333@gmail.com"
                className="px-4 py-2.5 rounded-lg bg-cyan-500/20 border border-cyan-400/40 text-cyan-700 dark:text-neon-cyan font-medium hover:shadow-glow-cyan hover:border-cyan-400/60 transition-all"
              >
                Let's Collaborate
              </a>
              <Link
                to="/projects"
                className="px-4 py-2.5 rounded-lg glass border border-slate-300 dark:border-white/10 text-slate-700 dark:text-slate-300 hover-glow-cyan hover:border-cyan-400/30 hover:text-cyan-600 dark:hover:text-neon-cyan transition-all"
              >
                View Projects
              </Link>
            </div>
            <div className="mt-10 max-w-sm">
              <JobUrgencyMeter />
            </div>
          </div>
          <div className="lg:col-span-5">
            <TerminalHero />
          </div>
        </div>
      </section>

      {/* My Code works (mostly) — bug/feature toggle */}
      <BugFeatureToggle />
    </>
  )
}
