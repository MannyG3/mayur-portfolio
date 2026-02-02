import { motion } from 'framer-motion'

const LABEL = 'Need Coffee & A Salary.'
const LEVEL = 85

export default function JobUrgencyMeter() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3, duration: 0.4 }}
      className="glass rounded-xl p-4 border border-slate-200 dark:border-white/10 transition-all duration-300 hover-glow-cyan hover:border-cyan-400/30"
    >
      <div className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3 text-center">
        Job Urgency Meter
      </div>

      {/* Simple horizontal bar meter */}
      <div className="space-y-1.5">
        <div className="h-4 rounded-full bg-slate-200/80 dark:bg-white/10 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${LEVEL}%` }}
            transition={{ delay: 0.4, duration: 0.7, ease: 'easeOut' }}
            className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500"
            style={{ boxShadow: '0 0 12px rgba(34, 211, 238, 0.4)' }}
          />
        </div>
        <div className="flex justify-between text-[10px] font-mono text-slate-400 dark:text-slate-500">
          <span>0</span>
          <span>25</span>
          <span>50</span>
          <span>75</span>
          <span>100</span>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between gap-2">
        <span className="font-mono text-sm font-bold text-cyan-600 dark:text-neon-cyan tabular-nums">
          {LEVEL}%
        </span>
        <span className="font-mono text-xs text-slate-500 dark:text-slate-400 truncate flex-1 text-right" title={LABEL}>
          {LABEL}
        </span>
      </div>
    </motion.div>
  )
}
