"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useCart } from "@/app/components/CartContext";
import CheckoutButton from "@/app/components/CheckoutButton";

const formatMoney = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);

export default function CartDrawer() {
  const {
    items,
    isOpen,
    subtotal,
    closeCart,
    updateQuantity,
    removeItem,
  } = useCart();

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeCart();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, closeCart]);

  return (
    <div className={`cart-drawer ${isOpen ? "is-open" : ""}`}>
      <div className="cart-backdrop" onClick={closeCart} aria-hidden="true" />
      <aside className="cart-panel" aria-label="Shopping cart">
        <header>
          <div>
            <p className="eyebrow">Your satchel</p>
            <h2>Carving Cart</h2>
          </div>
          <button className="icon-button" onClick={closeCart} aria-label="Close">
            ✕
          </button>
        </header>

        {items.length === 0 ? (
          <div className="cart-empty">
            <p>Your cart is empty.</p>
            <span>Add a carving to begin your journey.</span>
          </div>
        ) : (
          <div className="cart-items">
            {items.map((item) => (
              <div className="cart-item" key={item.product.id}>
                <div className="cart-item-image">
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    width={64}
                    height={64}
                  />
                </div>
                <div className="cart-item-details">
                  <div>
                    <p className="cart-item-name">{item.product.name}</p>
                    <p className="cart-item-sub">
                      {formatMoney(item.product.price)}
                    </p>
                  </div>
                  <div className="cart-item-actions">
                    <div className="quantity">
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity - 1)
                        }
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity + 1)
                        }
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                    <button
                      className="link-button"
                      onClick={() => removeItem(item.product.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="cart-summary">
          <div className="summary-row">
            <span>Subtotal</span>
            <strong>{formatMoney(subtotal)}</strong>
          </div>
          <p className="muted">Shipping and taxes calculated at checkout.</p>
          <CheckoutButton disabled={items.length === 0} />
        </div>
      </aside>
    </div>
  );
}
