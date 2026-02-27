import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const quoteSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  company: z.string().optional(),
  service: z.string().min(1),
  description: z.string().min(10),
  budget: z.string().optional(),
  timeline: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = quoteSchema.parse(body);
    const quote = await prisma.quote.create({ data });
    return NextResponse.json({ success: true, id: quote.id }, { status: 201 });
  } catch (err: any) {
    console.error("[quotes] POST error:", err?.message || err);
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: "Validation failed", details: err.issues }, { status: 400 });
    }
    return NextResponse.json({ error: err?.message || "Internal error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const quotes = await prisma.quote.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json(quotes);
  } catch (err: any) {
    console.error("[quotes] GET error:", err?.message || err);
    return NextResponse.json({ error: err?.message || "Internal error" }, { status: 500 });
  }
}
