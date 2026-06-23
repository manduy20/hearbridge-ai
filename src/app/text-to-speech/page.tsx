"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Icon from "@/components/Icon";

export default function TextToSpeechPage() {
  const router = useRouter();
  const [text, setText] = useState("");

  const speak = () => {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "id-ID";
    window.speechSynthesis.speak(speech);
  };

  const stop = () => {
    window.speechSynthesis.cancel();
  };

  return (
    <main className="min-h-screen bg-[#101820] text-white p-8">

      <button
        onClick={() => router.push("/dashboard")}
        className="mb-8 text-slate-400"
      >
        ← Dashboard
      </button>

      <div className="max-w-4xl mx-auto bg-[#1B2530] rounded-[22px] border border-white/10 p-8">

        <h1 className="text-4xl font-bold mb-2">
          Text To Speech
        </h1>

        <p className="text-slate-400 mb-6">
          Ubah teks menjadi suara.
        </p>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full h-60 bg-[#101820] border border-white/10 rounded-xl p-4"
          placeholder="Masukkan teks..."
        />

        <div className="flex gap-4 mt-6">

          <button
            onClick={speak}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#FF8B5E] to-[#5EC8FF] text-black font-bold"
          >
            <Icon name="play_arrow" />
            Putar
          </button>

          <button
            onClick={stop}
            className="px-6 py-3 rounded-xl bg-red-500"
          >
            Stop
          </button>

        </div>

      </div>

    </main>
  );
}
