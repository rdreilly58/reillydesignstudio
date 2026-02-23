import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Cart" };

export default function CartPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-bold text-white mb-8">Your Cart</h1>
      <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-8 text-center">
        <p className="text-zinc-500 mb-6">Your cart is empty.</p>
        <Link href="/shop" className="inline-block px-6 py-2.5 rounded-full bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium transition-colors">Browse Shop</Link>
      </div>
    </div>
  );
}
