# PromptCraft ⚡

Platform latihan interaktif untuk menulis prompt AI yang efektif.

## Tech Stack
- **Frontend**: Next.js + React
- **AI**: Groq API (Llama 3.3 70B)
- **Deploy**: Vercel

## Cara Deploy ke Vercel

### 1. Upload ke GitHub
1. Buat repo baru di github.com
2. Upload semua file ini ke repo tersebut

### 2. Deploy ke Vercel
1. Buka vercel.com → Login dengan GitHub
2. Klik "New Project" → Import repo kamu
3. Klik "Deploy" (biarkan settings default)

### 3. Tambahkan API Key
1. Di dashboard Vercel, buka project kamu
2. Pergi ke **Settings** → **Environment Variables**
3. Klik "Add New"
4. Name: `GROQ_API_KEY`
5. Value: (paste API key Groq kamu)
6. Klik Save

### 4. Redeploy
1. Pergi ke tab **Deployments**
2. Klik titik tiga (...) di deployment terbaru
3. Klik **Redeploy**

Selesai! App kamu sudah live dan siap dipakai tanpa user perlu input API key. 🎉

## Development Lokal
```bash
npm install
# Buat file .env.local dan isi:
# GROQ_API_KEY=gsk_xxxxx

npm run dev
```
