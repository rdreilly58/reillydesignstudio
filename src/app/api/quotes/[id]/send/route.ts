import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getStripe, getBaseUrl } from "@/lib/stripe";

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const quote = await prisma.quote.findUnique({ where: { id } });

  if (!quote) return NextResponse.json({ error: "Quote not found" }, { status: 404 });
  if (!quote.quotedPrice) return NextResponse.json({ error: "Set a price first" }, { status: 400 });

  // Find or create Stripe customer
  let customerId = quote.stripeCustomerId;
  if (!customerId) {
    const customer = await getStripe().customers.create({
      email: quote.email,
      name: quote.name,
      metadata: { quoteId: quote.id, company: quote.company || "" },
    });
    customerId = customer.id;
  }

  const baseUrl = getBaseUrl();
  const session = await getStripe().checkout.sessions.create({
    customer: customerId,
    mode: "payment",
    line_items: [{
      price_data: {
        currency: "usd",
        product_data: {
          name: `${quote.service} — Quote #${quote.id.slice(-8)}`,
          description: quote.description.slice(0, 200),
        },
        unit_amount: quote.quotedPrice,
      },
      quantity: 1,
    }],
    metadata: { quoteId: quote.id },
    success_url: `${baseUrl}/shop/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}/shop/checkout/cancel`,
  });

  await prisma.quote.update({
    where: { id },
    data: {
      status: "SENT",
      stripeCustomerId: customerId,
      stripeSessionId: session.id,
      stripePaymentLink: session.url,
    },
  });

  return NextResponse.json({ url: session.url, sessionId: session.id });
}
