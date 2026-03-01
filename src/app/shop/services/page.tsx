"use client";

import { useState } from "react";
import Link from "next/link";
import { Cpu, Shield } from "lucide-react";

const designServices = [
  { name: "Brand Identity", desc: "Logo, color system, typography, and brand guidelines.", from: 1500, amount: 150000, duration: "2–4 weeks" },
  { name: "UX/UI Design", desc: "User research, wireframes, and polished UI for web or mobile.", from: 2500, amount: 250000, duration: "4–8 weeks" },
  { name: "Print Design", desc: "Brochures, posters, packaging, and editorial design.", from: 800, amount: 80000, duration: "1–3 weeks" },
  { name: "Design Consulting", desc: "Design audits, strategy sessions, and team workshops.", from: 250, amount: 25000, duration: "Per session" },
];

const aiServices = [
  { name: "OpenClaw Implementation", desc: "Full AI assistant setup — gateway config, channel integrations (WhatsApp, Telegram, Discord, SMS), custom skills, and device pairing.", from: 2500, amount: 250000, duration: "1–2 weeks" },
  { name: "Custom AI Solutions", desc: "Bespoke AI applications — RAG pipelines, LLM integrations, agent workflows, fine-tuning, and production deployment.", from: 5000, amount: 500000, duration: "2–6 weeks" },
  { name: "AI Consulting", desc: "AI readiness assessments, architecture reviews, strategy sessions, and team training. Evaluate what AI can do for your business.", from: 300, amount: 30000, duration: "Per hour" },
];


const cyberServices = [
  { name: "Penetration Testing", desc: "Network, web app, and infrastructure vulnerability assessment with detailed remediation reports.", from: 3000, amount: 300000, duration: "1–3 weeks" },
  { name: "Security Audit", desc: "Comprehensive review of your security posture — configurations, access controls, and compliance gaps.", from: 2000, amount: 200000, duration: "1–2 weeks" },
  { name: "Red Team Assessment", desc: "Simulated adversary attack scenarios to test your defenses under realistic conditions.", from: 5000, amount: 500000, duration: "2–4 weeks" },
];

const embeddedServices = [
  { name: "Board Bring-Up", desc: "From bare board to booting OS — power sequencing, peripheral validation, BSP development, and hardware/software integration.", from: 5000, amount: 500000, duration: "2–6 weeks" },
  { name: "RTOS Development", desc: "Real-time application development on FreeRTOS, VxWorks, and bare-metal platforms. Low-power design and deterministic performance.", from: 4000, amount: 400000, duration: "2–8 weeks" },
  { name: "Embedded Linux", desc: "Custom Linux BSP, device driver development, Yocto/Buildroot builds, and production image optimization.", from: 4000, amount: 400000, duration: "2–6 weeks" },
  { name: "Firmware Development", desc: "Production firmware for ARM Cortex-M/A, RISC-V, and legacy architectures. Bootloaders, OTA updates, and field-proven reliability.", from: 3500, amount: 350000, duration: "2–8 weeks" },
];

const allServices = [...designServices, ...aiServices, ...cyberServices, ...embeddedServices];

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

  const handleBook = async (svc: typeof designServices[0]) => {
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

  const ServiceCard = ({ svc }: { svc: typeof designServices[0] }) => (
    <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
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
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold text-white mb-2">Services</h1>
      <p className="text-zinc-500 mb-16">Custom design and AI work. Every project starts with a conversation.</p>

      {/* Design Services */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-white mb-2">Design Services</h2>
        <p className="text-zinc-500 text-sm mb-6">Brand, product, and visual design for teams that care about craft.</p>
        <div className="space-y-4">
          {designServices.map((svc) => <ServiceCard key={svc.name} svc={svc} />)}
        </div>
      </div>

      {/* AI & Automation */}
      <div id="ai" className="mb-20">
        <div className="flex items-center gap-3 mb-2">
          <Cpu className="text-emerald-400" size={24} />
          <h2 className="text-2xl font-bold text-white">AI & Automation</h2>
        </div>
        <p className="text-zinc-500 text-sm mb-6">Harness AI to transform your business. From personal AI assistants to enterprise solutions.</p>
        <div className="space-y-4 mb-6">
          {aiServices.map((svc) => <ServiceCard key={svc.name} svc={svc} />)}
        </div>
        <Link
          href="/shop/services/ai"
          className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 text-sm font-medium transition-colors"
        >
          Learn more about our AI services →
        </Link>
      </div>


      {/* Embedded Software Development */}
      <div id="embedded" className="mb-20">
        <div className="flex items-center gap-3 mb-2">
          <Cpu className="text-amber-400" size={24} />
          <h2 className="text-2xl font-bold text-white">Embedded Software Development</h2>
        </div>
        <p className="text-zinc-500 text-sm mb-6">Two decades of embedded systems — from satellite modems to biomedical devices to defense platforms. Low-power design, RTOS, and embedded Linux.</p>
        <div className="space-y-4 mb-6">
          {embeddedServices.map((svc) => <ServiceCard key={svc.name} svc={svc} />)}
        </div>
        <Link
          href="/shop/services/embedded"
          className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 text-sm font-medium transition-colors"
        >
          Learn more about our embedded services →
        </Link>
      </div>

      {/* Cybersecurity & Penetration Testing */}
      <div id="cyber" className="mb-20">
        <div className="flex items-center gap-3 mb-2">
          <Shield className="text-red-400" size={24} />
          <h2 className="text-2xl font-bold text-white">Cybersecurity & Penetration Testing</h2>
        </div>
        <p className="text-zinc-500 text-sm mb-6">Find the holes before the bad guys do. Offensive security testing with actionable remediation.</p>
        <div className="space-y-4 mb-6">
          {cyberServices.map((svc) => <ServiceCard key={svc.name} svc={svc} />)}
        </div>
        <Link
          href="/shop/services/cybersecurity"
          className="inline-flex items-center gap-2 text-red-400 hover:text-red-300 text-sm font-medium transition-colors"
        >
          Learn more about our cybersecurity services →
        </Link>
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
                  <optgroup label="Design">
                    {designServices.map((s) => <option key={s.name} value={s.name}>{s.name}</option>)}
                  </optgroup>
                  <optgroup label="AI & Automation">
                    {aiServices.map((s) => <option key={s.name} value={s.name}>{s.name}</option>)}
                  </optgroup>
                  <optgroup label="Embedded Systems">
                    {embeddedServices.map((s) => <option key={s.name} value={s.name}>{s.name}</option>)}
                  </optgroup>
                  <optgroup label="Cybersecurity">
                    {cyberServices.map((s) => <option key={s.name} value={s.name}>{s.name}</option>)}
                  </optgroup>
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
