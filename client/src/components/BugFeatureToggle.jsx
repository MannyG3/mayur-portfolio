import { useState } from 'react'
import { motion } from 'framer-motion'

export default function BugFeatureToggle() {
  const [isFeature, setIsFeature] = useState(false)

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5 }}
      className="py-16"
    >
      <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 mb-2">
        My Code works <span className="text-slate-500 dark:text-slate-400">(mostly)</span>
      </h2>
      <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-xl">
        Toggle to see how I reframe production issues.
      </p>
      <div className="flex flex-wrap items-center gap-6">
        <div
          className={`
            flex items-center gap-3 px-2 py-2 rounded-xl border backdrop-blur-xl transition-all duration-300
            ${isFeature
              ? 'bg-emerald-500/10 border-emerald-400/40 shadow-glow-green'
              : 'bg-rose-500/10 border-rose-400/40'
            }
          `}
          style={isFeature ? { boxShadow: '0 0 24px rgba(74, 222, 128, 0.25)' } : {}}
        >
          <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
            {isFeature ? 'Feature' : 'Bug'}
          </span>
          <button
            role="switch"
            aria-checked={isFeature}
            onClick={() => setIsFeature((v) => !v)}
            className={`
              relative w-14 h-8 rounded-full transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-neon-cyan
              ${isFeature ? 'bg-emerald-500/80' : 'bg-rose-500/80'}
            `}
          >
            <motion.span
              layout
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              className="absolute top-1 w-6 h-6 rounded-full bg-white shadow-lg"
              style={{ left: isFeature ? 'calc(100% - 26px)' : '4px' }}
            />
          </button>
        </div>
        <div className="font-mono text-slate-700 dark:text-slate-300 text-sm md:text-base">
          {isFeature ? (
            <span className="text-emerald-700 dark:text-neon-green">It&apos;s a feature — we just documented it.</span>
          ) : (
            <span className="text-rose-700 dark:text-rose-300">It&apos;s a feature — we just haven&apos;t documented it yet.</span>
          )}
        </div>
      </div>
    </motion.section>
  )
}
