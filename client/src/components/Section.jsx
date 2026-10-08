export function Section({ children, className = '' }) {
  return (
    <section className={`py-16 md:py-24 ${className}`}>{children}</section>
  )
}

export function SectionHeader({ label, title, subtitle, align = 'left' }) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : ''
  const ornamentClass = align === 'center' ? 'mx-auto' : ''
  return (
    <div className={`mb-10 md:mb-12 max-w-2xl ${alignClass}`}>
      {label && (
        <p className="section-label mb-3">
          {label}
        </p>
      )}
      {title && (
        <h1 className="font-display text-2xl md:text-3xl font-semibold tracking-tight text-ink dark:text-surface-50 leading-tight">
          {title}
        </h1>
      )}
      {subtitle && (
        <p className="mt-4 text-sm md:text-base text-ink-muted dark:text-surface-400 leading-relaxed font-sans">
          {subtitle}
        </p>
      )}
      {(title || subtitle) && (
        <div className={`mt-5 max-w-xs border-t border-surface-300/70 dark:border-surface-700 ${ornamentClass}`} aria-hidden>
          <span className="sr-only">Section divider</span>
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
