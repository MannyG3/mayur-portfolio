import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function NotFound() {
  return (
    <section className="py-32 text-center">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md mx-auto"
      >
        <p className="section-label mb-6">— lost —</p>
        <h1 className="font-display text-5xl md:text-6xl font-semibold text-ink dark:text-surface-50">
          Page not found
        </h1>
        <p className="mt-5 text-ink-muted dark:text-surface-400 max-w-sm mx-auto font-sans italic leading-relaxed">
          The page you seek does not exist — perhaps it was moved, or never written at all.
        </p>
        <div className="ornament my-10 max-w-xs mx-auto" aria-hidden>
          <span className="text-accent/60 text-xs">◆</span>
        </div>
        <Link to="/" className="btn-primary">
          Return home
        </Link>
      </motion.div>
    </section>
  )
}
