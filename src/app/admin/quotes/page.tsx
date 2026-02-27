"use client";

import { useEffect, useState } from "react";

interface Quote {
  id: string;
  name: string;
  email: string;
  company: string | null;
  service: string;
  description: string;
  budget: string | null;
  status: string;
  quotedPrice: number | null;
  adminNotes: string | null;
  stripePaymentLink: string | null;
  createdAt: string;
}

const statusColors: Record<string, string> = {
  PENDING: "bg-yellow-900/40 text-yellow-300 border-yellow-800",
  REVIEWING: "bg-blue-900/40 text-blue-300 border-blue-800",
  SENT: "bg-violet-900/40 text-violet-300 border-violet-800",
  ACCEPTED: "bg-green-900/40 text-green-300 border-green-800",
  DECLINED: "bg-red-900/40 text-red-300 border-red-800",
};

export default function AdminQuotesPage() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    fetch("/api/quotes").then((r) => r.json()).then(setQuotes);
  }, []);

  const updateQuote = async (id: string, data: Partial<Quote>) => {
    setSaving(true);
    const res = await fetch(`/api/quotes/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const updated = await res.json();
    setQuotes((prev) => prev.map((q) => (q.id === id ? { ...q, ...updated } : q)));
    setSaving(false);
  };

  const sendQuote = async (id: string) => {
    setSending(true);
    const res = await fetch(`/api/quotes/${id}/send`, { method: "POST" });
    const data = await res.json();
    if (data.url) {
      setQuotes((prev) => prev.map((q) => (q.id === id ? { ...q, status: "SENT", stripePaymentLink: data.url } : q)));
    }
    setSending(false);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Quotes</h1>
      {quotes.length === 0 ? (
        <p className="text-zinc-500">No quotes yet.</p>
      ) : (
        <div className="space-y-3">
          {quotes.map((q) => (
            <div key={q.id} className="rounded-xl bg-zinc-900 border border-zinc-800 overflow-hidden">
              <button onClick={() => setExpanded(expanded === q.id ? null : q.id)} className="w-full p-4 flex items-center justify-between text-left">
                <div className="flex items-center gap-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${statusColors[q.status] || "bg-zinc-800 text-zinc-400"}`}>{q.status}</span>
                  <div>
                    <span className="text-white font-medium">{q.name}</span>
                    <span className="text-zinc-500 ml-2 text-sm">{q.service}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {q.quotedPrice && <span className="text-green-400 font-medium">${(q.quotedPrice / 100).toFixed(2)}</span>}
                  <span className="text-zinc-600 text-xs">{new Date(q.createdAt).toLocaleDateString()}</span>
                </div>
              </button>

              {expanded === q.id && (
                <div className="border-t border-zinc-800 p-4 space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div><span className="text-zinc-500">Email:</span> <span className="text-white">{q.email}</span></div>
                    <div><span className="text-zinc-500">Company:</span> <span className="text-white">{q.company || "—"}</span></div>
                    <div><span className="text-zinc-500">Budget:</span> <span className="text-white">{q.budget || "—"}</span></div>
                  </div>
                  <div>
                    <span className="text-zinc-500 text-sm">Description:</span>
                    <p className="text-zinc-300 text-sm mt-1">{q.description}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-zinc-500 mb-1">Quoted Price (cents)</label>
                      <input
                        type="number"
                        defaultValue={q.quotedPrice || ""}
                        onBlur={(e) => updateQuote(q.id, { quotedPrice: parseInt(e.target.value) || null })}
                        className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white text-sm"
                        placeholder="e.g. 150000 = $1,500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-zinc-500 mb-1">Status</label>
                      <select
                        value={q.status}
                        onChange={(e) => updateQuote(q.id, { status: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white text-sm"
                      >
                        {["PENDING", "REVIEWING", "SENT", "ACCEPTED", "DECLINED"].map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-zinc-500 mb-1">Admin Notes</label>
                    <textarea
                      defaultValue={q.adminNotes || ""}
                      onBlur={(e) => updateQuote(q.id, { adminNotes: e.target.value })}
                      rows={2}
                      className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white text-sm resize-none"
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    {q.quotedPrice && q.status !== "ACCEPTED" && (
                      <button
                        onClick={() => sendQuote(q.id)}
                        disabled={sending}
                        className="px-4 py-2 rounded-full bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white text-sm font-medium"
                      >
                        {sending ? "Sending..." : "Send Quote & Payment Link"}
                      </button>
                    )}
                    {q.stripePaymentLink && (
                      <a href={q.stripePaymentLink} target="_blank" rel="noopener" className="text-violet-400 hover:text-violet-300 text-sm">View Payment Link →</a>
                    )}
                    {saving && <span className="text-zinc-500 text-xs">Saving...</span>}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
