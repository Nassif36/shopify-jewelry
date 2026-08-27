import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ProductDetail } from "@/components/products/ProductDetail";
import { ProductGrid } from "@/components/products/ProductGrid";
import { getProduct, getProducts } from "@/lib/shopify/products";

export async function generateMetadata({ params }) {
  const { handle } = await params;
  const product = await getProduct(handle);
  if (!product) return {};
  return {
    title: product.title,
    description: product.description,
    alternates: { canonical: `/products/${product.handle}` },
    openGraph: { images: [{ url: product.images[0] }] }
  };
}

export default async function ProductPage({ params }) {
  const { handle } = await params;
  const [product, products] = await Promise.all([getProduct(handle), getProducts()]);
  if (!product) notFound();

  const related = products.filter((item) => item.id !== product.id && item.productType === product.productType).slice(0, 4);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    image: product.images,
    description: product.description,
    brand: { "@type": "Brand", name: product.vendor },
    offers: {
      "@type": "Offer",
      priceCurrency: product.currency,
      price: product.price,
      availability: product.available ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
    }
  };

  return (
    <div className="productPage">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <Breadcrumbs items={[
        { label: product.productType, href: `/collections/${product.collection}` },
        { label: product.title }
      ]} />
      <ProductDetail product={product} />
      {related.length > 0 && <ProductGrid products={related} title="You may also like" showControls={false} />}
    </div>
  );
}
