"use client";

import { useEffect, useState } from "react";

interface Invoice {
  id: string;
  number: string | null;
  status: string | null;
  total: number;
  currency: string;
  customerEmail: string | null;
  customerName: string | null;
  pdfUrl: string | null;
  hostedUrl: string | null;
  createdAt: string;
  dueDate: string | null;
}

const statusColors: Record<string, string> = {
  paid: "bg-green-900/40 text-green-300",
  open: "bg-blue-900/40 text-blue-300",
  draft: "bg-zinc-800 text-zinc-400",
  void: "bg-red-900/40 text-red-300",
  uncollectible: "bg-red-900/40 text-red-300",
};

export default function AdminInvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [creating, setCreating] = useState(false);
  const [newInvoice, setNewInvoice] = useState({ email: "", name: "", description: "", amount: "" });

  useEffect(() => {
    fetch("/api/invoices").then((r) => r.json()).then((data) => { setInvoices(data); setLoading(false); });
  }, []);

  const createInvoice = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    const res = await fetch("/api/invoices/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: newInvoice.email,
        name: newInvoice.name,
        items: [{ description: newInvoice.description, amount: parseInt(newInvoice.amount) }],
      }),
    });
    if (res.ok) {
      const inv = await res.json();
      setShowCreate(false);
      setNewInvoice({ email: "", name: "", description: "", amount: "" });
      // Refresh list
      fetch("/api/invoices").then((r) => r.json()).then(setInvoices);
    }
    setCreating(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Invoices</h1>
        <button onClick={() => setShowCreate(!showCreate)} className="px-4 py-2 rounded-full bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium">
          {showCreate ? "Cancel" : "Create Invoice"}
        </button>
      </div>

      {showCreate && (
        <form onSubmit={createInvoice} className="rounded-xl bg-zinc-900 border border-zinc-800 p-4 mb-6 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <input value={newInvoice.email} onChange={(e) => setNewInvoice({ ...newInvoice, email: e.target.value })} placeholder="Customer email *" required className="px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white text-sm" />
            <input value={newInvoice.name} onChange={(e) => setNewInvoice({ ...newInvoice, name: e.target.value })} placeholder="Customer name" className="px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white text-sm" />
          </div>
          <input value={newInvoice.description} onChange={(e) => setNewInvoice({ ...newInvoice, description: e.target.value })} placeholder="Description *" required className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white text-sm" />
          <div className="flex gap-3 items-end">
            <div className="flex-1">
              <label className="block text-xs text-zinc-500 mb-1">Amount (cents) *</label>
              <input type="number" value={newInvoice.amount} onChange={(e) => setNewInvoice({ ...newInvoice, amount: e.target.value })} placeholder="e.g. 150000 = $1,500" required className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white text-sm" />
            </div>
            <button type="submit" disabled={creating} className="px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white text-sm font-medium">
              {creating ? "Creating..." : "Send Invoice"}
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <p className="text-zinc-500">Loading invoices...</p>
      ) : invoices.length === 0 ? (
        <p className="text-zinc-500">No invoices yet.</p>
      ) : (
        <div className="space-y-2">
          {invoices.map((inv) => (
            <div key={inv.id} className="rounded-xl bg-zinc-900 border border-zinc-800 p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[inv.status || "draft"]}`}>{inv.status || "draft"}</span>
                <div>
                  <span className="text-white font-medium">{inv.number || inv.id.slice(-8)}</span>
                  <span className="text-zinc-500 ml-2 text-sm">{inv.customerEmail || inv.customerName}</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-green-400 font-medium">${(inv.total / 100).toFixed(2)}</span>
                <span className="text-zinc-600 text-xs">{new Date(inv.createdAt).toLocaleDateString()}</span>
                <div className="flex gap-2">
                  {inv.pdfUrl && <a href={inv.pdfUrl} target="_blank" rel="noopener" className="text-violet-400 hover:text-violet-300 text-xs">PDF</a>}
                  {inv.hostedUrl && <a href={inv.hostedUrl} target="_blank" rel="noopener" className="text-violet-400 hover:text-violet-300 text-xs">View</a>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
