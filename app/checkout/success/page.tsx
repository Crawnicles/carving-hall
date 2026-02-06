import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export default function SuccessPage() {
  return (
    <div className="page">
      <Header />
      <main className="checkout-page">
        <div className="container checkout-card">
          <p className="eyebrow">Order complete</p>
          <h1>The carving sets out on its journey.</h1>
          <p className="lead">
            Thank you for supporting the hall. A confirmation email will arrive
            shortly with tracking details.
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
