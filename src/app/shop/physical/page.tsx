import { Metadata } from "next";

export const metadata: Metadata = { title: "Physical Products" };

export default function PhysicalShopPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold text-white mb-2">Physical Products</h1>
      <p className="text-zinc-500 mb-12">Art prints, merch, and handcrafted goods shipped to your door.</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[1,2,3,4].map((i) => (
          <div key={i} className="rounded-2xl bg-zinc-900 border border-zinc-800 overflow-hidden">
            <div className="aspect-square bg-zinc-800" />
            <div className="p-4">
              <h3 className="text-white font-medium text-sm">Product {i}</h3>
              <p className="text-zinc-400 text-sm mt-1">$29.00</p>
              <button className="mt-3 w-full py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-medium transition-colors">Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
