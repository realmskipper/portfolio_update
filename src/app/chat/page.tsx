"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: Message = { role: "user", content: text };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updated }),
      });
      const data = await res.json();
      setMessages([...updated, { role: "assistant", content: data.content }]);
    } catch {
      setMessages([
        ...updated,
        { role: "assistant", content: "Sorry, something went wrong. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto flex max-w-3xl flex-col px-6 py-10 md:py-16" style={{ minHeight: "calc(100vh - 80px)" }}>
      {/* Chat messages */}
      <div className="flex-1 space-y-6 overflow-y-auto pb-6">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center pt-20 text-center">
            <div className="relative h-24 w-24 overflow-hidden rounded-full bg-surface mb-6">
              <Image
                src="/images/x1939.png"
                alt="Chat Assistant"
                fill
                className="object-cover"
              />
            </div>
            <p className="text-lg text-heading font-semibold">Chat Assistant</p>
            <p className="mt-2 text-sm text-muted">Ask me anything</p>
          </div>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex items-end gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
          >
            {msg.role === "assistant" && (
              <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full bg-surface">
                <Image
                  src="/images/x1939.png"
                  alt="Assistant"
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div
              className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                msg.role === "user"
                  ? "rounded-br-sm bg-accent text-white"
                  : "rounded-bl-sm bg-surface text-body"
              }`}
            >
              {msg.role === "assistant" ? (
                <div
                  className="prose prose-invert prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: formatMarkdown(msg.content) }}
                />
              ) : (
                msg.content
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-end gap-3">
            <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full bg-surface">
              <Image
                src="/images/x1939.png"
                alt="Assistant"
                fill
                className="object-cover"
              />
            </div>
            <div className="rounded-2xl rounded-bl-sm bg-surface px-4 py-3">
              <div className="flex gap-1">
                <span className="h-2 w-2 animate-bounce rounded-full bg-muted" style={{ animationDelay: "0ms" }} />
                <span className="h-2 w-2 animate-bounce rounded-full bg-muted" style={{ animationDelay: "150ms" }} />
                <span className="h-2 w-2 animate-bounce rounded-full bg-muted" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="sticky bottom-0 border-t border-surface bg-background pt-4 pb-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send();
          }}
          className="flex gap-3"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 rounded-full bg-surface px-5 py-3 text-sm text-heading placeholder:text-muted outline-none focus:ring-2 focus:ring-accent/50"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-40"
          >
            Send
          </button>
        </form>
      </div>
    </main>
  );
}

function formatMarkdown(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/`([^`]+)`/g, '<code class="bg-background/50 px-1.5 py-0.5 rounded text-xs">$1</code>')
    .replace(/\n/g, "<br />");
}
