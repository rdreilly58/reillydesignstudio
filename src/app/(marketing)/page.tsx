import Link from "next/link";
import { ArrowRight, Briefcase, Pen, Bot, Cpu, Shield } from "lucide-react";

const featuredWork = [
  { title: "Brand Identity", client: "Apex Co.", tag: "Branding", image: "/images/portfolio-1.jpg", href: "/portfolio/brand-identity" },
  { title: "E-Commerce UX", client: "ShopLocal", tag: "UI/UX", image: "/images/portfolio-2.jpg", href: "/portfolio/e-commerce-ux" },
  { title: "Lucian & Gideon's Coloring Fun", client: "lucianandgideon.com", tag: "App Design", image: "/portfolio/lucian-gideon-home.jpg", href: "/portfolio/lucian-and-gideon" },
];

const services = [
  {
    icon: Briefcase,
    title: "Design Services",
    desc: "Branding, UX design, print, and more. Studio-grade design for brands that mean business.",
    href: "/shop/services",
    color: "from-violet-500/20 to-violet-600/5",
  },
  {
    icon: Bot,
    title: "AI & Automation",
    desc: "OpenClaw setup, custom AI solutions, and consulting. Make AI work for you.",
    href: "/shop/services#ai",
    color: "from-emerald-500/20 to-emerald-600/5",
  },
  {
    icon: Cpu,
    title: "Embedded Software Development",
    desc: "Board bring-up, firmware, device drivers, and real-time systems. 20+ years of bare-metal expertise.",
    href: "/shop/services#embedded",
    color: "from-orange-500/20 to-orange-600/5",
  },
  {
    icon: Shield,
    title: "Cybersecurity & Penetration Testing",
    desc: "Vulnerability assessments, pen testing, and security hardening for your infrastructure and applications.",
    href: "/shop/services#cybersecurity",
    color: "from-red-500/20 to-red-600/5",
  },
];

const recentPosts = [
  {
    title: "What Is OpenClaw and How to Set It Up",
    date: "Mar 2026",
    tag: "AI",
    slug: "what-is-openclaw",
  },
  {
    title: "How to Add AI to Your Small Business in 2026",
    date: "Mar 2026",
    tag: "AI",
    slug: "ai-for-small-business",
  },
  {
    title: "RAG Pipelines Explained for Business Owners",
    date: "Mar 2026",
    tag: "AI",
    slug: "rag-pipelines-explained",
  },
  { title: "The Art of Embedded Board Bring-Up", date: "Mar 2026", tag: "Embedded", slug: "embedded-board-bring-up" },
  { title: "Why White Space Is the Most Underrated Design Tool", date: "Feb 2026", tag: "Design Theory", slug: "white-space-design" },
  { title: "Building a Design System from Scratch in 2026", date: "Jan 2026", tag: "Process", slug: "design-system-2026" },
];

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden px-4 sm:px-6 lg:px-8 pt-24 pb-32">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-violet-600/10 rounded-full blur-3xl" />
        </div>
        <div className="max-w-5xl mx-auto text-center">
          <span className="inline-block px-3 py-1 rounded-full bg-violet-500/10 text-violet-400 text-xs font-medium mb-6 border border-violet-500/20">
            Available for new projects
          </span>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-tight">
            Design that <br />
            <span className="text-violet-400">moves people<sup className="text-[0.35em]">™</sup></span>
          </h1>
          <p className="mt-6 text-xl text-zinc-400 max-w-2xl mx-auto">
            Studio-grade design, AI solutions, digital products, and physical goods.
            Built for brands that mean business.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/portfolio" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-zinc-900 font-semibold hover:bg-zinc-100 transition-colors">
              View My Work <ArrowRight size={16} />
            </Link>
            <Link href="/shop/services" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-zinc-800 text-zinc-100 font-medium hover:bg-zinc-700 transition-colors border border-zinc-700">
              Get a Quote
            </Link>
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-white">Selected Work</h2>
              <p className="text-zinc-500 mt-1">A few things I&apos;ve made recently.</p>
            </div>
            <Link href="/portfolio" className="text-violet-400 hover:text-violet-300 text-sm flex items-center gap-1 transition-colors">
              All projects <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredWork.map((item) => {
              const isExternal = item.href.startsWith("http");
              const Wrapper = isExternal ? "a" : Link;
              const wrapperProps = isExternal ? { href: item.href, target: "_blank", rel: "noopener noreferrer" } : { href: item.href };
              return (
                <Wrapper key={item.title} {...wrapperProps} className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 hover:border-zinc-600 transition-all">
                  {item.image && <img src={item.image} alt={item.title} className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />}
                  {!item.image && <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-900 group-hover:from-zinc-700 transition-all" />}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <span className="text-xs text-violet-400 font-medium">{item.tag}</span>
                    <h3 className="text-white font-semibold mt-1">{item.title}</h3>
                    <p className="text-zinc-500 text-sm">{item.client}</p>
                  </div>
                </Wrapper>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 py-24 bg-zinc-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white">What I Offer</h2>
            <p className="text-zinc-500 mt-2">From design to defense — four ways to work together.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((svc) => (
              <Link key={svc.title} href={svc.href} className={`group relative rounded-2xl p-8 bg-gradient-to-b ${svc.color} border border-zinc-800 hover:border-zinc-600 transition-all`}>
                <div className="w-12 h-12 rounded-xl bg-zinc-900 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <svc.icon className="text-white" size={22} />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">{svc.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{svc.desc}</p>
                <div className="mt-6 flex items-center gap-1 text-sm text-violet-400">Explore <ArrowRight size={14} /></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-white">From the Blog</h2>
              <p className="text-zinc-500 mt-1">Thoughts on design, process, and craft.</p>
            </div>
            <Link href="/blog" className="text-violet-400 hover:text-violet-300 text-sm flex items-center gap-1 transition-colors">
              All posts <ArrowRight size={14} />
            </Link>
          </div>
          <div className="divide-y divide-zinc-800">
            {recentPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group flex items-center justify-between py-6 hover:bg-zinc-900/50 -mx-4 px-4 rounded-xl transition-colors">
                <div>
                  <span className="text-xs text-violet-400 font-medium">{post.tag}</span>
                  <h3 className="text-white font-medium mt-1 group-hover:text-violet-300 transition-colors">{post.title}</h3>
                </div>
                <div className="flex items-center gap-4 text-zinc-500 text-sm shrink-0 ml-8">
                  <span>{post.date}</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-b from-violet-950/40 to-zinc-900 rounded-3xl border border-violet-900/30 p-16">
          <Pen className="mx-auto text-violet-400 mb-5" size={36} />
          <h2 className="text-4xl font-bold text-white">Have a project in mind?</h2>
          <p className="text-zinc-400 mt-4 text-lg max-w-xl mx-auto">
            Whether it&apos;s a brand identity, an AI solution, or something entirely new —
            let&apos;s figure it out together.
          </p>
          <Link href="/contact" className="inline-flex items-center gap-2 mt-8 px-8 py-3.5 rounded-full bg-violet-600 hover:bg-violet-500 text-white font-semibold transition-colors">
            Start a Conversation <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
