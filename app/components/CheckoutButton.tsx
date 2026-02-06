"use client";

import { useState } from "react";
import { useCart } from "@/app/components/CartContext";

export default function CheckoutButton({ disabled }: { disabled?: boolean }) {
  const { items } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((item) => ({
            id: item.product.id,
            quantity: item.quantity,
          })),
        }),
      });

      if (!response.ok) {
        const message = await response.json();
        throw new Error(message?.error ?? "Checkout failed");
      }

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url as string;
      } else {
        throw new Error("Missing checkout URL");
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unexpected error";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button
        className="primary-button"
        onClick={handleCheckout}
        disabled={disabled || isLoading}
      >
        {isLoading ? "Summoning checkout…" : "Proceed to checkout"}
      </button>
      {error ? <p className="error-text">{error}</p> : null}
    </div>
  );
}
