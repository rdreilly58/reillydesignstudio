import { Metadata } from "next";
import { Download } from "lucide-react";

export const metadata: Metadata = { title: "Digital Downloads" };

export default function DigitalShopPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold text-white mb-2">Digital Downloads</h1>
      <p className="text-zinc-500 mb-12">Fonts, templates, mockups — instant delivery after purchase.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {["Icon Pack", "Brand Kit Template", "Mockup Bundle"].map((name) => (
          <div key={name} className="rounded-2xl bg-zinc-900 border border-zinc-800 p-6">
            <div className="w-12 h-12 rounded-xl bg-sky-500/10 flex items-center justify-center mb-4">
              <Download className="text-sky-400" size={20} />
            </div>
            <h3 className="text-white font-semibold mb-1">{name}</h3>
            <p className="text-zinc-500 text-sm mb-4">Instant download · ZIP format</p>
            <div className="flex items-center justify-between">
              <span className="text-white font-medium">$19.00</span>
              <button className="px-4 py-2 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-medium transition-colors">Buy Now</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
