import { Metadata } from "next";
import Link from "next/link";
import { Package, Download, Briefcase, ArrowRight } from "lucide-react";

export const metadata: Metadata = { title: "Shop" };

const categories = [
  { icon: Package, title: "Physical Products", desc: "Art prints, merchandise, and handcrafted goods.", href: "/shop/physical", color: "from-amber-500/20 to-transparent" },
  { icon: Download, title: "Digital Downloads", desc: "Fonts, templates, mockups, and design assets.", href: "/shop/digital", color: "from-sky-500/20 to-transparent" },
  { icon: Briefcase, title: "Services", desc: "Custom branding, UX design, and creative services.", href: "/shop/services", color: "from-violet-500/20 to-transparent" },
];

export default function ShopPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold text-white mb-2">Shop</h1>
      <p className="text-zinc-500 mb-16">Three ways to work together.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {categories.map((cat) => (
          <Link key={cat.title} href={cat.href} className={`group rounded-2xl p-8 bg-gradient-to-b ${cat.color} border border-zinc-800 hover:border-zinc-600 transition-all`}>
            <div className="w-12 h-12 rounded-xl bg-zinc-900 flex items-center justify-center mb-5">
              <cat.icon className="text-white" size={22} />
            </div>
            <h2 className="text-xl font-semibold text-white mb-2">{cat.title}</h2>
            <p className="text-zinc-400 text-sm">{cat.desc}</p>
            <div className="mt-6 flex items-center gap-1 text-sm text-violet-400">Browse <ArrowRight size={14} /></div>
          </Link>
        ))}
      </div>
    </div>
  );
}
