import { useState, useEffect, useRef } from 'react'
import { LEVEL_CONFIG } from '../lib/challenges'

export default function LandingScreen({ onSelectLevel }) {
  const [mounted, setMounted] = useState(false)
  const [hovered, setHovered] = useState(null)
  const canvasRef = useRef(null)

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    if (!mounted) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId, t = 0

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    resize()
    window.addEventListener('resize', resize)

    const stars = Array.from({length: 200}, () => ({
      x: Math.random(), y: Math.random(),
      r: Math.random() * 1.3 + 0.2,
      speed: Math.random() * 0.00007 + 0.00001,
      opacity: Math.random() * 0.65 + 0.2,
      twinkle: Math.random() * Math.PI * 2,
      twinkleSpeed: Math.random() * 0.016 + 0.003,
    }))

    const shoots = Array.from({length: 5}, () => ({
      active: false, x: 0, y: 0, len: 0, speed: 0, angle: 0, life: 0, maxLife: 0, opacity: 0
    }))

    const spawnShoot = (s) => {
      s.active = true
      s.x = Math.random() * 0.7 + 0.1
      s.y = Math.random() * 0.4
      s.angle = (Math.PI / 4) + (Math.random() - 0.5) * 0.4
      s.speed = (Math.random() * 0.004 + 0.003)
      s.len = Math.random() * 0.12 + 0.06
      s.maxLife = 60 + Math.random() * 40
      s.life = 0
      s.opacity = 0
    }

    let nextShoot = 120
    let cachedGnd = null
    let lastW = 0, lastH = 0

    const draw = () => {
      t++
      if (t % 2 !== 0) { animId = requestAnimationFrame(draw); return }

      const W = canvas.width, H = canvas.height
      ctx.fillStyle = 'rgba(4,2,10,1)'
      ctx.fillRect(0, 0, W, H)

      if (W !== lastW || H !== lastH) {
        cachedGnd = ctx.createRadialGradient(W*0.5, H, 0, W*0.5, H, W*0.6)
        cachedGnd.addColorStop(0, 'rgba(130,12,20,0.35)')
        cachedGnd.addColorStop(1, 'rgba(0,0,0,0)')
        lastW = W; lastH = H
      }
      ctx.fillStyle = cachedGnd
      ctx.fillRect(0, 0, W, H)

      stars.forEach(s => {
        s.y -= s.speed; if(s.y < 0) { s.y = 1; s.x = Math.random() }
        s.twinkle += s.twinkleSpeed
        const op = s.opacity * (0.55 + 0.45 * Math.sin(s.twinkle))
        ctx.beginPath()
        ctx.arc(s.x * W, s.y * H, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,210,185,${op.toFixed(2)})`
        ctx.fill()
      })

      if (--nextShoot <= 0) {
        const idle = shoots.find(s => !s.active)
        if (idle) spawnShoot(idle)
        nextShoot = 90 + Math.random() * 180
      }

      shoots.filter(s => s.active).forEach(s => {
        s.life++
        s.x += Math.cos(s.angle) * s.speed
        s.y += Math.sin(s.angle) * s.speed
        const prog = s.life / s.maxLife
        s.opacity = prog < 0.2 ? prog/0.2 : prog > 0.7 ? (1-prog)/0.3 : 1
        const x1 = s.x * W, y1 = s.y * H
        const x0 = x1 - Math.cos(s.angle) * s.len * W
        const y0 = y1 - Math.sin(s.angle) * s.len * H
        const grad = ctx.createLinearGradient(x0, y0, x1, y1)
        grad.addColorStop(0, `rgba(255,255,255,0)`)
        grad.addColorStop(0.7, `rgba(255,220,200,${(s.opacity * 0.5).toFixed(2)})`)
        grad.addColorStop(1, `rgba(255,255,255,${s.opacity.toFixed(2)})`)
        ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1)
        ctx.strokeStyle = grad; ctx.lineWidth = 1.5; ctx.stroke()
        ctx.beginPath(); ctx.arc(x1, y1, 2, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,240,220,${(s.opacity * 0.9).toFixed(2)})`; ctx.fill()
        if (s.life >= s.maxLife || s.x > 1.1 || s.y > 1.1) s.active = false
      })

      animId = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [mounted])

  return (
    <div className="noise min-h-screen relative overflow-hidden flex flex-col items-center justify-center px-6 py-16">
      <canvas ref={canvasRef} style={{ position:'fixed', inset:0, width:'100%', height:'100%', pointerEvents:'none', zIndex:0 }} />
      <div style={{ position:'fixed', inset:0, zIndex:0, pointerEvents:'none', background:'radial-gradient(ellipse 90% 55% at 50% 100%, rgba(130,12,22,0.55) 0%, transparent 65%)' }} />

      <style>{`
        @keyframes shimmer {
          0%   { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
        @keyframes flicker {
          0%, 95%, 100% { opacity: 1; }
          96% { opacity: 0.4; }
          97% { opacity: 1; }
          98% { opacity: 0.2; }
          99% { opacity: 1; }
        }
      `}</style>

      <div style={{
        position: 'relative', zIndex: 1,
        maxWidth: '820px', width: '100%',
        opacity: mounted ? 1 : 0,
        transform: mounted ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.7s ease'
      }}>
        {/* Badge */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '32px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(108,99,255,0.1)', border: '1px solid rgba(108,99,255,0.25)',
            borderRadius: '100px', padding: '6px 16px',
            fontFamily: 'DM Mono, monospace', fontSize: '11px',
            color: 'var(--accent)', letterSpacing: '2px', textTransform: 'uppercase'
          }}>
            <span style={{
              width: '6px', height: '6px', borderRadius: '50%',
              background: 'var(--accent3)', boxShadow: '0 0 8px var(--accent3)',
              animation: 'pulse-glow 2s infinite'
            }} />
            v1.0 — Powered by Groq AI
          </div>
        </div>

        {/* Heading */}
        <h1 style={{
          fontSize: 'clamp(52px, 10vw, 110px)',
          fontWeight: 900, lineHeight: 1,
          letterSpacing: '-4px', textAlign: 'center',
          marginBottom: '24px', animation: 'flicker 8s infinite',
        }}>
          <span style={{
            display: 'inline',
            background: 'linear-gradient(90deg, #fff8f5 0%, #ffddd0 35%, #ffffff 65%, #ffe8e0 100%)',
            backgroundSize: '200% auto',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            animation: 'shimmer 4s linear infinite',
          }}>Prompt</span><span style={{
            display: 'inline',
            background: 'linear-gradient(90deg, #8B0000 0%, #cc2200 30%, #ff4422 60%, #aa1500 100%)',
            backgroundSize: '200% auto',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            textShadow: '0 0 40px rgba(180,20,20,0.6), 0 0 80px rgba(130,12,20,0.4)',
            animation: 'shimmer 3s linear infinite',
          }}>Lab</span>
        </h1>

        <p style={{
          textAlign: 'center', fontSize: '18px',
          color: 'var(--muted2)', maxWidth: '480px',
          margin: '0 auto 56px', lineHeight: 1.7, fontWeight: 500
        }}>
          Platform latihan interaktif untuk menulis prompt AI yang efektif.
          Dapat feedback langsung, skor real-time, dan saran perbaikan.
        </p>

        {/* Level Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '16px', marginBottom: '16px'
        }}>
          {Object.entries(LEVEL_CONFIG).map(([key, cfg]) => (
            <button
              key={key}
              onClick={() => onSelectLevel(key)}
              onMouseEnter={() => setHovered(key)}
              onMouseLeave={() => setHovered(null)}
              style={{
                background: hovered === key ? `linear-gradient(135deg, ${cfg.bg}, rgba(0,0,0,0.4))` : 'rgba(15,12,12,0.75)',
                border: `1px solid ${hovered === key ? cfg.color + '80' : 'rgba(255,255,255,0.1)'}`,
                borderRadius: '20px', padding: '28px 24px',
                cursor: 'pointer', textAlign: 'left',
                transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
                transform: hovered === key ? 'translateY(-6px)' : 'translateY(0)',
                boxShadow: hovered === key ? `0 20px 40px ${cfg.color}30, inset 0 1px 0 rgba(255,255,255,0.08)` : 'inset 0 1px 0 rgba(255,255,255,0.05)',
                backdropFilter: 'blur(12px)',
                position: 'relative', overflow: 'hidden'
              }}
            >
              <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '80px', height: '80px', borderRadius: '50%', background: cfg.color, filter: 'blur(30px)', opacity: hovered === key ? 0.2 : 0, transition: 'opacity 0.3s' }} />
              <div style={{ fontSize: '28px', marginBottom: '16px' }}>{cfg.emoji}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: cfg.color, boxShadow: `0 0 10px ${cfg.color}` }} />
                <span style={{ fontSize: '18px', fontWeight: 800, color: cfg.color }}>{cfg.label}</span>
              </div>
              <p style={{ fontSize: '14px', color: 'var(--muted2)', lineHeight: 1.5, fontWeight: 500 }}>{cfg.desc}</p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '20px', paddingTop: '16px', borderTop: `1px solid var(--border)` }}>
                <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '11px', color: 'var(--muted)', letterSpacing: '1px' }}>3 TANTANGAN</span>
                <span style={{ fontSize: '18px', transform: hovered === key ? 'translateX(4px)' : 'translateX(0)', transition: 'transform 0.2s', color: cfg.color }}>→</span>
              </div>
            </button>
          ))}
        </div>

        {/* Battle + Optimizer buttons */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
          {/* Battle Mode */}
          <button onClick={() => onSelectLevel('battle')} style={{
            background: 'rgba(15,12,12,0.75)',
            border: '1px solid rgba(255,101,132,0.35)',
            borderRadius: '16px', padding: '20px 24px',
            cursor: 'pointer', display: 'flex',
            alignItems: 'center', justifyContent: 'space-between',
            backdropFilter: 'blur(12px)', transition: 'all 0.3s'
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(255,101,132,0.25)'; e.currentTarget.style.borderColor = 'rgba(255,101,132,0.6)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = 'rgba(255,101,132,0.35)' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '24px' }}></span>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '16px', fontWeight: 800, color: '#ff6584', marginBottom: '2px' }}>Mode Battle</div>
                <div style={{ fontSize: '12px', color: 'var(--muted2)' }}>Adu prompt vs AI</div>
              </div>
            </div>
            <span style={{ fontSize: '18px', color: '#ff6584' }}>→</span>
          </button>

          {/* Prompt Optimizer */}
          <button onClick={() => onSelectLevel('optimizer')} style={{
            background: 'rgba(15,12,12,0.75)',
            border: '1px solid rgba(108,99,255,0.35)',
            borderRadius: '16px', padding: '20px 24px',
            cursor: 'pointer', display: 'flex',
            alignItems: 'center', justifyContent: 'space-between',
            backdropFilter: 'blur(12px)', transition: 'all 0.3s'
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(108,99,255,0.25)'; e.currentTarget.style.borderColor = 'rgba(108,99,255,0.6)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = 'rgba(108,99,255,0.35)' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '24px' }}></span>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--accent)', marginBottom: '2px' }}>Prompt Optimizer</div>
                <div style={{ fontSize: '12px', color: 'var(--muted2)' }}>Bingung nulis prompt? Serahkan pada ahlinya.</div>
              </div>
            </div>
            <span style={{ fontSize: '18px', color: 'var(--accent)' }}>→</span>
          </button>
        </div>

        {/* Stats bar */}
        <div style={{
          display: 'flex', justifyContent: 'center', gap: '48px',
          padding: '20px', background: 'rgba(15,12,12,0.75)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '16px', backdropFilter: 'blur(12px)'
        }}>
          {[
            { num: '9', label: 'Total Tantangan' },
            { num: '3', label: 'Level Kesulitan' },
            { num: 'AI', label: 'Feedback Real-time' }
          ].map(s => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: 900, background: 'linear-gradient(135deg, var(--accent), var(--accent2))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{s.num}</div>
              <div style={{ fontSize: '12px', color: 'var(--muted)', fontFamily: 'DM Mono, monospace', letterSpacing: '0.5px' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}