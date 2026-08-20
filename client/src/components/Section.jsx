export function Section({ children, className = '' }) {
  return (
    <section className={`py-16 md:py-24 ${className}`}>{children}</section>
  )
}

export function SectionHeader({ label, title, subtitle, align = 'left' }) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : ''
  const ornamentClass = align === 'center' ? 'mx-auto' : ''
  return (
    <div className={`mb-14 md:mb-20 max-w-2xl ${alignClass}`}>
      {label && (
        <p className="section-label mb-4">
          — {label} —
        </p>
      )}
      {title && (
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-ink dark:text-surface-50 leading-[1.1]">
          {title}
        </h1>
      )}
      {subtitle && (
        <p className="mt-5 text-base md:text-lg text-ink-muted dark:text-surface-400 leading-relaxed font-sans italic">
          {subtitle}
        </p>
      )}
      {(title || subtitle) && (
        <div className={`mt-6 ornament max-w-xs ${ornamentClass}`} aria-hidden>
          <span className="text-accent text-xs">◆</span>
        </div>
      )}
    </div>
  )
}

export function Badge({ children, variant = 'default' }) {
  const variants = {
    default: 'bg-accent-muted text-accent border-accent/25',
    muted: 'bg-surface-200/60 dark:bg-surface-800/60 text-ink-muted dark:text-surface-400 border-surface-300/70 dark:border-surface-700/70',
    brand: 'bg-burgundy-muted text-burgundy-light border-burgundy/20',
  }
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-[11px] font-display font-medium tracking-widest uppercase border ${variants[variant]}`}>
      {children}
    </span>
  )
}

export function StatusDot({ label = 'Available for work' }) {
  return (
    <div className="status-badge">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-50" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
      </span>
      <span className="text-xs font-display italic text-accent tracking-wide">{label}</span>
    </div>
  )
}
