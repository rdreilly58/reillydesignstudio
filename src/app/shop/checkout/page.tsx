import { Metadata } from "next";

export const metadata: Metadata = { title: "Checkout" };

export default function CheckoutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-bold text-white mb-8">Checkout</h1>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3 space-y-6">
          <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Contact</h2>
            <input type="email" placeholder="Email address" className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-700 text-white placeholder-zinc-600 focus:outline-none focus:border-violet-500 text-sm" />
          </div>
          <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Shipping Address</h2>
            <div className="grid grid-cols-2 gap-4">
              {["First name","Last name","Address","Apt/Suite","City","State","ZIP","Country"].map((f) => (
                <input key={f} type="text" placeholder={f} className={`px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-700 text-white placeholder-zinc-600 focus:outline-none focus:border-violet-500 text-sm ${f === "Address" || f === "Country" ? "col-span-2" : ""}`} />
              ))}
            </div>
          </div>
        </div>
        <div className="lg:col-span-2">
          <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-6 sticky top-24">
            <h2 className="text-lg font-semibold text-white mb-4">Order Summary</h2>
            <div className="space-y-3 text-sm text-zinc-400">
              <div className="flex justify-between"><span>Subtotal</span><span>$0.00</span></div>
              <div className="flex justify-between"><span>Shipping</span><span>$0.00</span></div>
              <div className="border-t border-zinc-800 pt-3 flex justify-between text-white font-semibold"><span>Total</span><span>$0.00</span></div>
            </div>
            <button className="mt-6 w-full py-3.5 rounded-full bg-violet-600 hover:bg-violet-500 text-white font-semibold transition-colors">Pay with Stripe</button>
          </div>
        </div>
      </div>
    </div>
  );
}
