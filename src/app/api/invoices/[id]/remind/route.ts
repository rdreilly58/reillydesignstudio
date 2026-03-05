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

    if (invoice.status !== "OPEN") {
      return NextResponse.json(
        { error: "Can only send reminders for open invoices" },
        { status: 400 }
      );
    }

    // Send reminder via Stripe
    const stripe = getStripe();
    await stripe.invoices.sendInvoice(invoice.stripeInvoiceId);

    return NextResponse.json({ success: true, message: "Reminder sent" });
  } catch (err) {
    console.error("Send reminder error:", err);
    return NextResponse.json({ error: "Failed to send reminder" }, { status: 500 });
  }
}
