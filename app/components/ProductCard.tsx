import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/app/data/products";
import AddToCartButton from "@/app/components/AddToCartButton";

const formatMoney = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);

export default function ProductCard({ product }: { product: Product }) {
  return (
    <article className="product-card">
      {product.badge ? <span className="badge">{product.badge}</span> : null}
      <Link href={`/products/${product.slug}`} className="product-image">
        <Image src={product.image} alt={product.name} width={280} height={280} />
      </Link>
      <div className="product-info">
        <div>
          <h3>{product.name}</h3>
          <p className="muted">{product.subtitle}</p>
        </div>
        <div className="product-meta">
          <span>{formatMoney(product.price)}</span>
          <AddToCartButton product={product} />
        </div>
      </div>
    </article>
  );
}
