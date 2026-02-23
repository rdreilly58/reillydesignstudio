import { Metadata } from "next";

export const metadata: Metadata = { title: "Dashboard" };

export default function DashboardPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-bold text-white mb-2">My Account</h1>
      <p className="text-zinc-500 mb-10">Manage your orders, downloads, and service requests.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {[["Orders", "0"], ["Downloads", "0"], ["Quotes", "0"]].map(([label, val]) => (
          <div key={label} className="rounded-2xl bg-zinc-900 border border-zinc-800 p-6">
            <p className="text-zinc-500 text-sm">{label}</p>
            <p className="text-3xl font-bold text-white mt-1">{val}</p>
          </div>
        ))}
      </div>
      <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-8 text-center">
        <p className="text-zinc-500">No activity yet.</p>
      </div>
    </div>
  );
}
