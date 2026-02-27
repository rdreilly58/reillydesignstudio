import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const invoice = await getStripe().invoices.retrieve(id);
    return NextResponse.json({
      id: invoice.id,
      number: invoice.number,
      status: invoice.status,
      total: invoice.total,
      currency: invoice.currency,
      customerEmail: invoice.customer_email,
      customerName: invoice.customer_name,
      pdfUrl: invoice.invoice_pdf,
      hostedUrl: invoice.hosted_invoice_url,
      lines: invoice.lines.data.map((line) => ({
        description: line.description,
        amount: line.amount,
        quantity: line.quantity,
      })),
      createdAt: new Date(invoice.created * 1000).toISOString(),
      dueDate: invoice.due_date ? new Date(invoice.due_date * 1000).toISOString() : null,
    });
  } catch {
    return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
  }
}
