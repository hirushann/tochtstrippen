import data from "@/data/products.json";

export type Product = {
  id: number;
  slug: string;
  name: string;
  sku: string;
  price: number; // cents, incl. BTW
  short: string;
  description: string;
  inStock: boolean;
  purchasable: boolean; // false for 'price on request' / variable products
  images: { src: string; thumb: string; alt: string }[];
  categories: string[];
  url: string;
};

export const products = data as Product[];

export const categories = [
  { slug: "zelfklevende-tochtstrippen", label: "Zelfklevend", blurb: "Plak-en-klaar, ideaal voor ramen en deuren." },
  { slug: "brandvertragende-tochtstrip", label: "Brandvertragend", blurb: "FR-profielen voor veilige toepassingen." },
  { slug: "q-lon-kaderprofiel", label: "Kaderprofielen", blurb: "Voor hout, aluminium en kunststof kozijnen." },
  { slug: "accessoires", label: "Accessoires", blurb: "Hoekjes, tangen, afdekkappen en gereedschap." },
] as const;

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);

export const formatPrice = (cents: number) =>
  new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR" }).format(cents / 100);

export const related = (p: Product, n = 4) =>
  products
    .filter((o) => o.id !== p.id && o.categories.some((c) => p.categories.includes(c) && c !== "tochtstrip"))
    .slice(0, n);

export const applications = [
  { slug: "kaderprofiel-voor-houten-toepassing", label: "Hout" },
  { slug: "kaderprofiel-voor-aluminium-toepassing", label: "Aluminium" },
  { slug: "kaderprofiel-voor-binnendeuren-toepassing", label: "Binnendeur" },
  { slug: "kaderprofiel-voor-buitendeuren", label: "Buitendeur" },
] as const;

export const categoryLabel = (p: Product) =>
  categories.find((c) => p.categories.includes(c.slug))?.label ??
  applications.find((c) => p.categories.includes(c.slug))?.label ??
  "Q-lon";

/** Splits product text into "Key: value" spec rows and free-text lines. */
export function parseText(p: Product) {
  const specs: [string, string][] = [];
  const text: string[] = [];
  for (const line of `${p.short}\n${p.description}`.split("\n").map((l) => l.trim()).filter(Boolean)) {
    const m = line.match(/^([^:]{2,32}):\s*(.{1,60})$/);
    if (m) specs.push([m[1], m[2]]);
    else if (!text.includes(line)) text.push(line);
  }
  return { specs, text };
}
