// Snapshots the WooCommerce catalogue into data/products.json (run: npm run sync:products)
import { writeFileSync, mkdirSync } from "node:fs";

const BASE = "https://tochtstrippen.nl/wp-json/wc/store/v1";
const strip = (h = "") =>
  h.replace(/<br\s*\/?>|<\/p>|<\/li>/g, "\n").replace(/<[^>]+>/g, "")
   .replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&#8217;/g, "'")
   .replace(/&#8243;|&quot;/g, '"').replace(/&euro;/g, "€")
   .replace(/&#8211;|&#8212;/g, "–").replace(/&#215;/g, "×").replace(/&#176;/g, "°")
   .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(+n))
   .split("\n").map((l) => l.trim()).filter(Boolean).join("\n");

const all = [];
for (let page = 1; ; page++) {
  const res = await fetch(`${BASE}/products?per_page=100&page=${page}`);
  const batch = await res.json();
  if (!Array.isArray(batch) || !batch.length) break;
  all.push(...batch);
  if (batch.length < 100) break;
}
const products = all.map((p) => ({
  id: p.id,
  slug: p.slug,
  name: strip(p.name),
  sku: p.sku,
  price: Number(p.prices.price),
  short: strip(p.short_description),
  description: strip(p.description),
  inStock: p.is_in_stock,
  purchasable: p.is_purchasable && Number(p.prices.price) > 0,
  images: p.images.map((i) => ({ src: i.src, thumb: i.thumbnail, alt: i.alt || p.name })),
  categories: p.categories.map((c) => c.slug),
  url: p.permalink,
}));
mkdirSync("data", { recursive: true });
writeFileSync("data/products.json", JSON.stringify(products, null, 1));
console.log(`${products.length} products`);
