import { useEffect, useState } from 'react'

function formatTime(date) {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

function ClockFace() {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000)
    return () => window.clearInterval(timer)
  }, [])

  const seconds = now.getSeconds()
  const minutes = now.getMinutes() + seconds / 60
  const hours = (now.getHours() % 12) + minutes / 60

  return (
    <div className="widget-clock" aria-label={`Local time ${formatTime(now)}`}>
      {Array.from({ length: 60 }, (_, index) => (
        <span
          key={index}
          className={`clock-tick ${index % 5 === 0 ? 'clock-tick-major' : ''}`}
          style={{ transform: `rotate(${index * 6}deg)` }}
          aria-hidden
        />
      ))}
      <span className="clock-number clock-number-12">12</span>
      <span className="clock-number clock-number-3">3</span>
      <span className="clock-number clock-number-6">6</span>
      <span className="clock-number clock-number-9">9</span>
      <span className="clock-hand clock-hand-hour" style={{ transform: `translateX(-50%) rotate(${hours * 30}deg)` }} />
      <span className="clock-hand clock-hand-minute" style={{ transform: `translateX(-50%) rotate(${minutes * 6}deg)` }} />
      <span className="clock-hand clock-hand-second" style={{ transform: `translateX(-50%) rotate(${seconds * 6}deg)` }} />
      <span className="clock-center" />
    </div>
  )
}

function DotMark() {
  const dots = Array.from({ length: 144 }, (_, index) => {
    const row = Math.floor(index / 12)
    const column = index % 12
    const active = (row === 1 && column > 1 && column < 10)
      || (row === 2 && (column === 1 || column === 4 || column === 7 || column === 10))
      || (row === 3 && (column === 1 || column === 4 || column === 7 || column === 10))
      || (row === 4 && (column === 2 || column === 3 || column === 4 || column === 7 || column === 8 || column === 9))
      || (row === 5 && (column === 2 || column === 3 || column === 8 || column === 9))
      || (row === 6 && (column === 1 || column === 4 || column === 7 || column === 10))
      || (row === 7 && (column === 1 || column === 4 || column === 7 || column === 10))
      || (row === 8 && column > 1 && column < 10)
    return <span key={index} className={active ? 'mark-dot is-active' : 'mark-dot'} />
  })

  return <div className="dot-mark" aria-label="Mayur Gund monogram" role="img">{dots}</div>
}

export default function EditorialWidgets({ song }) {
  return (
    <section className="editorial-widgets" aria-label="Portfolio utilities">
      <div className="recent-project-widget">
        <div className="widget-project-art">
          <img src={song.artwork} alt={`${song.title} artwork`} />
        </div>
        <div className="widget-project-copy">
          <span className="music-brand" aria-hidden>●</span>
          <span className="widget-kicker">Recently played</span>
          <strong>{song.title}</strong>
          <span>{song.artist}</span>
          <a className="widget-action" href={song.href} target="_blank" rel="noreferrer">
            <span aria-hidden>▷</span> Play
          </a>
        </div>
      </div>
      <div className="clock-widget">
        <ClockFace />
      </div>
      <div className="mark-widget">
        <DotMark />
      </div>
    </section>
  )
}
