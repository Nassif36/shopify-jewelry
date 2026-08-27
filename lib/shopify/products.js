import { fallbackProducts } from "@/data/fallback-products";
import { isShopifyConfigured, shopifyFetch } from "./client";
import { PRODUCTS_QUERY } from "./queries";

function normalizeProduct(product) {
  const variants = product.variants.nodes.map((variant) => ({
    id: variant.id,
    title: variant.title,
    available: variant.availableForSale,
    price: Number(variant.price.amount),
    selectedOptions: Object.fromEntries(
      variant.selectedOptions.map(({ name, value }) => [name, value])
    )
  }));

  return {
    id: product.id,
    handle: product.handle,
    title: product.title,
    description: product.description,
    price: Number(product.priceRange.minVariantPrice.amount),
    compareAtPrice: Number(product.compareAtPriceRange.minVariantPrice.amount) || null,
    currency: product.priceRange.minVariantPrice.currencyCode,
    images: product.images.nodes.map((item) => item.url),
    variants,
    available: product.availableForSale,
    tags: product.tags,
    vendor: product.vendor,
    productType: product.productType,
    options: product.options.filter((option) => option.name !== "Title"),
    collection: product.productType.toLowerCase()
  };
}

export async function getProducts() {
  if (!isShopifyConfigured) return fallbackProducts;

  try {
    const data = await shopifyFetch({
      query: PRODUCTS_QUERY,
      variables: { first: 50 }
    });
    return data.products.nodes.map(normalizeProduct);
  } catch (error) {
    console.error("Shopify catalog unavailable:", error.message);
    return fallbackProducts;
  }
}

export async function getProduct(handle) {
  const products = await getProducts();
  return products.find((product) => product.handle === handle) || null;
}

export async function getCollection(handle) {
  const products = await getProducts();
  return products.filter(
    (product) =>
      product.collection === handle ||
      product.productType.toLowerCase() === handle
  );
}
