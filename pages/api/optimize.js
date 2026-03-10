export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { userPrompt } = req.body
  if (!userPrompt) return res.status(400).json({ error: 'Missing prompt' })

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

  const safeParseJSON = (text) => {
    // Try direct parse first
    try {
      return JSON.parse(text)
    } catch {}

    // Strip markdown fences
    try {
      return JSON.parse(text.replace(/```json|```/g, '').trim())
    } catch {}

    // Extract first JSON object via regex
    try {
      const match = text.match(/\{[\s\S]*\}/)
      if (match) return JSON.parse(match[0])
    } catch {}

    return null
  }

  try {
    // Pass 1: Analyze weaknesses
    const analisis = await groq([
      {
        role: 'system',
        content: `Kamu adalah prompt engineer expert. Analisis prompt berikut secara singkat berdasarkan 5 dimensi:
1. Clarity – apakah instruksi jelas dan tidak ambigu?
2. Specificity – apakah konteks dan constraints cukup?
3. Structure – apakah format output diminta dengan jelas?
4. Role/Persona – apakah ada role yang relevan?
5. Examples – apakah perlu few-shot examples?

Berikan analisis singkat (max 3 kalimat) tentang kelemahan utama prompt ini. Gunakan Bahasa Indonesia.`
      },
      {
        role: 'user',
        content: `Prompt yang akan dianalisis:\n"${userPrompt}"`
      }
    ], 400)

    // Pass 2: Generate optimized version with full structured output
    const result = await groq([
      {
        role: 'system',
        content: `Kamu adalah prompt engineer expert dengan keahlian dalam LLM optimization.

Tugasmu memperbaiki prompt berdasarkan analisis kelemahan yang sudah dibuat.

Balas HANYA dalam format JSON (tanpa markdown, tanpa backtick):
{
  "prompt_optimal": "<versi prompt yang sudah dipoles dan dioptimalkan>",
  "tipe_prompt": "<salah satu dari: creative | technical | instruction | roleplay | analysis>",
  "skor_awal": <angka 1-10>,
  "skor_akhir": <angka 1-10>,
  "perubahan": [
    {
      "aspek": "<aspek yang diubah, misal: Clarity>",
      "sebelum": "<bagian asli yang bermasalah, atau 'tidak ada' jika ditambahkan>",
      "sesudah": "<versi yang sudah diperbaiki>",
      "penjelasan": "<kenapa perubahan ini membuat prompt lebih baik>"
    }
  ],
  "teknik_digunakan": ["<teknik 1>", "<teknik 2>"],
  "ringkasan": "<ringkasan singkat 1-2 kalimat kenapa versi baru lebih efektif>"
}`
      },
      {
        role: 'user',
        content: `Prompt asli:\n"${userPrompt}"\n\nAnalisis kelemahan:\n${analisis}\n\nSekarang buat versi optimal dalam format JSON.`
      }
    ], 1000)

    const parsed = safeParseJSON(result)

    if (!parsed) {
      console.error('JSON parse failed. Raw result:', result)
      return res.status(200).json({
        prompt_optimal: userPrompt,
        tipe_prompt: 'unknown',
        skor_awal: null,
        skor_akhir: null,
        perubahan: [{ aspek: 'Struktur', sebelum: '-', sesudah: '-', penjelasan: 'Gagal mem-parse hasil optimasi.' }],
        teknik_digunakan: [],
        ringkasan: 'Terjadi kesalahan saat memproses hasil. Coba lagi.',
        _raw: result
      })
    }

    return res.status(200).json(parsed)
  } catch (e) {
    console.error('Handler error:', e)
    return res.status(500).json({ error: e.message })
  }
}