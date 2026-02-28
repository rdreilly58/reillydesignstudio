import { NextRequest, NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import React from "react";
import { prisma } from "@/lib/prisma";
import { QuotePDF } from "@/lib/pdf/QuotePDF";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const quote = await prisma.quote.findUnique({ where: { id } });

    if (!quote) {
      return NextResponse.json({ error: "Quote not found" }, { status: 404 });
    }

    const validUntil = new Date(quote.createdAt);
    validUntil.setDate(validUntil.getDate() + 30);

    const data = {
      quoteNumber: `Q-${quote.id.slice(-6).toUpperCase()}`,
      date: quote.createdAt.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      validUntil: validUntil.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      clientName: quote.name,
      clientEmail: quote.email,
      clientCompany: quote.company || undefined,
      service: quote.service,
      description: quote.description,
      items: [
        {
          description: quote.service,
          qty: 1,
          rate: quote.quotedPrice || 0,
        },
      ],
      notes: quote.adminNotes || undefined,
      status: quote.status,
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const buffer = await renderToBuffer(React.createElement(QuotePDF, { data }) as any);

    return new NextResponse(Buffer.from(buffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="RDS-Quote-${data.quoteNumber}.pdf"`,
      },
    });
  } catch (error) {
    console.error("PDF generation error:", error);
    return NextResponse.json({ error: "Failed to generate PDF" }, { status: 500 });
  }
}
