const BEGINNER_POOL = [
  {
    title: "Minta dengan Jelas",
    desc: "AI merespons jauh lebih baik kalau kamu kasih instruksi yang spesifik dan jelas.",
    mission: "Minta AI untuk membuat 3 ide nama bisnis makanan sehat untuk anak muda.",
    tips: ["Sebutkan jumlah yang kamu inginkan", "Tambahkan konteks target audiensnya", "Hindari kata ambigu seperti 'bagus' atau 'keren'"],
    placeholder: "Contoh: Buatkan saya 3 nama bisnis makanan sehat yang...",
    concept: "Spesifisitas"
  },
  {
    title: "Berikan Konteks",
    desc: "Semakin banyak konteks yang kamu berikan, semakin relevan jawaban AI.",
    mission: "Minta AI menulis caption Instagram untuk foto sunset di Bali. Berikan konteks lengkap tentang suasana dan audiens.",
    tips: ["Jelaskan suasana atau mood yang diinginkan", "Sebutkan platform yang digunakan", "Tambahkan info tentang target pembaca"],
    placeholder: "Contoh: Saya punya foto sunset di Bali, tulis caption IG untuk...",
    concept: "Konteks"
  },
  {
    title: "Format Output",
    desc: "Kamu bisa minta AI untuk menjawab dalam format tertentu — list, paragraf, tabel, dll.",
    mission: "Minta AI membuat jadwal belajar untuk ujian dalam 1 minggu. Instruksikan format outputnya secara spesifik.",
    tips: ["Sebutkan format: 'dalam bentuk tabel', 'dalam poin-poin'", "Minta panjang respons yang sesuai", "Bisa minta contoh/template jika perlu"],
    placeholder: "Contoh: Buat jadwal belajar 1 minggu dalam format tabel dengan...",
    concept: "Format"
  },
  {
    title: "Tentukan Audiens",
    desc: "Memberi tahu siapa yang akan membaca output-nya akan membuat AI menyesuaikan gaya bahasanya.",
    mission: "Minta AI menjelaskan apa itu inflasi. Tentukan dengan jelas siapa audiens yang akan membaca penjelasan ini.",
    tips: ["Sebutkan usia, latar belakang, atau profesi pembaca", "Minta AI menyesuaikan tingkat kesulitan bahasa", "Contoh: 'jelaskan kepada anak SD' vs 'jelaskan kepada mahasiswa'"],
    placeholder: "Contoh: Jelaskan apa itu inflasi kepada...",
    concept: "Audiens"
  },
  {
    title: "Batasi Panjang",
    desc: "Minta AI untuk membatasi panjang jawabannya agar lebih fokus dan efisien.",
    mission: "Minta AI memberikan tips produktivitas belajar, tapi batasi jawabannya hanya dalam 5 poin singkat.",
    tips: ["Gunakan: 'dalam 3 kalimat', 'maksimal 100 kata', 'hanya 5 poin'", "Batasan panjang memaksa AI lebih fokus", "Cocok untuk konten sosmed atau rangkuman"],
    placeholder: "Contoh: Berikan 5 tips produktivitas belajar, masing-masing maksimal 1 kalimat...",
    concept: "Panjang"
  },
  {
    title: "Minta Contoh Nyata",
    desc: "Contoh konkret jauh lebih mudah dipahami daripada penjelasan abstrak.",
    mission: "Minta AI menjelaskan konsep 'personal branding' dengan menyertakan minimal 2 contoh nyata dari kehidupan sehari-hari.",
    tips: ["Tambahkan: 'berikan contoh konkret', 'gunakan analogi'", "Minta contoh dari konteks yang relevan", "Contoh nyata membuat penjelasan lebih mudah dicerna"],
    placeholder: "Contoh: Jelaskan personal branding dengan 2 contoh nyata dari...",
    concept: "Contoh Konkret"
  },
  {
    title: "Tone yang Tepat",
    desc: "AI bisa menyesuaikan nada tulisannya — formal, santai, lucu, serius, dll.",
    mission: "Minta AI menulis pengumuman acara pensi sekolah. Tentukan tone yang spesifik untuk pengumumannya.",
    tips: ["Gunakan kata sifat untuk mendeskripsikan tone: 'santai', 'energetik', 'formal'", "Bisa minta tone campuran: 'profesional tapi friendly'", "Tone yang tepat = pesan lebih nyambung ke pembaca"],
    placeholder: "Contoh: Tulis pengumuman acara pensi sekolah dengan tone yang...",
    concept: "Tone"
  },
  {
    title: "Tujuan yang Jelas",
    desc: "Menyebutkan tujuan dari output akan membantu AI menghasilkan konten yang tepat sasaran.",
    mission: "Minta AI menulis pesan WhatsApp kepada dosen untuk meminta izin tidak masuk kuliah. Sebutkan tujuan pesannya.",
    tips: ["Jelaskan apa yang ingin kamu capai dengan output ini", "Contoh: 'tujuannya agar dosen memaklumi ketidakhadiran saya'", "Tujuan yang jelas = output lebih relevan dan efektif"],
    placeholder: "Contoh: Tulis pesan WA ke dosen untuk izin tidak masuk, tujuannya agar...",
    concept: "Tujuan"
  },
]

const INTERMEDIATE_POOL = [
  {
    title: "Berikan Peran (Role)",
    desc: "Minta AI berperan sebagai expert tertentu untuk mendapat jawaban yang lebih mendalam.",
    mission: "Minta AI berperan sebagai career coach berpengalaman dan bantu mempersiapkan jawaban untuk interview kerja pertama.",
    tips: ["Gunakan 'Kamu adalah [peran]...' atau 'Bertindaklah sebagai...'", "Jelaskan expertise atau pengalaman perannya", "Sesuaikan gaya komunikasi dengan peran"],
    placeholder: "Contoh: Kamu adalah seorang career coach dengan 10 tahun pengalaman...",
    concept: "Role Prompting"
  },
  {
    title: "Batasi Scope",
    desc: "Prompt yang terlalu luas menghasilkan jawaban yang terlalu umum.",
    mission: "Minta penjelasan tentang investasi, tapi khususkan untuk mahasiswa dengan uang saku Rp 500rb/bulan.",
    tips: ["Tambahkan batasan: waktu, budget, usia, lokasi", "Gunakan 'khusus untuk...', 'terbatas pada...'", "Hindari pertanyaan yang bisa ditafsirkan bermacam-macam"],
    placeholder: "Contoh: Jelaskan cara investasi khusus untuk mahasiswa dengan budget...",
    concept: "Scope Limiting"
  },
  {
    title: "Minta Reasoning",
    desc: "Minta AI menjelaskan alasan di balik jawabannya untuk hasil yang lebih transparan.",
    mission: "Minta rekomendasi laptop untuk desain grafis, dan minta AI jelaskan alasan di balik setiap rekomendasinya.",
    tips: ["Tambahkan: 'jelaskan alasanmu', 'berikan reasoning'", "Minta pro dan kontra dari setiap opsi", "Gunakan 'step by step' untuk proses kompleks"],
    placeholder: "Contoh: Rekomendasikan laptop untuk desain grafis dan jelaskan alasan setiap rekomendasi...",
    concept: "Reasoning"
  },
  {
    title: "Perspektif Berbeda",
    desc: "Minta AI melihat masalah dari sudut pandang yang berbeda-beda.",
    mission: "Minta AI menganalisis keputusan gap year setelah SMA dari minimal 3 perspektif yang berbeda.",
    tips: ["Sebutkan perspektif yang ingin kamu dapatkan", "Contoh: 'dari sudut pandang orang tua, mahasiswa, dan HRD'", "Perspektif berbeda = pemahaman yang lebih komprehensif"],
    placeholder: "Contoh: Analisis keputusan gap year dari perspektif orang tua, mahasiswa, dan...",
    concept: "Multi-Perspektif"
  },
  {
    title: "Constraint Kreatif",
    desc: "Batasan yang unik justru bisa memicu kreativitas AI.",
    mission: "Minta AI membuat ide bisnis yang bisa dijalankan dengan modal di bawah Rp 100ribu dan tanpa keluar rumah.",
    tips: ["Berikan batasan yang spesifik dan unik", "Batasan mendorong solusi yang lebih kreatif", "Bisa kombinasi beberapa constraint sekaligus"],
    placeholder: "Contoh: Berikan ide bisnis dengan modal di bawah Rp 100rb, tanpa modal peralatan, dan bisa...",
    concept: "Constraint"
  },
  {
    title: "Output Bertahap",
    desc: "Untuk tugas kompleks, minta AI mengerjakan secara bertahap.",
    mission: "Minta AI membantu membuat rencana belajar bahasa Inggris dalam beberapa tahap yang jelas.",
    tips: ["Gunakan: 'pertama... lalu... kemudian...'", "Pisahkan proses menjadi fase-fase yang logis", "Bertahap = lebih mudah di-review dan direvisi"],
    placeholder: "Contoh: Bantu saya membuat rencana belajar bahasa Inggris. Pertama analisis level saya, lalu...",
    concept: "Bertahap"
  },
  {
    title: "Template Request",
    desc: "Minta AI mengisi template yang sudah kamu siapkan strukturnya.",
    mission: "Buat template profil LinkedIn, lalu minta AI mengisinya untuk seorang fresh graduate jurusan informatika.",
    tips: ["Definisikan struktur/template terlebih dahulu", "Minta AI mengisi bagian yang kosong", "Template memastikan output punya struktur konsisten"],
    placeholder: "Contoh: Gunakan template berikut untuk membuat profil LinkedIn: [Nama]: ... [Headline]: ... [About]: ...",
    concept: "Template"
  },
  {
    title: "Komparasi & Evaluasi",
    desc: "Minta AI membandingkan beberapa opsi dengan kriteria yang spesifik.",
    mission: "Minta AI membandingkan 3 platform freelance (Upwork, Fiverr, Toptal) untuk developer pemula dengan kriteria yang jelas.",
    tips: ["Sebutkan kriteria perbandingan yang spesifik", "Minta dalam format yang mudah dibandingkan", "Tentukan konteks: untuk siapa perbandingan ini?"],
    placeholder: "Contoh: Bandingkan Upwork, Fiverr, dan Toptal untuk developer pemula berdasarkan kriteria: kemudahan masuk, potensi penghasilan, dan...",
    concept: "Komparasi"
  },
]

const ADVANCED_POOL = [
  {
    title: "Few-Shot Prompting",
    desc: "Berikan contoh input-output di dalam prompt untuk 'mengajari' AI pola yang kamu inginkan.",
    mission: "Buat prompt yang menggunakan teknik few-shot untuk mengajarkan AI menulis tagline produk dengan gaya tertentu.",
    tips: ["Berikan minimal 2-3 contoh pasangan input → output", "Pastikan contohmu konsisten dengan pola yang diinginkan", "Akhiri dengan input baru dan minta AI melanjutkan polanya"],
    placeholder: "Produk: Sepatu olahraga → Tagline: ...\nProduk: Tas kulit → Tagline: ...\nProduk: [target] → Tagline:",
    concept: "Few-Shot"
  },
  {
    title: "Chain of Thought",
    desc: "Instruksikan AI untuk berpikir step-by-step sebelum memberikan jawaban final.",
    mission: "Gunakan teknik chain of thought untuk membantu AI menganalisis apakah sebuah bisnis online layak dijalankan.",
    tips: ["Gunakan: 'Pikirkan langkah demi langkah...'", "Minta AI memaparkan proses berpikirnya", "Pisahkan analisis dari kesimpulan akhir"],
    placeholder: "Contoh: Analisis kelayakan bisnis ini langkah demi langkah, mulai dari...",
    concept: "Chain of Thought"
  },
  {
    title: "Self-Refinement",
    desc: "Rancang prompt yang meminta AI untuk mengkritik dan memperbaiki output-nya sendiri.",
    mission: "Buat prompt yang meminta AI menulis email profesional, lalu secara otomatis mengkritik dan merevisinya.",
    tips: ["Minta AI generate dulu, lalu evaluasi outputnya sendiri", "Gunakan: 'Setelah menulis, kritisi dan perbaiki'", "Tentukan kriteria evaluasi yang spesifik"],
    placeholder: "Contoh: Tulis email profesional, kemudian evaluasi berdasarkan [kriteria] dan buat versi revisinya...",
    concept: "Self-Refinement"
  },
  {
    title: "Persona Kompleks",
    desc: "Bangun persona AI yang sangat spesifik dengan latar belakang, kepribadian, dan cara berpikir tertentu.",
    mission: "Ciptakan persona AI yang sangat detail — seorang mentor startup yang punya pengalaman gagal dan berhasil — lalu minta saran memulai bisnis.",
    tips: ["Deskripsikan latar belakang, nilai, dan cara berpikir persona", "Tambahkan ciri khas yang membuat persona unik", "Semakin detail persona = semakin konsisten responnya"],
    placeholder: "Contoh: Kamu adalah [nama], seorang mentor startup berusia 42 tahun yang pernah gagal 2x. Kamu percaya bahwa...",
    concept: "Persona"
  },
  {
    title: "Prompt Chaining",
    desc: "Rancang serangkaian prompt yang saling terhubung, output satu menjadi input berikutnya.",
    mission: "Rancang prompt chain 3 langkah untuk membantu seseorang dari 'punya ide bisnis' sampai 'punya pitch deck siap presentasi'.",
    tips: ["Definisikan output dari setiap langkah dengan jelas", "Pastikan output langkah N bisa jadi input langkah N+1", "Gunakan placeholder untuk menandai output sebelumnya"],
    placeholder: "Langkah 1: [prompt validasi ide]\nOutput: ...\nLangkah 2: [prompt menggunakan output langkah 1]\n...",
    concept: "Prompt Chaining"
  },
  {
    title: "Negative Prompting",
    desc: "Gunakan instruksi negatif untuk menghindari output yang tidak diinginkan.",
    mission: "Minta AI menulis artikel motivasi tentang kegagalan — tapi dengan instruksi negatif yang mencegah klise dan toxic positivity.",
    tips: ["Gunakan: 'jangan gunakan...', 'hindari...', 'tanpa...'", "Daftarkan hal-hal yang TIDAK ingin ada di output", "Negative prompting sangat efektif untuk konten kreatif"],
    placeholder: "Contoh: Tulis artikel tentang kegagalan. JANGAN gunakan klise seperti '...', hindari toxic positivity...",
    concept: "Negative Prompting"
  },
  {
    title: "Structured Output",
    desc: "Minta AI mengembalikan output dalam format terstruktur yang bisa langsung dipakai.",
    mission: "Minta AI menganalisis 3 startup Indonesia dan mengembalikan hasilnya dalam format JSON yang bisa langsung dipakai developer.",
    tips: ["Definisikan schema/struktur output dengan jelas", "Berikan contoh format yang diinginkan", "Cocok untuk integrasi dengan kode atau tools lain"],
    placeholder: "Contoh: Analisis 3 startup Indonesia dalam format JSON: { nama, bidang, kelebihan, kekurangan }...",
    concept: "Structured Output"
  },
  {
    title: "Meta Prompting",
    desc: "Minta AI untuk membantu membuat prompt yang lebih baik untuk tugas tertentu.",
    mission: "Minta AI untuk membuat prompt yang optimal agar AI lain bisa menghasilkan konten marketing efektif untuk UMKM.",
    tips: ["Jelaskan tugas akhir yang ingin dicapai", "Minta AI mengidentifikasi elemen prompt yang penting", "Meta prompting bagus untuk optimalkan workflow AI"],
    placeholder: "Contoh: Saya ingin membuat konten marketing untuk UMKM. Bantu saya buat prompt yang optimal untuk...",
    concept: "Meta Prompting"
  },
]

function pickRandom(arr, n) {
  return [...arr].sort(() => Math.random() - 0.5).slice(0, n).map((c, i) => ({ ...c, id: `c${i}` }))
}

export function getRandomChallenges(level) {
  const pool = level === 'beginner' ? BEGINNER_POOL : level === 'intermediate' ? INTERMEDIATE_POOL : ADVANCED_POOL
  return pickRandom(pool, 3)
}

export const LEVEL_CONFIG = {
  beginner: {
    label: 'Beginner',
    color: '#4ade80',
    bg: 'rgba(74,222,128,0.08)',
    border: 'rgba(74,222,128,0.2)',
    desc: 'Dasar-dasar prompt. Cocok buat yang baru mulai kenal AI.',
    
  },
  intermediate: {
    label: 'Intermediate',
    color: '#facc15',
    bg: 'rgba(250,204,21,0.08)',
    border: 'rgba(250,204,21,0.2)',
    desc: 'Teknik lebih dalam: role, format, dan konteks yang spesifik.',
   
  },
  advanced: {
    label: 'Advanced',
    color: '#f87171',
    bg: 'rgba(248,113,113,0.08)',
    border: 'rgba(248,113,113,0.2)',
    desc: 'Chain of thought, few-shot, dan strategi prompt kompleks.',
  }
}
