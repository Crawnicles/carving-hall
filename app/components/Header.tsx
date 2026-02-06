import Link from "next/link";
import CartButton from "@/app/components/CartButton";

export default function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="logo">
          <span className="logo-mark">🜂</span>
          <div>
            <p className="logo-title">Carving Hall</p>
            <span className="logo-sub">Handmade relics of the wild</span>
          </div>
        </Link>
        <nav className="nav-links">
          <Link href="#collection">Collection</Link>
          <Link href="#story">Story</Link>
          <Link href="#rituals">Rituals</Link>
        </nav>
        <CartButton />
      </div>
    </header>
  );
}
