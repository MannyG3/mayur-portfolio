export default function Backdrop() {

  return (

    <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden">

      <div className="absolute inset-0 bg-surface-100 dark:bg-surface-950" />

      <div className="absolute inset-0 paper-texture opacity-30" />

    </div>

  )

}

