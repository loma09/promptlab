import ScoreCircle from './ScoreCircle'

export default function FeedbackPanel({ result, onRetry, onNext, isLast }) {
  const scoreColor = result.skor >= 80 ? '#43e97b' : result.skor >= 60 ? '#facc15' : '#f87171'

  return (
    <div style={{ animation: 'slide-up 0.5s ease forwards' }}>
      {/* Score row */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '20px',
        background: 'var(--surface)', border: '1px solid var(--border)',
        borderRadius: '20px', padding: '24px', marginBottom: '16px'
      }}>
        <ScoreCircle score={result.skor} />
        <div>
          <div style={{
            fontSize: '22px', fontWeight: 900, color: scoreColor, marginBottom: '4px'
          }}>{result.grade}</div>
          <div style={{
            fontSize: '14px', color: 'var(--muted2)', lineHeight: 1.6, maxWidth: '400px'
          }}>{result.ringkasan}</div>
        </div>
      </div>

      {/* Positif / Negatif */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
        <div style={{
          background: 'rgba(67,233,123,0.05)', border: '1px solid rgba(67,233,123,0.15)',
          borderRadius: '16px', padding: '18px'
        }}>
          <div style={{
            fontSize: '10px', fontFamily: 'DM Mono, monospace',
            color: '#43e97b', letterSpacing: '1.5px', textTransform: 'uppercase',
            marginBottom: '8px'
          }}>✓ Yang Sudah Bagus</div>
          <p style={{ fontSize: '13px', color: 'var(--muted2)', lineHeight: 1.6 }}>{result.positif}</p>
        </div>
        <div style={{
          background: 'rgba(248,113,113,0.05)', border: '1px solid rgba(248,113,113,0.15)',
          borderRadius: '16px', padding: '18px'
        }}>
          <div style={{
            fontSize: '10px', fontFamily: 'DM Mono, monospace',
            color: '#f87171', letterSpacing: '1.5px', textTransform: 'uppercase',
            marginBottom: '8px'
          }}>✗ Perlu Diperbaiki</div>
          <p style={{ fontSize: '13px', color: 'var(--muted2)', lineHeight: 1.6 }}>{result.negatif}</p>
        </div>
      </div>

      {/* Improved version */}
      <div style={{
        background: 'var(--surface2)',
        border: '1px solid var(--border)',
        borderLeft: '3px solid #43e97b',
        borderRadius: '16px', padding: '20px 24px', marginBottom: '20px'
      }}>
        <div style={{
          fontSize: '10px', fontFamily: 'DM Mono, monospace',
          color: '#43e97b', letterSpacing: '1.5px', textTransform: 'uppercase',
          marginBottom: '10px'
        }}>💡 Versi yang Lebih Baik</div>
        <p style={{
          fontFamily: 'DM Mono, monospace', fontSize: '13px',
          color: 'var(--text)', lineHeight: 1.8, fontStyle: 'italic'
        }}>{result.versi_diperbaiki}</p>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: '12px' }}>
        <button onClick={onRetry} style={{
          flex: 1, background: 'var(--surface2)', border: '1px solid var(--border)',
          color: 'var(--text)', padding: '14px', borderRadius: '12px',
          fontFamily: 'Cabinet Grotesk, sans-serif', fontSize: '15px', fontWeight: 700,
          cursor: 'pointer', transition: 'all 0.2s'
        }}
          onMouseEnter={e => e.target.style.borderColor = 'var(--accent)'}
          onMouseLeave={e => e.target.style.borderColor = 'var(--border)'}
        >Coba Lagi</button>
        <button onClick={onNext} style={{
          flex: 2, background: 'linear-gradient(135deg, var(--accent), #9c6dff)',
          border: 'none', color: 'white', padding: '14px', borderRadius: '12px',
          fontFamily: 'Cabinet Grotesk, sans-serif', fontSize: '15px', fontWeight: 700,
          cursor: 'pointer', transition: 'all 0.3s',
          boxShadow: '0 4px 20px rgba(108,99,255,0.3)'
        }}
          onMouseEnter={e => { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 8px 28px rgba(108,99,255,0.5)' }}
          onMouseLeave={e => { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = '0 4px 20px rgba(108,99,255,0.3)' }}
        >
          {isLast ? 'Lihat Hasil 🎉' : 'Tantangan Berikutnya →'}
        </button>
      </div>
    </div>
  )
}
