import { Metadata } from "next";
export const metadata: Metadata = { title: "Admin · products" };
export default function AdminproductsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">products</h1>
      <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-8 text-center text-zinc-500 text-sm">No data yet.</div>
    </div>
  );
}
