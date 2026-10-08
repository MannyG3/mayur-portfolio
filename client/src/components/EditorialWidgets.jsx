import { useEffect, useState } from 'react'
import { playClickSound } from '../utils/sound'

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
      <div className="relative w-full aspect-square max-w-[145px] grid place-items-center">
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
  const [isPlaying, setIsPlaying] = useState(false)
  const [imgSrc, setImgSrc] = useState(song.artwork)
  const trackId = song.trackId || '2p8IUWQDrpjuFltbdgLOag'
  const spotifyEmbedUrl = `https://open.spotify.com/embed/track/${trackId}?utm_source=generator&theme=0`

  useEffect(() => {
    setImgSrc(song.artwork)
  }, [song.artwork])

  return (
    <section className="editorial-widgets" aria-label="Portfolio utilities">
      <div className="recent-project-widget overflow-hidden">
        {isPlaying ? (
          <div className="w-full h-full flex flex-col justify-between">
            <div className="flex items-center justify-between pb-2 mb-1 border-b border-border/40">
              <span className="widget-kicker flex items-center gap-1.5 text-brand font-medium">
                <span className="inline-block h-2 w-2 rounded-full bg-brand animate-pulse" />
                Spotify Player
              </span>
              <button
                type="button"
                onClick={() => {
                  playClickSound()
                  setIsPlaying(false)
                }}
                className="text-[10px] font-mono text-muted-foreground hover:text-foreground px-2 py-0.5 rounded border border-border/60"
              >
                Close ✕
              </button>
            </div>
            <iframe
              src={spotifyEmbedUrl}
              width="100%"
              height="152"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              title="Spotify Live Player"
              className="rounded-xl shadow-sm"
            />
          </div>
        ) : (
          <div className="flex items-center gap-4 h-full">
            <div
              className="group cursor-pointer relative overflow-hidden rounded-xl bg-neutral-900 h-28 w-28 shrink-0 border border-border/40"
              onClick={() => {
                playClickSound()
                setIsPlaying(true)
              }}
            >
              <img
                src={imgSrc}
                alt={`${song.title} artwork`}
                onError={() => setImgSrc('https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36')}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity grid place-items-center">
                <span className="h-8 w-8 rounded-full bg-brand grid place-items-center text-white text-xs pl-0.5 shadow-md">
                  ▶
                </span>
              </div>
            </div>
            <div className="flex-1 min-w-0 flex flex-col justify-center">
              <div className="flex items-center justify-between">
                <span className="widget-kicker">Recently played</span>
                <span className="inline-block h-2 w-2 rounded-full bg-brand animate-ping" />
              </div>
              <strong className="mt-1 text-sm font-semibold text-foreground truncate block" title={song.title}>
                {song.title}
              </strong>
              <span className="text-xs text-muted-foreground truncate block mt-0.5">
                {song.artist}
              </span>
              <div className="flex flex-wrap items-center gap-2 mt-3">
                <button
                  type="button"
                  className="widget-action cursor-pointer"
                  onClick={() => {
                    playClickSound()
                    setIsPlaying(true)
                  }}
                >
                  <span aria-hidden>▷</span> Stream Spotify
                </button>
                <a
                  className="text-xs font-mono text-muted-foreground hover:text-foreground underline decoration-dotted underline-offset-4"
                  href={song.href}
                  target="_blank"
                  rel="noreferrer"
                  onClick={playClickSound}
                >
                  Open ↗
                </a>
              </div>
            </div>
          </div>
        )}
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
