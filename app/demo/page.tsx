"use client";

import Link from "next/link";
import { useState } from "react";

type Message = { from: "visitor" | "assistant"; text: string };

const quickQuestions = [
  "What services do you offer?",
  "Do you have emergency service?",
  "Can I request a callback?",
  "What are your business hours?",
];

function answerFor(question: string) {
  const q = question.toLowerCase();
  if (q.includes("service")) return "This sample business provides heating, cooling, maintenance, and repair services. A real assistant would use only the services configured by your business.";
  if (q.includes("emergency") || q.includes("urgent")) return "For urgent service, please contact the business directly to confirm availability and response times. This sample cannot dispatch a technician.";
  if (q.includes("callback") || q.includes("call")) return "You can request a callback from the business team. This sample demo does not actually send a contact request.";
  if (q.includes("hour") || q.includes("open")) return "Business hours vary by company. In a real setup, the assistant would share the hours configured by the business owner.";
  return "I can help with general questions about services and how to contact the business. For details not included in the approved business information, please contact the team directly.";
}

export default function DemoPage() {
  const [messages, setMessages] = useState<Message[]>([
    { from: "assistant", text: "Hi! I'm a sample website assistant. Ask me about services, hours, or how to request follow-up. This is a scripted demo—not connected to a real business." },
  ]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);

  function send(question: string) {
    const trimmed = question.trim();
    if (!trimmed || busy) return;
    setMessages(prev => [...prev, { from: "visitor", text: trimmed }, { from: "assistant", text: answerFor(trimmed) }]);
    setInput("");
    setBusy(true);
    setTimeout(() => setBusy(false), 150);
  }

  return (
    <main className="min-h-screen bg-[#070b14] px-4 py-10 text-white md:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <Link href="/" className="text-lg font-semibold">← FrontDesk<span className="text-blue-400"> AI</span></Link>
          <span className="rounded-full border border-amber-300/20 bg-amber-300/10 px-3 py-1 text-xs text-amber-200">Sample demo · not connected to live business data</span>
        </div>
        <div className="grid gap-8 md:grid-cols-[1fr_1.1fr]">
          <div className="pt-4">
            <p className="text-sm font-semibold uppercase tracking-[.2em] text-blue-400">Try it out</p>
            <h1 className="mt-3 text-4xl font-semibold leading-tight md:text-5xl">See how a website assistant responds.</h1>
            <p className="mt-5 leading-7 text-slate-400">Ask a question or choose a prompt. This interactive sample uses scripted responses to demonstrate the conversation flow.</p>
            <div className="mt-8 flex flex-wrap gap-2">{quickQuestions.map(q => <button key={q} onClick={() => send(q)} className="rounded-xl border border-white/10 bg-white/[.04] px-3 py-2 text-left text-sm text-slate-300 hover:border-blue-400/30 hover:bg-blue-400/5">{q}</button>)}</div>
            <Link href="/#pricing" className="mt-8 inline-flex rounded-full bg-blue-500 px-5 py-3 font-semibold hover:bg-blue-400">View setup and pricing</Link>
          </div>
          <section className="overflow-hidden rounded-3xl border border-white/10 bg-[#0d1422] shadow-2xl shadow-blue-950/20">
            <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/15 text-blue-300">✦</div><div><p className="font-semibold">Sample Business Assistant</p><p className="text-xs text-slate-500">Scripted demo conversation</p></div></div>
            <div className="flex h-[440px] flex-col gap-3 overflow-y-auto p-4" aria-live="polite">{messages.map((m, i) => <div key={i} className={m.from === "visitor" ? "ml-auto max-w-[85%] rounded-2xl rounded-br-md bg-blue-600 px-4 py-3 text-sm" : "max-w-[90%] rounded-2xl rounded-bl-md border border-white/10 bg-white/[.04] px-4 py-3 text-sm leading-6 text-slate-300"}>{m.text}</div>)}</div>
            <form onSubmit={e => { e.preventDefault(); send(input); }} className="flex gap-2 border-t border-white/10 p-3">
              <input value={input} onChange={e => setInput(e.target.value)} placeholder="Ask a sample question..." aria-label="Ask the sample assistant" className="min-w-0 flex-1 rounded-xl border border-white/10 bg-[#080d17] px-4 py-3 text-sm text-white outline-none focus:border-blue-400/40" />
              <button type="submit" disabled={!input.trim()} className="rounded-xl bg-blue-500 px-4 py-3 text-sm font-semibold disabled:opacity-40">Send</button>
            </form>
          </section>
        </div>
        <p className="mt-5 text-center text-xs leading-5 text-slate-500">Sample responses are illustrative. This demo does not use a live AI model, submit leads, book appointments, or contact a business.</p>
      </div>
    </main>
  );
}
