import { useState } from 'react'
import { motion } from 'framer-motion'

export default function BugFeatureToggle() {
  const [isFeature, setIsFeature] = useState(false)

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6 }}
      className="py-16 md:py-24"
    >
      <div className="surface-card p-8 md:p-10 corner-brackets">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div>
            <p className="section-label mb-3">A note on craftsmanship</p>
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-ink dark:text-surface-50">
              My code works <span className="text-ink-faint italic font-normal">(mostly)</span>
            </h2>
            <p className="mt-3 text-sm text-ink-muted dark:text-surface-400 max-w-md font-sans italic leading-relaxed">
              Every craftsman knows the fine distinction between a flaw and an undocumented feature.
            </p>
          </div>

          <div className="flex items-center gap-5">
            <div className="flex items-center gap-4 px-5 py-3 border border-surface-300/70 dark:border-surface-700/70 bg-surface-100/80 dark:bg-surface-900/60">
              <span className={`font-display text-sm tracking-wide transition-colors duration-300 ${isFeature ? 'text-accent' : 'text-burgundy-light'}`}>
                {isFeature ? 'Feature' : 'Bug'}
              </span>
              <button
                role="switch"
                aria-checked={isFeature}
                aria-label="Toggle bug or feature"
                onClick={() => setIsFeature(v => !v)}
                className={`relative w-12 h-6 transition-colors duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 ${
                  isFeature ? 'bg-accent/70' : 'bg-burgundy/60'
                }`}
              >
                <motion.span
                  layout
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  className="absolute top-0.5 w-5 h-5 bg-surface-50 shadow-sm"
                  style={{ left: isFeature ? 'calc(100% - 22px)' : '2px' }}
                />
              </button>
            </div>
            <p className="font-display text-sm italic text-ink-muted dark:text-surface-400 max-w-xs leading-relaxed">
              {isFeature
                ? 'Documented, as all fine features ought to be.'
                : 'Pending documentation — a feature in spirit.'}
            </p>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
