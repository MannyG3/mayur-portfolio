export default function Backdrop() {
  return (
    <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute -inset-[40%] bg-[radial-gradient(ellipse_at_top_left,rgba(99,108,203,0.25),transparent_60%),radial-gradient(ellipse_at_bottom_right,rgba(80,88,156,0.25),transparent_60%)] animate-pulse" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(0,0,0,.05))] dark:bg-[linear-gradient(to_bottom,transparent,rgba(0,0,0,.35))]" />
    </div>
  )
}


