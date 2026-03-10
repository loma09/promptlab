import { useState } from 'react'

export default function OptimizerScreen({ onBack }) {
  const [prompt, setPrompt] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [copied, setCopied] = useState(false)

  const handleOptimize = async () => {
    if (!prompt.trim()) return
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const res = await fetch('/api/optimize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userPrompt: prompt })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setResult(data)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(result.prompt_optimal)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleReset = () => {
    setPrompt('')
    setResult(null)
    setError(null)
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', padding: '32px 20px', position: 'relative', overflow: 'hidden' }}>

      {/* BG glow */}
      <div style={{
        position: 'fixed', top: '20%', left: '50%', transform: 'translateX(-50%)',
        width: '600px', height: '300px', borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(108,99,255,0.08) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />

      <div style={{ maxWidth: '760px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* Top bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '40px' }}>
          <button onClick={onBack} style={{
            background: 'none', border: '1px solid var(--border)',
            color: 'var(--muted2)', padding: '8px 16px', borderRadius: '10px',
            cursor: 'pointer', fontFamily: 'Cabinet Grotesk, sans-serif',
            fontSize: '14px', fontWeight: 600, transition: 'all 0.2s'
          }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
          >← Kembali</button>

          <div style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            background: 'rgba(108,99,255,0.08)', border: '1px solid rgba(108,99,255,0.2)',
            borderRadius: '100px', padding: '6px 16px',
            fontSize: '12px', fontFamily: 'DM Mono, monospace',
            color: 'var(--accent)', letterSpacing: '1px'
          }}> PROMPT OPTIMIZER</div>
        </div>

        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{
            fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 900,
            letterSpacing: '-1.5px', marginBottom: '8px'
          }}>
            Optimalkan{' '}
            <span style={{
              background: 'linear-gradient(135deg, var(--accent), #9c6dff)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'
            }}>Promptmu</span>
          </h2>
          <p style={{ color: 'var(--muted2)', fontSize: '16px', fontWeight: 500 }}>
            Tulis prompt kasar kamu, AI akan mengoptimalkannya dan menjelaskan perubahannya.
          </p>
        </div>

        {/* Input */}
        <div style={{
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: '16px', overflow: 'hidden', marginBottom: '14px',
          transition: 'border-color 0.2s'
        }}
          onFocusCapture={e => e.currentTarget.style.borderColor = 'var(--accent)'}
          onBlurCapture={e => e.currentTarget.style.borderColor = 'var(--border)'}
        >
          <div style={{ padding: '12px 16px 0', fontSize: '10px', fontFamily: 'DM Mono, monospace', color: 'var(--muted)', letterSpacing: '2px', textTransform: 'uppercase' }}>
            PROMPT KAMU
          </div>
          <textarea
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            placeholder="Contoh: buatkan saya cerita tentang naga..."
            style={{
              width: '100%', background: 'none', border: 'none',
              color: 'var(--text)', fontSize: '15px',
              padding: '12px 16px 16px', resize: 'none',
              outline: 'none', minHeight: '140px', lineHeight: 1.7,
              fontFamily: 'Cabinet Grotesk, sans-serif'
            }}
          />
          <div style={{ padding: '0 16px 12px', display: 'flex', justifyContent: 'flex-end' }}>
            <span style={{ fontSize: '12px', fontFamily: 'DM Mono, monospace', color: 'var(--muted)' }}>
              {prompt.length} karakter
            </span>
          </div>
        </div>

        {error && (
          <div style={{ background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.2)', borderRadius: '10px', padding: '12px 16px', marginBottom: '14px', fontSize: '13px', color: '#f87171', fontFamily: 'DM Mono, monospace' }}>
            ⚠ {error}
          </div>
        )}

        {/* Optimize button */}
        <button onClick={handleOptimize} disabled={!prompt.trim() || loading} style={{
          width: '100%', marginBottom: '32px',
          background: prompt.trim() && !loading ? 'linear-gradient(135deg, var(--accent), #9c6dff)' : 'var(--surface2)',
          border: 'none', color: prompt.trim() && !loading ? 'white' : 'var(--muted)',
          padding: '18px', borderRadius: '14px',
          fontFamily: 'Cabinet Grotesk, sans-serif', fontSize: '16px', fontWeight: 800,
          cursor: prompt.trim() && !loading ? 'pointer' : 'not-allowed',
          transition: 'all 0.3s',
          boxShadow: prompt.trim() && !loading ? '0 6px 24px rgba(108,99,255,0.35)' : 'none'
        }}>
          {loading ? ' Sedang mengoptimalkan...' : ' Optimalkan Prompt'}
        </button>

        {/* Loading state */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '40px 20px', animation: 'fade-in 0.3s ease' }}>
            <div style={{ fontSize: '40px', marginBottom: '16px', animation: 'float 1.5s ease-in-out infinite' }}>🧪</div>
            <p style={{ color: 'var(--muted2)', fontSize: '15px' }}>AI sedang menganalisis dan memperbaiki promptmu...</p>
          </div>
        )}

        {/* Result */}
        {result && !loading && (
          <div style={{ animation: 'slide-up 0.4s ease' }}>

            {/* Optimal prompt */}
            <div style={{
              background: 'rgba(108,99,255,0.06)', border: '1px solid rgba(108,99,255,0.25)',
              borderRadius: '20px', overflow: 'hidden', marginBottom: '20px'
            }}>
              <div style={{
                padding: '16px 20px', borderBottom: '1px solid rgba(108,99,255,0.15)',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent)', boxShadow: '0 0 8px var(--accent)' }} />
                  <span style={{ fontSize: '12px', fontFamily: 'DM Mono, monospace', color: 'var(--accent)', letterSpacing: '1px' }}>PROMPT OPTIMAL</span>
                </div>
                <button onClick={handleCopy} style={{
                  background: copied ? 'rgba(67,233,123,0.1)' : 'rgba(108,99,255,0.1)',
                  border: `1px solid ${copied ? 'rgba(67,233,123,0.3)' : 'rgba(108,99,255,0.3)'}`,
                  color: copied ? '#43e97b' : 'var(--accent)',
                  padding: '6px 14px', borderRadius: '8px',
                  fontFamily: 'Cabinet Grotesk, sans-serif', fontSize: '13px', fontWeight: 700,
                  cursor: 'pointer', transition: 'all 0.2s'
                }}>
                  {copied ? '✓ Tersalin!' : ' Salin'}
                </button>
              </div>
              <div style={{ padding: '20px', fontSize: '15px', color: 'var(--text)', lineHeight: 1.8, fontStyle: 'italic' }}>
                "{result.prompt_optimal}"
              </div>
            </div>

            {/* Ringkasan */}
            <div style={{
              background: 'rgba(67,233,123,0.05)', border: '1px solid rgba(67,233,123,0.15)',
              borderLeft: '3px solid #43e97b', borderRadius: '16px',
              padding: '16px 20px', marginBottom: '20px'
            }}>
              <div style={{ fontSize: '10px', fontFamily: 'DM Mono, monospace', color: '#43e97b', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '8px' }}>💡 Kenapa Lebih Baik</div>
              <p style={{ fontSize: '14px', color: 'var(--text)', lineHeight: 1.7 }}>{result.ringkasan}</p>
            </div>

            {/* Perubahan detail */}
            <div style={{ marginBottom: '28px' }}>
              <div style={{ fontSize: '10px', fontFamily: 'DM Mono, monospace', color: 'var(--muted)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '14px' }}>
                DETAIL PERUBAHAN
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {result.perubahan?.map((p, i) => (
                  <div key={i} style={{
                    background: 'var(--surface)', border: '1px solid var(--border)',
                    borderRadius: '14px', padding: '16px 18px',
                    display: 'flex', gap: '14px', alignItems: 'flex-start'
                  }}>
                    <div style={{
                      width: '28px', height: '28px', borderRadius: '8px', flexShrink: 0,
                      background: 'rgba(108,99,255,0.1)', border: '1px solid rgba(108,99,255,0.2)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '12px', fontWeight: 900, color: 'var(--accent)',
                      fontFamily: 'DM Mono, monospace'
                    }}>{i + 1}</div>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text)', marginBottom: '4px' }}>{p.aspek}</div>
                      <div style={{ fontSize: '13px', color: 'var(--muted2)', lineHeight: 1.6 }}>{p.penjelasan}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={handleReset} style={{
                flex: 1, background: 'var(--surface2)', border: '1px solid var(--border)',
                color: 'var(--text)', padding: '14px', borderRadius: '12px',
                fontFamily: 'Cabinet Grotesk, sans-serif', fontSize: '15px', fontWeight: 700,
                cursor: 'pointer', transition: 'all 0.2s'
              }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
              >Coba Prompt Lain </button>
              <button onClick={() => { setPrompt(result.prompt_optimal); setResult(null) }} style={{
                flex: 1, background: 'linear-gradient(135deg, var(--accent), #9c6dff)',
                border: 'none', color: 'white', padding: '14px', borderRadius: '12px',
                fontFamily: 'Cabinet Grotesk, sans-serif', fontSize: '15px', fontWeight: 700,
                cursor: 'pointer', transition: 'all 0.3s',
                boxShadow: '0 4px 20px rgba(108,99,255,0.3)'
              }}>Sesuaikan Lagi</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}