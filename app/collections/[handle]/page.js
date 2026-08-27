import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ProductGrid } from "@/components/products/ProductGrid";
import { getCollection } from "@/lib/shopify/products";

const copy = {
  rings: "Sculptural bands and signets, made to stack and keep.",
  necklaces: "Quiet details designed to sit close to the heart.",
  earrings: "Small points of light for every day and after dark.",
  bracelets: "Fluid forms made to move with you."
};

export async function generateMetadata({ params }) {
  const { handle } = await params;
  const title = handle.charAt(0).toUpperCase() + handle.slice(1);
  return { title, description: copy[handle] || `Shop ${title} by Maison Lune.` };
}

export default async function CollectionPage({ params }) {
  const { handle } = await params;
  const products = await getCollection(handle);
  if (!products.length) notFound();
  const title = handle.charAt(0).toUpperCase() + handle.slice(1);

  return (
    <div className="listingPage">
      <Breadcrumbs items={[{ label: title }]} />
      <header className="listingHero compact">
        <p className="eyebrow">The collection</p>
        <h1>{title}</h1>
        <p>{copy[handle]}</p>
      </header>
      <ProductGrid products={products} showControls={false} />
    </div>
  );
}
