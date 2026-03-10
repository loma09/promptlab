import { useEffect, useState } from 'react'
import { LEVEL_CONFIG, CHALLENGES } from '../lib/challenges'

export default function CompleteScreen({ data, onHome, onRetry }) {
  const [mounted, setMounted] = useState(false)
  const { level, scores, avg } = data
  const cfg = LEVEL_CONFIG[level]

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100)
    return () => clearTimeout(t)
  }, [])

  const emoji = avg >= 80 ? '🏆' : avg >= 60 ? '🎉' : '💪'
  const title = avg >= 80 ? 'Luar Biasa!' : avg >= 60 ? 'Kerja Bagus!' : 'Terus Berlatih!'
  const sub = avg >= 80
    ? 'Skill prompt kamu sudah solid. Coba level berikutnya!'
    : avg >= 60
    ? 'Kamu sudah memahami dasarnya. Latihan lebih banyak lagi!'
    : 'Prompt writing butuh latihan. Jangan menyerah!'

  const nextLevel = level === 'beginner' ? 'intermediate' : level === 'intermediate' ? 'advanced' : null
  const nextCfg = nextLevel ? LEVEL_CONFIG[nextLevel] : null

  return (
    <div style={{
      minHeight: '100vh', background: 'var(--bg)',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '40px 20px', textAlign: 'center',
      position: 'relative', overflow: 'hidden'
    }}>
      {/* Confetti-like blobs */}
      {mounted && [cfg.color, '#ff6584', '#43e97b', '#facc15'].map((c, i) => (
        <div key={i} style={{
          position: 'fixed',
          top: `${20 + i * 20}%`, left: `${10 + i * 25}%`,
          width: `${60 + i * 20}px`, height: `${60 + i * 20}px`,
          borderRadius: '50%', background: c,
          filter: 'blur(40px)', opacity: 0.08,
          animation: `float ${4 + i}s ease-in-out ${i * 0.5}s infinite`,
          pointerEvents: 'none'
        }} />
      ))}

      <div style={{
        maxWidth: '560px', width: '100%', position: 'relative', zIndex: 1,
        opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(24px)',
        transition: 'all 0.6s ease'
      }}>
        <div style={{ fontSize: '72px', marginBottom: '24px', animation: 'float 3s ease-in-out infinite' }}>
          {emoji}
        </div>

        <h1 style={{
          fontSize: 'clamp(40px, 7vw, 64px)', fontWeight: 900,
          letterSpacing: '-2px', marginBottom: '12px'
        }}>{title}</h1>

        <p style={{
          color: 'var(--muted2)', fontSize: '17px', lineHeight: 1.7,
          marginBottom: '40px', fontWeight: 500
        }}>{sub}</p>

        {/* Score cards */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '12px', marginBottom: '16px'
        }}>
          {scores.map((s, i) => {
            const c = s >= 80 ? '#43e97b' : s >= 60 ? '#facc15' : '#f87171'
            return (
              <div key={i} style={{
                background: 'var(--surface)', border: '1px solid var(--border)',
                borderRadius: '16px', padding: '20px'
              }}>
                <div style={{
                  fontSize: '10px', fontFamily: 'DM Mono, monospace',
                  color: 'var(--muted)', marginBottom: '8px', letterSpacing: '1px'
                }}>TANTANGAN {i + 1}</div>
                <div style={{ fontSize: '32px', fontWeight: 900, color: c }}>{s}</div>
              </div>
            )
          })}
        </div>

        {/* Avg */}
        <div style={{
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: '16px', padding: '24px', marginBottom: '32px'
        }}>
          <div style={{
            fontSize: '11px', fontFamily: 'DM Mono, monospace',
            color: 'var(--muted)', letterSpacing: '1.5px', marginBottom: '8px'
          }}>RATA-RATA SKOR</div>
          <div style={{
            fontSize: '56px', fontWeight: 900,
            background: `linear-gradient(135deg, ${cfg.color}, var(--accent2))`,
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            backgroundClip: 'text', lineHeight: 1
          }}>{avg}</div>
        </div>

        {/* Action buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {nextLevel && (
            <button onClick={() => onHome(nextLevel)} style={{
              background: `linear-gradient(135deg, ${nextCfg.color}cc, ${nextCfg.color})`,
              border: 'none', color: 'white', padding: '16px',
              borderRadius: '14px', fontFamily: 'Cabinet Grotesk, sans-serif',
              fontSize: '16px', fontWeight: 800, cursor: 'pointer',
              transition: 'all 0.3s',
              boxShadow: `0 6px 24px ${nextCfg.color}30`
            }}
              onMouseEnter={e => { e.target.style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { e.target.style.transform = 'translateY(0)' }}
            >
              Lanjut ke {nextCfg.label} {nextCfg.emoji}
            </button>
          )}
          <div style={{ display: 'flex', gap: '12px' }}>
            <button onClick={onRetry} style={{
              flex: 1, background: 'var(--surface2)', border: '1px solid var(--border)',
              color: 'var(--text)', padding: '14px', borderRadius: '12px',
              fontFamily: 'Cabinet Grotesk, sans-serif', fontSize: '15px', fontWeight: 700,
              cursor: 'pointer', transition: 'all 0.2s'
            }}
              onMouseEnter={e => e.target.style.borderColor = 'var(--accent)'}
              onMouseLeave={e => e.target.style.borderColor = 'var(--border)'}
            >Ulangi Level</button>
            <button onClick={() => onHome(null)} style={{
              flex: 1, background: 'var(--surface2)', border: '1px solid var(--border)',
              color: 'var(--text)', padding: '14px', borderRadius: '12px',
              fontFamily: 'Cabinet Grotesk, sans-serif', fontSize: '15px', fontWeight: 700,
              cursor: 'pointer', transition: 'all 0.2s'
            }}
              onMouseEnter={e => e.target.style.borderColor = 'var(--accent)'}
              onMouseLeave={e => e.target.style.borderColor = 'var(--border)'}
            >Pilih Level Lain</button>
          </div>
        </div>
      </div>
    </div>
  )
}
