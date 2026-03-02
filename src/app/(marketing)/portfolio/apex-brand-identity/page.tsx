import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Apex Co. Brand Identity | Portfolio | Reilly Design Studio",
  description: "A complete brand identity system for Apex Co. — logo, color system, typography, brand guidelines, and collateral design.",
};

export default function ApexBrandIdentityPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <Link href="/portfolio" className="inline-flex items-center gap-2 text-zinc-500 hover:text-white text-sm mb-8 transition-colors">
        <ArrowLeft size={14} /> Back to Work
      </Link>

      {/* Hero */}
      <div className="relative aspect-video rounded-2xl overflow-hidden mb-8 border border-zinc-800 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl sm:text-8xl font-black tracking-tighter text-white mb-2">
            APEX<span className="text-violet-400">.</span>
          </div>
          <p className="text-zinc-500 text-sm tracking-[0.3em] uppercase">Precision Engineered Branding</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-6">
        {["Brand Identity", "Logo Design", "Typography", "Color System", "Brand Guidelines"].map((tag, i) => (
          <span key={tag} className={`px-3 py-1 rounded-full text-xs font-medium border ${i === 0 ? "bg-violet-500/10 text-violet-400 border-violet-500/20" : "bg-zinc-800 text-zinc-400 border-zinc-700"}`}>{tag}</span>
        ))}
      </div>

      <h1 className="text-4xl font-bold text-white mt-2 mb-2">Apex Co. — Brand Identity System</h1>
      <p className="text-zinc-500 text-lg mb-12">A complete brand identity for a precision engineering consultancy. From blank page to a system that works at every scale — from favicon to trade show banner.</p>

      {/* The Brief */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-4">The Brief</h2>
        <p className="text-zinc-400 leading-relaxed mb-4">
          Apex Co. is a mechanical engineering consultancy specializing in <strong>high-tolerance manufacturing</strong> and <strong>industrial automation</strong>. They needed a brand identity that communicated precision, reliability, and technical sophistication — without looking like every other engineering firm that slaps a gear icon on a blue background.
        </p>
        <p className="text-zinc-400 leading-relaxed">
          The ask: <strong>logo</strong>, <strong>color system</strong>, <strong>typography</strong>, <strong>brand guidelines document</strong>, and <strong>starter collateral</strong> (business cards, letterhead, email signatures). Timeline: 3 weeks. Budget: $2,500.
        </p>
      </section>

      {/* Discovery */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-4">Discovery & Strategy</h2>
        <p className="text-zinc-400 leading-relaxed mb-4">
          Every brand project starts with listening. Before opening Figma, I spent the first week understanding the business:
        </p>
        <ul className="space-y-3 text-zinc-400">
          <li className="flex gap-3"><span className="text-violet-400 shrink-0">01</span> <span><strong className="text-white">Competitive audit</strong> — analyzed 15 competitors. Found an ocean of blue gradients, gear icons, and sans-serif sameness. The opportunity: stand out by being bold and minimal.</span></li>
          <li className="flex gap-3"><span className="text-violet-400 shrink-0">02</span> <span><strong className="text-white">Stakeholder interviews</strong> — talked to the founders, project managers, and two clients. Key insight: Apex&apos;s reputation is built on <em>precision</em> — they measure in microns, not millimeters.</span></li>
          <li className="flex gap-3"><span className="text-violet-400 shrink-0">03</span> <span><strong className="text-white">Brand attributes</strong> — distilled to five words: <strong>Precise. Bold. Trusted. Modern. Technical.</strong></span></li>
          <li className="flex gap-3"><span className="text-violet-400 shrink-0">04</span> <span><strong className="text-white">Positioning statement</strong> — &ldquo;Apex Co. delivers engineering precision that others call impossible.&rdquo;</span></li>
        </ul>
      </section>

      {/* The Mark */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-4">The Mark</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="p-8 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center">
            <div className="text-5xl font-black tracking-tighter text-white">APEX<span className="text-violet-400">.</span></div>
          </div>
          <div className="p-8 rounded-xl bg-white border border-zinc-800 flex items-center justify-center">
            <div className="text-5xl font-black tracking-tighter text-zinc-900">APEX<span className="text-violet-400">.</span></div>
          </div>
        </div>
        <p className="text-zinc-400 leading-relaxed mb-4">
          The wordmark is intentionally typographic — no abstract icon, no gear, no swoosh. <strong>The period is the logo.</strong> That single violet dot carries all the brand&apos;s personality: precision (it&apos;s a point), finality (it&apos;s a full stop), and confidence (it ends with certainty).
        </p>
        <p className="text-zinc-400 leading-relaxed">
          The tracking is tight — letters sit close together like machined parts with zero clearance. The weight is black (900) because Apex doesn&apos;t whisper. The type is geometric sans-serif, echoing the clean lines of technical drawings.
        </p>
      </section>

      {/* Color System */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-4">Color System</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {[
            { name: "Apex Black", hex: "#09090b", text: "text-zinc-400", bg: "bg-[#09090b]", border: "border-zinc-700" },
            { name: "Apex Violet", hex: "#a78bfa", text: "text-zinc-900", bg: "bg-[#a78bfa]", border: "border-transparent" },
            { name: "Steel", hex: "#3f3f46", text: "text-zinc-300", bg: "bg-[#3f3f46]", border: "border-transparent" },
            { name: "Clean White", hex: "#fafafa", text: "text-zinc-600", bg: "bg-[#fafafa]", border: "border-zinc-300" },
          ].map((color) => (
            <div key={color.name} className={`${color.bg} rounded-xl p-4 border ${color.border} aspect-square flex flex-col justify-end`}>
              <p className={`font-semibold text-sm ${color.text}`}>{color.name}</p>
              <p className={`text-xs ${color.text} opacity-70`}>{color.hex}</p>
            </div>
          ))}
        </div>
        <p className="text-zinc-400 leading-relaxed">
          <strong className="text-white">Why violet?</strong> Engineering firms default to blue because it signals trust. Violet signals trust <em>and</em> innovation. It differentiates Apex from the sea of corporate blue while maintaining gravitas. The palette is deliberately restrained — three neutrals and one accent. Precision means no unnecessary colors.
        </p>
      </section>

      {/* Typography */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-4">Typography</h2>
        <div className="space-y-4 mb-6">
          <div className="p-5 rounded-xl bg-zinc-900 border border-zinc-800">
            <p className="text-zinc-500 text-xs mb-2 uppercase tracking-wider">Primary — Headlines & Logo</p>
            <p className="text-white text-3xl font-black tracking-tight">Inter — Black 900</p>
            <p className="text-zinc-500 text-sm mt-2">Tight tracking, geometric proportions. Used for the wordmark, headlines, and any text that needs to command attention.</p>
          </div>
          <div className="p-5 rounded-xl bg-zinc-900 border border-zinc-800">
            <p className="text-zinc-500 text-xs mb-2 uppercase tracking-wider">Secondary — Body & UI</p>
            <p className="text-white text-xl font-normal">Inter — Regular 400 / Medium 500</p>
            <p className="text-zinc-500 text-sm mt-2">Same family, lighter weights. Keeps the system cohesive. Regular for body text, Medium for labels and navigation.</p>
          </div>
          <div className="p-5 rounded-xl bg-zinc-900 border border-zinc-800">
            <p className="text-zinc-500 text-xs mb-2 uppercase tracking-wider">Technical — Data & Specs</p>
            <p className="text-white text-xl font-mono">JetBrains Mono — Regular 400</p>
            <p className="text-zinc-500 text-sm mt-2">For technical specifications, part numbers, and data tables. Monospace reinforces the engineering identity.</p>
          </div>
        </div>
        <p className="text-zinc-400 leading-relaxed">
          <strong className="text-white">One family, three roles.</strong> Inter was chosen for its geometric clarity and massive weight range (100–900). Using one type family eliminates font-pairing guesswork and ensures consistency across every touchpoint. JetBrains Mono is the only exception — reserved strictly for technical content.
        </p>
      </section>

      {/* Collateral */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-6">Collateral Design</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { title: "Business Cards", desc: "Black stock, white ink, violet spot UV on the period. Thick 32pt cotton paper. The card itself communicates quality before anyone reads the text." },
            { title: "Letterhead & Envelope", desc: "Clean white stock, minimal header with wordmark. Engineering specifications for margins and fold lines — because an engineering firm's letterhead should be precisely engineered." },
            { title: "Email Signature", desc: "HTML email signature with the wordmark, violet accent line, and contact details. Renders consistently across Outlook, Gmail, and Apple Mail." },
            { title: "Presentation Template", desc: "16:9 slide deck in dark theme. Title slides with the wordmark, content slides with the type system, data slides with JetBrains Mono tables." },
            { title: "Social Media Kit", desc: "LinkedIn banner, profile image, and post templates. The period becomes the avatar — a violet dot on black background at any size." },
            { title: "Brand Guidelines PDF", desc: "24-page document covering logo usage, clear space, minimum sizes, color specifications (CMYK, RGB, HEX, Pantone), typography rules, and do/don't examples." },
          ].map((item, i) => (
            <div key={i} className="p-5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-colors">
              <h3 className="text-white font-semibold mb-2">{item.title}</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-4">Process & Timeline</h2>
        <div className="overflow-hidden rounded-xl border border-zinc-800">
          <table className="w-full text-sm">
            <tbody>
              {[
                ["Week 1", "Discovery — competitive audit, stakeholder interviews, brand attributes, positioning"],
                ["Week 2", "Exploration — 12 logo concepts presented, narrowed to 3 directions, refined to final mark"],
                ["Week 3", "System build — color, typography, guidelines document, collateral design, delivery"],
                ["Deliverables", "Logo (SVG, PNG, EPS), Brand Guidelines PDF, Business Card files, Letterhead, Email sig, Social kit"],
                ["Budget", "$2,500 (Brand Identity package)"],
                ["Tools", "Figma, Adobe Illustrator, InDesign"],
              ].map(([label, value], i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-zinc-900" : "bg-zinc-950"}>
                  <td className="px-4 py-3 text-zinc-500 font-medium whitespace-nowrap">{label}</td>
                  <td className="px-4 py-3 text-white">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Design Decisions */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-4">Key Design Decisions</h2>
        <div className="space-y-4 text-zinc-400 leading-relaxed">
          <p><strong className="text-white">Wordmark over icon.</strong> Engineering consultancies don&apos;t need mascots. A typographic mark is more versatile, more distinctive, and ages better than any abstract symbol. The period carries the personality.</p>
          <p><strong className="text-white">Violet over blue.</strong> The competitive audit showed wall-to-wall blue. Violet differentiates immediately while maintaining the professionalism clients expect. It&apos;s a calculated risk that paid off — Apex now owns their color in the space.</p>
          <p><strong className="text-white">Restraint over complexity.</strong> Four colors. One type family (plus one mono). No gradients, no patterns, no decorative elements. Every element in the system earns its place. This mirrors how Apex approaches engineering — nothing unnecessary.</p>
          <p><strong className="text-white">Dark-first design.</strong> The primary brand presentation is light-on-dark. This is unusual for B2B but intentional — it signals modernity and technical sophistication. Light backgrounds are reserved for print collateral and formal documents.</p>
        </div>
      </section>

      {/* Result */}
      <section className="mb-12 p-6 rounded-2xl bg-gradient-to-br from-violet-500/10 to-zinc-900 border border-violet-500/20">
        <h2 className="text-2xl font-bold text-white mb-4">The Result</h2>
        <p className="text-zinc-300 leading-relaxed mb-4">
          Apex Co. launched their new brand across all channels in Q4 2025. The response from clients and industry peers was immediate — the brand is recognized, remembered, and respected. The violet period has become their signature, appearing on everything from hard hats to CNC machines.
        </p>
        <p className="text-zinc-300 leading-relaxed">
          Most importantly, the brand system <em>scales</em>. New collateral — trade show booths, vehicle wraps, safety signage — follows naturally from the guidelines without needing a designer for every decision. That&apos;s the real test of a good brand system: it works even when you&apos;re not in the room.
        </p>
      </section>

      {/* CTA */}
      <div className="text-center pt-8 border-t border-zinc-800">
        <p className="text-zinc-500 mb-4">Need a brand identity that stands out?</p>
        <Link href="/shop/services" className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-violet-600 hover:bg-violet-500 text-white font-semibold transition-colors">Get a Quote</Link>
      </div>
    </div>
  );
}
