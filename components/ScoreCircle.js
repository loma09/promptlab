import { useEffect, useState } from 'react'

export default function ScoreCircle({ score }) {
  const [animated, setAnimated] = useState(false)
  const r = 36
  const circumference = 2 * Math.PI * r
  const offset = animated ? circumference - (score / 100) * circumference : circumference

  const color = score >= 80 ? '#43e97b' : score >= 60 ? '#facc15' : '#f87171'

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 100)
    return () => clearTimeout(t)
  }, [])

  return (
    <div style={{ position: 'relative', width: '88px', height: '88px', flexShrink: 0 }}>
      <svg width="88" height="88" viewBox="0 0 88 88" style={{ transform: 'rotate(-90deg)' }}>
        <circle cx="44" cy="44" r={r} fill="none" stroke="var(--border2)" strokeWidth="6" />
        <circle
          cx="44" cy="44" r={r}
          fill="none"
          stroke={color}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1)', filter: `drop-shadow(0 0 6px ${color})` }}
        />
      </svg>
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center'
      }}>
        <span style={{ fontSize: '22px', fontWeight: 900, color, lineHeight: 1 }}>{score}</span>
        <span style={{ fontSize: '9px', color: 'var(--muted)', fontFamily: 'DM Mono, monospace' }}>/100</span>
      </div>
    </div>
  )
}
