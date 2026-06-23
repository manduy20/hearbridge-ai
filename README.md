# HearBridge AI

Platform berbasis AI untuk membantu komunikasi komunitas tunarungu melalui **Speech-to-Text**, **Text-to-Speech**, dan **AI Assistant**.

Dibangun dengan **Next.js 16 (App Router)**, **TypeScript**, dan **Tailwind CSS v4** — siap deploy ke **Vercel**.

## Halaman

| Route              | Deskripsi                                                |
| ------------------- | --------------------------------------------------------- |
| `/`                 | Landing page                                               |
| `/dashboard`        | Dashboard utama (statistik & aktivitas)                   |
| `/speech-to-text`   | Transkripsi suara ke teks real-time (Web Speech API)       |
| `/text-to-speech`   | Konversi teks ke suara (Speech Synthesis API)              |
| `/assistant`        | Chat dengan AI Assistant                                   |
| `/history`          | Riwayat transkripsi                                         |
| `/settings`         | Pengaturan akun & aplikasi                                  |

Fitur **Speech-to-Text** dan **Text-to-Speech** sudah **fungsional** menggunakan Web Speech API bawaan browser (paling baik di Google Chrome/Edge).

## Menjalankan secara lokal

```bash
npm install
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000).

## Deploy ke Vercel

### Opsi 1 — Lewat Vercel Dashboard (paling mudah)

1. Push folder ini ke repository GitHub/GitLab/Bitbucket.
2. Buka [vercel.com/new](https://vercel.com/new), pilih repository tersebut.
3. Vercel otomatis mendeteksi framework Next.js — biarkan semua setting default.
4. Klik **Deploy**. Selesai dalam ±1 menit.

### Opsi 2 — Lewat Vercel CLI

```bash
npm install -g vercel
vercel login
vercel        # deploy preview
vercel --prod # deploy ke production
```

Tidak ada environment variable yang wajib diisi — aplikasi ini berjalan tanpa backend/database eksternal.

## Build untuk produksi (cek manual)

```bash
npm run build
npm run start
```

## Catatan Teknis

- Font **Inter** & **Atkinson Hyperlegible Next** (font yang dirancang untuk keterbacaan tinggi) dimuat lewat Google Fonts saat runtime di browser, sehingga proses build tidak bergantung pada koneksi internet.
- Ikon menggunakan **Material Symbols Outlined**.
- Fitur suara (STT & TTS) memerlukan izin mikrofon dari browser dan koneksi HTTPS (otomatis tersedia di domain Vercel).
