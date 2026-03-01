import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Lucian & Gideon's Coloring Fun | Portfolio | Reilly Design Studio",
  description: "A kid-friendly coloring page website built with Next.js and deployed on AWS Amplify. Monster trucks, dinosaurs, robots, and superheroes — all printable!",
};

export default function LucianAndGideonPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <Link href="/portfolio" className="inline-flex items-center gap-2 text-zinc-500 hover:text-white text-sm mb-8 transition-colors">
        <ArrowLeft size={14} /> Back to Work
      </Link>

      {/* Hero */}
      <div className="relative aspect-video rounded-2xl overflow-hidden mb-8 border border-zinc-800">
        <Image src="/portfolio/lucian-gideon-home.jpg" alt="Lucian and Gideons Coloring Fun homepage" fill className="object-cover" priority />
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-6">
        {["Web App", "Next.js", "TypeScript", "Tailwind CSS", "AWS Amplify"].map((tag, i) => (
          <span key={tag} className={`px-3 py-1 rounded-full text-xs font-medium border ${i === 0 ? "bg-violet-500/10 text-violet-400 border-violet-500/20" : "bg-zinc-800 text-zinc-400 border-zinc-700"}`}>{tag}</span>
        ))}
      </div>

      <h1 className="text-4xl font-bold text-white mt-2 mb-2">🎨 Lucian & Gideon&apos;s Coloring Fun</h1>
      <p className="text-zinc-500 text-lg mb-8">A kids&apos; coloring page website — because every great design studio needs a project that makes little humans smile.</p>

      <a href="https://lucianandgideon.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-violet-600 hover:bg-violet-500 text-white font-semibold transition-colors mb-12">
        Visit LucianAndGideon.com <ExternalLink size={16} />
      </a>

      {/* The Story */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-4">The Story</h2>
        <p className="text-zinc-400 leading-relaxed mb-4">
          Two little boys — Lucian and Gideon — needed coloring pages. Not just <em>any</em> coloring pages. They needed <strong>monster trucks doing backflips</strong>, <strong>T-Rexes fighting robots</strong>, and <strong>superheroes being super</strong>. The internet had options, sure. But none of them had that grandpa-built-this-for-you magic.
        </p>
        <p className="text-zinc-400 leading-relaxed">
          So we built them a website. From scratch. Because that&apos;s what design studios do — they solve problems. Even if the client is 4 years old and pays in hugs.
        </p>
      </section>

      {/* Category Screenshot */}
      <div className="relative aspect-[9/16] max-w-sm mx-auto rounded-2xl overflow-hidden mb-12 border border-zinc-800">
        <Image src="/portfolio/lucian-gideon-category.jpg" alt="Monster Trucks category page with printable coloring pages" fill className="object-cover" />
      </div>

      {/* How It Works */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-4">How It Works</h2>
        <p className="text-zinc-400 leading-relaxed mb-4">The concept is beautifully simple — just like a good coloring book should be:</p>
        <ol className="list-decimal list-inside space-y-2 text-zinc-400">
          <li><strong className="text-white">Pick a category</strong> — Monster Trucks 🚗💨, Dinosaurs 🦖, Robots 🤖, or Superheroes 🦸‍♂️</li>
          <li><strong className="text-white">Browse the gallery</strong> — 20 unique illustrations per category (80 total!)</li>
          <li><strong className="text-white">Hit Print</strong> — one click, clean print-optimized output, no ads, no popups</li>
          <li><strong className="text-white">Color!</strong> — the fun part (crayons not included)</li>
        </ol>
      </section>

      {/* Features */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-6">Features & Design Decisions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { title: "Kid-Proof Navigation", desc: "Big, colorful category cards with emoji icons. A 4-year-old can navigate this. We tested it (our clients approved)." },
            { title: "Print-First Design", desc: "Every coloring page is optimized for standard 8.5x11 paper. Clean line art, proper margins, no wasted ink on backgrounds." },
            { title: "Zero Friction", desc: "No accounts, no sign-ups, no paywalls. Click, Print, Color. The way the web should work." },
            { title: "Vibrant UI, Clean Output", desc: "The website pops with gradients, bold colors, and playful typography. But print output is crisp black-and-white line art." },
            { title: "Mobile Responsive", desc: "Works on phones, tablets, and desktops. Because sometimes you need emergency coloring pages at a restaurant." },
            { title: "80 Original Illustrations", desc: "Custom artwork across 4 categories — each piece is unique, detailed, and designed for little hands with big imaginations." },
          ].map((feature, i) => (
            <div key={i} className="p-5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-colors">
              <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tech Stack */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-4">Under the Hood</h2>
        <p className="text-zinc-400 leading-relaxed mb-4">Don&apos;t let the playful exterior fool you — this is a properly engineered web app:</p>
        <div className="overflow-hidden rounded-xl border border-zinc-800">
          <table className="w-full text-sm">
            <tbody>
              {[
                ["Framework", "Next.js with App Router"],
                ["Language", "TypeScript"],
                ["Styling", "Tailwind CSS"],
                ["Hosting", "AWS Amplify (auto-deploy on push)"],
                ["DNS & SSL", "Cloudflare"],
                ["Source Control", "GitHub (private repo)"],
                ["Performance", "100/100 Lighthouse score"],
                ["Build Time", "< 10 seconds"],
              ].map(([label, value], i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-zinc-900" : "bg-zinc-950"}>
                  <td className="px-4 py-3 text-zinc-500 font-medium whitespace-nowrap">{label}</td>
                  <td className="px-4 py-3 text-white">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-zinc-400 leading-relaxed mt-4">
          Static pages with zero client-side JavaScript overhead. The site loads in under a second on any connection. Every image is optimized through Next.js&apos;s built-in <code className="text-violet-400 bg-zinc-800 px-1.5 py-0.5 rounded text-xs">Image</code> component with lazy loading and responsive sizing. Auto-deployed to AWS Amplify on every git push — no manual deployments, no downtime.
        </p>
      </section>

      {/* Site Structure */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-4">Site Structure</h2>
        <div className="p-5 rounded-xl bg-zinc-900 border border-zinc-800 font-mono text-sm text-zinc-400 overflow-x-auto">
          <pre className="whitespace-pre">{`lucianandgideon.com/
├── /                    → Homepage (category picker)
├── /monster-trucks      → 🚗💨 20 truck illustrations
├── /dinosaurs           → 🦖🦕 20 dino illustrations
├── /robots              → 🤖⚡ 20 robot illustrations
└── /superheroes         → 🦸‍♂️⚡ 20 hero illustrations

Each category page:
  → Responsive grid of illustration cards
  → Thumbnail preview with character name
  → One-click Print button
  → Print-optimized CSS @media rules
  → Back Home navigation`}</pre>
        </div>
      </section>

      {/* The Verdict */}
      <section className="mb-12 p-6 rounded-2xl bg-gradient-to-br from-violet-500/10 to-zinc-900 border border-violet-500/20">
        <h2 className="text-2xl font-bold text-white mb-4">The Verdict</h2>
        <p className="text-zinc-300 leading-relaxed">
          Two very satisfied clients (ages 4 and 6) gave this project a <strong>10 out of 10 crayons</strong>. They particularly appreciated the &ldquo;Mega Mudder&rdquo; monster truck and the T-Rex with the tiny arms. This project demonstrates that good design isn&apos;t about complexity — it&apos;s about understanding your audience and delivering exactly what they need. Even when your audience communicates primarily in dinosaur roars. 🦖
        </p>
      </section>

      {/* CTA */}
      <div className="text-center pt-8 border-t border-zinc-800">
        <p className="text-zinc-500 mb-4">Want something built for your audience?</p>
        <Link href="/shop/services" className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-violet-600 hover:bg-violet-500 text-white font-semibold transition-colors">Let&apos;s Talk</Link>
      </div>
    </div>
  );
}
