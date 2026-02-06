import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import AddToCartButton from "@/app/components/AddToCartButton";
import { getProductBySlug, products } from "@/app/data/products";

const formatMoney = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="page">
      <Header />
      <main className="product-detail">
        <div className="container detail-grid">
          <div className="detail-image">
            <Image src={product.image} alt={product.name} width={520} height={520} />
          </div>
          <div className="detail-info">
            <p className="eyebrow">{product.subtitle}</p>
            <h1>{product.name}</h1>
            <p className="lead">{product.description}</p>
            <div className="detail-meta">
              <div>
                <span className="label">Materials</span>
                <p>{product.materials.join(" · ")}</p>
              </div>
              <div>
                <span className="label">Size</span>
                <p>{product.size}</p>
              </div>
            </div>
            <div className="detail-actions">
              <strong>{formatMoney(product.price)}</strong>
              <AddToCartButton product={product} />
            </div>
            <Link className="ghost-button" href="/#collection">
              Back to collection
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}
