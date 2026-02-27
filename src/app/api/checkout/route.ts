import { NextRequest, NextResponse } from "next/server";
import { getStripe, getBaseUrl } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  const { serviceName, amount, description } = await req.json();

  if (!serviceName || !amount) {
    return NextResponse.json({ error: "Missing serviceName or amount" }, { status: 400 });
  }

  const baseUrl = getBaseUrl();
  const session = await getStripe().checkout.sessions.create({
    mode: "payment",
    line_items: [{
      price_data: {
        currency: "usd",
        product_data: {
          name: serviceName,
          description: description || undefined,
        },
        unit_amount: amount,
      },
      quantity: 1,
    }],
    metadata: { serviceName },
    success_url: `${baseUrl}/shop/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}/shop/checkout/cancel`,
  });

  return NextResponse.json({ url: session.url });
}
