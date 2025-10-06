export function Section({ children, className = '' }) {
  return (
    <section className={`py-16 ${className}`}>{children}</section>
  )
}

export function SectionHeader({ eyebrow, title, subtitle }) {
  return (
    <div className="mb-8">
      {eyebrow && <div className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">{eyebrow}</div>}
      {title && <h2 className="mt-1 text-2xl font-bold">{title}</h2>}
      {subtitle && <p className="mt-2 text-slate-600 dark:text-slate-300 max-w-2xl">{subtitle}</p>}
    </div>
  )
}

export function Badge({ children }) {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-brand-400/10 text-brand-600 dark:text-brand-300 border border-brand-400/30 text-xs">{children}</span>
  )
}



