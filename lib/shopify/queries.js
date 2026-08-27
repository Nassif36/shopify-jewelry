export const PRODUCTS_QUERY = `#graphql
  query Products($first: Int!) {
    products(first: $first, sortKey: CREATED_AT, reverse: true) {
      nodes {
        id
        handle
        title
        description
        vendor
        productType
        tags
        availableForSale
        featuredImage { url altText width height }
        images(first: 8) { nodes { url altText width height } }
        priceRange { minVariantPrice { amount currencyCode } }
        compareAtPriceRange { minVariantPrice { amount currencyCode } }
        options { name values }
        variants(first: 50) {
          nodes {
            id
            title
            availableForSale
            price { amount currencyCode }
            selectedOptions { name value }
          }
        }
      }
    }
  }
`;
