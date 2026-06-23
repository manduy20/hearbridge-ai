"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Icon from "@/components/Icon";

type TranscriptLine = {
  id: number;
  time: string;
  text: string;
  final: boolean;
};

// Minimal types for the Web Speech API (not in default TS lib)
interface SpeechRecognitionResultLike {
  isFinal: boolean;
  [index: number]: { transcript: string };
}
interface SpeechRecognitionEventLike extends Event {
  resultIndex: number;
  results: ArrayLike<SpeechRecognitionResultLike>;
}
interface SpeechRecognitionLike extends EventTarget {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start: () => void;
  stop: () => void;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onerror: ((event: Event) => void) | null;
  onend: (() => void) | null;
}

function formatTime(totalSeconds: number) {
  const h = Math.floor(totalSeconds / 3600)
    .toString()
    .padStart(2, "0");
  const m = Math.floor((totalSeconds % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const s = (totalSeconds % 60).toString().padStart(2, "0");
  return `${h}:${m}:${s}`;
}

const LANGUAGES = [
  { code: "id-ID", label: "Bahasa Indonesia" },
  { code: "en-US", label: "English (US)" },
];

export default function SpeechToTextClient() {
  const [supported] = useState(() => {
    if (typeof window === "undefined") return true;
    const w = window as unknown as {
      SpeechRecognition?: new () => SpeechRecognitionLike;
      webkitSpeechRecognition?: new () => SpeechRecognitionLike;
    };
    return Boolean(w.SpeechRecognition || w.webkitSpeechRecognition);
  });
  const [isRecording, setIsRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [lines, setLines] = useState<TranscriptLine[]>([]);
  const [interimText, setInterimText] = useState("");
  const [lang, setLang] = useState("id-ID");
  const [history, setHistory] = useState<{ id: number; date: string; text: string }[]>([]);
  const [copyState, setCopyState] = useState<"idle" | "copied">("idle");

  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const lineIdRef = useRef(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!supported) return;
    const w = window as unknown as {
      SpeechRecognition?: new () => SpeechRecognitionLike;
      webkitSpeechRecognition?: new () => SpeechRecognitionLike;
    };
    const SR = w.SpeechRecognition || w.webkitSpeechRecognition;
    if (!SR) return;
    const recognition = new SR();
    recognition.lang = lang;
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event) => {
      let interim = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        const transcript = result[0].transcript;
        if (result.isFinal) {
          lineIdRef.current += 1;
          setLines((prev) => [
            ...prev,
            {
              id: lineIdRef.current,
              time: formatTime(seconds),
              text: transcript.trim(),
              final: true,
            },
          ]);
        } else {
          interim += transcript;
        }
      }
      setInterimText(interim);
    };

    recognition.onerror = () => {
      // Keep UI alive; recognition may auto-restart on `onend`.
    };

    recognition.onend = () => {
      if (isRecording) {
        try {
          recognition.start();
        } catch {
          // ignore restart races
        }
      }
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.onresult = null;
      recognition.onerror = null;
      recognition.onend = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines, interimText]);

  const startTimer = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
  }, []);

  const stopTimer = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = null;
  }, []);

  const handleStartPause = () => {
    if (!supported || !recognitionRef.current) return;
    if (isRecording) {
      setIsRecording(false);
      recognitionRef.current.stop();
      stopTimer();
    } else {
      setIsRecording(true);
      try {
        recognitionRef.current.start();
      } catch {
        // already started
      }
      startTimer();
    }
  };

  const handleStop = () => {
    if (!supported || !recognitionRef.current) return;
    setIsRecording(false);
    recognitionRef.current.stop();
    stopTimer();

    const fullText = lines.map((l) => l.text).join(" ");
    if (fullText.trim().length > 0) {
      setHistory((prev) => [
        {
          id: Date.now(),
          date: new Date().toLocaleString("id-ID", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }),
          text: fullText,
        },
        ...prev,
      ]);
    }
    setLines([]);
    setInterimText("");
    setSeconds(0);
  };

  const handleCopy = async () => {
    const fullText = lines.map((l) => l.text).join(" ");
    if (!fullText) return;
    try {
      await navigator.clipboard.writeText(fullText);
      setCopyState("copied");
      setTimeout(() => setCopyState("idle"), 1500);
    } catch {
      // clipboard unavailable
    }
  };

  const handleDownload = () => {
    const fullText = lines.map((l) => `[${l.time}] ${l.text}`).join("\n");
    if (!fullText) return;
    const blob = new Blob([fullText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `transkrip-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main className="flex-1 flex flex-col bg-surface relative overflow-hidden min-h-screen">
      {/* Header Bar */}
      <header className="h-20 flex items-center justify-between px-gutter border-b border-outline-variant bg-surface sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <h2 className="font-title-lg text-title-lg text-on-surface">
            Speech-to-Text
          </h2>
        </div>
        <div className="flex items-center gap-4">
          <div
            className={`flex items-center gap-2 bg-surface-container-high px-3 py-1.5 rounded-full border border-outline-variant`}
          >
            <div
              className={`w-2 h-2 rounded-full ${
                isRecording ? "bg-error animate-pulse" : "bg-primary"
              }`}
            />
            <span className="text-label-md font-label-md text-on-surface">
              {isRecording ? "Sedang Merekam" : "Real-time Transcript"}
            </span>
          </div>
        </div>
      </header>

      {!supported && (
        <div className="m-6 p-4 bg-error-container text-on-error-container rounded-xl flex items-center gap-3">
          <Icon name="error" />
          <p className="font-body-md text-body-md">
            Browser ini belum mendukung fitur pengenalan suara (Web Speech API).
            Coba gunakan Google Chrome di desktop atau Android untuk hasil
            terbaik.
          </p>
        </div>
      )}

      {/* Main Interactive Area */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Transcription Window */}
        <section className="flex-1 flex flex-col p-6 lg:p-8 overflow-hidden">
          {/* Visualization Area */}
          <div className="h-24 bg-surface-container-low rounded-2xl flex items-center justify-center gap-1.5 mb-6 border border-outline-variant shadow-sm relative overflow-hidden">
            <div className="flex items-end gap-1 h-12">
              {[0.1, 0.3, 0.2, 0.5, 0.4, 0.6, 0.2, 0.8].map((d, i) => (
                <div
                  key={i}
                  className="waveform-bar w-1.5 bg-primary rounded-full"
                  style={{
                    animationDelay: `${d}s`,
                    animationPlayState: isRecording ? "running" : "paused",
                    opacity: isRecording ? 1 : 0.3,
                  }}
                />
              ))}
            </div>
            <div className="absolute top-4 right-6 flex items-center gap-2">
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value)}
                disabled={isRecording}
                className="text-caption font-caption text-on-surface-variant bg-transparent border border-outline-variant rounded-lg px-2 py-1 outline-none"
              >
                {LANGUAGES.map((l) => (
                  <option key={l.code} value={l.code}>
                    {l.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Live Text Container */}
          <div className="flex-1 bg-surface-container-lowest border border-outline-variant rounded-2xl shadow-sm flex flex-col overflow-hidden">
            <div className="p-4 border-b border-outline-variant bg-surface-container-low flex justify-between items-center">
              <div className="flex gap-2">
                <span className="bg-primary-container text-on-primary-container px-3 py-1 rounded-full font-caption text-caption">
                  {LANGUAGES.find((l) => l.code === lang)?.label}
                </span>
                <span className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full font-caption text-caption">
                  Real-time
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleCopy}
                  className="p-2 hover:bg-surface-container-high rounded-lg text-on-surface-variant transition-colors"
                  title="Copy"
                >
                  <Icon name={copyState === "copied" ? "check" : "content_copy"} />
                </button>
                <button
                  onClick={handleDownload}
                  className="p-2 hover:bg-surface-container-high rounded-lg text-on-surface-variant transition-colors"
                  title="Download"
                >
                  <Icon name="download" />
                </button>
              </div>
            </div>
            <div
              ref={scrollRef}
              className="flex-1 p-8 overflow-y-auto custom-scrollbar"
            >
              <div className="max-w-3xl mx-auto space-y-8">
                {lines.length === 0 && !interimText && (
                  <p className="font-body-lg text-body-lg text-on-surface-variant opacity-60 text-center mt-12">
                    {supported
                      ? 'Tekan tombol mikrofon di bawah untuk mulai merekam dan melihat transkripsi muncul di sini secara real-time.'
                      : "Fitur ini memerlukan dukungan Web Speech API pada browser Anda."}
                  </p>
                )}
                {lines.map((line) => (
                  <div key={line.id} className="flex flex-col space-y-2">
                    <span className="font-caption text-caption text-primary">
                      {line.time}
                    </span>
                    <p className="font-body-lg text-body-lg text-on-surface leading-relaxed">
                      {line.text}
                    </p>
                  </div>
                ))}
                {interimText && (
                  <div className="flex flex-col space-y-2">
                    <span className="font-caption text-caption text-primary font-bold">
                      {formatTime(seconds)} • Sedang Berjalan
                    </span>
                    <p className="font-body-lg text-body-lg text-on-surface leading-relaxed font-semibold opacity-70">
                      {interimText}
                    </p>
                    <div className="flex items-center gap-1">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" />
                      <div
                        className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      />
                      <div
                        className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce"
                        style={{ animationDelay: "0.4s" }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Main Controls */}
          <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-6 px-4 py-6 bg-surface-container-low rounded-2xl border border-outline-variant">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-error-container text-on-error-container rounded-xl">
                <Icon name="timer" />
              </div>
              <div>
                <p className="font-caption text-caption text-on-surface-variant">
                  Durasi Rekaman
                </p>
                <p className="font-title-lg text-title-lg font-bold text-on-surface">
                  {formatTime(seconds)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={handleStop}
                disabled={!supported}
                className="group flex flex-col items-center gap-1 transition-all disabled:opacity-40"
              >
                <div className="w-14 h-14 rounded-full border-2 border-error flex items-center justify-center text-error group-hover:bg-error group-hover:text-on-error transition-all active:scale-95">
                  <Icon name="stop" className="text-3xl" filled />
                </div>
                <span className="font-caption text-caption text-on-surface-variant">
                  Berhenti
                </span>
              </button>
              <button
                onClick={handleStartPause}
                disabled={!supported}
                className="group flex flex-col items-center gap-2 transition-all disabled:opacity-40"
              >
                <div
                  className={`w-20 h-20 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-lg active:scale-90 transition-all ${
                    isRecording ? "recording-pulse" : ""
                  }`}
                >
                  <Icon name="mic" className="text-4xl" filled />
                </div>
                <span className="font-label-md text-label-md text-primary font-bold">
                  {isRecording ? "Perekaman Aktif" : "Mulai Merekam"}
                </span>
              </button>
              <button
                disabled
                className="group flex flex-col items-center gap-1 transition-all opacity-50 cursor-not-allowed"
              >
                <div className="w-14 h-14 rounded-full border-2 border-outline flex items-center justify-center text-on-surface-variant">
                  <Icon name="save" />
                </div>
                <span className="font-caption text-caption text-on-surface-variant">
                  Simpan
                </span>
              </button>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleDownload}
                disabled={lines.length === 0}
                className="flex items-center gap-2 px-4 py-2 bg-surface border border-outline-variant rounded-xl hover:bg-surface-container-high transition-colors disabled:opacity-40"
              >
                <Icon name="download" />
                <span className="font-label-md text-label-md">Download</span>
              </button>
            </div>
          </div>
        </section>

        {/* History Panel */}
        <aside className="w-full lg:w-80 bg-surface-container-low border-l border-outline-variant flex flex-col overflow-hidden lg:h-[calc(100vh-5rem)]">
          <div className="p-6 border-b border-outline-variant bg-surface-container">
            <h3 className="font-title-lg text-title-lg text-on-surface flex items-center gap-2">
              <Icon name="history" className="text-primary" />
              Riwayat Sesi Ini
            </h3>
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-4">
            {history.length === 0 && (
              <p className="text-caption font-caption text-on-surface-variant text-center py-8 opacity-60">
                Riwayat transkripsi yang sudah dihentikan akan muncul di sini.
              </p>
            )}
            {history.map((item) => (
              <div
                key={item.id}
                className="p-4 bg-surface-container-lowest rounded-xl border border-outline-variant hover:border-primary cursor-pointer transition-all hover:shadow-md group"
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="font-caption text-caption text-on-surface-variant">
                    {item.date}
                  </span>
                  <Icon
                    name="arrow_forward"
                    className="text-primary opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </div>
                <p className="font-caption text-caption text-on-surface-variant line-clamp-2">
                  &quot;{item.text}&quot;
                </p>
              </div>
            ))}
          </div>
          <div className="p-4 bg-primary-container text-on-primary-container m-4 rounded-2xl shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="auto_awesome" />
              <span className="font-label-md text-label-md">
                HearBridge AI Tip
              </span>
            </div>
            <p className="font-caption text-caption leading-relaxed mb-3">
              Ingin ringkasan dari transkripsi ini? Gunakan fitur AI Assistant
              setelah rekaman selesai.
            </p>
            <a
              href="/assistant"
              className="w-full block text-center py-2 bg-on-primary-container text-primary-container rounded-lg font-bold font-label-md text-label-md hover:opacity-90 transition-all"
            >
              Buka AI Assistant
            </a>
          </div>
        </aside>
      </div>
    </main>
  );
}
