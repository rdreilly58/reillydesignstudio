import { NextRequest, NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import React from "react";
import Stripe from "stripe";
import { InvoicePDF } from "@/lib/pdf/InvoicePDF";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const invoice = await stripe.invoices.retrieve(id, {
      expand: ["lines"],
    });

    if (!invoice) {
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }

    const items = (invoice.lines?.data || []).map((line: any) => ({
      description: line.description || "Service",
      qty: line.quantity || 1,
      rate: line.amount || 0,
    }));

    if (items.length === 0) {
      items.push({
        description: invoice.description || "Professional Services",
        qty: 1,
        rate: invoice.amount_due || 0,
      });
    }

    const data = {
      invoiceNumber: invoice.number || `INV-${id.slice(-6).toUpperCase()}`,
      date: new Date((invoice.created || 0) * 1000).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      dueDate: invoice.due_date
        ? new Date(invoice.due_date * 1000).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        : "Upon Receipt",
      clientName: invoice.customer_name || "Client",
      clientEmail: invoice.customer_email || "",
      clientCompany: undefined,
      clientAddress: invoice.customer_address
        ? [
            invoice.customer_address.line1,
            invoice.customer_address.line2,
            `${invoice.customer_address.city}, ${invoice.customer_address.state} ${invoice.customer_address.postal_code}`,
          ]
            .filter(Boolean)
            .join(", ")
        : undefined,
      items,
      subtotal: invoice.subtotal || 0,
      tax: (invoice as any).tax || 0,
      total: invoice.amount_due || 0,
      notes: invoice.description || undefined,
      status: invoice.status || undefined,
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const buffer = await renderToBuffer(React.createElement(InvoicePDF, { data }) as any);

    return new NextResponse(Buffer.from(buffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="RDS-Invoice-${data.invoiceNumber}.pdf"`,
      },
    });
  } catch (error) {
    console.error("PDF generation error:", error);
    return NextResponse.json({ error: "Failed to generate PDF" }, { status: 500 });
  }
}
