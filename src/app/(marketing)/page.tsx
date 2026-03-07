import Link from "next/link";
import { ArrowRight, Briefcase, Pen, Bot, Cpu, Shield, Quote, Headset } from "lucide-react";

const featuredWork = [
  { title: "Brand Identity", client: "Apex Co.", tag: "Branding", image: "/portfolio/apex-brand-hero.jpg", href: "/portfolio/apex-brand-identity" },
  { title: "ReillyDesignStudio.com", client: "reillydesignstudio.com", tag: "Full-Stack", image: "/portfolio/rds-homepage.jpg", href: "/portfolio/reilly-design-studio" },
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
  {
    icon: Headset,
    title: "Remote Support",
    desc: "Secure, self-hosted remote desktop support. We connect to your screen, diagnose issues, and fix things in real time.",
    href: "/support",
    color: "from-sky-500/20 to-sky-600/5",
  },
];



const testimonials = [
  {
    quote: "Bob took our vague idea and turned it into a brand system that actually works. The violet period — pure genius. We get compliments on our business cards constantly.",
    name: "Sarah Chen",
    role: "Co-Founder, Apex Co.",
    tag: "Brand Identity",
  },
  {
    quote: "We needed someone who could write firmware and understand the RF side. Bob brought up our satellite modem board in two weeks — including the DDR controller, which our previous contractor spent a month on.",
    name: "James Whitfield",
    role: "VP Engineering, Orbital Dynamics",
    tag: "Embedded Systems",
  },
  {
    quote: "The penetration test found three critical vulnerabilities our internal team missed. The report wasn't just 'here are the problems' — it was 'here's exactly how to fix them.' Worth every penny.",
    name: "Maria Santos",
    role: "CISO, DataVault Inc.",
    tag: "Cybersecurity",
  },
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
            <p className="text-zinc-500 mt-2">From design to defense — five ways to work together.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
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


      <section className="px-4 sm:px-6 lg:px-8 py-24 bg-zinc-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white">What Clients Say</h2>
            <p className="text-zinc-500 mt-2">Real feedback from real projects.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="rounded-2xl bg-zinc-950 border border-zinc-800 p-6 flex flex-col">
                <Quote className="text-violet-400/30 mb-4" size={28} />
                <p className="text-zinc-300 text-sm leading-relaxed flex-1">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-6 pt-4 border-t border-zinc-800">
                  <p className="text-white font-semibold text-sm">{t.name}</p>
                  <p className="text-zinc-500 text-xs">{t.role}</p>
                  <span className="inline-block mt-2 px-2 py-0.5 rounded-full bg-violet-500/10 text-violet-400 text-xs border border-violet-500/20">{t.tag}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>



      <section className="px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white">From the Blog</h2>
            <p className="text-zinc-500 mt-1 mb-6">Thoughts on design, process, and craft.</p>
            <div className="flex items-center justify-center gap-4">
              <Link href="/blog/featured" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-medium transition-all hover:scale-105 shadow-lg hover:shadow-violet-500/25">
                <Bot size={16} />
                Featured Posts
              </Link>
              <Link href="/blog" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-medium transition-all hover:scale-105 shadow-lg hover:shadow-zinc-500/25 border border-zinc-700">
                All Posts <ArrowRight size={16} />
              </Link>
            </div>
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
