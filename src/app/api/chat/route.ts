import Anthropic from "@anthropic-ai/sdk";
import { NextRequest } from "next/server";

const client = new Anthropic();

export async function POST(req: NextRequest) {
  const { messages } = await req.json();

  const response = await client.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 1024,
    system: "You are a helpful assistant on William Plant's portfolio website. Keep responses concise and friendly. You can use markdown for formatting.",
    messages,
  });

  const text =
    response.content[0].type === "text" ? response.content[0].text : "";

  return Response.json({ role: "assistant", content: text });
}
