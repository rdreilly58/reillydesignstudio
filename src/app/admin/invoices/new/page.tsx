import { Metadata } from "next";
import Link from "next/link";
import { InvoiceForm } from "./invoice-form";

export const metadata: Metadata = { title: "Admin · Create Invoice" };

export default function NewInvoicePage() {
  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Link
          href="/admin/invoices"
          className="text-zinc-400 hover:text-white transition-colors"
        >
          &larr; Back
        </Link>
        <h1 className="text-2xl font-bold text-white">Create Invoice</h1>
      </div>

      <div className="max-w-2xl">
        <InvoiceForm />
      </div>
    </div>
  );
}
