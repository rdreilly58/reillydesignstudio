import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";

export async function GET() {
  const invoices = await getStripe().invoices.list({ limit: 50 });
  const data = invoices.data.map((inv) => ({
    id: inv.id,
    number: inv.number,
    status: inv.status,
    total: inv.total,
    currency: inv.currency,
    customerEmail: inv.customer_email,
    customerName: inv.customer_name,
    pdfUrl: inv.invoice_pdf,
    hostedUrl: inv.hosted_invoice_url,
    createdAt: new Date(inv.created * 1000).toISOString(),
    dueDate: inv.due_date ? new Date(inv.due_date * 1000).toISOString() : null,
  }));
  return NextResponse.json(data);
}
