"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useCart } from "@/components/cart/CartProvider";
import { formatMoney } from "@/lib/format";

export function QuickAdd({ product, label = "Quick add", className = "" }) {
  const [open, setOpen] = useState(false);
  const [selections, setSelections] = useState({});
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  const selectedVariant = useMemo(
    () => product.variants.find((variant) =>
      Object.entries(selections).every(([name, value]) => variant.selectedOptions[name] === value)
    ),
    [product.variants, selections]
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (event) => event.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  function start() {
    const available = product.variants.filter((variant) => variant.available);
    if (available.length === 1 && product.options.length === 0) {
      addItem(product, available[0]);
      return;
    }
    const defaults = {};
    product.options.forEach((option) => {
      defaults[option.name] = option.values[0];
    });
    setSelections(defaults);
    setOpen(true);
  }

  function add() {
    if (!selectedVariant?.available) return;
    addItem(product, selectedVariant, quantity);
    setOpen(false);
  }

  return (
    <>
      <button className={className} onClick={start} disabled={!product.available}>{product.available ? label : "Sold out"}</button>
      <div className={`quickAddShell ${open ? "isOpen" : ""}`} aria-hidden={!open}>
        <button className="drawerBackdrop" aria-label="Close quick add" onClick={() => setOpen(false)} />
        <section className="quickAdd" role="dialog" aria-modal="true" aria-label={`Choose options for ${product.title}`}>
          <button className="closeButton" onClick={() => setOpen(false)} aria-label="Close">×</button>
          <div className="quickAddImage">
            <Image src={product.images[0]} alt={product.title} fill sizes="(max-width: 700px) 100vw, 40vw" />
          </div>
          <div className="quickAddInfo">
            <p className="eyebrow">{product.productType}</p>
            <h2>{product.title}</h2>
            <p className="price">{formatMoney(selectedVariant?.price || product.price, product.currency)}</p>
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
                    >
                      {value}
                    </button>
                  ))}
                </div>
              </fieldset>
            ))}
            <div className="purchaseRow">
              <div className="quantity">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} aria-label="Decrease quantity">−</button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} aria-label="Increase quantity">+</button>
              </div>
              <button className="button dark" onClick={add} disabled={!selectedVariant?.available}>
                {selectedVariant?.available ? "Add to bag" : "Unavailable"}
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
