"use client";

import { useMemo, useState } from "react";
import { applications, categories, type Product } from "@/lib/products";
import { ProductCard } from "./product-card";

const sorts = [
  { v: "default", l: "Aanbevolen" },
  { v: "asc", l: "Prijs: laag naar hoog" },
  { v: "desc", l: "Prijs: hoog naar laag" },
  { v: "name", l: "Naam A–Z" },
] as const;

export function ShopGrid({ products, initial }: { products: Product[]; initial: string }) {
  const [cat, setCat] = useState(initial);
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<(typeof sorts)[number]["v"]>("default");

  const pick = (slug: string) => {
    setCat(slug);
    window.history.replaceState(null, "", slug === "all" ? "/shop" : `/shop?c=${slug}`);
  };

  const list = useMemo(() => {
    const out = products.filter(
      (p) => (cat === "all" || p.categories.includes(cat)) && (!q || `${p.name} ${p.sku}`.toLowerCase().includes(q.toLowerCase())),
    );
    if (sort === "default") out.sort((a, b) => +a.categories.includes("accessoires") - +b.categories.includes("accessoires"));
    if (sort === "asc") out.sort((a, b) => a.price - b.price);
    if (sort === "desc") out.sort((a, b) => b.price - a.price);
    if (sort === "name") out.sort((a, b) => a.name.localeCompare(b.name, "nl", { numeric: true }));
    return out;
  }, [products, cat, q, sort]);

  const count = (slug: string) => products.filter((p) => p.categories.includes(slug)).length;
  const chip = (active: boolean) =>
    `shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold transition ${active ? "bg-navy text-white shadow-lg shadow-navy/20" : "bg-white text-ink ring-1 ring-black/10 hover:ring-navy"}`;

  return (
    <>
      <div className="sticky top-22 z-30 -mx-5 bg-paper/85 px-5 py-4 backdrop-blur-xl sm:-mx-8 sm:px-8">
        <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Categorieën">
          <button role="tab" aria-selected={cat === "all"} className={chip(cat === "all")} onClick={() => pick("all")}>Alles <span className="opacity-60">{products.length}</span></button>
          {categories.map((c) => (
            <button key={c.slug} role="tab" aria-selected={cat === c.slug} className={chip(cat === c.slug)} onClick={() => pick(c.slug)}>{c.label} <span className="opacity-60">{count(c.slug)}</span></button>
          ))}
          <span className="mx-1 w-px shrink-0 self-stretch bg-navy/15" aria-hidden />
          {applications.map((c) => (
            <button key={c.slug} role="tab" aria-selected={cat === c.slug} className={chip(cat === c.slug)} onClick={() => pick(c.slug)}>{c.label}</button>
          ))}
        </div>
        <div className="mt-3 flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <svg className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-soft" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
            <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Zoek op naam of artikelnummer" aria-label="Zoeken" className="h-12 w-full rounded-full border-0 bg-white pl-11 pr-5 text-sm ring-1 ring-black/10" />
          </div>
          <select value={sort} onChange={(e) => setSort(e.target.value as typeof sort)} aria-label="Sorteren" className="h-12 rounded-full border-0 bg-white px-5 text-sm font-semibold ring-1 ring-black/10">
            {sorts.map((s) => <option key={s.v} value={s.v}>{s.l}</option>)}
          </select>
        </div>
      </div>

      <p className="mt-6 text-sm font-medium text-ink-soft" aria-live="polite">{list.length} {list.length === 1 ? "product" : "producten"}</p>
      <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4 lg:gap-x-6">
        {list.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
      {!list.length && (
        <div className="py-24 text-center">
          <p className="display text-3xl text-navy">Niets gevonden</p>
          <p className="mt-2 text-ink-soft">Probeer een andere zoekterm of categorie.</p>
          <button onClick={() => { setQ(""); pick("all"); }} className="btn btn-primary mt-6 h-12 px-7">Alles tonen</button>
        </div>
      )}
    </>
  );
}
