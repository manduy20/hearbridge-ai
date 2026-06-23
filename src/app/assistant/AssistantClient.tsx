"use client";

import { useEffect, useRef, useState } from "react";
import Icon from "@/components/Icon";
import { addHistory } from "@/storage";

type Message = {
  id: number;
  role: "ai" | "user";
  text: string;
  time: string;
};

function nowLabel() {
  return new Date().toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

const SUGGESTED_ACTIONS = [
  "Ringkas rekaman terakhir",
  "Cara pakai Text-to-Speech",
  "Atur bahasa transkripsi",
];

function generateReply(userText: string): string {
  const lower = userText.toLowerCase();

  if (
    lower.includes("presiden indonesia") ||
    lower.includes("presiden indo")
  ) {
    return "Presiden Indonesia saat ini adalah Prabowo Subianto.";
  }

  if (
    lower.includes("wakil presiden") ||
    lower.includes("wapres")
  ) {
    return "Wakil Presiden Indonesia saat ini adalah Gibran Rakabuming Raka.";
  }

  if (
    lower.includes("hearbridge")
  ) {
    return "HearBridge AI adalah platform komunikasi digital yang menyediakan Speech-to-Text, Text-to-Speech, dan AI Assistant untuk membantu komunikasi yang lebih mudah dan inklusif.";
  }

  if (
    lower.includes("tts") ||
    lower.includes("text-to-speech") ||
    lower.includes("suara")
  ) {
    return "Untuk hasil suara yang lebih natural di fitur Text-to-Speech, gunakan tanda baca yang tepat, pilih bahasa yang sesuai, dan atur kecepatan suara sekitar 0.9x–1x.";
  }

  if (
    lower.includes("stt") ||
    lower.includes("speech-to-text") ||
    lower.includes("transkrip")
  ) {
    return "Fitur Speech-to-Text mengubah suara menjadi teks secara realtime menggunakan mikrofon perangkat Anda.";
  }

  if (
    lower.includes("ringkas") ||
    lower.includes("rangkum") ||
    lower.includes("summary")
  ) {
    return "Saya dapat membantu merangkum hasil transkripsi yang telah disimpan dari fitur Speech-to-Text.";
  }

  if (
    lower.includes("bahasa")
  ) {
    return "Saat ini tersedia Bahasa Indonesia dan English untuk proses transkripsi maupun Text-to-Speech.";
  }

  return "Maaf, saya belum memiliki AI online. Untuk menjawab pertanyaan umum secara cerdas, hubungkan aplikasi ke OpenAI API melalui backend Next.js.";
}

export default function AssistantClient() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "ai",
      text: "Halo! Saya adalah asisten HearBridge AI. Ada yang bisa saya bantu hari ini? Anda bisa bertanya tentang tutorial penggunaan aplikasi atau meminta bantuan ringkasan transkrip.",
      time: nowLabel(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const chatEndRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(1);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    addHistory(
  text,
  "AI Assistant",
  "smart_toy"
);
    idRef.current += 1;
    const userMsg: Message = {
      id: idRef.current,
      role: "user",
      text,
      time: nowLabel(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      idRef.current += 1;
      const aiMsg: Message = {
        id: idRef.current,
        role: "ai",
        text: generateReply(text),
        time: nowLabel(),
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 900);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <main className="flex-1 flex flex-col min-h-screen relative bg-surface">
      {/* Top App Bar */}
      <header className="h-16 flex items-center justify-between px-gutter border-b border-outline-variant bg-white/80 backdrop-blur-md sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container">
            <Icon name="smart_toy" filled />
          </div>
          <div>
            <h2 className="font-title-lg text-title-lg text-on-surface">
              HearBridge Assistant
            </h2>
            <p className="text-[12px] text-primary flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              AI is ready to help
            </p>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Chat Interface */}
        <section className="flex-1 flex flex-col bg-white">
          <div className="flex-1 overflow-y-auto custom-scrollbar p-gutter space-y-6">
            <div className="flex justify-center">
              <span className="bg-surface-container-high text-on-surface-variant text-caption px-4 py-1 rounded-full font-medium uppercase tracking-wider">
                Hari ini
              </span>
            </div>

            {messages.map((msg) =>
              msg.role === "ai" ? (
                <div key={msg.id} className="flex items-start gap-3 max-w-[85%]">
                  <div className="w-8 h-8 rounded-full bg-primary-container flex-shrink-0 flex items-center justify-center">
                    <Icon name="smart_toy" className="text-[18px] text-on-primary-container" />
                  </div>
                  <div className="bg-surface-container-low p-4 rounded-2xl shadow-sm border border-outline-variant/30">
                    <p className="text-body-md text-on-surface">{msg.text}</p>
                    <span className="text-[11px] text-on-surface-variant mt-2 block text-right">
                      {msg.time}
                    </span>
                  </div>
                </div>
              ) : (
                <div
                  key={msg.id}
                  className="flex items-start gap-3 max-w-[85%] ml-auto flex-row-reverse"
                >
                  <div className="w-8 h-8 rounded-full bg-primary flex-shrink-0 flex items-center justify-center text-on-primary font-bold text-sm">
                    B
                  </div>
                  <div className="bg-primary text-on-primary p-4 rounded-2xl shadow-md">
                    <p className="text-body-md">{msg.text}</p>
                    <div className="flex items-center justify-end gap-1 mt-2">
                      <span className="text-[11px] text-primary-fixed block">
                        {msg.time}
                      </span>
                      <Icon name="done_all" className="text-[14px] text-primary-fixed" />
                    </div>
                  </div>
                </div>
              )
            )}

            {isTyping && (
              <div className="flex flex-col items-center py-2">
                <div className="flex items-end justify-center h-8 gap-1 mb-2">
                  {[0, 100, 200, 300, 400].map((delay) => (
                    <div
                      key={delay}
                      className="w-1 bg-primary rounded-full animate-bounce"
                      style={{ height: "60%", animationDelay: `${delay}ms` }}
                    />
                  ))}
                </div>
                <p className="text-caption text-primary-container font-semibold animate-pulse">
                  AI is typing...
                </p>
              </div>
            )}
            {isTyping && (
  <div className="mb-4">
    <div className="inline-block bg-[#1B2530] rounded-2xl p-4">
      HearBridge AI sedang mengetik...
    </div>
  </div>
)}
            <div ref={chatEndRef} />
          </div>

          {/* Input Area */}
          <form
            onSubmit={handleSubmit}
            className="p-gutter border-t border-outline-variant bg-white"
          >
            <div className="max-w-4xl mx-auto flex items-end gap-3">
              <div className="flex-1 bg-surface-container-low border border-outline rounded-2xl p-2 flex items-end">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage(input);
                    }
                  }}
                  className="flex-1 bg-transparent border-none focus:ring-0 text-body-md py-2 px-2 resize-none max-h-32 placeholder:text-outline outline-none"
                  placeholder="Tulis pesan Anda..."
                  rows={1}
                />
              </div>
              <button
                type="submit"
                disabled={!input.trim()}
                className="w-12 h-12 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all disabled:opacity-40"
              >
                <Icon name="send" filled />
              </button>
            </div>
            <p className="text-center text-[11px] text-on-surface-variant mt-3">
              HearBridge AI dapat membuat kesalahan. Periksa kembali informasi
              penting.
            </p>
          </form>
        </section>

        {/* Help Panel */}
        <aside className="hidden xl:flex flex-col w-80 border-l border-outline-variant bg-surface-container-lowest p-6 space-y-6 overflow-y-auto">
          <div>
            <h3 className="font-title-lg text-title-lg text-on-surface mb-4">
              Quick Help
            </h3>
            <div className="space-y-3">
              <a
                href="/speech-to-text"
                className="group p-4 bg-white border border-outline-variant rounded-xl hover:border-primary hover:shadow-md transition-all block"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center text-primary">
                    <Icon name="description" />
                  </div>
                  <span className="font-label-md text-label-md">STT Guide</span>
                </div>
                <p className="text-caption text-on-surface-variant">
                  Cara mengubah percakapan menjadi teks secara real-time.
                </p>
              </a>
              <a
                href="/text-to-speech"
                className="group p-4 bg-white border border-outline-variant rounded-xl hover:border-primary hover:shadow-md transition-all block"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center text-primary">
                    <Icon name="record_voice_over" />
                  </div>
                  <span className="font-label-md text-label-md">TTS Guide</span>
                </div>
                <p className="text-caption text-on-surface-variant">
                  Cara mengubah teks menjadi suara dengan intonasi natural.
                </p>
              </a>
            </div>
          </div>
          <hr className="border-outline-variant" />
          <div>
            <h3 className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider mb-4">
              Suggested Actions
            </h3>
            <div className="flex flex-wrap gap-2">
              {SUGGESTED_ACTIONS.map((action) => (
                <button
                  key={action}
                  onClick={() => sendMessage(action)}
                  className="px-3 py-2 bg-surface-container text-on-surface-variant rounded-lg text-caption hover:bg-primary-container hover:text-on-primary-container transition-all"
                >
                  {action}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-auto bg-primary-container/10 p-4 rounded-2xl border border-primary/20">
            <div className="flex items-center gap-2 mb-2 text-primary">
              <Icon name="auto_awesome" />
              <span className="font-label-md text-label-md">AI Insights</span>
            </div>
            <p className="text-caption text-on-surface-variant">
              AI Assistant mempelajari preferensi komunikasi Anda untuk hasil
              yang lebih akurat.
            </p>
          </div>
        </aside>
      </div>
    </main>
  );
}
