"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { formatMoney } from "@/lib/format";
import { useCart } from "./CartProvider";

export function CartDrawer({ open, onClose }) {
  const { items, subtotal, updateQuantity, removeItem } = useCart();

  useEffect(() => {
    if (!open) return;
    const onKey = (event) => event.key === "Escape" && onClose();
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <div className={`drawerShell ${open ? "isOpen" : ""}`} aria-hidden={!open}>
      <button className="drawerBackdrop" aria-label="Close bag" onClick={onClose} />
      <aside className="cartDrawer" role="dialog" aria-modal="true" aria-label="Shopping bag">
        <div className="cartHeader">
          <div>
            <p className="eyebrow">Your selection</p>
            <h2>Shopping bag <span>({items.length})</span></h2>
          </div>
          <button className="closeButton" onClick={onClose} aria-label="Close bag">×</button>
        </div>
        <div className="shippingProgress">
          <p>{subtotal >= 150 ? "Complimentary shipping unlocked" : `${formatMoney(150 - subtotal)} away from complimentary shipping`}</p>
          <span><i style={{ width: `${Math.min(100, subtotal / 1.5)}%` }} /></span>
        </div>
        <div className="cartItems">
          {items.length === 0 ? (
            <div className="emptyCart">
              <span>◇</span>
              <h3>Your bag is waiting</h3>
              <p>Discover pieces made for everyday rituals.</p>
              <Link href="/shop" onClick={onClose} className="button dark">Explore jewelry</Link>
            </div>
          ) : items.map((item) => (
            <article className="cartItem" key={item.key}>
              <Link href={`/products/${item.product.handle}`} onClick={onClose}>
                <Image src={item.product.images[0]} alt="" width={150} height={180} />
              </Link>
              <div>
                <div className="cartItemTop">
                  <h3>{item.product.title}</h3>
                  <button onClick={() => removeItem(item.key)} aria-label={`Remove ${item.product.title}`}>×</button>
                </div>
                <p>{Object.values(item.variant.selectedOptions).join(" · ") || "One size"}</p>
                <div className="cartItemBottom">
                  <div className="quantity">
                    <button onClick={() => updateQuantity(item.key, item.quantity - 1)} aria-label="Decrease quantity">−</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.key, item.quantity + 1)} aria-label="Increase quantity">+</button>
                  </div>
                  <strong>{formatMoney(item.variant.price * item.quantity, item.product.currency)}</strong>
                </div>
              </div>
            </article>
          ))}
        </div>
        {items.length > 0 && (
          <div className="cartFooter">
            <div><span>Subtotal</span><strong>{formatMoney(subtotal)}</strong></div>
            <p>Taxes and shipping calculated at checkout.</p>
            <button className="button dark wide">Continue to checkout <span>→</span></button>
          </div>
        )}
      </aside>
    </div>
  );
}
