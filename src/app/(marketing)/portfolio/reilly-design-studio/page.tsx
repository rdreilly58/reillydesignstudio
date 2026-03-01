import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "ReillyDesignStudio.com | Portfolio | Reilly Design Studio",
  description: "The story behind reillydesignstudio.com — a full-stack Next.js platform with Stripe payments, branded PDF generation, Google OAuth, and four service verticals.",
};

export default function ReillyDesignStudioPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <Link href="/portfolio" className="inline-flex items-center gap-2 text-zinc-500 hover:text-white text-sm mb-8 transition-colors">
        <ArrowLeft size={14} /> Back to Work
      </Link>

      {/* Hero */}
      <div className="relative aspect-video rounded-2xl overflow-hidden mb-8 border border-zinc-800">
        <Image src="/portfolio/rds-homepage.jpg" alt="Reilly Design Studio homepage" fill className="object-cover object-top" priority />
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-6">
        {["Full-Stack Platform", "Next.js 16", "TypeScript", "Tailwind CSS", "Prisma", "Stripe", "AWS Amplify", "Neon PostgreSQL"].map((tag, i) => (
          <span key={tag} className={`px-3 py-1 rounded-full text-xs font-medium border ${i === 0 ? "bg-violet-500/10 text-violet-400 border-violet-500/20" : "bg-zinc-800 text-zinc-400 border-zinc-700"}`}>{tag}</span>
        ))}
      </div>

      <h1 className="text-4xl font-bold text-white mt-2 mb-2">Reilly<span className="text-violet-400">Design</span>Studio.com</h1>
      <p className="text-zinc-500 text-lg mb-8">The platform you&apos;re standing on — a full-stack business hub built from scratch in a week. Design, AI, embedded systems, and cybersecurity services under one roof.</p>

      <a href="https://reillydesignstudio.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-violet-600 hover:bg-violet-500 text-white font-semibold transition-colors mb-12">
        Visit ReillyDesignStudio.com <ExternalLink size={16} />
      </a>

      {/* The Story */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-4">The Story</h2>
        <p className="text-zinc-400 leading-relaxed mb-4">
          After two decades of building embedded systems, AI platforms, and software for defense and commercial clients, it was time to hang a shingle. <strong>Reilly Design Studio LLC</strong> needed a home — not a Squarespace template with stock photos, but a real platform that could handle quotes, invoices, payments, a portfolio, a blog, a shop, and four distinct service verticals.
        </p>
        <p className="text-zinc-400 leading-relaxed mb-4">
          So I built one. In a week. With an AI assistant named Hunter helping at every step — from scaffolding the Next.js app to configuring Stripe webhooks to entering transactions in Wave.
        </p>
        <p className="text-zinc-400 leading-relaxed">
          The result is a production business platform that does everything a small studio needs: <strong>attract clients</strong>, <strong>showcase work</strong>, <strong>accept payments</strong>, and <strong>manage the back office</strong>.
        </p>
      </section>

      {/* Services Screenshot */}
      <div className="relative aspect-video rounded-2xl overflow-hidden mb-12 border border-zinc-800">
        <Image src="/portfolio/rds-services.jpg" alt="Services page showing all four service verticals" fill className="object-cover object-top" />
      </div>

      {/* Design Philosophy */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-4">Design Philosophy</h2>
        <div className="space-y-4 text-zinc-400 leading-relaxed">
          <p><strong className="text-white">Dark-first, content-forward.</strong> The zinc-950 background puts the focus on content, not chrome. Violet accents (<code className="text-violet-400 bg-zinc-800 px-1.5 py-0.5 rounded text-xs">#a78bfa</code>) provide warmth without competing with portfolio images or service cards.</p>
          <p><strong className="text-white">Professional but not corporate.</strong> This isn&apos;t a Fortune 500 website. It&apos;s a one-person studio that builds things — the design should feel like talking to an engineer who cares about craft, not a marketing department.</p>
          <p><strong className="text-white">Print-ready PDFs.</strong> Quotes and invoices use a light theme — white background, dark text, violet accents — because they get emailed and printed. The <code className="text-violet-400 bg-zinc-800 px-1.5 py-0.5 rounded text-xs">@react-pdf/renderer</code> pipeline generates branded documents server-side.</p>
          <p><strong className="text-white">Mobile Safari first.</strong> The admin panel uses JWT sessions with plain cookie names specifically to survive Safari&apos;s Intelligent Tracking Prevention during OAuth redirects. This was a hard-won lesson.</p>
        </div>
      </section>

      {/* What It Does */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-6">What It Does</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { title: "Four Service Verticals", desc: "Design, AI & Automation, Embedded Systems, and Cybersecurity — each with a dedicated explainer page, pricing, and Book Now buttons." },
            { title: "Stripe Payments", desc: "Full quote → payment → invoice flow. Customers request quotes, admin reviews and sets pricing, Stripe Checkout handles payment, webhooks update order status." },
            { title: "Branded PDF Generation", desc: "Server-side quote and invoice PDFs via @react-pdf/renderer. Branded with logo, tagline, and violet accents. Download from admin panel." },
            { title: "Portfolio & Case Studies", desc: "Featured work with real screenshots, dedicated case study pages, and a blog with technical deep-dives and thought leadership." },
            { title: "Google OAuth Admin", desc: "Admin panel at /admin secured with NextAuth + Google OAuth. JWT sessions with plain cookie names for mobile Safari compatibility." },
            { title: "Physical & Digital Shop", desc: "E-commerce ready with product listings, Stripe checkout, and S3-backed asset storage for digital downloads." },
            { title: "Blog Engine", desc: "In-app blog with syntax-highlighted code, tag filtering (AI, Embedded, Design), and Tailwind Typography prose styling." },
            { title: "Wave Bookkeeping Integration", desc: "Chart of accounts mapped to all service lines. Income and expense tracking for every revenue stream and business cost." },
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
        <h2 className="text-2xl font-bold text-white mb-4">Tech Stack</h2>
        <div className="overflow-hidden rounded-xl border border-zinc-800">
          <table className="w-full text-sm">
            <tbody>
              {[
                ["Framework", "Next.js 16 (App Router, Server Components)"],
                ["Language", "TypeScript (strict mode)"],
                ["Styling", "Tailwind CSS v4"],
                ["Database", "PostgreSQL on Neon (serverless)"],
                ["ORM", "Prisma 5"],
                ["Auth", "NextAuth.js (Google OAuth, JWT sessions)"],
                ["Payments", "Stripe (Checkout, Webhooks, Invoices API)"],
                ["PDF Engine", "@react-pdf/renderer (server-side)"],
                ["Storage", "AWS S3 (signed URLs, private bucket)"],
                ["Hosting", "AWS Amplify (SSR, auto-deploy on push)"],
                ["DNS & SSL", "Cloudflare"],
                ["Email", "Zoho Mail (SPF + DKIM + DMARC)"],
                ["Bookkeeping", "Wave (PRO, 12 income + 36 expense accounts)"],
                ["Source Control", "GitHub (private repo)"],
                ["CI/CD", "Amplify auto-build on git push (~4 min)"],
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

      {/* Site Structure */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-4">Site Structure</h2>
        <div className="p-5 rounded-xl bg-zinc-900 border border-zinc-800 font-mono text-sm text-zinc-400 overflow-x-auto">
          <pre className="whitespace-pre">{`reillydesignstudio.com/
├── /                          → Homepage (hero, featured work, services, blog)
├── /portfolio                 → Work gallery
│   ├── /lucian-and-gideon     → Case study: kids coloring site
│   └── /reilly-design-studio  → Case study: this platform
├── /shop
│   ├── /services              → All 14 services + quote form
│   │   ├── /ai                → AI & Automation explainer
│   │   ├── /embedded          → Embedded Systems explainer
│   │   └── /cybersecurity     → Cybersecurity explainer
│   ├── /physical              → Physical product shop
│   └── /digital               → Digital downloads
├── /blog                      → All posts
│   ├── /embedded-board-bring-up
│   ├── /what-is-openclaw
│   └── /... (6 posts total)
├── /admin                     → Admin panel (OAuth protected)
│   ├── /quotes                → Quote management + PDF download
│   └── /invoices              → Invoice management + PDF download
├── /api
│   ├── /auth/[...nextauth]    → Google OAuth endpoints
│   ├── /quotes/[id]/pdf       → Quote PDF generation
│   ├── /invoices/[id]/pdf     → Invoice PDF generation
│   ├── /checkout              → Stripe Checkout session
│   └── /stripe/webhook        → Stripe event handler
└── /samples
    ├── sample-quote.pdf       → Example branded quote
    └── sample-invoice.pdf     → Example branded invoice`}</pre>
        </div>
      </section>

      {/* Architecture Decisions */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-4">Key Architecture Decisions</h2>
        <div className="space-y-4 text-zinc-400 leading-relaxed">
          <p><strong className="text-white">App Router over Pages Router.</strong> Server Components by default means less client-side JavaScript and faster page loads. Client components are used surgically — only for forms, interactive elements, and Stripe checkout flows.</p>
          <p><strong className="text-white">Neon PostgreSQL over SQLite.</strong> Serverless Postgres gives us real connection pooling, branching for development, and zero-downtime migrations. Prisma handles the ORM layer with type-safe queries.</p>
          <p><strong className="text-white">JWT sessions over database sessions.</strong> Required for mobile Safari — ITP (Intelligent Tracking Prevention) blocks prefixed cookies during cross-origin OAuth redirects. Plain cookie names + JWT strategy solved this cleanly.</p>
          <p><strong className="text-white">Amplify SSR over static export.</strong> Server-side rendering enables dynamic API routes, Stripe webhooks, and PDF generation. The tradeoff: environment variables must be written to <code className="text-violet-400 bg-zinc-800 px-1.5 py-0.5 rounded text-xs">.env.production</code> during the build phase because Amplify&apos;s Lambda runtime doesn&apos;t propagate app-level config.</p>
          <p><strong className="text-white">Stripe API for invoices.</strong> No local invoice model — invoices are pulled directly from Stripe&apos;s API. This keeps Stripe as the single source of truth for all payment data and avoids sync issues.</p>
        </div>
      </section>

      {/* Business Stack */}
      <section className="mb-12 p-6 rounded-2xl bg-gradient-to-br from-violet-500/10 to-zinc-900 border border-violet-500/20">
        <h2 className="text-2xl font-bold text-white mb-4">The Business Behind the Code</h2>
        <p className="text-zinc-300 leading-relaxed mb-4">
          This isn&apos;t just a portfolio site — it&apos;s the operational backbone of a real LLC:
        </p>
        <ul className="space-y-2 text-zinc-300">
          <li>• <strong>Virginia LLC</strong> — formed February 2026 (SCC Entity #11973922)</li>
          <li>• <strong>EIN obtained</strong> — IRS Letter 147C on file</li>
          <li>• <strong>Mercury Business Banking</strong> — checking and savings</li>
          <li>• <strong>Stripe Live</strong> — accepting real payments</li>
          <li>• <strong>Wave PRO Bookkeeping</strong> — 12 income accounts across 4 service verticals</li>
          <li>• <strong>Fairfax County BPOL</strong> — business license filed</li>
          <li>• <strong>Zoho Mail</strong> — professional email with SPF/DKIM/DMARC</li>
          <li>• <strong>Cloudflare DNS</strong> — domain management and SSL</li>
        </ul>
        <p className="text-zinc-400 text-sm mt-4">Total setup cost: $203.91 (LLC filing + domain + email + BPOL + Wave Pro + Anthropic API)</p>
      </section>

      {/* CTA */}
      <div className="text-center pt-8 border-t border-zinc-800">
        <p className="text-zinc-500 mb-4">Want a platform like this for your business?</p>
        <Link href="/shop/services" className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-violet-600 hover:bg-violet-500 text-white font-semibold transition-colors">Get a Quote</Link>
      </div>
    </div>
  );
}
