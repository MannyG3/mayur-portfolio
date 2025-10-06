import { motion, useAnimation } from 'framer-motion'
import { useEffect, useRef } from 'react'

export default function Reveal({ children, delay = 0, y = 12 }) {
  const controls = useAnimation()
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) controls.start('visible')
    }, { threshold: 0.15 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [controls])

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{ hidden: { opacity: 0, y }, visible: { opacity: 1, y: 0 } }}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  )
}



