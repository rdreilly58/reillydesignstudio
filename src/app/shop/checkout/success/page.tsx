import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Payment Successful" };

export default function CheckoutSuccessPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center">
      <div className="text-5xl mb-6">🎉</div>
      <h1 className="text-3xl font-bold text-white mb-4">Payment Successful!</h1>
      <p className="text-zinc-400 mb-8">
        Thank you for your purchase. You&apos;ll receive a confirmation email shortly.
        I&apos;ll be in touch to get started on your project.
      </p>
      <div className="flex justify-center gap-4">
        <Link href="/shop/services" className="px-6 py-3 rounded-full bg-violet-600 hover:bg-violet-500 text-white font-semibold text-sm transition-colors">
          Back to Services
        </Link>
        <Link href="/" className="px-6 py-3 rounded-full bg-zinc-800 hover:bg-zinc-700 text-white font-semibold text-sm transition-colors">
          Home
        </Link>
      </div>
    </div>
  );
}
