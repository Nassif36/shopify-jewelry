"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { formatMoney } from "@/lib/format";
import { QuickAdd } from "@/components/quick-add/QuickAdd";

export function ProductCard({ product, priority = false }) {
  const [wished, setWished] = useState(false);
  const badge = product.tags.includes("new")
    ? "New"
    : product.compareAtPrice
      ? "Sale"
      : product.tags.includes("limited") ? "Limited" : null;

  return (
    <article className="productCard">
      <div className="productVisual">
        <Link href={`/products/${product.handle}`} aria-label={product.title}>
          <Image
            className="primaryImage"
            src={product.images[0]}
            alt={product.title}
            fill
            priority={priority}
            sizes="(max-width: 767px) 50vw, (max-width: 1100px) 33vw, 25vw"
          />
          {product.images[1] && (
            <Image
              className="secondaryImage"
              src={product.images[1]}
              alt=""
              fill
              sizes="(max-width: 767px) 50vw, (max-width: 1100px) 33vw, 25vw"
            />
          )}
        </Link>
        {badge && <span className="productBadge">{badge}</span>}
        <button
          className={`wishlist ${wished ? "active" : ""}`}
          onClick={() => setWished(!wished)}
          aria-label={`${wished ? "Remove" : "Add"} ${product.title} ${wished ? "from" : "to"} wishlist`}
          aria-pressed={wished}
        >
          {wished ? "♥" : "♡"}
        </button>
        <QuickAdd product={product} className="quickAddButton" />
      </div>
      <div className="productMeta">
        <div>
          <h3><Link href={`/products/${product.handle}`}>{product.title}</Link></h3>
          <p>{product.productType}</p>
        </div>
        <div className="cardPrice">
          <span>{formatMoney(product.price, product.currency)}</span>
          {product.compareAtPrice && <s>{formatMoney(product.compareAtPrice, product.currency)}</s>}
        </div>
      </div>
    </article>
  );
}
