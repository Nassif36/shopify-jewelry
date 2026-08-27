"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "@/components/cart/CartProvider";
import { SearchOverlay } from "@/components/search/SearchOverlay";

const links = [
  ["Shop", "/shop"],
  ["New arrivals", "/shop?sort=new"],
  ["Rings", "/collections/rings"],
  ["Necklaces", "/collections/necklaces"],
  ["Earrings", "/collections/earrings"],
  ["Bracelets", "/collections/bracelets"]
];

function Icon({ children, label, onClick }) {
  return (
    <button className="iconButton" aria-label={label} onClick={onClick}>
      {children}
    </button>
  );
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { count, openCart } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="announcement">
        <span>Complimentary shipping on orders over $150</span>
        <span aria-hidden="true">New collection — Solstice</span>
      </div>
      <header className={`siteHeader ${scrolled ? "isScrolled" : ""}`}>
        <div className="headerInner">
          <button
            className="mobileMenuButton"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
          >
            <span />
            <span />
          </button>
          <Link className="wordmark" href="/" aria-label="Maison Lune home">
            Maison Lune
          </Link>
          <nav className="desktopNav" aria-label="Main navigation">
            {links.map(([label, href]) => (
              <Link key={label} href={href}>{label}</Link>
            ))}
          </nav>
          <div className="headerActions">
            <Icon label="Search" onClick={() => setSearchOpen(true)}>
              <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="6.5" /><path d="m16 16 4 4" /></svg>
            </Icon>
            <Link className="desktopAction" href="/account">Account</Link>
            <button className="desktopAction">Wishlist</button>
            <Icon label={`Shopping bag with ${count} items`} onClick={openCart}>
              <svg viewBox="0 0 24 24"><path d="M5 8.5h14l-1 12H6l-1-12Z" /><path d="M9 9V6a3 3 0 0 1 6 0v3" /></svg>
              {count > 0 && <span className="cartCount">{count}</span>}
            </Icon>
          </div>
        </div>
      </header>

      <div className={`mobileDrawer ${menuOpen ? "isOpen" : ""}`} aria-hidden={!menuOpen}>
        <button className="drawerBackdrop" aria-label="Close menu" onClick={() => setMenuOpen(false)} />
        <nav className="mobileDrawerPanel" aria-label="Mobile navigation">
          <div className="drawerTop">
            <span className="wordmark">Maison Lune</span>
            <button className="closeButton" onClick={() => setMenuOpen(false)} aria-label="Close menu">×</button>
          </div>
          {links.map(([label, href], index) => (
            <Link key={label} href={href} onClick={() => setMenuOpen(false)}>
              <span>0{index + 1}</span>{label}
            </Link>
          ))}
          <div className="drawerNote">Objects of quiet beauty, made with intention.</div>
        </nav>
      </div>
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
