import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    hasDbUrl: !!process.env.DATABASE_URL,
    hasNextAuthSecret: !!process.env.NEXTAUTH_SECRET,
    hasGoogleClientId: !!process.env.GOOGLE_CLIENT_ID,
    hasGoogleClientSecret: !!process.env.GOOGLE_CLIENT_SECRET,
    hasStripeKey: !!process.env.STRIPE_SECRET_KEY,
    nextAuthUrl: process.env.NEXTAUTH_URL,
    googleClientIdPrefix: process.env.GOOGLE_CLIENT_ID?.slice(0, 10) || "MISSING",
  });
}
