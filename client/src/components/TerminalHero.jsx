import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const RESUME_HACKS = [
  { corporate: 'Team Player', truth: 'Git conflict survivor' },
  { corporate: 'Detail-Oriented', truth: 'Refactors for a single typo' },
  { corporate: 'Self-Starter', truth: 'Writes docs at 2am' },
  { corporate: 'Problem Solver', truth: '47 Stack Overflow tabs open' },
  { corporate: 'Fast Learner', truth: 'Copy-paste champion' },
  { corporate: 'Agile Mindset', truth: 'Deploys on Friday anyway' },
]

function TypingLine({ corporate, truth, isActive, onDone }) {
  const [phase, setPhase] = useState('corporate')
  const [corporateVisible, setCorporateVisible] = useState(0)
  const [truthVisible, setTruthVisible] = useState(0)

  useEffect(() => {
    if (!isActive) return
    const corpLen = corporate.length
    let t = 0
    const corpInterval = setInterval(() => {
      t += 1
      setCorporateVisible(Math.min(t, corpLen))
      if (t >= corpLen) {
        clearInterval(corpInterval)
        setPhase('hacking')
        setTimeout(() => {
          setPhase('truth')
          setCorporateVisible(0)
          let t2 = 0
          const truthInterval = setInterval(() => {
            t2 += 1
            setTruthVisible(Math.min(t2, truth.length))
            if (t2 >= truth.length) {
              clearInterval(truthInterval)
              onDone?.()
            }
          }, 35)
        }, 500)
      }
    }, 45)
    return () => clearInterval(corpInterval)
  }, [isActive, corporate, truth, onDone])

  if (!isActive && phase === 'corporate' && corporateVisible === 0) return null

  return (
    <div className="font-mono text-[13px] leading-relaxed">
      <span className="text-accent select-none">› </span>
      <AnimatePresence mode="wait">
        {phase === 'corporate' && (
          <motion.span key="corp" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-ink-faint dark:text-surface-500 italic">
            {corporate.slice(0, corporateVisible)}
            <span className="animate-cursor-blink text-accent not-italic">▊</span>
          </motion.span>
        )}
        {phase === 'hacking' && (
          <motion.span key="hack" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-burgundy-light">
            deciphering…
          </motion.span>
        )}
        {phase === 'truth' && (
          <motion.span key="truth" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-ink dark:text-surface-200">
            {truth.slice(0, truthVisible)}
            {truthVisible < truth.length && <span className="animate-cursor-blink text-accent">▊</span>}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function TerminalHero() {
  const [lineIndex, setLineIndex] = useState(0)
  const [completed, setCompleted] = useState(false)

  const handleLineDone = () => {
    if (lineIndex < RESUME_HACKS.length - 1) {
      setTimeout(() => setLineIndex(i => i + 1), 700)
    } else {
      setCompleted(true)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.25 }}
      className="terminal-window h-full"
    >
      <div className="terminal-bar">
        <span className="font-display text-xs italic text-ink-faint dark:text-surface-500 tracking-wide">
          Marginalia — résumé decoder
        </span>
      </div>
      <div className="p-6 min-h-[220px] font-mono text-sm">
        <div className="text-ink-faint dark:text-surface-500 text-xs mb-5 font-display italic">
          Translating corporate prose into plain English…
        </div>
        <div className="space-y-3">
          {RESUME_HACKS.slice(0, lineIndex + 1).map((pair, i) => (
            <div key={i}>
              {i < lineIndex ? (
                <div className="font-mono text-[13px]">
                  <span className="text-accent select-none">› </span>
                  <span className="text-ink dark:text-surface-200">{pair.truth}</span>
                </div>
              ) : (
                <TypingLine corporate={pair.corporate} truth={pair.truth} isActive onDone={handleLineDone} />
              )}
            </div>
          ))}
        </div>
        {completed && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-5 text-xs text-ink-faint dark:text-surface-500 font-display italic">
            — fin — <span className="text-accent">still hireable, I assure you.</span>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
