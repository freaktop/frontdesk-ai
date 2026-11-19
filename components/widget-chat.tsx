"use client";
import { useState } from "react";

export interface WidgetBusiness {
  id: string;
  name: string;
  description?: string | null;
  websiteUrl?: string | null;
  contactEmail?: string | null;
  contactPhone?: string | null;
  primaryColor?: string | null;
  greeting?: string | null;
  handoffEmail?: string | null;
  handoffPhone?: string | null;
}

interface Message {
  role: "user" | "assistant";
  content: string;
  createdAt?: string;
}

export function WidgetChat({ business }: { business: WidgetBusiness }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [reply, setReply] = useState<string | null>(null);
  const [status, setStatus] = useState<string>("answered");
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [handoffOpen, setHandoffOpen] = useState(false);
  const [handoffForm, setHandoffForm] = useState({ name: "", email: "", message: "" });

  async function send(e?: React.FormEvent) {
    e?.preventDefault();
    const text = input.trim();
    if (!text) return;
    const userMsg: Message = { role: "user", content: text };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput("");
    const res = await fetch("/api/widget/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ businessSlug: business.name, question: text, visitorId: conversationId ?? undefined }),
    });
    const data = await res.json();
    setReply(data.reply ?? "Sorry, something went wrong.");
    setStatus(data.status ?? "answered");
    setConversationId(data.conversationId ?? conversationId);
    setMessages([...next, { role: "assistant", content: data.reply ?? "" }]);
    if (data.status === "handed_off") setHandoffOpen(true);
  }

  async function submitHandoff(e: React.FormEvent) {
    e.preventDefault();
    if (!conversationId) return;
    await fetch("/api/widget/handoff", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ businessSlug: business.name, conversationId, reason: status === "handed_off" ? "unknown_question" : "manual", message: handoffForm.message, contactEmail: handoffForm.email, contactName: handoffForm.name, visitorId: conversationId }),
    });
    setHandoffOpen(false);
    setMessages((m) => [...m, { role: "assistant", content: "A team member will assist you shortly. Please share your contact details." }]);
  }

  const color = business.primaryColor || "#2563eb";

  return (
    <main className="min-h-screen flex flex-col" style={{ background: "#f8fafc" }}>
      <header className="border-b bg-white p-4 flex items-center justify-between">
        <div>
          <h1 className="font-bold text-lg">{business.name}</h1>
          {business.description && <p className="text-xs text-gray-500">{business.description}</p>}
        </div>
        <span className="text-[10px] px-2 py-1 rounded-full bg-green-100 text-green-700 font-medium">AI</span>
      </header>
      <section className="flex-1 p-4 overflow-y-auto space-y-3">
        {messages.length === 0 && <p className="text-sm text-gray-500 text-center mt-8">Ask us anything about our services.</p>}
        {messages.map((m, i) => (
          <div key={i} className={"max-w-[85%] rounded-2xl px-4 py-2 text-sm " + (m.role === "user" ? "ml-auto bg-blue-600 text-white" : "mr-auto bg-white border text-gray-800")}>
            {m.content}
          </div>
        ))}
      </section>
      <footer className="border-t bg-white p-3">
        <form onSubmit={send} className="flex gap-2">
          <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type your question…" className="flex-1 border rounded-full px-4 py-2 text-sm" />
          <button type="submit" className="text-white rounded-full px-4 py-2 text-sm font-semibold" style={{ background: color }}>Send</button>
        </form>
        <p className="text-[10px] text-gray-400 mt-2 text-center">Answers are AI-generated from approved business information. Unknown questions are handed to a human.</p>
        {handoffOpen && (
          <form onSubmit={submitHandoff} className="mt-3 space-y-2 border-t pt-3">
            <input value={handoffForm.name} onChange={(e) => setHandoffForm({ ...handoffForm, name: e.target.value })} placeholder="Your name" className="w-full border rounded p-2 text-sm" />
            <input value={handoffForm.email} onChange={(e) => setHandoffForm({ ...handoffForm, email: e.target.value })} placeholder="Your email" className="w-full border rounded p-2 text-sm" />
            <textarea value={handoffForm.message} onChange={(e) => setHandoffForm({ ...handoffForm, message: e.target.value })} placeholder="Additional context (optional)" className="w-full border rounded p-2 text-sm" />
            <button type="submit" className="w-full text-white rounded p-2 text-sm font-semibold" style={{ background: color }}>Request Human Handoff</button>
          </form>
        )}
      </footer>
    </main>
  );
}
