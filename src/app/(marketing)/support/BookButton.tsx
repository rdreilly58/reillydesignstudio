"use client";

import { useState } from "react";

interface BookButtonProps {
  serviceName: string;
  amount: number; // cents
  description: string;
  className?: string;
  children: React.ReactNode;
}

export default function BookButton({ serviceName, amount, description, className, children }: BookButtonProps) {
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ serviceName, amount, description }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error("Checkout error:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button onClick={handleClick} disabled={loading} className={className}>
      {loading ? "Redirecting..." : children}
    </button>
  );
}
