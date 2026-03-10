export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { prompt, mission } = req.body

  if (!prompt || !mission) {
    return res.status(400).json({ error: 'Missing prompt or mission' })
  }

  const apiKey = process.env.GROQ_API_KEY
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured' })
  }

  const systemPrompt = `Kamu adalah evaluator prompt AI yang ahli dan berpengalaman. Tugasmu mengevaluasi kualitas prompt yang ditulis pengguna berdasarkan misi yang diberikan.

Evaluasi berdasarkan:
1. Kejelasan dan spesifisitas instruksi
2. Relevansi dengan misi
3. Kelengkapan konteks
4. Potensi menghasilkan output yang baik

Balas HANYA dalam format JSON berikut (tanpa markdown, tanpa backtick, tanpa teks lain):
{
  "skor": <angka 0-100>,
  "grade": "<Luar Biasa|Bagus|Cukup|Perlu Diperbaiki>",
  "ringkasan": "<1-2 kalimat ringkasan evaluasi>",
  "positif": "<apa yang sudah bagus dari prompt ini, spesifik>",
  "negatif": "<apa yang perlu diperbaiki, spesifik>",
  "versi_diperbaiki": "<versi prompt yang lebih baik dan lengkap>"
}`

  const userMsg = `Misi: ${mission}

Prompt yang ditulis pengguna:
"${prompt}"

Evaluasi prompt ini dalam Bahasa Indonesia.`

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userMsg }
        ],
        temperature: 0.7,
        max_tokens: 1000
      })
    })

    if (!response.ok) {
      const err = await response.json()
      return res.status(500).json({ error: err.error?.message || 'Groq API error' })
    }

    const data = await response.json()
    let text = data.choices[0].message.content.trim()
    text = text.replace(/```json|```/g, '').trim()
    const result = JSON.parse(text)

    return res.status(200).json(result)
  } catch (e) {
    return res.status(500).json({ error: e.message })
  }
}
