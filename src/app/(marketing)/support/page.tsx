import { Metadata } from "next";
import Link from "next/link";
import { Monitor, Shield, Download, MessageSquare, Clock, Zap, Lock, Globe } from "lucide-react";

export const metadata: Metadata = {
  title: "Remote Support",
  description: "Get instant remote support from Reilly Design Studio. Secure, self-hosted remote access for OpenClaw setup, troubleshooting, and consulting.",
};

const steps = [
  {
    number: "1",
    title: "Download Our Support App",
    desc: "Download our lightweight, branded remote support client. It's portable — no installation required.",
    icon: Download,
  },
  {
    number: "2",
    title: "Share Your Session Code",
    desc: "Open the app and share the 9-digit ID and temporary password displayed on screen.",
    icon: MessageSquare,
  },
  {
    number: "3",
    title: "We Connect Securely",
    desc: "We'll connect to your screen with your permission. You stay in control the entire time.",
    icon: Monitor,
  },
];

const features = [
  {
    icon: Lock,
    title: "Self-Hosted Infrastructure",
    desc: "Your data never touches third-party servers. Our relay runs on our own hardware — not in someone else's cloud.",
  },
  {
    icon: Shield,
    title: "End-to-End Encrypted",
    desc: "All connections are encrypted with Ed25519 key exchange. No one can intercept your session — not even us.",
  },
  {
    icon: Zap,
    title: "Fast & Lightweight",
    desc: "Sub-second latency. The support client is under 15MB and runs without installation.",
  },
  {
    icon: Globe,
    title: "Mac & PC Support",
    desc: "We support macOS, Windows, and Linux. Whatever you're running, we can help.",
  },
];

const services = [
  {
    name: "Quick Fix",
    price: "$95",
    unit: "per session",
    desc: "30-minute remote session for troubleshooting, configuration, or quick questions.",
    features: ["Up to 30 minutes", "Screen sharing + remote control", "Chat support during session"],
  },
  {
    name: "Setup Session",
    price: "$195",
    unit: "per session",
    desc: "Full OpenClaw installation, configuration, and walkthrough on your machine.",
    features: ["Up to 2 hours", "OpenClaw install & config", "Channel setup (Telegram, Discord, etc.)", "Post-session documentation"],
    popular: true,
  },
  {
    name: "Managed Support",
    price: "$349",
    unit: "per month",
    desc: "Ongoing remote support with priority response and proactive monitoring.",
    features: ["Unlimited support sessions", "Priority response (< 4 hours)", "Proactive health checks", "Monthly status report"],
  },
];

export default function SupportPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Hero */}
      <div className="mb-16">
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
          Remote Support
        </h1>
        <p className="text-xl text-zinc-400 leading-relaxed">
          Get expert help without leaving your desk. Our secure, self-hosted remote support
          lets us see your screen, diagnose issues, and fix things in real time.
        </p>
      </div>

      {/* How It Works */}
      <section className="mb-20">
        <h2 className="text-2xl font-bold text-white mb-8">How It Works</h2>
        <div className="grid gap-8 sm:grid-cols-3">
          {steps.map((step) => (
            <div key={step.number} className="relative">
              <div className="flex items-center gap-3 mb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 text-sm font-bold">
                  {step.number}
                </span>
                <step.icon className="w-5 h-5 text-zinc-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Security Features */}
      <section className="mb-20">
        <h2 className="text-2xl font-bold text-white mb-8">Security First</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {features.map((feature) => (
            <div key={feature.title} className="border border-zinc-800 rounded-lg p-5">
              <feature.icon className="w-5 h-5 text-emerald-400 mb-3" />
              <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Service Tiers */}
      <section className="mb-20">
        <h2 className="text-2xl font-bold text-white mb-8">Support Plans</h2>
        <div className="grid gap-6 sm:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.name}
              className={`border rounded-lg p-6 flex flex-col ${
                service.popular
                  ? "border-emerald-500/50 bg-emerald-500/5"
                  : "border-zinc-800"
              }`}
            >
              {service.popular && (
                <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">
                  Most Popular
                </span>
              )}
              <h3 className="text-lg font-bold text-white">{service.name}</h3>
              <div className="mt-2 mb-4">
                <span className="text-3xl font-bold text-white">{service.price}</span>
                <span className="text-zinc-500 text-sm ml-1">/{service.unit}</span>
              </div>
              <p className="text-zinc-400 text-sm mb-6">{service.desc}</p>
              <ul className="space-y-2 mt-auto">
                {service.features.map((f) => (
                  <li key={f} className="text-sm text-zinc-300 flex items-start gap-2">
                    <span className="text-emerald-400 mt-0.5">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center border border-zinc-800 rounded-lg p-10">
        <h2 className="text-2xl font-bold text-white mb-3">Ready to Get Started?</h2>
        <p className="text-zinc-400 mb-6">
          Book a session or reach out with questions. We typically respond within an hour.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-emerald-600 text-white font-medium hover:bg-emerald-500 transition-colors"
          >
            Book a Session
          </Link>
          <a
            href="https://rustdesk.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-zinc-700 text-zinc-300 font-medium hover:border-zinc-500 hover:text-white transition-colors"
          >
            <Download className="w-4 h-4 mr-2" />
            Download Support Client
          </a>
        </div>
      </section>
    </div>
  );
}
