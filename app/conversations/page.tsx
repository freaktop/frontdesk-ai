"use client";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function ConversationsPage() {
  const { data } = useSWR("/api/conversations", fetcher);
  const conversations: any[] = data?.conversations ?? [];
  return (
    <main className="max-w-5xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Conversations</h1>
      <div className="bg-white rounded-xl shadow-sm border divide-y">
        {conversations.map((c) => (
          <div key={c.id} className="p-4">
            <div className="flex justify-between">
              <p className="font-medium text-sm">{c.source} · {c.status}</p>
              <p className="text-xs text-gray-400">{new Date(c.createdAt).toLocaleString()}</p>
            </div>
            <div className="mt-2 space-y-1">
              {(c.messages as any[] | undefined)?.map((m: any, i: number) => (
                <p key={i} className="text-sm"><span className="font-semibold">{m.role}:</span> {m.content}</p>
              ))}
            </div>
            {c.handoffRequested && (
              <div className="mt-2 text-xs bg-amber-50 border border-amber-200 rounded p-2">
                <p className="font-semibold">Handoff requested</p>
                <p>Reason: {c.handoffReason ?? "unknown_question"}</p>
                {c.handoffContactEmail && <p>Contact: {c.handoffContactName ?? ""} &lt;{c.handoffContactEmail}&gt;</p>}
              </div>
            )}
          </div>
        ))}
        {conversations.length === 0 && <div className="p-4 text-gray-500 text-sm">No conversations yet.</div>}
      </div>
    </main>
  );
}
