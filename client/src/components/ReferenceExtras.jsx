import { useState } from 'react'

export function EmptyReferenceSection({ title, description, action }) {
  return (
    <section className="editorial-section editorial-empty" aria-labelledby={`${title.toLowerCase()}-title`}>
      <h2 id={`${title.toLowerCase()}-title`} className="editorial-section-title">{title}</h2>
      <p>{description}</p>
      {action && <span className="editorial-more">{action}</span>}
    </section>
  )
}

function PerfectCircle() {
  const [started, setStarted] = useState(false)
  const [score, setScore] = useState(null)
  const [startPoint, setStartPoint] = useState(null)

  function begin(event) {
    const rect = event.currentTarget.getBoundingClientRect()
    setStarted(true)
    setScore(null)
    setStartPoint({ x: event.clientX - rect.left, y: event.clientY - rect.top })
  }

  function finish(event) {
    if (!startPoint) return
    const rect = event.currentTarget.getBoundingClientRect()
    const endPoint = { x: event.clientX - rect.left, y: event.clientY - rect.top }
    const distance = Math.hypot(endPoint.x - startPoint.x, endPoint.y - startPoint.y)
    setScore(Math.max(0, Math.round(100 - Math.abs(distance - 90) / 2)))
    setStarted(false)
    setStartPoint(null)
  }

  return (
    <div className="arcade-game">
      <strong>Perfect Circle</strong>
      <button className="circle-board" onPointerDown={begin} onPointerUp={finish} aria-label="Draw a perfect circle">
        <span>{started ? 'Release' : score == null ? 'Draw' : `${score}%`}</span>
      </button>
    </div>
  )
}

function Breakout() {
  const [score, setScore] = useState(0)
  return (
    <div className="arcade-game">
      <strong>Breakout</strong>
      <button className="breakout-board" onClick={() => setScore(value => (value + 10) % 110)} aria-label="Play breakout">
        <span className="breakout-ball" />
        <span className="breakout-paddle" />
        <span className="breakout-score">{score}</span>
      </button>
    </div>
  )
}

function Minesweeper() {
  const [revealed, setRevealed] = useState([])
  const mines = [2, 8, 14, 20]
  return (
    <div className="arcade-game">
      <strong>Minesweeper</strong>
      <div className="mine-board" aria-label="Minesweeper board">
        {Array.from({ length: 25 }, (_, index) => {
          const isRevealed = revealed.includes(index)
          const isMine = mines.includes(index)
          return (
            <button
              key={index}
              className={isRevealed ? 'mine-cell is-revealed' : 'mine-cell'}
              onClick={() => setRevealed(current => current.includes(index) ? current : [...current, index])}
              aria-label={`Cell ${index + 1}`}
            >
              {isRevealed && isMine ? '*' : isRevealed ? '.' : ''}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export function Arcade() {
  const [activeGame, setActiveGame] = useState('circle')
  return (
    <section className="editorial-section" aria-labelledby="arcade-title">
      <h2 id="arcade-title" className="editorial-section-title">Arcade</h2>
      <p className="editorial-extra-copy">Small interactions, independent of your portfolio data.</p>
      <div className="arcade-tabs" role="tablist" aria-label="Arcade games">
        <button role="tab" aria-selected={activeGame === 'circle'} onClick={() => setActiveGame('circle')}>Perfect Circle</button>
        <button role="tab" aria-selected={activeGame === 'breakout'} onClick={() => setActiveGame('breakout')}>Breakout</button>
        <button role="tab" aria-selected={activeGame === 'mines'} onClick={() => setActiveGame('mines')}>Minesweeper</button>
      </div>
      <div className="arcade-panel">
        {activeGame === 'circle' && <PerfectCircle />}
        {activeGame === 'breakout' && <Breakout />}
        {activeGame === 'mines' && <Minesweeper />}
      </div>
    </section>
  )
}

export function GithubActivity({ username }) {
  const [status, setStatus] = useState('loading')
  const contributionsUrl = `https://ghchart.rshah.org/${username}`

  return (
    <section className="editorial-section" aria-labelledby="activity-title">
      <h2 id="activity-title" className="editorial-section-title">Activity</h2>
      <p className="editorial-extra-copy">Public GitHub contributions for <strong>{username}</strong>.</p>
      <div className="github-activity-card">
        {status === 'loading' && <span className="github-activity-status">Loading activity…</span>}
        {status === 'error' && <span className="github-activity-status">Activity is unavailable right now.</span>}
        <img
          src={contributionsUrl}
          alt={`${username} GitHub contribution activity`}
          onLoad={() => setStatus('ready')}
          onError={() => setStatus('error')}
          className={status === 'ready' ? 'is-ready' : ''}
        />
      </div>
      <a className="editorial-more" href={`https://github.com/${username}`} target="_blank" rel="noreferrer">view GitHub profile ↗</a>
    </section>
  )
}

export function MusicPlaceholder() {
  const [playing, setPlaying] = useState(false)
  return (
    <section className="music-placeholder" aria-label="Recently played">
      <div>
        <span className="widget-kicker">Recently played</span>
        <strong>No track configured</strong>
        <span>Connect a music preview to enable playback.</span>
      </div>
      <button type="button" aria-pressed={playing} onClick={() => setPlaying(value => !value)}>
        {playing ? 'Pause' : 'Play'}
      </button>
    </section>
  )
}
