import React from "react";
import { Document, Page, View, Text, Image } from "@react-pdf/renderer";
import { styles } from "./styles";
import { getLogoDataUri } from "./logo";

interface QuoteItem {
  description: string;
  qty: number;
  rate: number;
}

interface QuoteData {
  quoteNumber: string;
  date: string;
  validUntil: string;
  clientName: string;
  clientEmail: string;
  clientCompany?: string;
  service: string;
  description: string;
  items: QuoteItem[];
  notes?: string;
  status?: string;
}

function formatCurrency(cents: number): string {
  return `$${(cents / 100).toLocaleString("en-US", { minimumFractionDigits: 2 })}`;
}

export function QuotePDF({ data }: { data: QuoteData }) {
  const logoUri = getLogoDataUri();
  const subtotal = data.items.reduce((sum, item) => sum + item.qty * item.rate, 0);

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
            <Text style={styles.docType}>QUOTE</Text>
            <Text style={styles.docNumber}>{data.quoteNumber}</Text>
            <Text style={styles.docDate}>{data.date}</Text>
          </View>
        </View>

        {/* From / To */}
        <View style={styles.infoRow}>
          <View style={styles.infoBlock}>
            <Text style={styles.infoLabel}>From</Text>
            <Text style={styles.infoText}>Reilly Design Studio LLC</Text>
            <Text style={styles.infoTextLight}>Reston, Virginia</Text>
            <Text style={styles.infoTextLight}>robert.reilly@reillydesignstudio.com</Text>
            <Text style={styles.infoTextLight}>reillydesignstudio.com</Text>
          </View>
          <View style={styles.infoBlock}>
            <Text style={styles.infoLabel}>Prepared For</Text>
            <Text style={styles.infoText}>{data.clientName}</Text>
            {data.clientCompany && <Text style={styles.infoText}>{data.clientCompany}</Text>}
            <Text style={styles.infoTextLight}>{data.clientEmail}</Text>
            <Text style={{ ...styles.infoTextLight, marginTop: 8 }}>
              Valid until: {data.validUntil}
            </Text>
          </View>
        </View>

        {/* Project Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Project: {data.service}</Text>
          <Text style={styles.sectionText}>{data.description}</Text>
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
              <Text style={styles.totalValue}>{formatCurrency(subtotal)}</Text>
            </View>
            <View style={styles.totalDivider} />
            <View style={styles.grandTotalRow}>
              <Text style={styles.grandTotalLabel}>Total</Text>
              <Text style={styles.grandTotalValue}>{formatCurrency(subtotal)}</Text>
            </View>
          </View>
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
          <Text style={styles.sectionTitle}>Terms & Conditions</Text>
          <Text style={styles.sectionText}>
            • This quote is valid for 30 days from the date of issue.{"\n"}
            • A 50% deposit is required to begin work.{"\n"}
            • Final payment is due upon project completion and approval.{"\n"}
            • Additional revisions beyond the agreed scope may incur extra charges.{"\n"}
            • All work remains the property of Reilly Design Studio LLC until final payment is received.
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
