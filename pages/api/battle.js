export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { userPrompt, mission, level } = req.body
  if (!userPrompt || !mission) return res.status(400).json({ error: 'Missing fields' })

  const apiKey = process.env.GROQ_API_KEY
  if (!apiKey) return res.status(500).json({ error: 'API key not configured' })

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`
  }

  const groq = async (messages, max_tokens = 800) => {
    const r = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers,
      body: JSON.stringify({ model: 'llama-3.3-70b-versatile', messages, temperature: 0.7, max_tokens })
    })
    const d = await r.json()
    if (!r.ok) throw new Error(d.error?.message || 'Groq error')
    return d.choices[0].message.content.trim()
  }

  // AI handicap sesuai level
  const levelHint = {
    beginner: 'Tulis prompt yang SANGAT sederhana, maksimal 1-2 kalimat pendek saja. Jangan terlalu detail atau terstruktur.',
    sedang: 'Tulis prompt yang cukup baik tapi tidak perlu sangat detail. Boleh 2-3 kalimat.',
    sulit: 'Tulis prompt yang optimal, terstruktur, dan detail.'
  }[level] || 'Tulis prompt yang sederhana, maksimal 2 kalimat.'

  try {
    // Step 1: Generate AI's prompt sesuai level
    const aiPrompt = await groq([
      {
        role: 'system',
        content: `Kamu menulis prompt AI untuk menyelesaikan misi. ${levelHint} Tulis HANYA promptnya saja — tanpa penjelasan, tanpa label, langsung isi prompt-nya.`
      },
      {
        role: 'user',
        content: `Misi: ${mission}\n\nTulis prompt untuk misi ini dalam Bahasa Indonesia.`
      }
    ], 300)

    // Step 2: Run user's prompt
    const userOutput = await groq([
      { role: 'user', content: userPrompt }
    ], 500)

    // Step 3: Run AI's prompt
    const aiOutput = await groq([
      { role: 'user', content: aiPrompt }
    ], 500)

    // Step 4: Judge both — fair, tidak bias panjang
    const judgement = await groq([
      {
        role: 'system',
        content: `Kamu adalah juri yang mengevaluasi dua prompt AI secara objektif.
Nilai berdasarkan SEBERAPA TEPAT prompt menjawab misi, bukan panjang atau kompleksitasnya.
Prompt pendek yang efektif BISA menang vs prompt panjang yang bertele-tele.
Yang dinilai: relevansi, kejelasan tujuan, dan kualitas output yang dihasilkan.
Balas HANYA dalam format JSON (tanpa markdown, tanpa backtick):
{
  "skor_user": <0-100>,
  "skor_ai": <0-100>,
  "pemenang": "<user|ai|seri>",
  "alasan": "<penjelasan singkat kenapa siapa yang menang, 2-3 kalimat>",
  "kelebihan_user": "<kelebihan prompt user>",
  "kelebihan_ai": "<kelebihan prompt AI>",
  "pelajaran": "<apa yang bisa dipelajari user dari battle ini>"
}`
      },
      {
        role: 'user',
        content: `Misi: ${mission}

PROMPT A (User):
"${userPrompt}"

OUTPUT A:
"${userOutput}"

PROMPT B (AI):
"${aiPrompt}"

OUTPUT B:
"${aiOutput}"

Evaluasi kedua prompt dan outputnya secara adil. Nilai dalam Bahasa Indonesia.`
      }
    ], 600)

    let parsed
    try {
      parsed = JSON.parse(judgement.replace(/```json|```/g, '').trim())
    } catch {
      parsed = {
        skor_user: 65, skor_ai: 75, pemenang: 'ai',
        alasan: 'Prompt AI sedikit lebih tepat sasaran.',
        kelebihan_user: 'Prompt user cukup jelas dan relevan.',
        kelebihan_ai: 'Prompt AI lebih spesifik ke inti misi.',
        pelajaran: 'Coba fokus ke inti misi tanpa bertele-tele.'
      }
    }

    return res.status(200).json({
      aiPrompt,
      userOutput,
      aiOutput,
      ...parsed
    })

  } catch (e) {
    return res.status(500).json({ error: e.message })
  }
}