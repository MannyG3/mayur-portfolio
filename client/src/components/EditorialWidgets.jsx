import { useEffect, useRef, useState } from 'react'
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
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    let width = 0
    let height = 0
    let particles = []
    let bgDots = []
    const mouse = { x: -9999, y: -9999, isOver: false }
    let pulse = null

    const init = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = rect.width || 180
      height = rect.height || 180
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.scale(dpr, dpr)

      // Offscreen canvas to sample high quality letter 'M'
      const offCanvas = document.createElement('canvas')
      const sampleSize = 100
      offCanvas.width = sampleSize
      offCanvas.height = sampleSize
      const offCtx = offCanvas.getContext('2d')
      offCtx.font = '900 68px system-ui, -apple-system, sans-serif'
      offCtx.textAlign = 'center'
      offCtx.textBaseline = 'middle'
      offCtx.fillStyle = '#000'
      offCtx.fillText('M', sampleSize / 2, sampleSize / 2 + 1)

      const imgData = offCtx.getImageData(0, 0, sampleSize, sampleSize).data
      particles = []
      bgDots = []

      const step = 3.5
      const scaleX = (width * 0.72) / sampleSize
      const scaleY = (height * 0.72) / sampleSize
      const offsetX = (width - sampleSize * scaleX) / 2
      const offsetY = (height - sampleSize * scaleY) / 2

      // Background matrix grid dots
      const gridCols = 12
      const gridRows = 12
      const cellW = width / gridCols
      const cellH = height / gridRows
      for (let r = 0; r < gridRows; r++) {
        for (let c = 0; c < gridCols; c++) {
          bgDots.push({
            x: c * cellW + cellW / 2,
            y: r * cellH + cellH / 2,
          })
        }
      }

      for (let y = 0; y < sampleSize; y += step) {
        for (let x = 0; x < sampleSize; x += step) {
          const index = Math.floor(y) * sampleSize * 4 + Math.floor(x) * 4
          const alpha = imgData[index + 3]
          if (alpha > 120) {
            const homeX = offsetX + x * scaleX
            const homeY = offsetY + y * scaleY
            particles.push({
              homeX,
              homeY,
              x: homeX + (Math.random() - 0.5) * 6,
              y: homeY + (Math.random() - 0.5) * 6,
              vx: 0,
              vy: 0,
              phase: Math.random() * Math.PI * 2,
              speed: 0.8 + Math.random() * 0.6,
              radius: 2.1,
            })
          }
        }
      }
    }

    init()

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
      mouse.isOver = true
    }

    const handleMouseLeave = () => {
      mouse.isOver = false
      mouse.x = -9999
      mouse.y = -9999
    }

    const handleClick = (e) => {
      const rect = canvas.getBoundingClientRect()
      playClickSound()
      pulse = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        radius: 0,
        maxRadius: Math.max(width, height) * 0.85,
      }
    }

    window.addEventListener('resize', init)
    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseleave', handleMouseLeave)
    canvas.addEventListener('click', handleClick)

    let lastTime = performance.now()
    const render = (now) => {
      const dt = Math.min((now - lastTime) / 1000, 0.033)
      lastTime = now

      ctx.clearRect(0, 0, width, height)

      // Draw background matrix grid dots
      const isDark = document.documentElement.classList.contains('dark')
      ctx.fillStyle = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.07)'
      for (let i = 0; i < bgDots.length; i++) {
        const bg = bgDots[i]
        ctx.beginPath()
        ctx.arc(bg.x, bg.y, 1.2, 0, Math.PI * 2)
        ctx.fill()
      }

      // Update click shockwave pulse
      if (pulse) {
        pulse.radius += dt * 260
        if (pulse.radius > pulse.maxRadius) {
          pulse = null
        }
      }

      // Update & render active monogram dots
      const t = now * 0.0015
      ctx.fillStyle = '#f04e15' // Brand Vermilion

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // 1. Organic Idle Float / Wriggle Motion
        const idleX = p.homeX + Math.cos(t * p.speed + p.phase) * 1.6
        const idleY = p.homeY + Math.sin(t * p.speed * 1.2 + p.phase * 1.4) * 1.6

        // 2. Spring Restoring Acceleration towards home
        const dxTarget = idleX - p.x
        const dyTarget = idleY - p.y
        p.vx += dxTarget * 0.075
        p.vy += dyTarget * 0.075

        // 3. Hover Scatter Repulsion (Mouse Giggle)
        if (mouse.isOver) {
          const dxM = p.x - mouse.x
          const dyM = p.y - mouse.y
          const distM = Math.sqrt(dxM * dxM + dyM * dyM)
          const repelRadius = width * 0.35
          if (distM < repelRadius && distM > 0) {
            const force = (1 - distM / repelRadius) * 6.0
            p.vx += (dxM / distM) * force
            p.vy += (dyM / distM) * force
          }
        }

        // 4. Click Shockwave Ripple
        if (pulse) {
          const dxP = p.x - pulse.x
          const dyP = p.y - pulse.y
          const distP = Math.sqrt(dxP * dxP + dyP * dyP)
          const waveDist = Math.abs(distP - pulse.radius)
          if (waveDist < 20) {
            const force = (1 - waveDist / 20) * 8.5
            p.vx += (dxP / (distP || 1)) * force
            p.vy += (dyP / (distP || 1)) * force
          }
        }

        // 5. Friction Damping & Integration
        p.vx *= 0.81
        p.vy *= 0.81
        p.x += p.vx
        p.y += p.vy

        // Draw Dot
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fill()
      }

      // Draw subtle shockwave ring on canvas
      if (pulse) {
        ctx.strokeStyle = `rgba(240, 78, 21, ${Math.max(0, 1 - pulse.radius / pulse.maxRadius)})`
        ctx.lineWidth = 1.2
        ctx.beginPath()
        ctx.arc(pulse.x, pulse.y, pulse.radius, 0, Math.PI * 2)
        ctx.stroke()
      }

      animId = requestAnimationFrame(render)
    }

    animId = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', init)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseleave', handleMouseLeave)
      canvas.removeEventListener('click', handleClick)
    }
  }, [])

  return (
    <div
      className="relative w-full h-full min-h-[160px] flex items-center justify-center cursor-crosshair select-none"
      aria-label="Mayur Gund monogram rendered as brand-colored dots that scatter away from the cursor"
      role="img"
    >
      <canvas ref={canvasRef} className="w-full h-full block rounded-xl" />
    </div>
  )
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
