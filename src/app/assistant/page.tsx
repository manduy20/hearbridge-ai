"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Icon from "@/components/Icon";

export default function AssistantPage() {
  const router = useRouter();

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Halo! Saya HearBridge AI Assistant."
    }
  ]);

  const [input, setInput] = useState("");

 const sendMessage = async () => {
  if (!input.trim()) return;

  const userText = input;

  setMessages((prev) => [
    ...prev,
    {
      role: "user",
      text: userText,
    },
  ]);

  setInput("");

  let reply = "";

  const lower = userText.toLowerCase();

  if (lower.includes("halo")) {
    reply = "Halo 👋 Ada yang bisa saya bantu?";
  } else if (
    lower.includes("presiden indonesia")
  ) {
    reply =
      "Presiden Indonesia saat ini adalah Prabowo Subianto.";
  } else if (
    lower.includes("hearbridge")
  ) {
    reply =
      "HearBridge AI adalah platform komunikasi digital yang menyediakan Speech-to-Text, Text-to-Speech, dan AI Assistant.";
  } else {
    reply =
      "Maaf, saya belum memahami pertanyaan tersebut. Hubungkan saya ke OpenAI API agar dapat menjawab lebih cerdas.";
  }

  setMessages((prev) => [
    ...prev,
    {
      role: "assistant",
      text: reply,
    },
  ]);
};

  return (
    <main className="min-h-screen bg-[#101820] text-white flex">

      <aside className="w-72 bg-[#1B2530] border-r border-white/10 p-6">
        <h2 className="text-xl font-bold mb-4">
          HearBridge AI
        </h2>

        <button
          onClick={() => router.push("/dashboard")}
          className="w-full p-3 rounded-xl bg-gradient-to-r from-[#FF8B5E] to-[#5EC8FF] text-black font-bold"
        >
          Dashboard
        </button>
      </aside>

      <section className="flex-1 flex flex-col">

        <div className="flex-1 p-8 overflow-y-auto">

          {messages.map((msg, i) => (
            <div
              key={i}
              className={`mb-4 ${
                msg.role === "user"
                  ? "text-right"
                  : ""
              }`}
            >
              <div
                className={`inline-block p-4 rounded-2xl ${
                  msg.role === "user"
                    ? "bg-[#5EC8FF] text-black"
                    : "bg-[#1B2530]"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

        </div>

        <div className="p-6 border-t border-white/10 flex gap-4">

          <input
       value={input}
       onChange={(e) => setInput(e.target.value)}
       onKeyDown={(e) => {
      if (e.key === "Enter") {
      sendMessage();
    }
  }}
            className="flex-1 bg-[#1B2530] rounded-xl p-4"
            placeholder="Tulis pesan..."
          />

          <button
            onClick={sendMessage}
            className="px-6 rounded-xl bg-gradient-to-r from-[#FF8B5E] to-[#5EC8FF] text-black font-bold"
          >
            Kirim
          </button>

        </div>

      </section>

    </main>
  );
}
