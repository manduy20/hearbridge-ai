import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const completion =
      await openai.chat.completions.create({
        model: "gpt-4.1 mini",
        messages: [
          {
            role: "system",
            content:
              "Kamu adalah HearBridge AI Assistant. Jawab dalam Bahasa Indonesia dengan jelas dan ramah.",
          },
          {
            role: "user",
            content: message,
          },
        ],
      });

    return NextResponse.json({
      reply:
        completion.choices[0].message.content,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Gagal memproses AI." },
      { status: 500 }
    );
  }
}
