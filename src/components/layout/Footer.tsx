import Link from "next/link";

const footerLinks = {
  Work: [
    { href: "/portfolio", label: "Portfolio" },
    { href: "/blog", label: "Blog" },
  ],
  Shop: [
    { href: "/shop/physical", label: "Physical Products" },
    { href: "/shop/digital", label: "Digital Downloads" },
    { href: "/shop/services", label: "Services" },
  ],
  Company: [
    { href: "/contact", label: "Contact" },
    { href: "/dashboard", label: "My Account" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="text-white font-semibold text-lg tracking-tight">
              Reilly<span className="text-violet-400">Design</span>Studio
            </Link>
            <p className="mt-3 text-zinc-500 text-sm leading-relaxed">
              Design That Moves People<sup style={{fontSize: "0.6em"}}>™</sup>. Built for brands that mean business.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h4 className="text-white text-sm font-medium mb-3">{group}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-zinc-500 hover:text-zinc-300 text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-zinc-600 text-sm">
            © {new Date().getFullYear()} Reilly Design Studio<sup style={{fontSize: "0.6em"}}>™</sup>. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-zinc-600 hover:text-zinc-400 text-sm transition-colors">Privacy</Link>
            <Link href="/terms" className="text-zinc-600 hover:text-zinc-400 text-sm transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
