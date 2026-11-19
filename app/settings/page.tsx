"use client";
import { useEffect, useState } from "react";

export default function SettingsPage() {
  const [form, setForm] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/settings").then((r) => r.json()).then((d) => { setForm(d.business || {}); setLoading(false); });
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMsg(null);
    const res = await fetch("/api/settings", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    setSaving(false);
    setMsg(res.ok ? "Saved." : "Save failed.");
  }

  if (loading) return <main className="p-8">Loading...</main>;
  return (
    <main className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      <form onSubmit={onSubmit} className="space-y-4 bg-white p-8 rounded-xl shadow-sm border">
        <label className="block"><span className="text-sm text-gray-600">Business name</span><input className="w-full border p-2 rounded mt-1" value={form.name || ""} onChange={(e) => setForm({ ...form, name: e.target.value })} /></label>
        <label className="block"><span className="text-sm text-gray-600">Description</span><textarea className="w-full border p-2 rounded mt-1" value={form.description || ""} onChange={(e) => setForm({ ...form, description: e.target.value })} /></label>
        <label className="block"><span className="text-sm text-gray-600">Operating hours</span><input className="w-full border p-2 rounded mt-1" value={form.operatingHours ? JSON.stringify(form.operatingHours) : ""} onChange={(e) => { try { setForm({ ...form, operatingHours: JSON.parse(e.target.value) }); } catch { setForm({ ...form, operatingHours: e.target.value }); } }} /></label>
        <label className="block"><span className="text-sm text-gray-600">Location</span><input className="w-full border p-2 rounded mt-1" value={form.location || ""} onChange={(e) => setForm({ ...form, location: e.target.value })} /></label>
        <label className="block"><span className="text-sm text-gray-600">Contact email</span><input className="w-full border p-2 rounded mt-1" value={form.contactEmail || ""} onChange={(e) => setForm({ ...form, contactEmail: e.target.value })} /></label>
        <label className="block"><span className="text-sm text-gray-600">Contact phone</span><input className="w-full border p-2 rounded mt-1" value={form.contactPhone || ""} onChange={(e) => setForm({ ...form, contactPhone: e.target.value })} /></label>
        <label className="block"><span className="text-sm text-gray-600">Website URL</span><input className="w-full border p-2 rounded mt-1" value={form.websiteUrl || ""} onChange={(e) => setForm({ ...form, websiteUrl: e.target.value })} /></label>
        <label className="block"><span className="text-sm text-gray-600">Services (JSON array)</span><textarea className="w-full border p-2 rounded mt-1" value={form.services ? JSON.stringify(form.services) : ""} onChange={(e) => { try { setForm({ ...form, services: JSON.parse(e.target.value) }); } catch { setForm({ ...form, services: e.target.value }); } }} /></label>
        <label className="block"><span className="text-sm text-gray-600">Pricing (JSON object)</span><textarea className="w-full border p-2 rounded mt-1" value={form.pricing ? JSON.stringify(form.pricing) : ""} onChange={(e) => { try { setForm({ ...form, pricing: JSON.parse(e.target.value) }); } catch { setForm({ ...form, pricing: e.target.value }); } }} /></label>
        <label className="block"><span className="text-sm text-gray-600">Handoff email</span><input className="w-full border p-2 rounded mt-1" value={form.handoffEmail || ""} onChange={(e) => setForm({ ...form, handoffEmail: e.target.value })} /></label>
        <label className="block"><span className="text-sm text-gray-600">Handoff phone</span><input className="w-full border p-2 rounded mt-1" value={form.handoffPhone || ""} onChange={(e) => setForm({ ...form, handoffPhone: e.target.value })} /></label>
        <label className="flex items-center gap-2"><input type="checkbox" checked={form.widgetEnabled ?? true} onChange={(e) => setForm({ ...form, widgetEnabled: e.target.checked })} /><span className="text-sm text-gray-600">Widget enabled</span></label>
        <label className="block"><span className="text-sm text-gray-600">Primary color</span><input className="w-full border p-2 rounded mt-1" value={form.primaryColor || ""} onChange={(e) => setForm({ ...form, primaryColor: e.target.value })} /></label>
        <label className="block"><span className="text-sm text-gray-600">Greeting</span><input className="w-full border p-2 rounded mt-1" value={form.greeting || ""} onChange={(e) => setForm({ ...form, greeting: e.target.value })} /></label>
        <button disabled={saving} className="bg-blue-600 text-white px-6 py-2 rounded font-semibold">{saving ? "Saving..." : "Save"}</button>
        {msg && <p className="text-sm text-gray-600">{msg}</p>}
      </form>
    </main>
  );
}
