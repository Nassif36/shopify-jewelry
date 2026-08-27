import { ProductGrid } from "@/components/products/ProductGrid";
import { getProducts } from "@/lib/shopify/products";

export const metadata = {
  title: "Shop all jewelry",
  description: "Explore rings, necklaces, earrings and bracelets by Maison Lune."
};

export default async function ShopPage() {
  const products = await getProducts();
  return (
    <div className="listingPage">
      <header className="listingHero">
        <p className="eyebrow">The collection</p>
        <h1>Jewelry for the<br /><em>moments in between.</em></h1>
        <p>Considered pieces in softly sculptural forms, designed to become part of your everyday.</p>
      </header>
      <ProductGrid products={products} />
    </div>
  );
}
