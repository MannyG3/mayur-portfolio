export default function Backdrop() {
  return (
    <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden bg-slate-50 dark:bg-[#0a0a0f]">
      <div className="absolute -inset-[50%] bg-[radial-gradient(ellipse_at_30%_20%,rgba(34,211,238,0.08),transparent_50%),radial-gradient(ellipse_at_70%_80%,rgba(232,121,249,0.06),transparent_50%)] dark:bg-[radial-gradient(ellipse_at_30%_20%,rgba(34,211,238,0.12),transparent_50%),radial-gradient(ellipse_at_70%_80%,rgba(232,121,249,0.1),transparent_50%),radial-gradient(ellipse_at_50%_50%,rgba(74,222,128,0.06),transparent_60%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_20%,rgba(255,255,255,0.5))] dark:bg-[linear-gradient(to_bottom,transparent_20%,rgba(10,10,15,0.6))]" />
    </div>
  )
}


