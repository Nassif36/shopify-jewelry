"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { fallbackProducts } from "@/data/fallback-products";
import { formatMoney } from "@/lib/format";

export function SearchOverlay({ open, onClose }) {
  const [query, setQuery] = useState("");
  const [debounced, setDebounced] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(query), 220);
    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event) => event.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const results = debounced.length > 1
    ? fallbackProducts.filter((product) =>
        `${product.title} ${product.productType} ${product.tags.join(" ")}`
          .toLowerCase().includes(debounced.toLowerCase())
      ).slice(0, 4)
    : [];

  return (
    <div className={`searchOverlay ${open ? "isOpen" : ""}`} aria-hidden={!open}>
      <div className="searchTop">
        <p className="wordmark">Maison Lune</p>
        <button className="closeButton" onClick={onClose} aria-label="Close search">×</button>
      </div>
      <div className="searchBody" role="dialog" aria-modal="true" aria-label="Search products">
        <label htmlFor="site-search">What are you looking for?</label>
        <div className="searchInput">
          <input
            id="site-search"
            type="search"
            autoComplete="off"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search jewelry"
          />
          <span>⌕</span>
        </div>
        {debounced.length < 2 ? (
          <div className="popularSearches">
            <p className="eyebrow">Popular now</p>
            {["Gold rings", "Pearl earrings", "Gifts under $150", "Solstice"].map((item) => (
              <button onClick={() => setQuery(item)} key={item}>{item} <span>→</span></button>
            ))}
          </div>
        ) : (
          <div className="searchResults">
            <p className="eyebrow">{results.length ? `${results.length} pieces found` : "No pieces found"}</p>
            <div>
              {results.map((product) => (
                <Link href={`/products/${product.handle}`} onClick={onClose} key={product.id}>
                  <Image src={product.images[0]} alt="" width={84} height={104} />
                  <span><strong>{product.title}</strong><small>{formatMoney(product.price)}</small></span>
                  <i>→</i>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
