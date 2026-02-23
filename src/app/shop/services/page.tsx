import { Metadata } from "next";

export const metadata: Metadata = { title: "Services" };

const services = [
  { name: "Brand Identity", desc: "Logo, color system, typography, and brand guidelines.", from: 1500, duration: "2–4 weeks" },
  { name: "UX/UI Design", desc: "User research, wireframes, and polished UI for web or mobile.", from: 2500, duration: "4–8 weeks" },
  { name: "Print Design", desc: "Brochures, posters, packaging, and editorial design.", from: 800, duration: "1–3 weeks" },
  { name: "Consulting", desc: "Design audits, strategy sessions, and team workshops.", from: 250, duration: "Per session" },
];

export default function ServicesPage() {
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
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl bg-violet-950/40 border border-violet-900/30 p-8">
        <h2 className="text-2xl font-bold text-white mb-1">Request a Quote</h2>
        <p className="text-zinc-400 text-sm mb-8">Tell me about your project. I&apos;ll get back to you within 24 hours.</p>
        <form className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-2">Name *</label>
              <input type="text" className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-600 focus:outline-none focus:border-violet-500 text-sm" required />
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-2">Email *</label>
              <input type="email" className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-600 focus:outline-none focus:border-violet-500 text-sm" required />
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-2">Company</label>
              <input type="text" className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-600 focus:outline-none focus:border-violet-500 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-2">Service *</label>
              <select className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-white focus:outline-none focus:border-violet-500 text-sm" required>
                <option value="">Select a service</option>
                {services.map((s) => <option key={s.name} value={s.name}>{s.name}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-2">Budget Range</label>
            <input type="text" className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-600 focus:outline-none focus:border-violet-500 text-sm" placeholder="e.g. $1,000–$3,000" />
          </div>
          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-2">Project Description *</label>
            <textarea rows={5} className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-600 focus:outline-none focus:border-violet-500 text-sm resize-none" placeholder="Describe your project, goals, and timeline..." required />
          </div>
          <button type="submit" className="px-8 py-3.5 rounded-full bg-violet-600 hover:bg-violet-500 text-white font-semibold text-sm transition-colors">Submit Request</button>
        </form>
      </div>
    </div>
  );
}
