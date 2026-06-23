"use client";

import { useEffect, useRef, useState } from "react";
import Icon from "@/components/Icon";

const PRESET_TEXTS = [
  "Halo, selamat pagi. Apa kabar hari ini?",
  "Tolong panggil bantuan, saya membutuhkan pertolongan.",
  "Terima kasih banyak atas bantuan Anda.",
  "Mohon tunggu sebentar, saya sedang mengetik.",
];

export default function TextToSpeechClient() {
  const [text, setText] = useState(
    "Selamat datang di HearBridge AI. Ketik kalimat di sini lalu tekan tombol putar untuk mendengarkan suaranya."
  );
  const [supported] = useState(
    () => typeof window !== "undefined" && "speechSynthesis" in window
  );
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [voiceURI, setVoiceURI] = useState<string>("");
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (!supported) return;

    const loadVoices = () => {
      const list = window.speechSynthesis.getVoices();
      setVoices(list);
      setVoiceURI((prev) => {
        if (prev || list.length === 0) return prev;
        const idVoice = list.find((v) => v.lang.startsWith("id"));
        return (idVoice ?? list[0]).voiceURI;
      });
    };

    // Defer to a microtask so this acts as a subscription callback,
    // not a synchronous setState call inside the effect body.
    queueMicrotask(loadVoices);
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      window.speechSynthesis.cancel();
    };
  }, [supported]);

  const handlePlay = () => {
    if (!supported || !text.trim()) return;
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    const selectedVoice = voices.find((v) => v.voiceURI === voiceURI);
    if (selectedVoice) utterance.voice = selectedVoice;
    utterance.rate = rate;
    utterance.pitch = pitch;

    utterance.onstart = () => {
      setIsSpeaking(true);
      setIsPaused(false);
    };
    utterance.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
    };
    utterance.onerror = () => {
      setIsSpeaking(false);
      setIsPaused(false);
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const handlePauseResume = () => {
    if (!supported) return;
    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    } else {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  };

  const handleStop = () => {
    if (!supported) return;
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setIsPaused(false);
  };

  return (
    <main className="flex-1 flex flex-col bg-surface min-h-screen">
      <header className="h-20 flex items-center justify-between px-gutter border-b border-outline-variant bg-surface sticky top-0 z-40">
        <h2 className="font-title-lg text-title-lg text-on-surface">
          Text-to-Speech
        </h2>
        <div className="flex items-center gap-2 bg-surface-container-high px-3 py-1.5 rounded-full border border-outline-variant">
          <div className={`w-2 h-2 rounded-full ${isSpeaking ? "bg-primary animate-pulse" : "bg-outline"}`} />
          <span className="text-label-md font-label-md text-on-surface">
            {isSpeaking ? (isPaused ? "Dijeda" : "Sedang Berbicara") : "Siap"}
          </span>
        </div>
      </header>

      <div className="flex-1 max-w-4xl mx-auto w-full p-6 lg:p-10 flex flex-col gap-8">
        {!supported && (
          <div className="p-4 bg-error-container text-on-error-container rounded-xl flex items-center gap-3">
            <Icon name="error" />
            <p className="font-body-md text-body-md">
              Browser ini belum mendukung fitur sintesis suara (Speech
              Synthesis API). Coba gunakan Google Chrome atau Microsoft Edge
              versi terbaru.
            </p>
          </div>
        )}

        <div>
          <h3 className="font-title-lg text-title-lg text-on-surface mb-3">
            Teks untuk Diucapkan
          </h3>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={6}
            placeholder="Ketik teks yang ingin diubah menjadi suara..."
            className="w-full p-5 bg-surface-container-lowest border border-outline-variant rounded-2xl shadow-sm text-body-lg font-body-lg text-on-surface resize-none focus:ring-2 focus:ring-primary outline-none"
          />
          <div className="flex flex-wrap gap-2 mt-3">
            {PRESET_TEXTS.map((preset) => (
              <button
                key={preset}
                onClick={() => setText(preset)}
                className="px-3 py-2 bg-surface-container text-on-surface-variant rounded-lg text-caption hover:bg-primary-container hover:text-on-primary-container transition-all"
              >
                {preset}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-surface-container-low p-5 rounded-2xl border border-outline-variant">
            <label className="font-label-md text-label-md text-on-surface block mb-2">
              Pilih Suara
            </label>
            <select
              value={voiceURI}
              onChange={(e) => setVoiceURI(e.target.value)}
              className="w-full p-3 bg-white border border-outline-variant rounded-xl outline-none focus:ring-2 focus:ring-primary"
            >
              {voices.length === 0 && <option>Memuat suara...</option>}
              {voices.map((v) => (
                <option key={v.voiceURI} value={v.voiceURI}>
                  {v.name} ({v.lang})
                </option>
              ))}
            </select>
          </div>

          <div className="bg-surface-container-low p-5 rounded-2xl border border-outline-variant space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <label className="font-label-md text-label-md text-on-surface">
                  Kecepatan Bicara
                </label>
                <span className="font-caption text-caption text-primary font-bold">
                  {rate.toFixed(1)}x
                </span>
              </div>
              <input
                type="range"
                min={0.5}
                max={2}
                step={0.1}
                value={rate}
                onChange={(e) => setRate(parseFloat(e.target.value))}
                className="w-full accent-[#004ac6]"
              />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <label className="font-label-md text-label-md text-on-surface">
                  Nada Suara (Pitch)
                </label>
                <span className="font-caption text-caption text-primary font-bold">
                  {pitch.toFixed(1)}
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={2}
                step={0.1}
                value={pitch}
                onChange={(e) => setPitch(parseFloat(e.target.value))}
                className="w-full accent-[#004ac6]"
              />
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-6 px-4 py-8 bg-surface-container-low rounded-2xl border border-outline-variant">
          <button
            onClick={handleStop}
            disabled={!isSpeaking}
            className="group flex flex-col items-center gap-1 transition-all disabled:opacity-40"
          >
            <div className="w-14 h-14 rounded-full border-2 border-error flex items-center justify-center text-error group-hover:bg-error group-hover:text-on-error transition-all active:scale-95">
              <Icon name="stop" filled className="text-3xl" />
            </div>
            <span className="font-caption text-caption text-on-surface-variant">
              Berhenti
            </span>
          </button>

          <button
            onClick={handlePlay}
            disabled={!supported || !text.trim()}
            className="group flex flex-col items-center gap-2 transition-all disabled:opacity-40"
          >
            <div className="w-20 h-20 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-lg active:scale-90 transition-all">
              <Icon name="play_arrow" filled className="text-4xl" />
            </div>
            <span className="font-label-md text-label-md text-primary font-bold">
              Putar Suara
            </span>
          </button>

          <button
            onClick={handlePauseResume}
            disabled={!isSpeaking}
            className="group flex flex-col items-center gap-1 transition-all disabled:opacity-40"
          >
            <div className="w-14 h-14 rounded-full border-2 border-outline flex items-center justify-center text-on-surface-variant group-hover:bg-surface-container-highest transition-all active:scale-95">
              <Icon name={isPaused ? "play_arrow" : "pause"} filled />
            </div>
            <span className="font-caption text-caption text-on-surface-variant">
              {isPaused ? "Lanjutkan" : "Jeda"}
            </span>
          </button>
        </div>
      </div>
    </main>
  );
}
