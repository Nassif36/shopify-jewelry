import Image from "next/image";
import Link from "next/link";
import { HeroSlider } from "@/components/hero/HeroSlider";
import { EditorialCollections } from "@/components/collections/EditorialCollections";
import { ProductGrid } from "@/components/products/ProductGrid";
import { getProducts } from "@/lib/shopify/products";
import { isShopifyConfigured } from "@/lib/shopify/client";

export default async function HomePage() {
  const products = await getProducts();

  return (
    <>
      {!isShopifyConfigured && process.env.NODE_ENV === "development" && <div className="demoBadge">Demo catalog</div>}
      <HeroSlider />
      <section className="brandStatement">
        <p className="eyebrow">Maison Lune, Paris</p>
        <h2>Pieces with presence,<br /><em>made for your rhythm.</em></h2>
        <p>We believe jewelry should feel personal from the first wear—beautifully made, effortless to live in, and full of quiet meaning.</p>
      </section>
      <EditorialCollections />
      <ProductGrid products={products} title="The current edit" showControls={false} />
      <section className="editorialFeature">
        <div className="editorialFeatureImage">
          <Image src="https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=1800&q=90" alt="Gold jewelry styled on a hand" fill sizes="(max-width: 800px) 100vw, 55vw" />
        </div>
        <div className="editorialFeatureCopy">
          <p className="eyebrow">The journal · 01</p>
          <h2>A study in<br /><em>soft light.</em></h2>
          <p>Behind the making of Solstice—our newest collection inspired by the warmth that stays after sunset.</p>
          <Link href="/collections/necklaces" className="textLink">Read the story <span>↗</span></Link>
        </div>
      </section>
    </>
  );
}
