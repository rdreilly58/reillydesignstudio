"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

const adminLinks = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/orders", label: "Orders" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/quotes", label: "Quotes" },
  { href: "/admin/blog", label: "Blog" },
  { href: "/admin/invoices", label: "Invoices" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();

  return (
    <div className="flex min-h-screen">
      <aside className="w-56 bg-zinc-900 border-r border-zinc-800 pt-8 px-4 flex flex-col">
        <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider px-3 mb-4">Admin</p>
        <nav className="space-y-1 flex-1">
          {adminLinks.map((link) => (
            <Link key={link.href} href={link.href} className="block px-3 py-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 text-sm transition-colors">{link.label}</Link>
          ))}
        </nav>
        {session?.user && (
          <div className="border-t border-zinc-800 pt-4 pb-4">
            <p className="text-xs text-zinc-500 px-3 truncate">{session.user.email}</p>
            <button onClick={() => signOut({ callbackUrl: "/" })} className="mt-2 w-full px-3 py-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 text-sm text-left transition-colors">
              Sign Out
            </button>
          </div>
        )}
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
