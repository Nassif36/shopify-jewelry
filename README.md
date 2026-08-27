# Maison Lune

A premium Next.js jewelry storefront with a Shopify Storefront API data layer and a local demo catalog.

## Run locally

```bash
npm install
npm run dev
```

Copy `.env.example` to `.env.local` to connect Shopify. Without Shopify credentials, the same UI automatically uses the fallback catalog in `data/fallback-products.js`.

## Commerce data

Server-side Shopify requests live in `lib/shopify`. Components consume normalized product objects rather than raw GraphQL responses. Cart state is isolated behind `CartProvider` so Shopify's Cart API can replace local persistence without changing product UI.

The `liquid` directory contains portable Shopify theme examples; the primary storefront remains a Next.js application.
