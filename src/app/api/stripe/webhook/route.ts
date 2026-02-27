import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature")!;

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    return NextResponse.json({ error: "Webhook signature verification failed" }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const quoteId = session.metadata?.quoteId;
      const serviceName = session.metadata?.serviceName;

      // Create order
      const order = await prisma.order.create({
        data: {
          email: session.customer_details?.email || session.customer_email || undefined,
          status: "PAID",
          total: session.amount_total || 0,
          stripePaymentId: session.payment_intent as string,
        },
      });

      // If this was a quote payment, update the quote
      if (quoteId) {
        await prisma.quote.update({
          where: { id: quoteId },
          data: { status: "ACCEPTED" },
        });
      }

      console.log(`[webhook] Order ${order.id} created. Quote: ${quoteId || "none"}, Service: ${serviceName || "none"}`);
      break;
    }

    case "payment_intent.succeeded": {
      const pi = event.data.object as Stripe.PaymentIntent;
      await prisma.order.updateMany({
        where: { stripePaymentId: pi.id },
        data: { status: "PAID" },
      });
      break;
    }

    case "payment_intent.payment_failed": {
      const pi = event.data.object as Stripe.PaymentIntent;
      await prisma.order.updateMany({
        where: { stripePaymentId: pi.id },
        data: { status: "CANCELLED" },
      });
      break;
    }

    case "invoice.paid": {
      const invoice = event.data.object as Stripe.Invoice;
      console.log(`[webhook] Invoice ${invoice.id} paid: $${(invoice.amount_paid / 100).toFixed(2)}`);
      break;
    }
  }

  return NextResponse.json({ received: true });
}
