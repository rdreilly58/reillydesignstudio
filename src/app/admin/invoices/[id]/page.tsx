import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatPrice, formatDate } from "@/lib/utils";
import { InvoiceActions } from "./invoice-actions";

export const metadata: Metadata = { title: "Admin · Invoice Details" };

interface LineItem {
  description: string;
  amount: number;
  quantity: number;
}

const statusColors: Record<string, string> = {
  DRAFT: "bg-zinc-600",
  OPEN: "bg-amber-600",
  PAID: "bg-green-600",
  VOID: "bg-red-600",
  UNCOLLECTABLE: "bg-red-800",
};

export default async function InvoiceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const invoice = await prisma.invoice.findUnique({ where: { id } });

  if (!invoice) {
    notFound();
  }

  const lineItems = invoice.lineItems as unknown as LineItem[];

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Link
          href="/admin/invoices"
          className="text-zinc-400 hover:text-white transition-colors"
        >
          &larr; Back
        </Link>
        <h1 className="text-2xl font-bold text-white">Invoice Details</h1>
        <span
          className={`px-3 py-1 rounded text-sm font-medium text-white ${statusColors[invoice.status]}`}
        >
          {invoice.status}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Customer Info */}
          <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Customer</h2>
            <div className="space-y-2">
              <p className="text-white">{invoice.customerName}</p>
              <p className="text-zinc-400 text-sm">{invoice.customerEmail}</p>
            </div>
          </div>

          {/* Line Items */}
          <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Line Items</h2>
            <table className="w-full">
              <thead>
                <tr className="border-b border-zinc-800 text-left text-xs text-zinc-500 uppercase tracking-wider">
                  <th className="pb-3">Description</th>
                  <th className="pb-3 text-right">Qty</th>
                  <th className="pb-3 text-right">Unit Price</th>
                  <th className="pb-3 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {lineItems.map((item, index) => (
                  <tr key={index}>
                    <td className="py-3 text-white text-sm">{item.description}</td>
                    <td className="py-3 text-zinc-400 text-sm text-right">{item.quantity}</td>
                    <td className="py-3 text-zinc-400 text-sm text-right">
                      {formatPrice(item.amount)}
                    </td>
                    <td className="py-3 text-white text-sm text-right">
                      {formatPrice(item.amount * item.quantity)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t border-zinc-700">
                  <td colSpan={3} className="py-3 text-white font-semibold text-right">
                    Total
                  </td>
                  <td className="py-3 text-white font-semibold text-right">
                    {formatPrice(invoice.amount)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Invoice Details */}
          <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Details</h2>
            <dl className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <dt className="text-zinc-500">Invoice ID</dt>
                <dd className="text-white font-mono text-xs mt-1">{invoice.id}</dd>
              </div>
              <div>
                <dt className="text-zinc-500">Stripe Invoice ID</dt>
                <dd className="text-white font-mono text-xs mt-1">{invoice.stripeInvoiceId}</dd>
              </div>
              <div>
                <dt className="text-zinc-500">Created</dt>
                <dd className="text-white mt-1">{formatDate(invoice.createdAt)}</dd>
              </div>
              <div>
                <dt className="text-zinc-500">Due Date</dt>
                <dd className="text-white mt-1">
                  {invoice.dueDate ? formatDate(invoice.dueDate) : "—"}
                </dd>
              </div>
              {invoice.paidAt && (
                <div>
                  <dt className="text-zinc-500">Paid On</dt>
                  <dd className="text-green-400 mt-1">{formatDate(invoice.paidAt)}</dd>
                </div>
              )}
              {invoice.description && (
                <div className="col-span-2">
                  <dt className="text-zinc-500">Memo</dt>
                  <dd className="text-zinc-300 mt-1">{invoice.description}</dd>
                </div>
              )}
            </dl>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* QR Code */}
          <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-6">
            <h2 className="text-lg font-semibold text-white mb-4">QR Code</h2>
            {invoice.qrCodeUrl ? (
              <div className="space-y-4">
                <div className="bg-white rounded-xl p-4 flex items-center justify-center">
                  <img
                    src={invoice.qrCodeUrl}
                    alt="Payment QR Code"
                    className="w-48 h-48"
                  />
                </div>
                <a
                  href={invoice.qrCodeUrl}
                  download={`invoice-${invoice.id}-qr.png`}
                  className="block w-full text-center px-4 py-2 rounded-lg bg-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-700 text-sm transition-colors"
                >
                  Download QR Code
                </a>
              </div>
            ) : (
              <p className="text-zinc-500 text-sm">No QR code available</p>
            )}
          </div>

          {/* Actions */}
          <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Actions</h2>
            <InvoiceActions
              invoiceId={invoice.id}
              status={invoice.status}
              stripeHostedUrl={invoice.stripeHostedUrl}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
