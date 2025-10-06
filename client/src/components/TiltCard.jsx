import { useRef } from 'react'

export default function TiltCard({ children, className = '' }) {
  const ref = useRef(null)

  function onMove(e) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    const rotateY = (px - 0.5) * 10
    const rotateX = (0.5 - py) * 10
    el.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(0)`
  }

  function onLeave() {
    const el = ref.current
    if (!el) return
    el.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0)'
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`transition-[transform,box-shadow,border-color] duration-200 will-change-transform ${className}`}
    >
      {children}
    </div>
  )
}



