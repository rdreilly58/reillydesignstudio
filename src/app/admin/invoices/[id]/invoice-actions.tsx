"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface InvoiceActionsProps {
  invoiceId: string;
  status: string;
  stripeHostedUrl: string | null;
}

export function InvoiceActions({ invoiceId, status, stripeHostedUrl }: InvoiceActionsProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const paymentLink = `${typeof window !== "undefined" ? window.location.origin : ""}/pay/${invoiceId}`;

  const copyPaymentLink = async () => {
    await navigator.clipboard.writeText(paymentLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const sendReminder = async () => {
    setIsLoading("remind");
    try {
      const response = await fetch(`/api/invoices/${invoiceId}/remind`, {
        method: "POST",
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to send reminder");
      }
      alert("Reminder sent successfully!");
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to send reminder");
    } finally {
      setIsLoading(null);
    }
  };

  const voidInvoice = async () => {
    if (!confirm("Are you sure you want to void this invoice? This cannot be undone.")) {
      return;
    }

    setIsLoading("void");
    try {
      const response = await fetch(`/api/invoices/${invoiceId}/void`, {
        method: "POST",
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to void invoice");
      }
      router.refresh();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to void invoice");
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <div className="space-y-3">
      {/* Copy Payment Link */}
      <button
        onClick={copyPaymentLink}
        className="w-full px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium transition-colors"
      >
        {copied ? "Copied!" : "Copy Payment Link"}
      </button>

      {/* View on Stripe */}
      {stripeHostedUrl && (
        <a
          href={stripeHostedUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center px-4 py-2 rounded-lg bg-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-700 text-sm transition-colors"
        >
          View Stripe Invoice
        </a>
      )}

      {/* Send Reminder - only for open invoices */}
      {status === "OPEN" && (
        <button
          onClick={sendReminder}
          disabled={isLoading === "remind"}
          className="w-full px-4 py-2 rounded-lg bg-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-700 text-sm transition-colors disabled:opacity-50"
        >
          {isLoading === "remind" ? "Sending..." : "Send Reminder"}
        </button>
      )}

      {/* Void Invoice - only for open invoices */}
      {status === "OPEN" && (
        <button
          onClick={voidInvoice}
          disabled={isLoading === "void"}
          className="w-full px-4 py-2 rounded-lg bg-red-900/50 border border-red-800 text-red-300 hover:bg-red-900 hover:text-red-200 text-sm transition-colors disabled:opacity-50"
        >
          {isLoading === "void" ? "Voiding..." : "Void Invoice"}
        </button>
      )}

      {/* Status-specific messages */}
      {status === "PAID" && (
        <p className="text-green-400 text-sm text-center">This invoice has been paid.</p>
      )}

      {status === "VOID" && (
        <p className="text-red-400 text-sm text-center">This invoice has been voided.</p>
      )}

      {status === "UNCOLLECTABLE" && (
        <p className="text-red-400 text-sm text-center">This invoice was marked as uncollectable.</p>
      )}
    </div>
  );
}
