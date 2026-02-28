import React from "react";
import { Document, Page, View, Text, Image } from "@react-pdf/renderer";
import { styles } from "./styles";
import { getLogoDataUri } from "./logo";

interface InvoiceItem {
  description: string;
  qty: number;
  rate: number;
}

interface InvoiceData {
  invoiceNumber: string;
  date: string;
  dueDate: string;
  clientName: string;
  clientEmail: string;
  clientCompany?: string;
  clientAddress?: string;
  items: InvoiceItem[];
  notes?: string;
  status?: string;
  subtotal: number;
  tax?: number;
  total: number;
}

function formatCurrency(cents: number): string {
  return `$${(cents / 100).toLocaleString("en-US", { minimumFractionDigits: 2 })}`;
}

export function InvoicePDF({ data }: { data: InvoiceData }) {
  const logoUri = getLogoDataUri();

  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image src={logoUri} style={styles.logo} />
            <View>
              <Text style={styles.brandName}>
                Reilly<Text style={styles.brandAccent}>Design</Text>Studio
              </Text>
              <Text style={styles.tagline}>DESIGN THAT MOVES PEOPLE™</Text>
            </View>
          </View>
          <View style={styles.headerRight}>
            <Text style={styles.docType}>INVOICE</Text>
            <Text style={styles.docNumber}>{data.invoiceNumber}</Text>
            <Text style={styles.docDate}>{data.date}</Text>
          </View>
        </View>

        {/* From / Bill To */}
        <View style={styles.infoRow}>
          <View style={styles.infoBlock}>
            <Text style={styles.infoLabel}>From</Text>
            <Text style={styles.infoText}>Reilly Design Studio LLC</Text>
            <Text style={styles.infoTextLight}>12606 Noble Victory Ln</Text>
            <Text style={styles.infoTextLight}>Reston, VA 20191</Text>
            <Text style={styles.infoTextLight}>robert.reilly@reillydesignstudio.com</Text>
            <Text style={styles.infoTextLight}>EIN: 41-4455872</Text>
          </View>
          <View style={styles.infoBlock}>
            <Text style={styles.infoLabel}>Bill To</Text>
            <Text style={styles.infoText}>{data.clientName}</Text>
            {data.clientCompany && <Text style={styles.infoText}>{data.clientCompany}</Text>}
            {data.clientAddress && <Text style={styles.infoTextLight}>{data.clientAddress}</Text>}
            <Text style={styles.infoTextLight}>{data.clientEmail}</Text>
            <Text style={{ ...styles.infoTextLight, marginTop: 8, fontFamily: "Helvetica-Bold", color: "#7C3AED" }}>
              Due: {data.dueDate}
            </Text>
          </View>
        </View>

        {/* Line Items Table */}
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={{ ...styles.tableHeaderText, ...styles.colDescription }}>Description</Text>
            <Text style={{ ...styles.tableHeaderText, ...styles.colQty }}>Qty</Text>
            <Text style={{ ...styles.tableHeaderText, ...styles.colRate }}>Rate</Text>
            <Text style={{ ...styles.tableHeaderText, ...styles.colAmount }}>Amount</Text>
          </View>
          {data.items.map((item, i) => (
            <View
              key={i}
              style={{ ...styles.tableRow, ...(i % 2 === 1 ? styles.tableRowAlt : {}) }}
            >
              <Text style={{ ...styles.tableCell, ...styles.colDescription }}>
                {item.description}
              </Text>
              <Text style={{ ...styles.tableCell, ...styles.colQty }}>{item.qty}</Text>
              <Text style={{ ...styles.tableCell, ...styles.colRate }}>
                {formatCurrency(item.rate)}
              </Text>
              <Text style={{ ...styles.tableCell, ...styles.colAmount }}>
                {formatCurrency(item.qty * item.rate)}
              </Text>
            </View>
          ))}
        </View>

        {/* Totals */}
        <View style={styles.totalsContainer}>
          <View style={styles.totalsBox}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Subtotal</Text>
              <Text style={styles.totalValue}>{formatCurrency(data.subtotal)}</Text>
            </View>
            {data.tax !== undefined && data.tax > 0 && (
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Tax</Text>
                <Text style={styles.totalValue}>{formatCurrency(data.tax)}</Text>
              </View>
            )}
            <View style={styles.totalDivider} />
            <View style={styles.grandTotalRow}>
              <Text style={styles.grandTotalLabel}>Total Due</Text>
              <Text style={styles.grandTotalValue}>{formatCurrency(data.total)}</Text>
            </View>
          </View>
        </View>

        {/* Payment Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Information</Text>
          <Text style={styles.sectionText}>
            Pay online at reillydesignstudio.com or via bank transfer:{"\n"}
            Bank: Mercury · Routing: 121145433 · Account: 656251644831483{"\n"}
            Please reference invoice number {data.invoiceNumber} with your payment.
          </Text>
        </View>

        {/* Notes */}
        {data.notes && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Notes</Text>
            <Text style={styles.sectionText}>{data.notes}</Text>
          </View>
        )}

        {/* Terms */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Terms</Text>
          <Text style={styles.sectionText}>
            • Payment is due by the date specified above.{"\n"}
            • Late payments may be subject to a 1.5% monthly finance charge.{"\n"}
            • Questions? Contact robert.reilly@reillydesignstudio.com
          </Text>
        </View>

        {/* Footer */}
        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>
            Reilly Design Studio LLC · Reston, VA · reillydesignstudio.com
          </Text>
          <Text style={styles.footerTagline}>Design That Moves People™</Text>
        </View>
      </Page>
    </Document>
  );
}
