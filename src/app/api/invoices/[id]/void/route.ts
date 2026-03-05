import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import Stripe from "stripe";

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2026-01-28.clover" });
}

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    // Find the invoice
    let invoice = await prisma.invoice.findUnique({ where: { id } });

    if (!invoice) {
      invoice = await prisma.invoice.findUnique({ where: { stripeInvoiceId: id } });
    }

    if (!invoice) {
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }

    if (invoice.status === "PAID") {
      return NextResponse.json({ error: "Cannot void a paid invoice" }, { status: 400 });
    }

    if (invoice.status === "VOID") {
      return NextResponse.json({ error: "Invoice is already voided" }, { status: 400 });
    }

    // Void the invoice in Stripe
    const stripe = getStripe();
    await stripe.invoices.voidInvoice(invoice.stripeInvoiceId);

    // Update local database
    const updatedInvoice = await prisma.invoice.update({
      where: { id: invoice.id },
      data: { status: "VOID" },
    });

    return NextResponse.json({ success: true, invoice: updatedInvoice });
  } catch (err) {
    console.error("Void invoice error:", err);
    return NextResponse.json({ error: "Failed to void invoice" }, { status: 500 });
  }
}
