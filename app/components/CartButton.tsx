"use client";

import { useCart } from "@/app/components/CartContext";

export default function CartButton() {
  const { itemCount, toggleCart } = useCart();

  return (
    <button className="cart-button" onClick={toggleCart}>
      Cart
      <span className="cart-count">{itemCount}</span>
    </button>
  );
}
