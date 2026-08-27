const domain = process.env.SHOPIFY_STORE_DOMAIN;
const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const version = process.env.SHOPIFY_API_VERSION || "2025-07";

export const isShopifyConfigured = Boolean(domain && token);

export async function shopifyFetch({ query, variables = {} }) {
  if (!isShopifyConfigured) {
    throw new Error("Shopify environment variables are not configured.");
  }

  const response = await fetch(
    `https://${domain}/api/${version}/graphql.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": token
      },
      body: JSON.stringify({ query, variables }),
      next: { revalidate: 300 }
    }
  );

  const payload = await response.json();
  if (!response.ok || payload.errors) {
    throw new Error(payload.errors?.[0]?.message || "Shopify request failed.");
  }

  return payload.data;
}
