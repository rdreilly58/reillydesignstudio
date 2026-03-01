import Link from "next/link";
import { ArrowRight, Shield, Target, Search, FileText, Terminal, Lock, AlertTriangle, CheckCircle, ExternalLink } from "lucide-react";

const services = [
  {
    icon: Target,
    title: "Penetration Testing",
    price: "From $3,000",
    duration: "1–3 weeks",
    desc: "We attack your systems so the real attackers can't. Full-scope offensive testing across your network, web applications, and cloud infrastructure.",
    features: [
      "External & internal network penetration testing",
      "Web application security testing (OWASP Top 10)",
      "Cloud infrastructure review (AWS, Azure, GCP)",
      "Wireless network assessment",
      "Social engineering & phishing simulations",
      "Detailed findings report with severity ratings",
    ],
  },
  {
    icon: Search,
    title: "Security Audit",
    price: "From $2,000",
    duration: "1–2 weeks",
    desc: "A thorough examination of your security posture — from firewall rules to password policies to that S3 bucket someone left open.",
    features: [
      "Network architecture & configuration review",
      "Access control and privilege analysis",
      "Patch management & vulnerability scanning",
      "Security policy and compliance review",
      "Cloud security posture assessment",
      "Executive summary + technical remediation plan",
    ],
  },
  {
    icon: AlertTriangle,
    title: "Red Team Assessment",
    price: "From $5,000",
    duration: "2–4 weeks",
    desc: "Think of it as a fire drill for your security team. We simulate real-world adversary tactics, techniques, and procedures (TTPs) to stress-test your defenses.",
    features: [
      "MITRE ATT&CK-aligned attack scenarios",
      "Persistence, lateral movement, and data exfiltration",
      "Physical security testing (optional)",
      "Blue team detection & response evaluation",
      "Command & control (C2) infrastructure deployment",
      "Debrief and purple team improvement plan",
    ],
  },
];

const methodology = [
  { step: "01", title: "Reconnaissance", desc: "We map your attack surface — open ports, services, subdomains, exposed credentials, and everything the internet knows about you.", icon: Search },
  { step: "02", title: "Enumeration & Scanning", desc: "Deep port scanning, service fingerprinting, and vulnerability identification using industry-standard tools including custom Nmap builds.", icon: Terminal },
  { step: "03", title: "Exploitation", desc: "Controlled exploitation of discovered vulnerabilities to demonstrate real-world impact. We prove the risk — not just flag it.", icon: Target },
  { step: "04", title: "Reporting & Remediation", desc: "Detailed report with every finding, proof of exploitation, severity rating, and specific fix. We don't just tell you what's broken — we tell you how to fix it.", icon: FileText },
];

const tools = [
  { name: "Nmap", desc: "Network discovery & port scanning — including custom static builds for embedded and air-gapped environments", highlight: true },
  { name: "Burp Suite", desc: "Web application security testing & interception proxy", highlight: false },
  { name: "Metasploit", desc: "Exploitation framework for validation and proof-of-concept", highlight: false },
  { name: "Wireshark", desc: "Network protocol analysis and traffic inspection", highlight: false },
  { name: "BloodHound", desc: "Active Directory attack path mapping", highlight: false },
  { name: "Nuclei", desc: "Fast, template-based vulnerability scanning", highlight: false },
  { name: "ffuf / Gobuster", desc: "Web content discovery and fuzzing", highlight: false },
  { name: "Custom Scripts", desc: "Purpose-built tools for your specific environment", highlight: false },
];

const whyUs = [
  { icon: Terminal, title: "Hands-On Operator", desc: "Not a scan-and-report shop. We do real manual testing with real tools — the same ones adversaries use." },
  { icon: Lock, title: "Clearance-Level Discretion", desc: "Background in defense and government contracting. Your data and findings stay confidential. Period." },
  { icon: CheckCircle, title: "Actionable Results", desc: "Every finding comes with a specific remediation. No 200-page PDFs full of scanner output — just clear priorities and fixes." },
  { icon: Shield, title: "Open Source Contributor", desc: "We maintain and publish open-source security tools. We don't just use the tools — we build them." },
];

export default function CybersecurityPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Hero */}
      <div className="text-center mb-20">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 text-red-400 text-xs font-medium mb-6 border border-red-500/20">
          <Shield size={12} /> Cybersecurity Services
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Break It Before They Do</h1>
        <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
          Offensive security testing and vulnerability assessment. We find the gaps
          in your defenses and show you exactly how to close them.
        </p>
      </div>

      {/* Service Cards */}
      <div className="space-y-8 mb-24">
        {services.map((svc) => (
          <div key={svc.title} className="rounded-2xl bg-zinc-900 border border-zinc-800 p-8 hover:border-red-900/50 transition-all">
            <div className="flex flex-col sm:flex-row sm:items-start gap-6">
              <div className="w-14 h-14 rounded-2xl bg-red-500/10 flex items-center justify-center shrink-0">
                <svc.icon className="text-red-400" size={26} />
              </div>
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                  <h2 className="text-2xl font-bold text-white">{svc.title}</h2>
                  <div className="flex items-center gap-3">
                    <span className="text-red-400 font-semibold">{svc.price}</span>
                    <span className="text-zinc-600 text-sm">· {svc.duration}</span>
                  </div>
                </div>
                <p className="text-zinc-400 mb-5">{svc.desc}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {svc.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-2">
                      <span className="text-red-400 mt-0.5">✓</span>
                      <span className="text-zinc-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Methodology */}
      <div className="mb-24">
        <h2 className="text-3xl font-bold text-white text-center mb-4">Our Methodology</h2>
        <p className="text-zinc-400 text-center max-w-xl mx-auto mb-12">
          Structured, repeatable, and thorough. Every engagement follows a proven process.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {methodology.map((step) => (
            <div key={step.step} className="rounded-2xl bg-zinc-900/50 border border-zinc-800 p-6 relative">
              <span className="absolute top-4 right-4 text-4xl font-bold text-zinc-800">{step.step}</span>
              <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center mb-4">
                <step.icon className="text-red-400" size={20} />
              </div>
              <h3 className="text-white font-semibold mb-2">{step.title}</h3>
              <p className="text-zinc-400 text-sm">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tooling */}
      <div className="mb-24">
        <h2 className="text-3xl font-bold text-white text-center mb-4">Tools of the Trade</h2>
        <p className="text-zinc-400 text-center max-w-xl mx-auto mb-12">
          Industry-standard offensive security tools — plus custom builds for specialized environments.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {tools.map((tool) => (
            <div key={tool.name} className={`rounded-xl border p-4 ${tool.highlight ? "bg-red-950/30 border-red-900/40" : "bg-zinc-900/50 border-zinc-800"}`}>
              <div className="flex items-center gap-2 mb-1">
                <Terminal className={tool.highlight ? "text-red-400" : "text-zinc-500"} size={14} />
                <h4 className="text-white font-semibold text-sm">{tool.name}</h4>
                {tool.highlight && (
                  <a href="https://github.com/rdreilly58/nmap-static-binaries" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-red-400 hover:text-red-300 text-xs ml-auto">
                    View on GitHub <ExternalLink size={10} />
                  </a>
                )}
              </div>
              <p className="text-zinc-400 text-xs">{tool.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* NMAP Static Binaries Showcase */}
      <div className="mb-24 rounded-2xl bg-gradient-to-b from-red-950/30 to-zinc-900 border border-red-900/30 p-8">
        <div className="flex flex-col sm:flex-row gap-6 items-start">
          <div className="w-14 h-14 rounded-2xl bg-red-500/10 flex items-center justify-center shrink-0">
            <Terminal className="text-red-400" size={26} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white mb-2">Open Source: Nmap Static Binaries</h3>
            <p className="text-zinc-400 mb-4">
              We maintain a public repository of statically-compiled Nmap binaries for environments where
              you can&apos;t install packages — air-gapped networks, embedded systems, minimal containers,
              and locked-down servers. Drop a single binary, scan, and go. No dependencies, no package managers,
              no excuses.
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {["Linux x86_64", "Linux ARM", "Alpine / musl", "Minimal containers"].map((tag) => (
                <span key={tag} className="px-2.5 py-1 rounded-full bg-zinc-800 text-zinc-300 text-xs border border-zinc-700">{tag}</span>
              ))}
            </div>
            <a href="https://github.com/rdreilly58/nmap-static-binaries" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-red-400 hover:text-red-300 text-sm font-medium transition-colors">
              github.com/rdreilly58/nmap-static-binaries <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </div>

      {/* Why Us */}
      <div className="mb-24">
        <h2 className="text-3xl font-bold text-white text-center mb-12">Why Work With Us</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {whyUs.map((item) => (
            <div key={item.title} className="rounded-2xl bg-zinc-900/50 border border-zinc-800 p-6">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center mb-4">
                <item.icon className="text-red-400" size={20} />
              </div>
              <h3 className="text-white font-semibold mb-2">{item.title}</h3>
              <p className="text-zinc-400 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="rounded-2xl bg-gradient-to-b from-red-950/40 to-zinc-900 border border-red-900/30 p-12 text-center">
        <h2 className="text-3xl font-bold text-white mb-3">Ready to test your defenses?</h2>
        <p className="text-zinc-400 max-w-lg mx-auto mb-8">
          Every engagement starts with a scoping call. We&apos;ll understand your environment,
          define rules of engagement, and deliver results you can act on.
        </p>
        <Link href="/shop/services" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-red-600 hover:bg-red-500 text-white font-semibold transition-colors">
          Request a Quote <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
