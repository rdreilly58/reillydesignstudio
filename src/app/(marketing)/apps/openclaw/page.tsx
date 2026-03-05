import { Metadata } from "next";
import Link from "next/link";
import {
  MessageSquare,
  Layers,
  Hash,
  Clock,
  Settings,
  Server,
  Bell,
  KeyRound,
  Check,
  ChevronDown,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "OpenClaw for iOS — Reilly Design Studio",
  description:
    "Connect to your self-hosted OpenClaw AI infrastructure from anywhere. Chat, sessions, channels, cron, push notifications, and Ed25519 authentication.",
};

const features = [
  {
    icon: MessageSquare,
    title: "Chat",
    description:
      "Real-time conversations with your AI models. Markdown rendering, code highlighting, and seamless streaming responses.",
  },
  {
    icon: Layers,
    title: "Sessions",
    description:
      "Persistent conversation history. Pick up where you left off across devices with your self-hosted sync.",
  },
  {
    icon: Hash,
    title: "Channels",
    description:
      "Organize conversations by topic, project, or team. Share channels across your OpenClaw nodes.",
  },
  {
    icon: Clock,
    title: "Cron",
    description:
      "Schedule AI tasks to run automatically. Daily summaries, periodic checks, or any recurring workflow.",
  },
  {
    icon: Settings,
    title: "Config",
    description:
      "Fine-tune model parameters, system prompts, and behavior settings directly from your device.",
  },
  {
    icon: Server,
    title: "Nodes",
    description:
      "Connect to multiple OpenClaw servers. Switch between development, staging, and production environments.",
  },
  {
    icon: Bell,
    title: "Push Notifications",
    description:
      "Get notified when your AI tasks complete. APNs integration keeps you informed without polling.",
  },
  {
    icon: KeyRound,
    title: "Ed25519 Auth",
    description:
      "Secure public-key authentication. Keys generated locally and stored in iOS Keychain. No passwords to manage.",
  },
];

const freePlan = [
  "Connect to 1 OpenClaw node",
  "Unlimited chat sessions",
  "Basic push notifications",
  "Ed25519 authentication",
  "Local session history",
];

const proPlan = [
  "Connect to unlimited nodes",
  "Unlimited chat sessions",
  "Advanced push notifications",
  "Ed25519 authentication",
  "Channel management",
  "Cron job scheduling",
  "Config management",
  "Priority support",
];

const faqs = [
  {
    question: "What is OpenClaw?",
    answer:
      "OpenClaw is a self-hosted AI infrastructure platform that lets you run and manage your own AI models. The OpenClaw iOS app connects to your OpenClaw servers, giving you mobile access to your AI infrastructure from anywhere.",
  },
  {
    question: "Do I need my own server?",
    answer:
      "Yes. OpenClaw for iOS is a client app that connects to your self-hosted OpenClaw server. You need to have an OpenClaw server running before using this app. Visit our blog for setup guides.",
  },
  {
    question: "Is my data private?",
    answer:
      "Absolutely. All data is stored locally on your device or on your own servers. We never see your conversations, configurations, or authentication keys. The app connects directly to your infrastructure over encrypted WebSocket connections.",
  },
  {
    question: "What's the difference between Free and Pro?",
    answer:
      "Free lets you connect to one OpenClaw node with basic features. Pro unlocks unlimited nodes, channel management, cron job scheduling, and config management—everything you need for serious AI infrastructure.",
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer:
      "Yes. Manage or cancel your subscription through your Apple ID settings in the iOS Settings app. You'll retain Pro features until the end of your current billing period.",
  },
  {
    question: "How does authentication work?",
    answer:
      "The app generates Ed25519 key pairs locally on your device. Your private key is stored securely in the iOS Keychain and never leaves your device. You add your public key to your OpenClaw server to authorize the connection.",
  },
];

export default function OpenClawPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 sm:px-6 lg:px-8 pt-24 pb-32">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-violet-600/10 rounded-full blur-3xl" />
        </div>
        <div className="max-w-5xl mx-auto text-center">
          <span className="inline-block px-3 py-1 rounded-full bg-violet-500/10 text-violet-400 text-xs font-medium mb-6 border border-violet-500/20">
            Now available on the App Store
          </span>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-tight">
            OpenClaw <br />
            <span className="text-violet-400">for iOS</span>
          </h1>
          <p className="mt-6 text-xl text-zinc-400 max-w-2xl mx-auto">
            Connect to your self-hosted AI infrastructure from anywhere. Chat
            with your models, manage sessions, and stay in control of your data.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-zinc-900 font-semibold hover:bg-zinc-100 transition-colors"
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              Download on App Store
            </a>
            <a
              href="#features"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-zinc-800 text-zinc-100 font-medium hover:bg-zinc-700 transition-colors border border-zinc-700"
            >
              See Features <ChevronDown size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-4 sm:px-6 lg:px-8 py-24 bg-zinc-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white">
              Everything you need to control your AI
            </h2>
            <p className="text-zinc-500 mt-2">
              Full-featured mobile access to your OpenClaw infrastructure.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl p-6 bg-zinc-950 border border-zinc-800 hover:border-zinc-600 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center mb-4">
                  <feature.icon className="text-violet-400" size={22} />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">
                  {feature.title}
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white">Simple pricing</h2>
            <p className="text-zinc-500 mt-2">
              Start free, upgrade when you need more power.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Free Plan */}
            <div className="rounded-2xl p-8 bg-zinc-950 border border-zinc-800">
              <h3 className="text-xl font-bold text-white">Free</h3>
              <p className="text-zinc-500 mt-1 mb-6">
                For personal use and getting started.
              </p>
              <div className="mb-8">
                <span className="text-4xl font-bold text-white">$0</span>
                <span className="text-zinc-500 ml-2">forever</span>
              </div>
              <ul className="space-y-3 mb-8">
                {freePlan.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-zinc-400 text-sm"
                  >
                    <Check
                      className="text-zinc-600 mt-0.5 shrink-0"
                      size={16}
                    />
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href="#"
                className="block text-center px-6 py-3 rounded-full bg-zinc-800 text-zinc-100 font-medium hover:bg-zinc-700 transition-colors border border-zinc-700"
              >
                Download Free
              </a>
            </div>

            {/* Pro Plan */}
            <div className="rounded-2xl p-8 bg-gradient-to-b from-violet-950/40 to-zinc-950 border border-violet-900/30 relative">
              <span className="absolute top-4 right-4 px-2 py-0.5 rounded-full bg-violet-500/10 text-violet-400 text-xs border border-violet-500/20">
                Popular
              </span>
              <h3 className="text-xl font-bold text-white">Pro</h3>
              <p className="text-zinc-500 mt-1 mb-6">
                For power users and teams.
              </p>
              <div className="mb-2">
                <span className="text-4xl font-bold text-white">$6.99</span>
                <span className="text-zinc-500 ml-2">/month</span>
              </div>
              <p className="text-zinc-500 text-sm mb-8">
                or $49.99/year (save 40%)
              </p>
              <ul className="space-y-3 mb-8">
                {proPlan.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-zinc-300 text-sm"
                  >
                    <Check
                      className="text-violet-400 mt-0.5 shrink-0"
                      size={16}
                    />
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href="#"
                className="block text-center px-6 py-3 rounded-full bg-violet-600 text-white font-semibold hover:bg-violet-500 transition-colors"
              >
                Start Pro Trial
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="px-4 sm:px-6 lg:px-8 py-24 bg-zinc-900/50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white">
              Frequently asked questions
            </h2>
            <p className="text-zinc-500 mt-2">
              Everything you need to know about OpenClaw for iOS.
            </p>
          </div>
          <div className="space-y-6">
            {faqs.map((faq) => (
              <div
                key={faq.question}
                className="rounded-2xl p-6 bg-zinc-950 border border-zinc-800"
              >
                <h3 className="text-white font-semibold mb-2">{faq.question}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Links Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-b from-violet-950/40 to-zinc-900 rounded-3xl border border-violet-900/30 p-16">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to get started?
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            Download OpenClaw for iOS and connect to your self-hosted AI
            infrastructure today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <a
              href="#"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-zinc-900 font-semibold hover:bg-zinc-100 transition-colors"
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              Download on App Store
            </a>
            <Link
              href="/blog/what-is-openclaw"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-zinc-800 text-zinc-100 font-medium hover:bg-zinc-700 transition-colors border border-zinc-700"
            >
              Learn More <ArrowRight size={16} />
            </Link>
          </div>
          <div className="flex items-center justify-center gap-6 text-sm">
            <Link
              href="/privacy"
              className="text-zinc-400 hover:text-violet-400 transition-colors"
            >
              Privacy Policy
            </Link>
            <span className="text-zinc-700">|</span>
            <Link
              href="/terms"
              className="text-zinc-400 hover:text-violet-400 transition-colors"
            >
              Terms of Sale
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
