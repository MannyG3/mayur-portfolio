import { motion } from 'framer-motion'

const LEVEL = 85
const LABEL = 'Open to commissions & collaboration'

export default function AvailabilityBar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="surface-card p-5"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="font-display text-xs tracking-widest uppercase text-ink-faint dark:text-surface-500">Availability</span>
        <span className="font-display text-sm font-semibold text-accent tabular-nums">{LEVEL}%</span>
      </div>
      <div className="h-1 bg-surface-300/60 dark:bg-surface-800 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${LEVEL}%` }}
          transition={{ delay: 0.7, duration: 1, ease: 'easeOut' }}
          className="h-full bg-gradient-to-r from-accent-dim via-accent to-accent-glow"
        />
      </div>
      <p className="mt-3 font-display text-xs italic text-ink-faint dark:text-surface-500">{LABEL}</p>
    </motion.div>
  )
}
