import { useState } from 'react'
import { getRandomChallenges, LEVEL_CONFIG } from '../lib/challenges'
import FeedbackPanel from './FeedbackPanel'

export default function ChallengeScreen({ level, onBack, onComplete }) {
  const [idx, setIdx] = useState(0)
  const [prompt, setPrompt] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [scores, setScores] = useState([])
  const [tipsOpen, setTipsOpen] = useState(false)
  const [error, setError] = useState(null)
  const [challenges] = useState(() => getRandomChallenges(level))
  const cfg = LEVEL_CONFIG[level]
  const challenge = challenges[idx]
  const total = challenges.length
  const isLast = idx >= total - 1

  const handleSubmit = async () => {
    if (!prompt.trim() || loading) return
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, mission: challenge.mission })
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Terjadi kesalahan')
      setResult(data)
      setScores(prev => [...prev, data.skor])
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  const handleRetry = () => {
    setResult(null)
    setPrompt('')
    setScores(prev => prev.slice(0, -1))
  }

  const handleNext = () => {
    if (isLast) {
      const finalScores = [...scores]
      const avg = Math.round(finalScores.reduce((a, b) => a + b, 0) / finalScores.length)
      onComplete({ level, scores: finalScores, avg })
    } else {
      setIdx(i => i + 1)
      setResult(null)
      setPrompt('')
      setTipsOpen(false)
      setError(null)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg)',
      padding: '32px 20px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Subtle bg glow */}
      <div style={{
        position: 'fixed', top: '10%', right: '-5%',
        width: '400px', height: '400px', borderRadius: '50%',
        background: `radial-gradient(circle, ${cfg.color}15 0%, transparent 70%)`,
        pointerEvents: 'none'
      }} />

      <div style={{ maxWidth: '720px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Top bar */}
        <div style={{
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', marginBottom: '40px'
        }}>
          <button onClick={onBack} style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            background: 'none', border: '1px solid var(--border)',
            color: 'var(--muted2)', padding: '8px 16px', borderRadius: '10px',
            cursor: 'pointer', fontFamily: 'Cabinet Grotesk, sans-serif',
            fontSize: '14px', fontWeight: 600, transition: 'all 0.2s'
          }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
          >← Kembali</button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{
              fontFamily: 'DM Mono, monospace', fontSize: '13px', color: 'var(--muted)'
            }}>{idx + 1} / {total}</span>
            <div style={{ display: 'flex', gap: '6px' }}>
              {Array.from({ length: total }, (_, i) => (
                <div key={i} style={{
                  width: i === idx ? '20px' : '8px',
                  height: '8px', borderRadius: '4px',
                  background: i < idx ? cfg.color : i === idx ? cfg.color : 'var(--border2)',
                  boxShadow: i === idx ? `0 0 8px ${cfg.color}` : 'none',
                  transition: 'all 0.3s'
                }} />
              ))}
            </div>
          </div>
        </div>

        {/* Level + concept tag */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
          <span style={{
            background: cfg.bg, border: `1px solid ${cfg.border}`,
            color: cfg.color, borderRadius: '100px',
            padding: '4px 14px', fontSize: '11px',
            fontFamily: 'DM Mono, monospace', letterSpacing: '1px', textTransform: 'uppercase'
          }}>{cfg.label}</span>
          <span style={{
            background: 'var(--surface2)', border: '1px solid var(--border)',
            color: 'var(--muted2)', borderRadius: '100px',
            padding: '4px 14px', fontSize: '11px',
            fontFamily: 'DM Mono, monospace', letterSpacing: '1px', textTransform: 'uppercase'
          }}>{challenge.concept}</span>
        </div>

        {/* Title & desc */}
        <h2 style={{
          fontSize: 'clamp(28px, 5vw, 40px)', fontWeight: 900,
          lineHeight: 1.15, marginBottom: '12px', letterSpacing: '-1px'
        }}>{challenge.title}</h2>
        <p style={{
          color: 'var(--muted2)', fontSize: '16px', lineHeight: 1.7,
          marginBottom: '28px', fontWeight: 500
        }}>{challenge.desc}</p>

        {/* Mission box */}
        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderLeft: `3px solid ${cfg.color}`,
          borderRadius: '16px', padding: '20px 24px', marginBottom: '20px'
        }}>
          <div style={{
            fontSize: '10px', fontFamily: 'DM Mono, monospace',
            color: cfg.color, letterSpacing: '2px',
            textTransform: 'uppercase', marginBottom: '10px'
          }}>Misi</div>
          <p style={{ fontSize: '16px', fontWeight: 700, lineHeight: 1.6 }}>{challenge.mission}</p>
        </div>

        {/* Tips toggle */}
        <button onClick={() => setTipsOpen(o => !o)} style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          background: 'none', border: 'none', color: 'var(--muted2)',
          fontFamily: 'Cabinet Grotesk, sans-serif', fontSize: '14px',
          fontWeight: 600, cursor: 'pointer', marginBottom: '12px',
          padding: '4px 0', transition: 'color 0.2s'
        }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--muted2)'}
        >
          <span style={{ transition: 'transform 0.2s', transform: tipsOpen ? 'rotate(90deg)' : 'rotate(0)' }}>▶</span>
          {tipsOpen ? 'Sembunyikan tips' : 'Lihat tips'}
        </button>

        {tipsOpen && (
          <div style={{
            background: 'var(--surface2)', border: '1px solid var(--border)',
            borderRadius: '14px', padding: '16px 20px', marginBottom: '20px',
            animation: 'slide-up 0.2s ease'
          }}>
            {challenge.tips.map((tip, i) => (
              <div key={i} style={{
                display: 'flex', gap: '10px',
                marginBottom: i < challenge.tips.length - 1 ? '10px' : 0
              }}>
                <span style={{ color: cfg.color, fontWeight: 700, flexShrink: 0 }}>→</span>
                <span style={{ fontSize: '14px', color: 'var(--muted2)', lineHeight: 1.6 }}>{tip}</span>
              </div>
            ))}
          </div>
        )}

        {/* Text input */}
        {!result && (
          <div>
            <div style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: '16px', overflow: 'hidden', marginBottom: '14px',
              transition: 'border-color 0.2s'
            }}
              onFocusCapture={e => e.currentTarget.style.borderColor = 'var(--accent)'}
              onBlurCapture={e => e.currentTarget.style.borderColor = 'var(--border)'}
            >
              <div style={{
                padding: '12px 16px 0',
                fontSize: '10px', fontFamily: 'DM Mono, monospace',
                color: 'var(--muted)', letterSpacing: '2px', textTransform: 'uppercase'
              }}>PROMPT KAMU</div>
              <textarea
                value={prompt}
                onChange={e => setPrompt(e.target.value)}
                placeholder={challenge.placeholder}
                style={{
                  width: '100%', background: 'none', border: 'none',
                  color: 'var(--text)', fontSize: '14px',
                  padding: '12px 16px 16px', resize: 'none',
                  outline: 'none', minHeight: '140px', lineHeight: 1.7
                }}
              />
            </div>

            {error && (
              <div style={{
                background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.2)',
                borderRadius: '10px', padding: '12px 16px', marginBottom: '14px',
                fontSize: '13px', color: '#f87171', fontFamily: 'DM Mono, monospace'
              }}>⚠ {error}</div>
            )}

            <button
              onClick={handleSubmit}
              disabled={!prompt.trim() || loading}
              style={{
                width: '100%',
                background: loading || !prompt.trim()
                  ? 'var(--surface2)'
                  : 'linear-gradient(135deg, var(--accent) 0%, #9c6dff 100%)',
                border: 'none', color: loading || !prompt.trim() ? 'var(--muted)' : 'white',
                padding: '18px', borderRadius: '14px',
                fontFamily: 'Cabinet Grotesk, sans-serif',
                fontSize: '16px', fontWeight: 800,
                cursor: loading || !prompt.trim() ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s',
                boxShadow: loading || !prompt.trim() ? 'none' : '0 6px 24px rgba(108,99,255,0.35)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px'
              }}
            >
              {loading ? (
                <>
                  <div style={{
                    width: '18px', height: '18px',
                    border: '2px solid rgba(255,255,255,0.3)',
                    borderTopColor: 'white', borderRadius: '50%',
                    animation: 'spin-slow 0.8s linear infinite'
                  }} />
                  Menganalisis prompt...
                </>
              ) : 'Kirim & Evaluasi →'}
            </button>
          </div>
        )}

        {/* Feedback */}
        {result && (
          <FeedbackPanel
            result={result}
            onRetry={handleRetry}
            onNext={handleNext}
            isLast={isLast}
          />
        )}
      </div>
    </div>
  )
}
