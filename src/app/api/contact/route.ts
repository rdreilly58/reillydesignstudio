import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { contactNotification } from "@/lib/notify";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Store in database as a quote with service "General Inquiry"
    await prisma.quote.create({
      data: {
        name,
        email,
        service: "General Inquiry",
        description: message,
        status: "PENDING",
      },
    });

    contactNotification({ name, email, message }).catch(() => {}); // best-effort
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
