import { useEffect, useState } from 'react'

function ClockFace() {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000)
    return () => window.clearInterval(timer)
  }, [])

  const seconds = now.getSeconds()
  const minutes = now.getMinutes() + seconds / 60
  const hours = (now.getHours() % 12) + minutes / 60

  const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })

  const secAngle = seconds * 6
  const minAngle = minutes * 6
  const hourAngle = hours * 30

  return (
    <div className="flex flex-col items-center justify-center h-full w-full py-1">
      <div className="relative w-full aspect-square max-w-[150px] grid place-items-center">
        <svg viewBox="0 0 200 200" className="w-full h-full text-foreground select-none drop-shadow-sm">
          {/* Watch Outer Rim */}
          <circle cx="100" cy="100" r="95" className="fill-card stroke-border" strokeWidth="2.5" />
          <circle cx="100" cy="100" r="90" className="fill-none stroke-border/40" strokeWidth="1" />

          {/* Minute & Hour Ticks */}
          {Array.from({ length: 60 }, (_, i) => {
            const isMajor = i % 5 === 0
            const angle = (i * 6 * Math.PI) / 180
            const rInner = isMajor ? 73 : 80
            const rOuter = 86
            const x1 = 100 + rInner * Math.sin(angle)
            const y1 = 100 - rInner * Math.cos(angle)
            const x2 = 100 + rOuter * Math.sin(angle)
            const y2 = 100 - rOuter * Math.cos(angle)
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                className={isMajor ? 'stroke-foreground' : 'stroke-muted-foreground/30'}
                strokeWidth={isMajor ? '2' : '1'}
                strokeLinecap="round"
              />
            )
          })}

          {/* Clock Numerals */}
          <text x="100" y="34" textAnchor="middle" dominantBaseline="central" className="fill-foreground font-mono text-[13px] font-semibold">12</text>
          <text x="168" y="100" textAnchor="middle" dominantBaseline="central" className="fill-foreground font-mono text-[13px] font-semibold">3</text>
          <text x="100" y="166" textAnchor="middle" dominantBaseline="central" className="fill-foreground font-mono text-[13px] font-semibold">6</text>
          <text x="32" y="100" textAnchor="middle" dominantBaseline="central" className="fill-foreground font-mono text-[13px] font-semibold">9</text>

          {/* Hour Hand */}
          <g transform={`rotate(${hourAngle} 100 100)`}>
            <line x1="100" y1="106" x2="100" y2="52" className="stroke-foreground" strokeWidth="4" strokeLinecap="round" />
          </g>

          {/* Minute Hand */}
          <g transform={`rotate(${minAngle} 100 100)`}>
            <line x1="100" y1="110" x2="100" y2="34" className="stroke-foreground" strokeWidth="2.5" strokeLinecap="round" />
          </g>

          {/* Second Hand (Brand Vermilion) */}
          <g transform={`rotate(${secAngle} 100 100)`}>
            <line x1="100" y1="114" x2="100" y2="26" stroke="#f04e15" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="100" cy="100" r="3.5" fill="#f04e15" />
          </g>

          {/* Center Pin */}
          <circle cx="100" cy="100" r="1.5" className="fill-background" />
        </svg>
      </div>

      {/* Digital readout & location */}
      <div className="mt-1.5 text-center">
        <span className="block font-mono text-[11px] font-medium tracking-wider text-foreground">
          {timeString}
        </span>
        <span className="block font-mono text-[9px] uppercase tracking-widest text-muted-foreground opacity-75">
          PUNE · IST
        </span>
      </div>
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
