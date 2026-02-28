import { NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import React from "react";
import fs from "fs";
import path from "path";
import { QuotePDF } from "@/lib/pdf/QuotePDF";
import { InvoicePDF } from "@/lib/pdf/InvoicePDF";

export async function GET() {
  try {
    const samplesDir = path.join(process.cwd(), "public", "samples");
    if (!fs.existsSync(samplesDir)) {
      fs.mkdirSync(samplesDir, { recursive: true });
    }

    const quoteData = {
      quoteNumber: "Q-2026-001",
      date: "February 28, 2026",
      validUntil: "March 30, 2026",
      clientName: "Sarah Chen",
      clientEmail: "sarah@acmecorp.com",
      clientCompany: "Acme Corporation",
      service: "Brand Identity & Web Design",
      description: "Complete brand identity package including logo design, brand guidelines, and a responsive website built with modern technologies. The project includes initial discovery, wireframing, visual design, development, and launch support.",
      items: [
        { description: "Brand Discovery & Strategy Session", qty: 1, rate: 50000 },
        { description: "Logo Design (3 concepts, 2 revisions)", qty: 1, rate: 75000 },
        { description: "Brand Guidelines Document", qty: 1, rate: 25000 },
        { description: "Website Design (5 pages)", qty: 1, rate: 150000 },
        { description: "Responsive Development & Launch", qty: 1, rate: 100000 },
      ],
      notes: "Timeline: 6-8 weeks from project kickoff. Includes one round of revisions per deliverable. Additional revisions available at $150/hour.",
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const quoteBuffer = await renderToBuffer(React.createElement(QuotePDF, { data: quoteData }) as any);
    fs.writeFileSync(path.join(samplesDir, "sample-quote.pdf"), Buffer.from(quoteBuffer));

    const invoiceData = {
      invoiceNumber: "INV-2026-001",
      date: "February 28, 2026",
      dueDate: "March 30, 2026",
      clientName: "Sarah Chen",
      clientEmail: "sarah@acmecorp.com",
      clientCompany: "Acme Corporation",
      clientAddress: "123 Business Ave, Suite 400, Arlington, VA 22201",
      items: [
        { description: "Brand Discovery & Strategy Session", qty: 1, rate: 50000 },
        { description: "Logo Design (3 concepts, 2 revisions)", qty: 1, rate: 75000 },
        { description: "Brand Guidelines Document", qty: 1, rate: 25000 },
        { description: "Website Design (5 pages) — 50% Deposit", qty: 1, rate: 75000 },
      ],
      subtotal: 225000,
      tax: 0,
      total: 225000,
      notes: "Deposit invoice — 50% of website design billed at project completion.",
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const invoiceBuffer = await renderToBuffer(React.createElement(InvoicePDF, { data: invoiceData }) as any);
    fs.writeFileSync(path.join(samplesDir, "sample-invoice.pdf"), Buffer.from(invoiceBuffer));

    return NextResponse.json({
      success: true,
      files: ["/samples/sample-quote.pdf", "/samples/sample-invoice.pdf"],
    });
  } catch (error) {
    console.error("Sample generation error:", error);
    return NextResponse.json({ error: "Failed to generate samples", details: String(error) }, { status: 500 });
  }
}
