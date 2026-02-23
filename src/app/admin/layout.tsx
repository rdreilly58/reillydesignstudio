import Link from "next/link";

const adminLinks = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/orders", label: "Orders" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/quotes", label: "Quotes" },
  { href: "/admin/blog", label: "Blog" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-56 bg-zinc-900 border-r border-zinc-800 pt-8 px-4">
        <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider px-3 mb-4">Admin</p>
        <nav className="space-y-1">
          {adminLinks.map((link) => (
            <Link key={link.href} href={link.href} className="block px-3 py-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 text-sm transition-colors">{link.label}</Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
