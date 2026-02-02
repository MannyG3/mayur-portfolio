import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const RESUME_HACKS = [
  { corporate: 'Team Player', truth: 'Git Conflict Survivor' },
  { corporate: 'Detail-Oriented', truth: 'Will refactor your codebase for a typo' },
  { corporate: 'Self-Starter', truth: 'Writes docs at 2am' },
  { corporate: 'Problem Solver', truth: 'Googles errors in 47 tabs' },
  { corporate: 'Fast Learner', truth: 'Stack Overflow copy-paste champion' },
  { corporate: 'Strong Communicator', truth: 'Explains bugs using only emoji' },
  { corporate: 'Results-Driven', truth: 'It works on my machine™' },
  { corporate: 'Agile Mindset', truth: 'Deploys on Friday anyway' },
]

function TypingLine({ corporate, truth, isActive, onDone }) {
  const [phase, setPhase] = useState('corporate') // corporate | hacking | truth
  const [corporateVisible, setCorporateVisible] = useState(0)
  const [truthVisible, setTruthVisible] = useState(0)

  useEffect(() => {
    if (!isActive) return
    // Type corporate phrase
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
          }, 40)
        }, 600)
      }
    }, 50)
    return () => clearInterval(corpInterval)
  }, [isActive, corporate, truth, onDone])

  if (!isActive && phase === 'corporate' && corporateVisible === 0) return null

  return (
    <div className="font-mono text-sm">
      <span className="text-neon-green select-none">$ </span>
      <span className="text-slate-400">decode_resume.exe</span>
      <br />
      <span className="text-slate-500">→ </span>
      <AnimatePresence mode="wait">
        {phase === 'corporate' && (
          <motion.span
            key="corp"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-amber-200/90"
          >
            {corporate.slice(0, corporateVisible)}
            <span className="animate-pulse">|</span>
          </motion.span>
        )}
        {phase === 'hacking' && (
          <motion.span
            key="hack"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-neon-magenta"
          >
            [ HACKING... ]
          </motion.span>
        )}
        {phase === 'truth' && (
          <motion.span
            key="truth"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-neon-cyan"
          >
            {truth.slice(0, truthVisible)}
            {truthVisible >= truth.length ? '' : <span className="animate-pulse">|</span>}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function TerminalHero() {
  const [lineIndex, setLineIndex] = useState(0)
  const [completed, setCompleted] = useState(false)

  useEffect(() => {
    if (completed) return
    const current = RESUME_HACKS[lineIndex]
    if (!current) {
      setCompleted(true)
      return
    }
  }, [lineIndex, completed])

  const handleLineDone = () => {
    if (lineIndex < RESUME_HACKS.length - 1) {
      setTimeout(() => setLineIndex((i) => i + 1), 800)
    } else {
      setCompleted(true)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-neon-cyan rounded-xl overflow-hidden border border-cyan-400/30 transition-all duration-300 hover:shadow-glow-cyan hover:border-cyan-400/50"
    >
      {/* Terminal title bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-black/40 border-b border-white/10">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-500/80" />
          <span className="w-3 h-3 rounded-full bg-amber-500/80" />
          <span className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <span className="font-mono text-xs text-slate-400 ml-2">resume_decoder — zsh</span>
      </div>
      <div className="p-4 min-h-[200px] bg-black/30">
        <div className="text-neon-green font-mono text-xs mb-2"># Decoding corporate jargon...</div>
        {RESUME_HACKS.slice(0, lineIndex + 1).map((pair, i) => (
          <div key={i} className="mb-3">
            {i < lineIndex ? (
              <div className="font-mono text-sm">
                <span className="text-neon-green select-none">$ </span>
                <span className="text-slate-400">decode_resume.exe</span>
                <br />
                <span className="text-slate-500">→ </span>
                <span className="text-neon-cyan">{pair.truth}</span>
              </div>
            ) : (
              <TypingLine
                corporate={pair.corporate}
                truth={pair.truth}
                isActive={true}
                onDone={handleLineDone}
              />
            )}
          </div>
        ))}
        {completed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-mono text-neon-green text-xs mt-2"
          >
            $ <span className="text-slate-500"># Resume decoded. Hire me anyway?</span>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
