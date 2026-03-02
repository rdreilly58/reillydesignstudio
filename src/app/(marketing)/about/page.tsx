import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Shield, Cpu, Bot, Pen, MapPin, GraduationCap, Briefcase, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description: "Bob Reilly — 20+ years of software engineering across defense, biomedical, satellite, and commercial platforms. MIT-educated. Based in Reston, VA.",
};

const timeline = [
  { period: "2004–2012", role: "Embedded Software Engineer", desc: "Defense and intelligence community. Satellite modems, SIGINT platforms, telemetry systems. FreeRTOS, VxWorks, bare-metal firmware on custom hardware." },
  { period: "2012–2018", role: "Senior Software Engineer", desc: "Biomedical devices and industrial automation. Embedded Linux, real-time control systems, low-power design for battery-operated medical instruments." },
  { period: "2018–2025", role: "Principal Engineer / Tech Lead", desc: "Full-stack and AI. Cloud platforms, microservices, LLM integrations, and leading engineering teams. From embedded to enterprise." },
  { period: "2026–", role: "Reilly Design Studio LLC", desc: "Combining two decades of engineering expertise into a studio that does it all — design, AI, embedded systems, and cybersecurity." },
];

const capabilities = [
  { icon: Pen, title: "Design", desc: "Brand identity, UX/UI, print design, and design systems.", color: "text-violet-400", bg: "bg-violet-500/10" },
  { icon: Bot, title: "AI & Automation", desc: "OpenClaw, RAG pipelines, LLM integrations, and custom AI applications.", color: "text-emerald-400", bg: "bg-emerald-500/10" },
  { icon: Cpu, title: "Embedded Systems", desc: "Board bring-up, RTOS, embedded Linux, firmware, and low-power design.", color: "text-amber-400", bg: "bg-amber-500/10" },
  { icon: Shield, title: "Cybersecurity", desc: "Penetration testing, security audits, and red team assessments.", color: "text-red-400", bg: "bg-red-500/10" },
];

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Hero */}
      <div className="mb-16">
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">About</h1>
        <p className="text-xl text-zinc-400 leading-relaxed">
          I&apos;m Bob Reilly — a software engineer with <strong className="text-white">20+ years</strong> of experience
          building things that work in places where failure isn&apos;t an option.
        </p>
      </div>

      {/* Bio */}
      <section className="mb-16">
        <div className="space-y-4 text-zinc-400 leading-relaxed">
          <p>
            I&apos;ve written firmware that runs on satellites 22,000 miles above Earth. I&apos;ve built embedded systems for
            military and intelligence community applications where reliability is measured in decades, not sprints.
            I&apos;ve designed biomedical devices where the stakes are human lives.
          </p>
          <p>
            Along the way, I got into AI early — building LLM integrations, RAG pipelines, and AI agent systems
            before they were trendy. And I never stopped caring about design — because good engineering deserves
            good presentation.
          </p>
          <p>
            In 2026, I started <strong className="text-white">Reilly Design Studio</strong> to bring all of these capabilities
            under one roof. Design. AI. Embedded systems. Cybersecurity. Four verticals that don&apos;t usually live
            together — but they should, because the best solutions happen at the intersections.
          </p>
        </div>
      </section>

      {/* Quick Facts */}
      <section className="mb-16 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-xl bg-zinc-900 border border-zinc-800 flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center shrink-0">
            <MapPin className="text-violet-400" size={18} />
          </div>
          <div>
            <p className="text-white font-semibold text-sm">Reston, Virginia</p>
            <p className="text-zinc-500 text-xs">Washington, D.C. metro</p>
          </div>
        </div>
        <div className="p-5 rounded-xl bg-zinc-900 border border-zinc-800 flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center shrink-0">
            <GraduationCap className="text-violet-400" size={18} />
          </div>
          <div>
            <p className="text-white font-semibold text-sm">MIT</p>
            <p className="text-zinc-500 text-xs">Engineering</p>
          </div>
        </div>
        <div className="p-5 rounded-xl bg-zinc-900 border border-zinc-800 flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center shrink-0">
            <Clock className="text-violet-400" size={18} />
          </div>
          <div>
            <p className="text-white font-semibold text-sm">20+ Years</p>
            <p className="text-zinc-500 text-xs">Shipping products</p>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-white mb-6">What I Do</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {capabilities.map((cap) => (
            <div key={cap.title} className="p-5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-colors">
              <div className={`w-10 h-10 rounded-xl ${cap.bg} flex items-center justify-center mb-3`}>
                <cap.icon className={cap.color} size={18} />
              </div>
              <h3 className="text-white font-semibold mb-1">{cap.title}</h3>
              <p className="text-zinc-500 text-sm">{cap.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-white mb-6">Career Timeline</h2>
        <div className="space-y-6">
          {timeline.map((item, i) => (
            <div key={i} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className={`w-3 h-3 rounded-full shrink-0 mt-1.5 ${i === timeline.length - 1 ? "bg-violet-400" : "bg-zinc-700"}`} />
                {i < timeline.length - 1 && <div className="w-px flex-1 bg-zinc-800 mt-1" />}
              </div>
              <div className="pb-6">
                <p className="text-zinc-500 text-xs font-mono">{item.period}</p>
                <h3 className="text-white font-semibold mt-1">{item.role}</h3>
                <p className="text-zinc-400 text-sm mt-1 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Domain Experience */}
      <section className="mb-16 p-6 rounded-2xl bg-gradient-to-br from-violet-500/10 to-zinc-900 border border-violet-500/20">
        <h2 className="text-xl font-bold text-white mb-4">Industries & Domains</h2>
        <div className="flex flex-wrap gap-2">
          {[
            "Defense & Intelligence", "Satellite Communications", "Biomedical Devices",
            "Industrial Automation", "Telemetry & IoT", "Electronic Warfare",
            "Signal Processing", "Cloud Platforms", "AI & Machine Learning",
            "Web Applications", "Mobile Development", "Open Source",
          ].map((domain) => (
            <span key={domain} className="px-3 py-1.5 rounded-full bg-zinc-900 text-zinc-300 text-sm border border-zinc-800">
              {domain}
            </span>
          ))}
        </div>
      </section>

      {/* Resume Download */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-white mb-4">Resume</h2>
        <p className="text-zinc-400 text-sm mb-4">Download my current resume for a detailed look at experience, skills, and certifications.</p>
        <a
          href="/resume/bob-reilly-resume.pdf"
          download
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-zinc-800 text-zinc-100 font-medium hover:bg-zinc-700 transition-colors border border-zinc-700"
        >
          📄 Download Resume (PDF)
        </a>
      </section>

      {/* CTA */}
      <div className="text-center pt-8 border-t border-zinc-800">
        <p className="text-zinc-500 mb-4">Want to work together?</p>
        <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-violet-600 hover:bg-violet-500 text-white font-semibold transition-colors">
          Get In Touch <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
