"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface LineItem {
  description: string;
  amount: string; // Store as string for input, convert to cents on submit
  quantity: string;
}

export function InvoiceForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [memo, setMemo] = useState("");
  const [lineItems, setLineItems] = useState<LineItem[]>([
    { description: "", amount: "", quantity: "1" },
  ]);

  const addLineItem = () => {
    setLineItems([...lineItems, { description: "", amount: "", quantity: "1" }]);
  };

  const removeLineItem = (index: number) => {
    if (lineItems.length > 1) {
      setLineItems(lineItems.filter((_, i) => i !== index));
    }
  };

  const updateLineItem = (index: number, field: keyof LineItem, value: string) => {
    const updated = [...lineItems];
    updated[index] = { ...updated[index], [field]: value };
    setLineItems(updated);
  };

  const calculateTotal = () => {
    return lineItems.reduce((sum, item) => {
      const amount = parseFloat(item.amount) || 0;
      const quantity = parseInt(item.quantity) || 1;
      return sum + amount * quantity;
    }, 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Convert amounts to cents
      const formattedLineItems = lineItems
        .filter((item) => item.description && item.amount)
        .map((item) => ({
          description: item.description,
          amount: Math.round(parseFloat(item.amount) * 100), // Convert dollars to cents
          quantity: parseInt(item.quantity) || 1,
        }));

      if (formattedLineItems.length === 0) {
        setError("Please add at least one line item");
        setIsSubmitting(false);
        return;
      }

      const response = await fetch("/api/invoices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName,
          customerEmail,
          lineItems: formattedLineItems,
          dueDate: dueDate || undefined,
          memo: memo || undefined,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to create invoice");
      }

      const data = await response.json();
      router.push(`/admin/invoices/${data.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create invoice");
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-4 rounded-lg bg-red-900/50 border border-red-800 text-red-200 text-sm">
          {error}
        </div>
      )}

      {/* Customer Info */}
      <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-6 space-y-4">
        <h2 className="text-lg font-semibold text-white mb-4">Customer Information</h2>

        <div>
          <label className="block text-sm text-zinc-400 mb-2">Customer Name</label>
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-700 text-white placeholder-zinc-600 focus:outline-none focus:border-violet-500 text-sm"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label className="block text-sm text-zinc-400 mb-2">Customer Email</label>
          <input
            type="email"
            value={customerEmail}
            onChange={(e) => setCustomerEmail(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-700 text-white placeholder-zinc-600 focus:outline-none focus:border-violet-500 text-sm"
            placeholder="john@example.com"
          />
        </div>
      </div>

      {/* Line Items */}
      <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Line Items</h2>

        <div className="space-y-4">
          {lineItems.map((item, index) => (
            <div key={index} className="flex gap-3 items-start">
              <div className="flex-1">
                <input
                  type="text"
                  value={item.description}
                  onChange={(e) => updateLineItem(index, "description", e.target.value)}
                  placeholder="Description"
                  className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-700 text-white placeholder-zinc-600 focus:outline-none focus:border-violet-500 text-sm"
                />
              </div>
              <div className="w-24">
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => updateLineItem(index, "quantity", e.target.value)}
                  min="1"
                  placeholder="Qty"
                  className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-700 text-white placeholder-zinc-600 focus:outline-none focus:border-violet-500 text-sm"
                />
              </div>
              <div className="w-32">
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">$</span>
                  <input
                    type="number"
                    step="0.01"
                    value={item.amount}
                    onChange={(e) => updateLineItem(index, "amount", e.target.value)}
                    placeholder="0.00"
                    className="w-full px-4 py-3 pl-8 rounded-xl bg-zinc-950 border border-zinc-700 text-white placeholder-zinc-600 focus:outline-none focus:border-violet-500 text-sm"
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={() => removeLineItem(index)}
                disabled={lineItems.length === 1}
                className="px-3 py-3 rounded-xl bg-zinc-800 text-zinc-400 hover:text-red-400 hover:bg-zinc-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                &times;
              </button>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={addLineItem}
          className="mt-4 px-4 py-2 rounded-lg bg-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-700 text-sm transition-colors"
        >
          + Add Line Item
        </button>

        <div className="mt-4 pt-4 border-t border-zinc-800 flex justify-end">
          <div className="text-right">
            <span className="text-zinc-400 text-sm">Total: </span>
            <span className="text-white text-lg font-semibold">
              ${calculateTotal().toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Invoice Details */}
      <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-6 space-y-4">
        <h2 className="text-lg font-semibold text-white mb-4">Invoice Details</h2>

        <div>
          <label className="block text-sm text-zinc-400 mb-2">Due Date</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            min={new Date().toISOString().split("T")[0]}
            className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-700 text-white placeholder-zinc-600 focus:outline-none focus:border-violet-500 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm text-zinc-400 mb-2">Memo / Notes</label>
          <textarea
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            rows={3}
            className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-700 text-white placeholder-zinc-600 focus:outline-none focus:border-violet-500 text-sm resize-none"
            placeholder="Additional notes for the customer..."
          />
        </div>
      </div>

      {/* Submit */}
      <div className="flex gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-3 rounded-lg bg-violet-600 hover:bg-violet-500 text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Creating..." : "Create & Send Invoice"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-3 rounded-lg bg-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-700 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
