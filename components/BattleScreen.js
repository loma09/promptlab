import { useState, useEffect, useRef } from 'react'

const ALL_MISSIONS = [
  // MUDAH
  { title: 'Copywriter Dadakan', mission: 'Minta AI menulis tagline produk skincare untuk Gen Z yang catchy dan memorable.', difficulty: 'Mudah' },
  { title: 'Caption Master', mission: 'Minta AI menulis caption Instagram untuk foto makanan di kafe aesthetic, dengan tone santai dan relatable.', difficulty: 'Mudah' },
  { title: 'Nama Bisnis', mission: 'Minta AI memberikan 5 nama bisnis kopi kekinian yang cocok untuk anak muda.', difficulty: 'Mudah' },
  { title: 'Bio Instagram', mission: 'Minta AI menulis bio Instagram untuk seorang freelance designer yang ingin terlihat profesional tapi tetap fun.', difficulty: 'Mudah' },
  { title: 'Pesan Selamat', mission: 'Minta AI menulis pesan ucapan ulang tahun yang tulus dan personal untuk sahabat lama.', difficulty: 'Mudah' },
  { title: 'To-Do List Cerdas', mission: 'Minta AI membuat to-do list harian yang realistis untuk mahasiswa yang punya kelas pagi dan side hustle.', difficulty: 'Mudah' },
  { title: 'Kalimat Pembuka Email', mission: 'Minta AI menulis kalimat pembuka email yang profesional untuk melamar magang di perusahaan startup.', difficulty: 'Mudah' },
  { title: 'Resep Kilat', mission: 'Minta AI memberikan resep makanan sehat yang bisa dibuat dalam 15 menit dengan bahan-bahan yang ada di kulkas.', difficulty: 'Mudah' },

  // SEDANG
  { title: 'Guru Kilat', mission: 'Minta AI menjelaskan konsep compound interest kepada anak SMA dengan analogi yang mudah dipahami.', difficulty: 'Sedang' },
  { title: 'Story Generator', mission: 'Minta AI membuat opening paragraph cerita thriller pendek yang langsung bikin pembaca penasaran.', difficulty: 'Sedang' },
  { title: 'Roast yang Bijak', mission: 'Minta AI me-review portofolio desainer pemula secara jujur tapi tetap membangun dan tidak menjatuhkan.', difficulty: 'Sedang' },
  { title: 'Pitch Elevator', mission: 'Minta AI menulis elevator pitch 30 detik untuk aplikasi pengingat minum air yang unik dan menarik investor.', difficulty: 'Sedang' },
  { title: 'Thread Twitter', mission: 'Minta AI membuat thread Twitter 5 tweet tentang tips mengelola keuangan untuk fresh graduate.', difficulty: 'Sedang' },
  { title: 'Konversi Pembaca', mission: 'Minta AI menulis intro artikel blog yang langsung hook pembaca tentang topik "cara kerja cerdas dari rumah".', difficulty: 'Sedang' },
  { title: 'Negosiasi Halus', mission: 'Minta AI menulis pesan WhatsApp yang sopan tapi tegas untuk menagih pembayaran yang sudah lewat jatuh tempo.', difficulty: 'Sedang' },
  { title: 'Ide Konten Seminggu', mission: 'Minta AI membuat jadwal konten 7 hari untuk akun TikTok tentang personal finance untuk Gen Z.', difficulty: 'Sedang' },

  // SULIT
  { title: 'CV Booster', mission: 'Minta AI menulis deskripsi pengalaman magang di startup tech untuk CV yang impressive dan ATS-friendly.', difficulty: 'Sulit' },
  { title: 'Debater Pro', mission: 'Minta AI memberikan 3 argumen terkuat mendukung 4 hari kerja seminggu untuk presentasi ke manajemen.', difficulty: 'Sulit' },
  { title: 'Analis Bisnis', mission: 'Minta AI menganalisis kelebihan dan kekurangan membuka usaha laundry kiloan di area kos-kosan mahasiswa.', difficulty: 'Sulit' },
  { title: 'Storytelling Brand', mission: 'Minta AI menulis brand story yang emosional dan autentik untuk UMKM batik yang sudah berdiri 30 tahun.', difficulty: 'Sulit' },
  { title: 'Konsultan Karir', mission: 'Minta AI membuat rencana transisi karir dari jurusan teknik ke UX design dalam 6 bulan dengan langkah konkret.', difficulty: 'Sulit' },
  { title: 'Riset Kompetitor', mission: 'Minta AI membuat framework analisis kompetitor untuk startup fintech yang baru akan masuk pasar Indonesia.', difficulty: 'Sulit' },
  { title: 'Pidato Wisuda', mission: 'Minta AI menulis pidato wisuda 2 menit yang inspiratif, jujur tentang struggle, dan tidak klise.', difficulty: 'Sulit' },
  { title: 'Proposal Kreatif', mission: 'Minta AI membuat proposal singkat acara hackathon mahasiswa yang meyakinkan sponsor untuk ikut berpartisipasi.', difficulty: 'Sulit' },
]

function getRandomMissions() {
  const mudah = ALL_MISSIONS.filter(m => m.difficulty === 'Mudah')
  const sedang = ALL_MISSIONS.filter(m => m.difficulty === 'Sedang')
  const sulit = ALL_MISSIONS.filter(m => m.difficulty === 'Sulit')

  const pick = (arr, n) => [...arr].sort(() => Math.random() - 0.5).slice(0, n)

  return [
    ...pick(mudah, 2),
    ...pick(sedang, 2),
    ...pick(sulit, 1),
  ].sort(() => Math.random() - 0.5).map((m, i) => ({ ...m, id: `bm${i}` }))
}

const DIFF_COLOR = { 'Mudah': '#43e97b', 'Sedang': '#facc15', 'Sulit': '#f87171' }

// Particle burst component
function ParticleBurst({ active, winner }) {
  const [particles, setParticles] = useState([])

  useEffect(() => {
    if (!active) return
    const color = winner === 'user' ? '#6c63ff' : winner === 'ai' ? '#f87171' : '#facc15'
    const ps = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: 50 + (Math.random() - 0.5) * 80,
      y: 50 + (Math.random() - 0.5) * 80,
      size: Math.random() * 8 + 4,
      angle: Math.random() * 360,
      speed: Math.random() * 120 + 60,
      color,
      delay: Math.random() * 0.3
    }))
    setParticles(ps)
    const t = setTimeout(() => setParticles([]), 1500)
    return () => clearTimeout(t)
  }, [active, winner])

  if (!particles.length) return null

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 100 }}>
      {particles.map(p => (
        <div key={p.id} style={{
          position: 'absolute',
          left: `${p.x}%`, top: `${p.y}%`,
          width: `${p.size}px`, height: `${p.size}px`,
          borderRadius: Math.random() > 0.5 ? '50%' : '2px',
          background: p.color,
          animation: `particle-fly 1.2s ${p.delay}s ease-out forwards`,
          '--dx': `${Math.cos(p.angle) * p.speed}px`,
          '--dy': `${Math.sin(p.angle) * p.speed}px`,
        }} />
      ))}
      <style>{`
        @keyframes particle-fly {
          0% { opacity: 1; transform: translate(0,0) scale(1); }
          100% { opacity: 0; transform: translate(var(--dx), var(--dy)) scale(0); }
        }
      `}</style>
    </div>
  )
}

// Countdown overlay
function Countdown({ onDone }) {
  const [count, setCount] = useState(3)

  useEffect(() => {
    if (count <= 0) { onDone(); return }
    const t = setTimeout(() => setCount(c => c - 1), 700)
    return () => clearTimeout(t)
  }, [count])

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 50,
      background: 'rgba(6,6,8,0.92)',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      backdropFilter: 'blur(8px)'
    }}>
      <div style={{
        fontSize: '12px', fontFamily: 'DM Mono, monospace',
        letterSpacing: '4px', color: 'var(--muted)',
        textTransform: 'uppercase', marginBottom: '24px'
      }}>Battle dimulai dalam</div>
      <div key={count} style={{
        fontSize: '120px', fontWeight: 900,
        background: 'linear-gradient(135deg, #6c63ff, #ff6584)',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        backgroundClip: 'text', lineHeight: 1,
        animation: 'countdown-pop 0.6s ease',
      }}>
        {count === 0 ? 'GO!' : count}
      </div>
      <style>{`
        @keyframes countdown-pop {
          0% { transform: scale(1.8); opacity: 0; }
          60% { transform: scale(0.95); }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  )
}

// VS Badge
function VSBadge() {
  return (
    <div style={{
      position: 'absolute', left: '50%', top: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: 10, pointerEvents: 'none'
    }}>
      <div style={{
        width: '52px', height: '52px', borderRadius: '50%',
        background: 'var(--bg)', border: '2px solid var(--border2)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '14px', fontWeight: 900, color: 'var(--muted2)',
        fontFamily: 'DM Mono, monospace',
        boxShadow: '0 0 0 4px var(--bg)'
      }}>VS</div>
    </div>
  )
}

export default function BattleScreen({ onBack }) {
  const [phase, setPhase] = useState('select')
  const [mission, setMission] = useState(null)
  const [prompt, setPrompt] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [revealAiPrompt, setRevealAiPrompt] = useState(false)
  const [burstActive, setBurstActive] = useState(false)
  const [timeLeft, setTimeLeft] = useState(60)
  const [timerActive, setTimerActive] = useState(false)
  const [missions, setMissions] = useState(() => getRandomMissions())
  const [shuffling, setShuffling] = useState(false)
  const timerRef = useRef(null)

  const shuffleMissions = () => {
    setShuffling(true)
    setTimeout(() => {
      setMissions(getRandomMissions())
      setShuffling(false)
    }, 300)
  }

  // Timer logic
  useEffect(() => {
    if (!timerActive) return
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(timerRef.current)
          setTimerActive(false)
          handleSubmit()
          return 0
        }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(timerRef.current)
  }, [timerActive])

  const startBattle = (m) => {
    setMission(m)
    setPhase('countdown')
  }

  const onCountdownDone = () => {
    setPhase('writing')
    setTimeLeft(60)
    setTimerActive(true)
  }

  const handleSubmit = async () => {
    clearInterval(timerRef.current)
    setTimerActive(false)
    if (!prompt.trim()) return
    setPhase('loading')
    setError(null)

    try {
      const res = await fetch('/api/battle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userPrompt: prompt, mission: mission.mission })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setResult(data)
      setPhase('result')
      setTimeout(() => { setBurstActive(true); setTimeout(() => setBurstActive(false), 1600) }, 400)
    } catch (e) {
      setError(e.message)
      setPhase('writing')
      setTimerActive(false)
    }
  }

  const reset = () => {
    setPhase('select')
    setMission(null)
    setPrompt('')
    setResult(null)
    setError(null)
    setRevealAiPrompt(false)
    setTimeLeft(60)
    setMissions(getRandomMissions())
  }

  const timerColor = timeLeft > 30 ? '#43e97b' : timeLeft > 10 ? '#facc15' : '#f87171'
  const timerPct = (timeLeft / 60) * 100

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', padding: '32px 20px', position: 'relative', overflow: 'hidden' }}>
      <ParticleBurst active={burstActive} winner={result?.pemenang} />

      {/* BG glow */}
      <div style={{
        position: 'fixed', top: '20%', left: '50%', transform: 'translateX(-50%)',
        width: '600px', height: '300px', borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(255,101,132,0.08) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />

      <div style={{ maxWidth: '860px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
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
        </div>

        {/* PHASE: SELECT MISSION */}
        {phase === 'select' && (
          <div style={{ animation: 'slide-up 0.4s ease' }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '32px' }}>
              <div>
                <h2 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 900, letterSpacing: '-1.5px', marginBottom: '8px' }}>
                  Pilih <span style={{ background: 'linear-gradient(135deg, #ff6584, #ffb347)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Arena</span>
                </h2>
                <p style={{ color: 'var(--muted2)', fontSize: '16px', fontWeight: 500 }}>
                  Prompt kamu vs prompt buatan AI — siapa yang menghasilkan output lebih baik?
                </p>
              </div>
             
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', opacity: shuffling ? 0.4 : 1, transition: 'opacity 0.3s' }}>
              {missions.map((m, i) => (
                <button key={m.id} onClick={() => startBattle(m)} style={{
                  background: 'var(--surface)', border: '1px solid var(--border)',
                  borderRadius: '16px', padding: '20px 24px',
                  cursor: 'pointer', textAlign: 'left',
                  transition: 'all 0.3s', display: 'flex',
                  alignItems: 'center', justifyContent: 'space-between',
                  animation: `slide-up 0.4s ease ${i * 0.07}s both`
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#ff658440'; e.currentTarget.style.transform = 'translateX(4px)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateX(0)' }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                      <span style={{ fontSize: '17px', fontWeight: 800 }}>{m.title}</span>
                      <span style={{
                        fontSize: '10px', fontFamily: 'DM Mono, monospace',
                        color: DIFF_COLOR[m.difficulty],
                        background: `${DIFF_COLOR[m.difficulty]}15`,
                        border: `1px solid ${DIFF_COLOR[m.difficulty]}30`,
                        borderRadius: '100px', padding: '2px 10px', letterSpacing: '1px'
                      }}>{m.difficulty}</span>
                    </div>
                    <p style={{ fontSize: '13px', color: 'var(--muted2)', lineHeight: 1.5 }}>{m.mission}</p>
                  </div>
                  <span style={{ fontSize: '20px', color: 'var(--muted)', flexShrink: 0, marginLeft: '16px' }}>→</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* PHASE: COUNTDOWN */}
        {phase === 'countdown' && <Countdown onDone={onCountdownDone} />}

        {/* PHASE: WRITING */}
        {phase === 'writing' && mission && (
          <div style={{ animation: 'slide-up 0.4s ease' }}>
            {/* Timer bar */}
            <div style={{ marginBottom: '28px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '12px', fontFamily: 'DM Mono, monospace', color: 'var(--muted)', letterSpacing: '1px' }}>WAKTU TERSISA</span>
                <span style={{ fontSize: '24px', fontWeight: 900, color: timerColor, fontFamily: 'DM Mono, monospace', transition: 'color 0.3s' }}>
                  {timeLeft}s
                </span>
              </div>
              <div style={{ height: '4px', background: 'var(--border2)', borderRadius: '2px', overflow: 'hidden' }}>
                <div style={{
                  height: '100%', borderRadius: '2px',
                  background: `linear-gradient(90deg, ${timerColor}, ${timerColor}aa)`,
                  width: `${timerPct}%`,
                  transition: 'width 1s linear, background 0.3s',
                  boxShadow: `0 0 8px ${timerColor}`
                }} />
              </div>
            </div>

            <div style={{
              background: 'rgba(255,101,132,0.05)', border: '1px solid rgba(255,101,132,0.15)',
              borderLeft: '3px solid #ff6584', borderRadius: '16px',
              padding: '20px 24px', marginBottom: '24px'
            }}>
              <div style={{ fontSize: '10px', fontFamily: 'DM Mono, monospace', color: '#ff6584', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '8px' }}>Misi</div>
              <p style={{ fontSize: '17px', fontWeight: 700, lineHeight: 1.6 }}>{mission.mission}</p>
            </div>

            <div style={{
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: '16px', overflow: 'hidden', marginBottom: '14px'
            }}
              onFocusCapture={e => e.currentTarget.style.borderColor = '#ff6584'}
              onBlurCapture={e => e.currentTarget.style.borderColor = 'var(--border)'}
            >
              <div style={{ padding: '12px 16px 0', fontSize: '10px', fontFamily: 'DM Mono, monospace', color: 'var(--muted)', letterSpacing: '2px', textTransform: 'uppercase' }}>
                PROMPT KAMU
              </div>
              <textarea
                value={prompt}
                onChange={e => setPrompt(e.target.value)}
                placeholder="Tulis prompt terbaikmu di sini... AI sudah bersiap!"
                autoFocus
                style={{
                  width: '100%', background: 'none', border: 'none',
                  color: 'var(--text)', fontSize: '14px',
                  padding: '12px 16px 16px', resize: 'none',
                  outline: 'none', minHeight: '160px', lineHeight: 1.7
                }}
              />
            </div>

            {error && (
              <div style={{ background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.2)', borderRadius: '10px', padding: '12px 16px', marginBottom: '14px', fontSize: '13px', color: '#f87171', fontFamily: 'DM Mono, monospace' }}>
                ⚠ {error}
              </div>
            )}

            <button onClick={handleSubmit} disabled={!prompt.trim()} style={{
              width: '100%',
              background: prompt.trim() ? 'linear-gradient(135deg, #ff6584, #ffb347)' : 'var(--surface2)',
              border: 'none', color: prompt.trim() ? 'white' : 'var(--muted)',
              padding: '18px', borderRadius: '14px',
              fontFamily: 'Cabinet Grotesk, sans-serif', fontSize: '16px', fontWeight: 800,
              cursor: prompt.trim() ? 'pointer' : 'not-allowed',
              transition: 'all 0.3s',
              boxShadow: prompt.trim() ? '0 6px 24px rgba(255,101,132,0.35)' : 'none'
            }}>
              Battle Sekarang!
            </button>
          </div>
        )}

        {/* PHASE: LOADING */}
        {phase === 'loading' && (
          <div style={{ textAlign: 'center', padding: '80px 20px', animation: 'fade-in 0.3s ease' }}>
            <div style={{ fontSize: '48px', marginBottom: '24px', animation: 'float 1.5s ease-in-out infinite' }}>⚔️</div>
            <h3 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '12px' }}>Battle sedang berlangsung...</h3>
            <p style={{ color: 'var(--muted2)', fontSize: '15px', marginBottom: '32px' }}>AI sedang menulis promptnya, menjalankan keduanya, dan menentukan pemenang</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
              {['kamu', 'vs', 'AI'].map((t, i) => (
                <div key={t} style={{
                  padding: '8px 16px', borderRadius: '100px',
                  background: t === 'vs' ? 'transparent' : 'var(--surface)',
                  border: t === 'vs' ? 'none' : '1px solid var(--border)',
                  fontSize: '14px', fontWeight: 700,
                  color: t === 'vs' ? 'var(--muted)' : 'var(--text)',
                  animation: `pulse-glow 1.5s ease ${i * 0.2}s infinite`
                }}>{t}</div>
              ))}
            </div>
          </div>
        )}

        {/* PHASE: RESULT */}
        {phase === 'result' && result && (
          <div style={{ animation: 'slide-up 0.5s ease' }}>
            {/* Winner banner */}
            <div style={{
              textAlign: 'center', marginBottom: '32px',
              padding: '32px 24px',
              background: result.pemenang === 'user'
                ? 'radial-gradient(ellipse, rgba(108,99,255,0.15) 0%, transparent 70%)'
                : result.pemenang === 'seri'
                ? 'radial-gradient(ellipse, rgba(250,204,21,0.15) 0%, transparent 70%)'
                : 'radial-gradient(ellipse, rgba(248,113,113,0.15) 0%, transparent 70%)',
              border: `1px solid ${result.pemenang === 'user' ? 'rgba(108,99,255,0.2)' : result.pemenang === 'seri' ? 'rgba(250,204,21,0.2)' : 'rgba(248,113,113,0.2)'}`,
              borderRadius: '24px'
            }}>
              <div style={{ fontSize: '56px', marginBottom: '12px' }}>
                {result.pemenang === 'user' ? '🏆' : result.pemenang === 'seri' ? '🤝' : '🤖'}
              </div>
              <div style={{
                fontSize: 'clamp(28px, 5vw, 42px)', fontWeight: 900, marginBottom: '8px',
                color: result.pemenang === 'user' ? '#6c63ff' : result.pemenang === 'seri' ? '#facc15' : '#f87171'
              }}>
                {result.pemenang === 'user' ? 'Kamu Menang!' : result.pemenang === 'seri' ? 'Seri!' : 'AI Menang!'}
              </div>
              <p style={{ color: 'var(--muted2)', fontSize: '15px', maxWidth: '480px', margin: '0 auto', lineHeight: 1.6 }}>
                {result.alasan}
              </p>
            </div>

            {/* Score comparison */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '12px', alignItems: 'center', marginBottom: '24px' }}>
              {/* User side */}
              <div style={{
                background: 'var(--surface)',
                border: `1px solid ${result.pemenang === 'user' ? 'rgba(108,99,255,0.4)' : 'var(--border)'}`,
                borderRadius: '20px', padding: '24px',
                boxShadow: result.pemenang === 'user' ? '0 0 30px rgba(108,99,255,0.15)' : 'none'
              }}>
                <div style={{ fontSize: '11px', fontFamily: 'DM Mono, monospace', color: 'var(--muted)', letterSpacing: '1px', marginBottom: '12px' }}>
                  {result.pemenang === 'user' ? '🏆 ' : ''}KAMU
                </div>
                <div style={{ fontSize: '48px', fontWeight: 900, color: '#6c63ff', marginBottom: '8px' }}>
                  {result.skor_user}
                </div>
                <p style={{ fontSize: '13px', color: 'var(--muted2)', lineHeight: 1.5 }}>{result.kelebihan_user}</p>
              </div>

              <div style={{ textAlign: 'center', fontFamily: 'DM Mono, monospace', fontWeight: 900, color: 'var(--muted)', fontSize: '18px' }}>VS</div>

              {/* AI side */}
              <div style={{
                background: 'var(--surface)',
                border: `1px solid ${result.pemenang === 'ai' ? 'rgba(248,113,113,0.4)' : 'var(--border)'}`,
                borderRadius: '20px', padding: '24px',
                boxShadow: result.pemenang === 'ai' ? '0 0 30px rgba(248,113,113,0.15)' : 'none'
              }}>
                <div style={{ fontSize: '11px', fontFamily: 'DM Mono, monospace', color: 'var(--muted)', letterSpacing: '1px', marginBottom: '12px' }}>
                  {result.pemenang === 'ai' ? '🏆 ' : ''}AI
                </div>
                <div style={{ fontSize: '48px', fontWeight: 900, color: '#f87171', marginBottom: '8px' }}>
                  {result.skor_ai}
                </div>
                <p style={{ fontSize: '13px', color: 'var(--muted2)', lineHeight: 1.5 }}>{result.kelebihan_ai}</p>
              </div>
            </div>

            {/* Output comparison */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
              <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '16px', overflow: 'hidden' }}>
                <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--border)', background: 'rgba(108,99,255,0.05)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#6c63ff', boxShadow: '0 0 8px #6c63ff' }} />
                  <span style={{ fontSize: '12px', fontFamily: 'DM Mono, monospace', color: '#6c63ff', letterSpacing: '1px' }}>OUTPUT KAMU</span>
                </div>
                <div style={{ padding: '16px', fontSize: '13px', color: 'var(--muted2)', lineHeight: 1.7, maxHeight: '200px', overflowY: 'auto' }}>
                  {result.userOutput}
                </div>
              </div>
              <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '16px', overflow: 'hidden' }}>
                <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--border)', background: 'rgba(248,113,113,0.05)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f87171', boxShadow: '0 0 8px #f87171' }} />
                  <span style={{ fontSize: '12px', fontFamily: 'DM Mono, monospace', color: '#f87171', letterSpacing: '1px' }}>OUTPUT AI</span>
                </div>
                <div style={{ padding: '16px', fontSize: '13px', color: 'var(--muted2)', lineHeight: 1.7, maxHeight: '200px', overflowY: 'auto' }}>
                  {result.aiOutput}
                </div>
              </div>
            </div>

            {/* AI prompt reveal */}
            <div style={{ marginBottom: '16px' }}>
              <button onClick={() => setRevealAiPrompt(o => !o)} style={{
                width: '100%', background: 'var(--surface2)', border: '1px solid var(--border)',
                color: 'var(--text)', padding: '14px', borderRadius: '12px',
                fontFamily: 'Cabinet Grotesk, sans-serif', fontSize: '14px', fontWeight: 700,
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                transition: 'all 0.2s'
              }}>
                <span style={{ transition: 'transform 0.2s', transform: revealAiPrompt ? 'rotate(180deg)' : 'rotate(0)' }}>▼</span>
                {revealAiPrompt ? 'Sembunyikan' : 'Lihat'} prompt yang dipakai AI
              </button>

              {revealAiPrompt && (
                <div style={{
                  background: 'rgba(248,113,113,0.05)', border: '1px solid rgba(248,113,113,0.15)',
                  borderTop: 'none', borderRadius: '0 0 12px 12px',
                  padding: '16px 20px', animation: 'slide-up 0.2s ease'
                }}>
                  <div style={{ fontSize: '10px', fontFamily: 'DM Mono, monospace', color: '#f87171', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '10px' }}>Prompt AI</div>
                  <p style={{ fontFamily: 'DM Mono, monospace', fontSize: '13px', color: 'var(--text)', lineHeight: 1.8, fontStyle: 'italic' }}>{result.aiPrompt}</p>
                </div>
              )}
            </div>

            {/* Lesson */}
            <div style={{
              background: 'rgba(67,233,123,0.05)', border: '1px solid rgba(67,233,123,0.15)',
              borderLeft: '3px solid #43e97b', borderRadius: '16px',
              padding: '18px 22px', marginBottom: '24px'
            }}>
              <div style={{ fontSize: '10px', fontFamily: 'DM Mono, monospace', color: '#43e97b', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '8px' }}>💡 Yang Bisa Dipelajari</div>
              <p style={{ fontSize: '14px', color: 'var(--text)', lineHeight: 1.7 }}>{result.pelajaran}</p>
            </div>

            {/* Action buttons */}
            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={reset} style={{
                flex: 1, background: 'var(--surface2)', border: '1px solid var(--border)',
                color: 'var(--text)', padding: '14px', borderRadius: '12px',
                fontFamily: 'Cabinet Grotesk, sans-serif', fontSize: '15px', fontWeight: 700,
                cursor: 'pointer', transition: 'all 0.2s'
              }}
                onMouseEnter={e => e.target.style.borderColor = '#ff6584'}
                onMouseLeave={e => e.target.style.borderColor = 'var(--border)'}
              >Tantang Lagi</button>
              <button onClick={onBack} style={{
                flex: 1, background: 'linear-gradient(135deg, var(--accent), #9c6dff)',
                border: 'none', color: 'white', padding: '14px', borderRadius: '12px',
                fontFamily: 'Cabinet Grotesk, sans-serif', fontSize: '15px', fontWeight: 700,
                cursor: 'pointer', transition: 'all 0.3s',
                boxShadow: '0 4px 20px rgba(108,99,255,0.3)'
              }}>Kembali ke Latihan</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
