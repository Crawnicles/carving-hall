"use client";

import { useCart } from "@/app/components/CartContext";
import type { Product } from "@/app/data/products";

export default function AddToCartButton({ product }: { product: Product }) {
  const { addItem } = useCart();

  return (
    <button className="secondary-button" onClick={() => addItem(product, 1)}>
      Add to cart
    </button>
  );
}
