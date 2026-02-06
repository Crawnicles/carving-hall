import Image from "next/image";
import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import ProductCard from "@/app/components/ProductCard";
import AddToCartButton from "@/app/components/AddToCartButton";
import { featuredProduct, products } from "@/app/data/products";

const formatMoney = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);

export default function Home() {
  return (
    <div className="page">
      <Header />

      <main>
        <section className="hero">
          <div className="container hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">From forest to hearth</p>
              <h1>Hand-carved relics for wanderers of the wild.</h1>
              <p className="lead">
                Every piece is carved with loreful intent—oak, ash, and walnut
                shaped into tokens worthy of a ranger, a sage, or the keeper of a
                quiet homestead.
              </p>
              <div className="hero-actions">
                <Link className="primary-button" href="#collection">
                  Browse the collection
                </Link>
                <Link className="ghost-button" href="#story">
                  Read the story
                </Link>
              </div>
              <div className="hero-stats">
                <div>
                  <strong>120+</strong>
                  <span>Carvings crafted</span>
                </div>
                <div>
                  <strong>7 days</strong>
                  <span>Average ship time</span>
                </div>
                <div>
                  <strong>5/5</strong>
                  <span>Ranger ratings</span>
                </div>
              </div>
            </div>
            <div className="hero-card">
              <div className="hero-card-frame">
                <Image
                  src={featuredProduct.image}
                  alt={featuredProduct.name}
                  width={420}
                  height={420}
                />
              </div>
              <div className="hero-card-info">
                <div>
                  <h2>{featuredProduct.name}</h2>
                  <p className="muted">{featuredProduct.subtitle}</p>
                </div>
                <div className="hero-card-meta">
                  <span>{formatMoney(featuredProduct.price)}</span>
                  <AddToCartButton product={featuredProduct} />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="banner" id="story">
          <div className="container banner-inner">
            <div>
              <p className="eyebrow">The hall of craft</p>
              <h2>We carve as the old songs teach.</h2>
            </div>
            <p className="lead">
              Our workshop is a quiet cabin at the edge of the pines. We harvest
              fallen timber only, seal each carving with beeswax, and etch every
              rune by hand.
            </p>
          </div>
        </section>

        <section className="collection" id="collection">
          <div className="container">
            <div className="section-heading">
              <div>
                <p className="eyebrow">The collection</p>
                <h2>Choose your talisman.</h2>
              </div>
              <Link className="ghost-button" href="#rituals">
                Care rituals
              </Link>
            </div>
            <div className="product-grid">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        <section className="rituals" id="rituals">
          <div className="container rituals-grid">
            <div className="ritual-card">
              <h3>Seal with warmth</h3>
              <p>
                Warm the carving with your hands, then apply a thin layer of
                beeswax to keep the grain lively.
              </p>
            </div>
            <div className="ritual-card">
              <h3>Keep near the fire</h3>
              <p>
                Display in soft light. Avoid direct midday sun to preserve the
                forest patina.
              </p>
            </div>
            <div className="ritual-card">
              <h3>Pass it onward</h3>
              <p>
                Each carving is made to be a keepsake. Add a note, gift it to the
                next traveler.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
