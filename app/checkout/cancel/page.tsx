import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export default function CancelPage() {
  return (
    <div className="page">
      <Header />
      <main className="checkout-page">
        <div className="container checkout-card">
          <p className="eyebrow">Checkout paused</p>
          <h1>Your cart still waits by the fire.</h1>
          <p className="lead">
            No payment was taken. When you are ready, your carvings will still be
            here.
          </p>
          <Link className="primary-button" href="/#collection">
            Return to the collection
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
