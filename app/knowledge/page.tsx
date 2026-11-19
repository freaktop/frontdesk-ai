"use client";
import useSWR from "swr";
import { useState } from "react";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function KnowledgePage() {
  const { data, mutate } = useSWR("/api/knowledge", fetcher);
  const [form, setForm] = useState({ question: "", answer: "", category: "", active: true });
  const [msg, setMsg] = useState<string | null>(null);

  async function add(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/knowledge", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    setMsg(res.ok ? "FAQ saved." : "Save failed.");
    if (res.ok) { setForm({ question: "", answer: "", category: "", active: true }); mutate(); }
  }

  async function toggle(id: string, active: boolean) {
    await fetch(`/api/knowledge?id=${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, active }) });
    mutate();
  }

  async function remove(id: string) {
    await fetch(`/api/knowledge?id=${id}`, { method: "DELETE" });
    mutate();
  }

  const faqs: any[] = data?.faqs ?? [];

  return (
    <main className="max-w-5xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Knowledge / FAQs</h1>
      <form onSubmit={add} className="bg-white p-6 rounded-xl shadow-sm border mb-8 space-y-3">
        <input placeholder="Question" required value={form.question} onChange={(e) => setForm({ ...form, question: e.target.value })} className="w-full border p-2 rounded" />
        <textarea placeholder="Approved answer" required value={form.answer} onChange={(e) => setForm({ ...form, answer: e.target.value })} className="w-full border p-2 rounded" rows={3} />
        <input placeholder="Category (optional)" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full border p-2 rounded" />
        <button className="bg-blue-600 text-white p-2 rounded font-semibold">Add FAQ</button>
        {msg && <p className="text-sm text-gray-600">{msg}</p>}
      </form>
      <div className="bg-white rounded-xl shadow-sm border divide-y">
        {faqs.map((f: any) => (
          <div key={f.id} className="p-4 flex justify-between items-start gap-4">
            <div>
              <p className="font-medium">{f.question}</p>
              <p className="text-sm text-gray-600">{f.answer}</p>
              <p className="text-xs text-gray-400">{f.category ?? "general"}</p>
            </div>
            <div className="flex gap-3 items-center">
              <label className="text-sm">
                <input type="checkbox" checked={f.active} onChange={(e) => toggle(f.id, e.target.checked)} /> active
              </label>
              <button onClick={() => remove(f.id)} className="text-red-600 text-sm">Delete</button>
            </div>
          </div>
        ))}
        {faqs.length === 0 && <div className="p-4 text-gray-500 text-sm">No FAQs yet.</div>}
      </div>
    </main>
  );
}
