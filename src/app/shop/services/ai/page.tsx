import Link from "next/link";
import { ArrowRight, Bot, Cpu, MessageSquare, Shield, Zap, GraduationCap, Wrench, BarChart3 } from "lucide-react";

const aiServices = [
  {
    icon: Bot,
    title: "OpenClaw Implementation",
    price: "From $2,500",
    duration: "1–2 weeks",
    desc: "Your own AI assistant, fully configured and integrated into your daily workflow.",
    features: [
      "Gateway setup and configuration on your infrastructure",
      "Channel integrations — WhatsApp, Telegram, Discord, SMS, Slack",
      "Custom skill development tailored to your business",
      "Device pairing (mobile, desktop, IoT)",
      "Google Workspace integration (Gmail, Calendar, Drive)",
      "Training and documentation for your team",
    ],
  },
  {
    icon: Cpu,
    title: "Custom AI Solutions",
    price: "From $5,000",
    duration: "2–6 weeks",
    desc: "Purpose-built AI applications designed for your specific business challenges.",
    features: [
      "RAG pipelines over your documents and knowledge base",
      "LLM integration and API development",
      "Agent workflows with tool use and automation",
      "Model fine-tuning on your data (Llama, Mistral, GPT)",
      "Vector database setup and optimization",
      "Production deployment with monitoring and guardrails",
    ],
  },
  {
    icon: MessageSquare,
    title: "AI Consulting",
    price: "From $300/hr",
    duration: "Per session",
    desc: "Strategic guidance to help you navigate the AI landscape and make smart investments.",
    features: [
      "AI readiness assessment for your organization",
      "Architecture reviews and technology selection",
      "Build vs. buy analysis for AI tools",
      "Team training and upskilling workshops",
      "Security and compliance review for AI systems",
      "Ongoing advisory retainer available",
    ],
  },
];

const whyUs = [
  { icon: GraduationCap, title: "MIT Engineering", desc: "Rigorous engineering background applied to AI system design." },
  { icon: Wrench, title: "Hands-On Builder", desc: "Not just theory — production OpenClaw deployments and custom AI applications in the field." },
  { icon: Shield, title: "Security First", desc: "Every implementation considers data privacy, access control, and compliance from day one." },
  { icon: BarChart3, title: "Measurable Results", desc: "Clear metrics and ROI tracking so you know exactly what AI is doing for your business." },
];

export default function AIServicesPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Hero */}
      <div className="text-center mb-20">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-medium mb-6 border border-emerald-500/20">
          <Zap size={12} /> AI Services
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">AI That Works For You</h1>
        <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
          From personal AI assistants to enterprise solutions. We build, deploy, and support
          AI systems that deliver real value — not just demos.
        </p>
      </div>

      {/* Service Cards */}
      <div className="space-y-8 mb-24">
        {aiServices.map((svc) => (
          <div key={svc.title} className="rounded-2xl bg-zinc-900 border border-zinc-800 p-8 hover:border-emerald-900/50 transition-all">
            <div className="flex flex-col sm:flex-row sm:items-start gap-6">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center shrink-0">
                <svc.icon className="text-emerald-400" size={26} />
              </div>
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                  <h2 className="text-2xl font-bold text-white">{svc.title}</h2>
                  <div className="flex items-center gap-3">
                    <span className="text-emerald-400 font-semibold">{svc.price}</span>
                    <span className="text-zinc-600 text-sm">· {svc.duration}</span>
                  </div>
                </div>
                <p className="text-zinc-400 mb-5">{svc.desc}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {svc.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-2">
                      <span className="text-emerald-400 mt-0.5">✓</span>
                      <span className="text-zinc-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Why Work With Us */}
      <div className="mb-24">
        <h2 className="text-3xl font-bold text-white text-center mb-12">Why Work With Us</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {whyUs.map((item) => (
            <div key={item.title} className="rounded-2xl bg-zinc-900/50 border border-zinc-800 p-6">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-4">
                <item.icon className="text-emerald-400" size={20} />
              </div>
              <h3 className="text-white font-semibold mb-2">{item.title}</h3>
              <p className="text-zinc-400 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="rounded-2xl bg-gradient-to-b from-emerald-950/40 to-zinc-900 border border-emerald-900/30 p-12 text-center">
        <h2 className="text-3xl font-bold text-white mb-3">Ready to get started?</h2>
        <p className="text-zinc-400 max-w-lg mx-auto mb-8">
          Tell us about your project. We&apos;ll scope it out and get back to you within 24 hours
          with a plan and estimate.
        </p>
        <Link
          href="/shop/services"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-colors"
        >
          Request a Quote <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
