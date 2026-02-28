"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ShoppingBag } from "lucide-react";

const navLinks = [
  { href: "/portfolio", label: "Work" },
  { href: "/shop", label: "Shop" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="text-white font-semibold text-lg tracking-tight">
          Reilly<span className="text-violet-400">Design</span>Studio<sup className="text-[0.5em] text-violet-400/60 ml-0.5">™</sup>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-zinc-400 hover:text-white text-sm transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Link href="/shop/cart" className="relative text-zinc-400 hover:text-white transition-colors">
            <ShoppingBag size={20} />
          </Link>
          <Link
            href="/shop/services"
            className="hidden md:inline-flex items-center px-4 py-2 rounded-full bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium transition-colors"
          >
            Get a Quote
          </Link>
          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-zinc-400 hover:text-white"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-zinc-950 border-t border-zinc-800 px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block text-zinc-300 hover:text-white py-2 text-sm"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/shop/services"
            onClick={() => setOpen(false)}
            className="block w-full text-center px-4 py-2 rounded-full bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium transition-colors mt-2"
          >
            Get a Quote
          </Link>
        </div>
      )}
    </header>
  );
}
