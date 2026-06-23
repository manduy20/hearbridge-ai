"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Icon from "@/components/Icon";

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

interface User {
  name: string;
  email: string;
}

export default function SpeechToTextPage() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [supported, setSupported] = useState(true);

  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("hearbridge_user");

    if (!savedUser) {
      router.replace("/login");
      return;
    }

    setUser(JSON.parse(savedUser));

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setSupported(false);
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "id-ID";
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event: any) => {
      let text = "";

      for (let i = 0; i < event.results.length; i++) {
        text += event.results[i][0].transcript + " ";
      }

      setTranscript(text);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
  }, [router]);

  const startListening = () => {
    if (!recognitionRef.current) return;

    recognitionRef.current.start();
    setIsListening(true);
  };

  const stopListening = () => {
    if (!recognitionRef.current) return;

    recognitionRef.current.stop();
    setIsListening(false);
  };

  const saveTranscript = () => {
    if (!user || !transcript.trim()) return;

    const key = `history_${user.email}`;

    const oldHistory = JSON.parse(
      localStorage.getItem(key) || "[]"
    );

    oldHistory.unshift({
      title:
        transcript.length > 40
          ? transcript.slice(0, 40) + "..."
          : transcript,
      tag: "Speech to Text",
      time: new Date().toLocaleString("id-ID"),
      icon: "mic",
      content: transcript,
    });

    localStorage.setItem(
      key,
      JSON.stringify(oldHistory)
    );

    alert("Transkripsi berhasil disimpan.");
  };

  const downloadTXT = () => {
    const blob = new Blob([transcript], {
      type: "text/plain",
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = "transkripsi.txt";
    a.click();

    URL.revokeObjectURL(url);
  };

  if (!supported) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Browser tidak mendukung Speech Recognition.
      </div>
    );
  }

 return (
  
  <main className="min-h-screen bg-[#081420] text-white overflow-hidden relative">

    {/* Glow Background */}
    <div className="absolute top-20 left-0 w-96 h-96 bg-[#FF8B5E]/20 blur-[140px] rounded-full" />
    <div className="absolute bottom-20 right-0 w-96 h-96 bg-[#5EC8FF]/20 blur-[140px] rounded-full" />

    <div className="relative z-10 max-w-7xl mx-auto px-8 py-10">

      {/* Header */}
      <div className="flex items-center justify-between mb-10">

        <div>
          <button
  onClick={saveTranscript}
  className="px-8 py-4 rounded-2xl border border-[#5EC8FF]/30 bg-[#0F1A28] hover:border-[#5EC8FF] transition-all"
>
  💾 Simpan History
</button>

          <div className="flex items-center gap-6">

            <div className="w-24 h-24 rounded-3xl bg-gradient-to-r from-[#FF8B5E] to-[#5EC8FF] flex items-center justify-center">
              <Icon
                name="mic"
                className="text-white text-5xl"
              />
            </div>

            <div>
              <h1 className="text-5xl font-bold">
  Halo, {user?.name} 👋
</h1>

<p className="text-xl mt-2 text-white">
  Speech To Text
</p>

              <p className="text-slate-400 mt-2 text-lg">
                Ubah suara menjadi teks secara realtime.
              </p>
            </div>

          </div>
        </div>

      </div>

      {/* Main Card */}
      <div className="bg-[#162333]/80 backdrop-blur-xl border border-white/10 rounded-[32px] p-8">

        <div className="flex justify-between items-center mb-8">
          

  <div>
    <h2 className="text-3xl font-semibold">
      Kontrol Perekaman
    </h2>

    <p className="text-slate-400 mt-2">
      Klik tombol mulai untuk memulai perekaman suara Anda.
    </p>
  </div>

  <div className="px-4 py-2 rounded-xl border border-white/10 bg-[#0F1A28]">

    {isListening ? (
      <span className="text-red-400 font-medium">
        🔴 Sedang Merekam
      </span>
    ) : (
      <span className="text-slate-400">
        ⚪ Tidak Aktif
      </span>
    )}

  </div>

</div>

        <div className="flex flex-wrap gap-4 mb-8">
          <button
  onClick={() => router.push("/text-to-speech")}
  className="px-8 py-4 rounded-2xl border border-white/10 bg-[#0F1A28]"
>
  🔊 Text To Speech
</button>

<button
  onClick={() => router.push("/assistant")}
  className="px-8 py-4 rounded-2xl border border-white/10 bg-[#0F1A28]"
>
  🤖 AI Assistant
</button>

          {!isListening ? (
            <button
              onClick={startListening}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-[#FF8B5E] to-[#5EC8FF] text-black font-semibold flex items-center gap-3"
            >
              <Icon name="mic" />
              Mulai Rekam
            </button>
          ) : (
            <button
              onClick={stopListening}
              className="px-8 py-4 rounded-2xl bg-red-500 text-white font-semibold flex items-center gap-3"
            >
              <Icon name="stop" />
              Stop
            </button>
          )}

          <button
            onClick={saveTranscript}
            className="px-8 py-4 rounded-2xl border border-white/10 bg-[#0F1A28]"
          >
            Simpan
          </button>

          <button
  onClick={downloadTXT}
  className="px-8 py-4 rounded-2xl border border-[#FF8B5E]/30 bg-[#0F1A28] hover:border-[#FF8B5E] transition-all"
>
  📄 Download TXT
</button>

        </div>

        {/* Transcript */}
        <div className="border border-white/10 rounded-[28px] p-6 bg-[#0F1A28]">

          <h3 className="text-2xl font-semibold mb-2">
            Hasil Transkripsi
          </h3>

          <p className="text-slate-400 mb-6">
            Teks hasil transkripsi akan muncul di sini secara realtime.
          </p>

          <div className="min-h-[350px] flex items-center justify-center">

            {transcript ? (
              <div className="w-full">
                <p className="leading-9 text-lg whitespace-pre-wrap">
                  {transcript}
                </p>
              </div>
            ) : (
              <div className="text-center">

                <Icon
                  name="graphic_eq"
                  className="text-8xl mb-4 text-[#5EC8FF]"
                />

                <p className="text-slate-400 text-xl">
                  Tekan tombol "Mulai Rekam"
                  <br />
                  untuk memulai transkripsi suara.
                </p>

              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  </main>
);
}

