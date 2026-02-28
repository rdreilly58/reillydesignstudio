"use client";

import { useState } from "react";

const services = [
  { name: "Brand Identity", desc: "Logo, color system, typography, and brand guidelines.", from: 1500, amount: 150000, duration: "2–4 weeks" },
  { name: "UX/UI Design", desc: "User research, wireframes, and polished UI for web or mobile.", from: 2500, amount: 250000, duration: "4–8 weeks" },
  { name: "Print Design", desc: "Brochures, posters, packaging, and editorial design.", from: 800, amount: 80000, duration: "1–3 weeks" },
  { name: "Consulting", desc: "Design audits, strategy sessions, and team workshops.", from: 250, amount: 25000, duration: "Per session" },
];

export default function ServicesPage() {
  const [form, setForm] = useState({ name: "", email: "", company: "", service: "", description: "", budget: "", timeline: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [booking, setBooking] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/quotes", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      if (!res.ok) throw new Error("Failed to submit");
      setSubmitted(true);
      setForm({ name: "", email: "", company: "", service: "", description: "", budget: "", timeline: "" });
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleBook = async (svc: typeof services[0]) => {
    setBooking(svc.name);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ serviceName: svc.name, amount: svc.amount, description: svc.desc }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else setError("Failed to create checkout session");
    } catch {
      setError("Something went wrong");
    } finally {
      setBooking(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold text-white mb-2">Services</h1>
      <p className="text-zinc-500 mb-16">Custom design work. Every project starts with a conversation.</p>

      <div className="space-y-4 mb-20">
        {services.map((svc) => (
          <div key={svc.name} className="rounded-2xl bg-zinc-900 border border-zinc-800 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-white font-semibold">{svc.name}</h3>
              <p className="text-zinc-400 text-sm mt-1">{svc.desc}</p>
              <p className="text-zinc-600 text-xs mt-2">{svc.duration}</p>
            </div>
            <div className="flex items-center gap-4 shrink-0">
              <span className="text-white font-medium">From ${svc.from.toLocaleString()}</span>
              <button
                onClick={() => handleBook(svc)}
                disabled={booking === svc.name}
                className="px-5 py-2.5 rounded-full bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white font-semibold text-sm transition-colors"
              >
                {booking === svc.name ? "Loading..." : "Book Now"}
              </button>
            </div>
          </div>
        ))}
      </div>


      {/* Professional Documentation */}
      <div className="mb-20">
        <h2 className="text-2xl font-bold text-white mb-2">Professional Documentation</h2>
        <p className="text-zinc-500 text-sm mb-8">Every project comes with polished, branded quotes and invoices.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <a href="/samples/sample-quote.pdf" target="_blank" rel="noopener" className="group rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-violet-600/50 p-6 transition-all">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">📋</span>
              <h3 className="text-white font-semibold group-hover:text-violet-400 transition-colors">Sample Quote</h3>
            </div>
            <p className="text-zinc-500 text-sm">Detailed project scope, pricing, and terms — professionally formatted with your project details.</p>
            <span className="inline-block mt-4 text-violet-400 text-sm font-medium group-hover:text-violet-300">View PDF →</span>
          </a>
          <a href="/samples/sample-invoice.pdf" target="_blank" rel="noopener" className="group rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-violet-600/50 p-6 transition-all">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">🧾</span>
              <h3 className="text-white font-semibold group-hover:text-violet-400 transition-colors">Sample Invoice</h3>
            </div>
            <p className="text-zinc-500 text-sm">Clean, itemized invoices with payment details and terms — sent automatically via Stripe.</p>
            <span className="inline-block mt-4 text-violet-400 text-sm font-medium group-hover:text-violet-300">View PDF →</span>
          </a>
        </div>
      </div>

      <div className="rounded-2xl bg-violet-950/40 border border-violet-900/30 p-8">
        <h2 className="text-2xl font-bold text-white mb-1">Request a Quote</h2>
        <p className="text-zinc-400 text-sm mb-8">Tell me about your project. I&apos;ll get back to you within 24 hours.</p>

        {submitted ? (
          <div className="text-center py-8">
            <div className="text-3xl mb-3">✅</div>
            <h3 className="text-xl font-semibold text-white mb-2">Quote Request Submitted</h3>
            <p className="text-zinc-400">I&apos;ll review your project and get back to you within 24 hours.</p>
            <button onClick={() => setSubmitted(false)} className="mt-4 text-violet-400 hover:text-violet-300 text-sm">Submit another request</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && <div className="p-3 rounded-xl bg-red-900/30 border border-red-800 text-red-300 text-sm">{error}</div>}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-2">Name *</label>
                <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-600 focus:outline-none focus:border-violet-500 text-sm" required />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-2">Email *</label>
                <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-600 focus:outline-none focus:border-violet-500 text-sm" required />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-2">Company</label>
                <input type="text" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-600 focus:outline-none focus:border-violet-500 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-2">Service *</label>
                <select value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-white focus:outline-none focus:border-violet-500 text-sm" required>
                  <option value="">Select a service</option>
                  {services.map((s) => <option key={s.name} value={s.name}>{s.name}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-2">Budget Range</label>
              <input type="text" value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-600 focus:outline-none focus:border-violet-500 text-sm" placeholder="e.g. $1,000–$3,000" />
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-2">Project Description *</label>
              <textarea rows={5} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-600 focus:outline-none focus:border-violet-500 text-sm resize-none" placeholder="Describe your project, goals, and timeline..." required />
            </div>
            <button type="submit" disabled={submitting} className="px-8 py-3.5 rounded-full bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white font-semibold text-sm transition-colors">
              {submitting ? "Submitting..." : "Submit Request"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
