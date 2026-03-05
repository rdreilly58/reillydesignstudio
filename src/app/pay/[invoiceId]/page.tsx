import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatPrice, formatDate } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ invoiceId: string }>;
}): Promise<Metadata> {
  const { invoiceId } = await params;

  // Try to find by local ID first, then by Stripe invoice ID
  let invoice = await prisma.invoice.findUnique({ where: { id: invoiceId } });
  if (!invoice) {
    invoice = await prisma.invoice.findUnique({ where: { stripeInvoiceId: invoiceId } });
  }

  if (!invoice) {
    return { title: "Invoice Not Found" };
  }

  return {
    title: `Invoice - ${formatPrice(invoice.amount)} | Reilly Design Studio`,
    description: `Pay your invoice of ${formatPrice(invoice.amount)}`,
  };
}

interface LineItem {
  description: string;
  amount: number;
  quantity: number;
}

export default async function PaymentPage({
  params,
}: {
  params: Promise<{ invoiceId: string }>;
}) {
  const { invoiceId } = await params;

  // Try to find by local ID first, then by Stripe invoice ID
  let invoice = await prisma.invoice.findUnique({ where: { id: invoiceId } });
  if (!invoice) {
    invoice = await prisma.invoice.findUnique({ where: { stripeInvoiceId: invoiceId } });
  }

  if (!invoice) {
    notFound();
  }

  // If the invoice is open and has a Stripe hosted URL, redirect to it
  if (invoice.status === "OPEN" && invoice.stripeHostedUrl) {
    redirect(invoice.stripeHostedUrl);
  }

  const lineItems = invoice.lineItems as unknown as LineItem[];

  // Show status-specific content
  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <div className="rounded-2xl bg-zinc-900 border border-zinc-800 overflow-hidden">
          {/* Header */}
          <div className="p-6 border-b border-zinc-800">
            <h1 className="text-xl font-bold text-white">Invoice</h1>
            <p className="text-zinc-400 text-sm mt-1">From Reilly Design Studio</p>
          </div>

          {/* Status Banner */}
          {invoice.status === "PAID" && (
            <div className="bg-green-900/30 border-b border-green-800/50 px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-green-400 font-semibold">Payment Complete</p>
                  <p className="text-green-400/70 text-sm">
                    Paid on {invoice.paidAt ? formatDate(invoice.paidAt) : "—"}
                  </p>
                </div>
              </div>
            </div>
          )}

          {invoice.status === "VOID" && (
            <div className="bg-red-900/30 border-b border-red-800/50 px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-red-400 font-semibold">Invoice Voided</p>
                  <p className="text-red-400/70 text-sm">This invoice has been cancelled</p>
                </div>
              </div>
            </div>
          )}

          {invoice.status === "UNCOLLECTABLE" && (
            <div className="bg-red-900/30 border-b border-red-800/50 px-6 py-4">
              <p className="text-red-400 font-semibold">Invoice Uncollectable</p>
              <p className="text-red-400/70 text-sm">Please contact us for assistance</p>
            </div>
          )}

          {/* Customer Info */}
          <div className="p-6 border-b border-zinc-800">
            <p className="text-zinc-500 text-xs uppercase tracking-wider mb-2">Bill To</p>
            <p className="text-white">{invoice.customerName}</p>
            <p className="text-zinc-400 text-sm">{invoice.customerEmail}</p>
          </div>

          {/* Line Items */}
          <div className="p-6 border-b border-zinc-800">
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs text-zinc-500 uppercase tracking-wider">
                  <th className="pb-3">Description</th>
                  <th className="pb-3 text-right">Qty</th>
                  <th className="pb-3 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {lineItems.map((item, index) => (
                  <tr key={index}>
                    <td className="py-3 text-white text-sm">{item.description}</td>
                    <td className="py-3 text-zinc-400 text-sm text-right">{item.quantity}</td>
                    <td className="py-3 text-white text-sm text-right">
                      {formatPrice(item.amount * item.quantity)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Total */}
          <div className="p-6 border-b border-zinc-800 bg-zinc-800/30">
            <div className="flex justify-between items-center">
              <span className="text-zinc-400">Total</span>
              <span className="text-2xl font-bold text-white">{formatPrice(invoice.amount)}</span>
            </div>
            {invoice.dueDate && invoice.status === "OPEN" && (
              <p className="text-zinc-500 text-sm mt-2">
                Due by {formatDate(invoice.dueDate)}
              </p>
            )}
          </div>

          {/* Memo */}
          {invoice.description && (
            <div className="p-6 border-b border-zinc-800">
              <p className="text-zinc-500 text-xs uppercase tracking-wider mb-2">Notes</p>
              <p className="text-zinc-300 text-sm">{invoice.description}</p>
            </div>
          )}

          {/* Footer */}
          <div className="p-6 text-center">
            {invoice.status === "PAID" && (
              <p className="text-zinc-500 text-sm">
                Thank you for your payment! A receipt has been sent to your email.
              </p>
            )}
            {invoice.status === "OPEN" && !invoice.stripeHostedUrl && (
              <p className="text-zinc-500 text-sm">
                Please contact us to complete payment.
              </p>
            )}
            {(invoice.status === "VOID" || invoice.status === "UNCOLLECTABLE") && (
              <p className="text-zinc-500 text-sm">
                If you have questions, please contact us.
              </p>
            )}
          </div>
        </div>

        {/* Branding */}
        <p className="text-center text-zinc-600 text-xs mt-6">
          Powered by Reilly Design Studio
        </p>
      </div>
    </div>
  );
}
