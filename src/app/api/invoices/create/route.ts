import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  const { email, name, items, daysUntilDue = 30 } = await req.json();

  if (!email || !items?.length) {
    return NextResponse.json({ error: "Missing email or items" }, { status: 400 });
  }

  // Find or create customer
  const existing = await getStripe().customers.list({ email, limit: 1 });
  let customer = existing.data[0];
  if (!customer) {
    customer = await getStripe().customers.create({ email, name: name || undefined });
  }

  // Create invoice
  const invoice = await getStripe().invoices.create({
    customer: customer.id,
    collection_method: "send_invoice",
    days_until_due: daysUntilDue,
  });

  // Add line items
  for (const item of items) {
    await getStripe().invoiceItems.create({
      customer: customer.id,
      invoice: invoice.id,
      description: item.description,
      amount: item.amount, // in cents
      currency: "usd",
    });
  }

  // Finalize and send
  const finalized = await getStripe().invoices.finalizeInvoice(invoice.id);
  await getStripe().invoices.sendInvoice(invoice.id);

  return NextResponse.json({
    id: finalized.id,
    number: finalized.number,
    hostedUrl: finalized.hosted_invoice_url,
    pdfUrl: finalized.invoice_pdf,
  });
}
