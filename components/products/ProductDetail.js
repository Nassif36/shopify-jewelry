"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { useCart } from "@/components/cart/CartProvider";
import { formatMoney } from "@/lib/format";

export function ProductDetail({ product }) {
  const [imageIndex, setImageIndex] = useState(0);
  const [selections, setSelections] = useState(() =>
    Object.fromEntries(product.options.map((option) => [option.name, option.values[0]]))
  );
  const [quantity, setQuantity] = useState(1);
  const [wished, setWished] = useState(false);
  const { addItem } = useCart();

  const variant = useMemo(
    () => product.variants.find((item) =>
      Object.entries(selections).every(([name, value]) => item.selectedOptions[name] === value)
    ) || product.variants[0],
    [product.variants, selections]
  );

  function move(direction) {
    setImageIndex((current) => (current + direction + product.images.length) % product.images.length);
  }

  return (
    <div className="productDetail">
      <div className="productGallery">
        <div
          className="mainProductImage"
          tabIndex="0"
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft") move(-1);
            if (event.key === "ArrowRight") move(1);
          }}
        >
          <Image src={product.images[imageIndex]} alt={`${product.title}, view ${imageIndex + 1}`} fill priority sizes="(max-width: 900px) 100vw, 60vw" />
          {product.images.length > 1 && (
            <div className="galleryArrows">
              <button onClick={() => move(-1)} aria-label="Previous image">←</button>
              <span>{String(imageIndex + 1).padStart(2, "0")} / {String(product.images.length).padStart(2, "0")}</span>
              <button onClick={() => move(1)} aria-label="Next image">→</button>
            </div>
          )}
        </div>
        <div className="thumbnails">
          {product.images.map((item, index) => (
            <button className={index === imageIndex ? "active" : ""} onClick={() => setImageIndex(index)} key={item} aria-label={`View image ${index + 1}`}>
              <Image src={item} alt="" fill sizes="100px" />
            </button>
          ))}
        </div>
      </div>
      <section className="productInfo">
        <p className="eyebrow">{product.productType} · Maison Lune</p>
        <h1>{product.title}</h1>
        <div className="detailPrice">
          <span>{formatMoney(variant.price, product.currency)}</span>
          {product.compareAtPrice && <s>{formatMoney(product.compareAtPrice, product.currency)}</s>}
        </div>
        <p className="detailDescription">{product.description}</p>
        {product.options.map((option) => (
          <fieldset className="optionSet" key={option.name}>
            <legend>{option.name} <span>{selections[option.name]}</span></legend>
            <div>
              {option.values.map((value) => (
                <button
                  type="button"
                  className={selections[option.name] === value ? "selected" : ""}
                  onClick={() => setSelections((current) => ({ ...current, [option.name]: value }))}
                  key={value}
                >{value}</button>
              ))}
            </div>
          </fieldset>
        ))}
        <div className="detailActions">
          <div className="quantity">
            <button onClick={() => setQuantity(Math.max(1, quantity - 1))} aria-label="Decrease quantity">−</button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity(quantity + 1)} aria-label="Increase quantity">+</button>
          </div>
          <button className="button dark" onClick={() => addItem(product, variant, quantity)} disabled={!variant.available}>
            {variant.available ? `Add to bag · ${formatMoney(variant.price * quantity)}` : "Unavailable"}
          </button>
          <button className={`detailWishlist ${wished ? "active" : ""}`} onClick={() => setWished(!wished)} aria-label="Add to wishlist">{wished ? "♥" : "♡"}</button>
        </div>
        <div className="serviceNotes">
          <p><span>◇</span><strong>Complimentary shipping</strong><small>On orders over $150</small></p>
          <p><span>↺</span><strong>Considered returns</strong><small>Within 30 days</small></p>
        </div>
        <div className="accordions">
          <details open><summary>Materials & care <span>+</span></summary><p>Responsibly sourced materials, finished by hand. Store in its pouch and avoid prolonged contact with water.</p></details>
          <details><summary>Shipping & returns <span>+</span></summary><p>Orders leave our studio within two business days. Returns are accepted within 30 days.</p></details>
          <details><summary>Our promise <span>+</span></summary><p>Every piece is inspected by hand and includes a one-year craftsmanship warranty.</p></details>
        </div>
      </section>
    </div>
  );
}
