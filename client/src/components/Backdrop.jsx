export default function Backdrop() {
  return (
    <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-surface-100 dark:bg-surface-950" />
      <div className="absolute inset-0 paper-texture opacity-80" />
      <div className="absolute inset-0 vignette pointer-events-none" />
      {/* Warm top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-accent/[0.04] dark:bg-accent/[0.03] rounded-full blur-3xl" />
      {/* Subtle radial warmth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(44,36,22,0.03)_100%)] dark:bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
    </div>
  )
}
