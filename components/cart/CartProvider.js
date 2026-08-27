"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { CartDrawer } from "./CartDrawer";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("maison-lune-cart");
      if (stored) setItems(JSON.parse(stored));
    } catch {
      localStorage.removeItem("maison-lune-cart");
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem("maison-lune-cart", JSON.stringify(items));
  }, [items, hydrated]);

  function addItem(product, variant, quantity = 1) {
    setItems((current) => {
      const key = `${product.id}:${variant.id}`;
      const existing = current.find((item) => item.key === key);
      if (existing) {
        return current.map((item) =>
          item.key === key ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...current, { key, product, variant, quantity }];
    });
    setOpen(true);
  }

  function updateQuantity(key, quantity) {
    if (quantity < 1) {
      setItems((current) => current.filter((item) => item.key !== key));
      return;
    }
    setItems((current) =>
      current.map((item) => item.key === key ? { ...item, quantity } : item)
    );
  }

  const value = useMemo(() => ({
    items,
    count: items.reduce((sum, item) => sum + item.quantity, 0),
    subtotal: items.reduce((sum, item) => sum + item.variant.price * item.quantity, 0),
    addItem,
    updateQuantity,
    removeItem: (key) => setItems((current) => current.filter((item) => item.key !== key)),
    openCart: () => setOpen(true)
  }), [items]);

  return (
    <CartContext.Provider value={value}>
      {children}
      <CartDrawer open={open} onClose={() => setOpen(false)} />
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider.");
  return context;
}
