"use client";

import React, { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

/* ---------------------------------------------
   HearBridge AI — Landing Page
   Konsep: "Dua Sisi, Satu Percakapan"
   Suara (hangat, #FF8B5E) bertemu Teks (dingin, #5EC8FF)
   di tengah sebagai satu jembatan komunikasi.
---------------------------------------------- */

const FEATURES = [
  {
    icon: "mic",
    title: "Speech to Text",
    desc: "Ubah suara jadi teks secara langsung, akurat untuk percakapan sehari-hari, rapat, maupun kelas.",
    accent: "warm",
    href: "/dashboard",
  },
  {
    icon: "volume_up",
    title: "Text to Speech",
    desc: "Ubah teks menjadi suara natural dalam Bahasa Indonesia, membantu menyampaikan pesan dengan jelas.",
    accent: "cool",
    href: "/text-to-speech",
  },
  {
    icon: "forum",
    title: "AI Assistant",
    desc: "Asisten percakapan yang membantu merangkas, menyusun ulang kalimat, dan menjawab pertanyaan dari hasil transkrip Anda.",
    accent: "warm",
    href: "/assistant",
  },
  {
    icon: "cloud_done",
    title: "Cloud Tersinkron",
    desc: "Semua transkrip dan rekaman tersimpan rapi, bisa diunduh ulang sebagai PDF atau TXT kapan saja.",
    accent: "cool",
    href: "/cloud",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "Rapat kantor jadi jauh lebih mudah diikuti. Saya tinggal baca transkripnya setelah selesai, tidak ada lagi informasi yang terlewat.",
    name: "Dian Pratama",
    role: "Staf Administrasi",
  },
  {
    quote:
      "Sebagai pengajar, saya pakai Text to Speech untuk menyiapkan materi audio buat murid yang lebih nyaman mendengarkan daripada membaca.",
    name: "Rina Wulandari",
    role: "Guru SMP",
  },
  {
    quote:
      "Transkrip otomatisnya membantu saya menjembatani percakapan di tempat kerja tanpa harus selalu bergantung pada juru bahasa.",
    name: "Aji Saputra",
    role: "Pengguna Harian",
  },
];

function WaveformHero() {
  const barsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bars = barsRef.current?.querySelectorAll<HTMLDivElement>(".wave-bar");
    if (!bars) return;
    bars.forEach((bar, i) => {
      const delay = (i % 12) * 0.09;
      bar.style.animationDelay = `${delay}s`;
    });
  }, []);

  const barCount = 28;

  return (
    <div ref={barsRef} className="hero-waveform" aria-hidden="true">
      {Array.from({ length: barCount }).map((_, i) => {
        const progress = i / (barCount - 1);
        return (
          <div
            key={i}
            className="wave-bar"
            style={{
              "--seed": ((i * 37) % 60) / 100 + 0.35,
              background:
                progress < 0.5
                  ? "var(--warm)"
                  : progress > 0.5
                  ? "var(--cool)"
                  : "var(--ink-50)",
            } as React.CSSProperties}
          />
        );
      })}
    </div>
  );
}

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="hb-root">
      <style>{`
        .hb-root {
          --bg: #101820;
          --bg-raised: #1B2530;
          --ink: #F5F3EF;
          --ink-70: rgba(245,243,239,0.72);
          --ink-50: rgba(245,243,239,0.45);
          --warm: #FF8B5E;
          --warm-dim: rgba(255,139,94,0.14);
          --cool: #5EC8FF;
          --cool-dim: rgba(94,200,255,0.14);
          --hairline: rgba(245,243,239,0.10);

          background: var(--bg);
          color: var(--ink);
          font-family: 'Inter', system-ui, sans-serif;
          min-height: 100vh;
          overflow-x: hidden;
        }
        .hb-root .disp { font-family: 'Space Grotesk', system-ui, sans-serif; }
        .hb-root .mono { font-family: 'JetBrains Mono', monospace; letter-spacing: 0.04em; }

        .hb-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 28px clamp(20px, 6vw, 80px);
          position: relative;
          z-index: 10;
        }
        .hb-logo {
          font-size: 19px;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .hb-logo-mark {
          width: 28px; height: 28px;
          border-radius: 8px;
          background: linear-gradient(135deg, var(--warm), var(--cool));
          display: flex; align-items: center; justify-content: center;
          font-size: 14px;
        }
        .hb-nav-cta {
          font-size: 14px;
          font-weight: 600;
          padding: 10px 20px;
          border-radius: 999px;
          border: 1px solid var(--hairline);
          color: var(--ink);
          background: transparent;
          cursor: pointer;
          transition: border-color 0.2s, background 0.2s;
        }
        .hb-nav-cta:hover { border-color: var(--cool); background: var(--cool-dim); }

        .hb-hero {
          padding: clamp(40px, 8vw, 90px) clamp(20px, 6vw, 80px) clamp(60px, 10vw, 110px);
          position: relative;
        }
        .hb-eyebrow {
          font-size: 12px;
          color: var(--ink-50);
          text-transform: uppercase;
          margin-bottom: 22px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .hb-eyebrow::before {
          content: '';
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--warm);
        }
        .hb-headline {
          font-size: clamp(40px, 6.5vw, 76px);
          line-height: 1.02;
          font-weight: 600;
          max-width: 900px;
          letter-spacing: -0.02em;
        }
        .hb-headline .accent-warm { color: var(--warm); }
        .hb-headline .accent-cool { color: var(--cool); }
        .hb-sub {
          font-size: clamp(16px, 1.8vw, 19px);
          color: var(--ink-70);
          max-width: 560px;
          margin-top: 26px;
          line-height: 1.6;
        }
        .hb-hero-actions {
          display: flex;
          align-items: center;
          gap: 18px;
          margin-top: 38px;
          flex-wrap: wrap;
        }
        .hb-cta-primary {
          font-size: 16px;
          font-weight: 700;
          padding: 16px 30px;
          border-radius: 14px;
          border: none;
          color: #101820;
          background: linear-gradient(135deg, var(--warm), var(--cool));
          cursor: pointer;
          transition: transform 0.15s, box-shadow 0.2s;
          box-shadow: 0 8px 24px -8px rgba(255,139,94,0.4);
        }
        .hb-cta-primary:hover { transform: translateY(-2px); box-shadow: 0 12px 28px -8px rgba(94,200,255,0.45); }
        .hb-cta-primary:active { transform: translateY(0); }
        .hb-cta-secondary {
          font-size: 15px;
          color: var(--ink-70);
          text-decoration: underline;
          text-decoration-color: var(--hairline);
          text-underline-offset: 4px;
          background: none;
          border: none;
          cursor: pointer;
        }

        .hero-waveform {
          margin-top: 64px;
          display: flex;
          align-items: center;
          gap: 5px;
          height: 90px;
        }
        .wave-bar {
          flex: 1;
          min-width: 3px;
          max-width: 7px;
          border-radius: 3px;
          height: 30%;
          animation: wavepulse 1.8s ease-in-out infinite;
          opacity: 0.85;
        }
        @keyframes wavepulse {
          0%, 100% { height: calc(var(--seed) * 30%); }
          50% { height: calc(var(--seed) * 100%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .wave-bar { animation: none; height: 50%; }
        }

        .hb-section {
          padding: clamp(50px, 8vw, 90px) clamp(20px, 6vw, 80px);
          border-top: 1px solid var(--hairline);
        }
        .hb-section-head {
          max-width: 620px;
          margin-bottom: 48px;
        }
        .hb-section-label {
          font-size: 12px;
          color: var(--warm);
          text-transform: uppercase;
          margin-bottom: 14px;
        }
        .hb-section-title {
          font-size: clamp(28px, 3.5vw, 40px);
          font-weight: 600;
          letter-spacing: -0.01em;
        }

        .hb-feature-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1px;
          background: var(--hairline);
          border: 1px solid var(--hairline);
          border-radius: 20px;
          overflow: hidden;
        }
        @media (max-width: 720px) {
          .hb-feature-grid { grid-template-columns: 1fr; }
        }
        .hb-feature-card {
          background: var(--bg);
          padding: 36px 32px;
          transition: background 0.25s;
        }
        .hb-feature-card:hover { background: var(--bg-raised); }
        .hb-feature-icon {
          width: 44px; height: 44px;
          border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          font-size: 20px;
          margin-bottom: 20px;
        }
        .hb-feature-icon.warm { background: var(--warm-dim); color: var(--warm); }
        .hb-feature-icon.cool { background: var(--cool-dim); color: var(--cool); }
        .hb-feature-title {
          font-size: 19px;
          font-weight: 600;
          margin-bottom: 10px;
        }
        .hb-feature-desc {
          font-size: 14.5px;
          color: var(--ink-70);
          line-height: 1.65;
        }

        .hb-testimonial-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        @media (max-width: 900px) {
          .hb-testimonial-row { grid-template-columns: 1fr; }
        }
        .hb-testimonial-card {
          background: var(--bg-raised);
          border: 1px solid var(--hairline);
          border-radius: 18px;
          padding: 28px 26px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .hb-testimonial-quote {
          font-size: 15px;
          line-height: 1.7;
          color: var(--ink);
        }
        .hb-testimonial-quote::before { content: '“'; color: var(--cool); }
        .hb-testimonial-quote::after { content: '”'; color: var(--cool); }
        .hb-testimonial-meta {
          margin-top: 22px;
          padding-top: 16px;
          border-top: 1px solid var(--hairline);
          font-size: 13px;
        }
        .hb-testimonial-name { font-weight: 600; }
        .hb-testimonial-role { color: var(--ink-50); margin-top: 2px; }

        .hb-closing {
          text-align: center;
          padding: clamp(70px, 10vw, 120px) 24px;
          border-top: 1px solid var(--hairline);
        }
        .hb-closing-title {
          font-size: clamp(28px, 4vw, 44px);
          font-weight: 600;
          max-width: 640px;
          margin: 0 auto 30px;
          letter-spacing: -0.01em;
        }

        .hb-footer {
          padding: 28px clamp(20px, 6vw, 80px) 40px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: var(--ink-50);
          font-size: 13px;
          border-top: 1px solid var(--hairline);
        }

        @media (max-width: 600px) {
          .hb-footer { flex-direction: column; gap: 10px; text-align: center; }
        }
      `}</style>

      {/* Nav */}
      <nav className="hb-nav">
        <div className="hb-logo disp">
          <span className="hb-logo-mark">🎙️</span>
          HearBridge AI
        </div>
        <button className="hb-nav-cta" onClick={() => router.push("/login")}>
          Masuk
        </button>
      </nav>

      {/* Hero */}
      <section className="hb-hero">
        <p className="hb-eyebrow mono">Jembatan suara &amp; teks bertenaga AI</p>
        <h1 className="hb-headline disp">
          Setiap <span className="accent-warm">suara</span> punya cerita.
          <br />
          Kami mengubahnya jadi <span className="accent-cool">teks</span>, dan sebaliknya.
        </h1>
        <p className="hb-sub">
          HearBridge AI membantu Anda mengubah percakapan menjadi catatan tertulis,
          dan tulisan menjadi suara yang jelas didengar — semuanya dalam satu dashboard
          yang sederhana.
        </p>
        <div className="hb-hero-actions">
          <button className="hb-cta-primary" onClick={() => router.push("/login")}>
            Mulai Sekarang
          </button>
          <button
            className="hb-cta-secondary"
            onClick={() =>
              document.getElementById("fitur")?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Lihat fitur ↓
          </button>
        </div>

        <WaveformHero />
      </section>

      {/* Fitur */}
      <section className="hb-section" id="fitur">
        <div className="hb-section-head">
          <p className="hb-section-label mono"></p>
          <h2 className="hb-section-title disp">
            Satu dashboard, dua arah komunikasi
          </h2>
        </div>
        <div className="hb-feature-grid">
          {FEATURES.map((f) => (
            <div
  className="hb-feature-card"
  key={f.title}
  onClick={() => router.push(f.href)}
>
              <div className={`hb-feature-icon ${f.accent}`}>
                <span className="material-symbols-outlined">{f.icon}</span>
              </div>
              <h3 className="hb-feature-title disp">{f.title}</h3>
              <p className="hb-feature-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimoni */}
      <section className="hb-section">
        <div className="hb-section-head">
          <p className="hb-section-label mono">// Cerita Pengguna</p>
          <h2 className="hb-section-title disp">
            Dipakai untuk percakapan yang penting
          </h2>
        </div>
        <div className="hb-testimonial-row">
          {TESTIMONIALS.map((t) => (
            <div className="hb-testimonial-card" key={t.name}>
              <p className="hb-testimonial-quote">{t.quote}</p>
              <div className="hb-testimonial-meta">
                <p className="hb-testimonial-name">{t.name}</p>
                <p className="hb-testimonial-role">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Closing CTA */}
      <section className="hb-closing">
        <h2 className="hb-closing-title disp">
          Siap mengubah cara Anda berkomunikasi?
        </h2>
        <button className="hb-cta-primary" onClick={() => router.push("/login")}>
          Mulai Sekarang
        </button>
      </section>

      <footer className="hb-footer">
        <span>© {new Date().getFullYear()} HearBridge AI</span>
        <span className="mono">made for clearer conversations</span>
      </footer>
    </div>
  );
}
