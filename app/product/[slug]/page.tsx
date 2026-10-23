import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { categoryLabel, formatPrice, getProduct, parseText, products, related } from "@/lib/products";
import { AddToCart } from "@/components/add-to-cart";
import { Gallery } from "@/components/gallery";
import { ProductCard } from "@/components/product-card";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/product/[slug]">): Promise<Metadata> {
  const p = getProduct((await params).slug);
  return p ? { title: p.name, description: parseText(p).text[0]?.slice(0, 160) ?? p.name, openGraph: { images: p.images[0]?.src } } : {};
}

const perks = [
  { t: "10 jaar garantie", d: "Op originele Q-lon", i: "M12 3 4 6v6c0 4.5 3.2 7.7 8 9 4.8-1.3 8-4.5 8-9V6z" },
  { t: "Gratis vanaf €100", d: "Anders €6,95 via GLS", i: "M3 7h11v9H3zM14 10h4l3 3v3h-7M7 19a1.5 1.5 0 1 0 0-.01M17 19a1.5 1.5 0 1 0 0-.01" },
  { t: "30 dagen retour", d: "Particulier: 100% terug", i: "M4 12a8 8 0 1 0 3-6.3M4 4v4h4" },
];

export default async function ProductPage({ params }: PageProps<"/product/[slug]">) {
  const p = getProduct((await params).slug);
  if (!p) notFound();
  const more = related(p);
  const { specs, text } = parseText(p);

  const jsonLd = {
    "@context": "https://schema.org", "@type": "Product", name: p.name, sku: p.sku, image: p.images.map((i) => i.src),
    description: text[0] ?? p.name, brand: { "@type": "Brand", name: "Q-lon" },
    offers: !p.purchasable ? undefined : { "@type": "Offer", priceCurrency: "EUR", price: (p.price / 100).toFixed(2), availability: p.inStock && p.purchasable ? "https://schema.org/InStock" : "https://schema.org/OutOfStock", url: `https://tochtstrippen.nl/product/${p.slug}` },
  };

  return (
    <div className="container-x pb-24 pt-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav className="text-sm text-ink-soft" aria-label="Kruimelpad">
        <Link href="/shop" className="font-semibold text-navy hover:underline">← Winkel</Link>
        <span className="mx-2">/</span>{categoryLabel(p)}
      </nav>

      <div className="mt-6 grid items-start gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <Gallery images={p.images} name={p.name} />

        <div className="lg:sticky lg:top-28">
          <p className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-navy ring-1 ring-black/10">{categoryLabel(p)} · Art. {p.sku}</p>
          <h1 className="display mt-5 text-4xl leading-[1.05] text-navy sm:text-5xl">{p.name}</h1>
          <div className="mt-6 flex flex-wrap items-baseline gap-x-4 gap-y-2">
            <p className="display text-5xl text-navy">{p.purchasable ? formatPrice(p.price) : "Op aanvraag"}</p>
            {p.purchasable && <span className="text-sm text-ink-soft">incl. BTW</span>}
            <span className={`ml-auto inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold ${p.inStock ? "bg-emerald-100 text-emerald-800" : "bg-black/5 text-ink-soft"}`}>
              <span className={`h-1.5 w-1.5 rounded-full ${p.inStock ? "bg-emerald-600" : "bg-ink-soft"}`} />{p.inStock ? "Op voorraad" : "Niet op voorraad"}
            </span>
          </div>
          {p.purchasable && <p className="mt-1 text-xs text-ink-soft">Let op: prijs excl. 7% tijdelijke materiaaltoeslag.</p>}

          <div className="mt-8 max-w-md">
            {p.purchasable ? <AddToCart id={p.id} large /> : <Link href="/contact" className="btn btn-primary h-12 w-full">Prijs opvragen</Link>}
          </div>
          <Link href="/#rekenhulp" className="mt-4 inline-block text-sm font-semibold text-brand underline underline-offset-4">Hoeveel meter heb ik nodig?</Link>

          <ul className="mt-10 grid grid-cols-3 gap-2.5">
            {perks.map((k) => (
              <li key={k.t} className="rounded-2xl bg-white p-3.5 ring-1 ring-black/5">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2864e2" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d={k.i} /></svg>
                <p className="mt-2 text-sm font-bold text-navy">{k.t}</p>
                <p className="text-xs text-ink-soft">{k.d}</p>
              </li>
            ))}
          </ul>

          <div className="mt-10 divide-y divide-line border-y border-line">
            {text.length > 0 && (
              <details open className="py-4">
                <summary className="flex items-center justify-between font-bold text-navy">Omschrijving<span className="chev text-xl text-brand transition">+</span></summary>
                <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-ink-soft">{text.map((t) => <p key={t}>{t}</p>)}</div>
              </details>
            )}
            {specs.length > 0 && (
              <details open className="py-4">
                <summary className="flex items-center justify-between font-bold text-navy">Specificaties<span className="chev text-xl text-brand transition">+</span></summary>
                <dl className="mt-3 divide-y divide-line text-sm">
                  {specs.map(([k, v]) => <div key={k} className="flex justify-between gap-6 py-2.5"><dt className="text-ink-soft">{k}</dt><dd className="text-right font-semibold text-navy">{v}</dd></div>)}
                </dl>
              </details>
            )}
            <details className="py-4">
              <summary className="flex items-center justify-between font-bold text-navy">Verzending &amp; retour<span className="chev text-xl text-brand transition">+</span></summary>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">Binnen NL en BE €6,95 verzendkosten, gratis boven €100 voor particulieren. Retourneren kan binnen 30 dagen, mits ongebruikt. <Link href="/retourneren" className="font-semibold text-brand underline">Alle voorwaarden</Link>.</p>
            </details>
          </div>
        </div>
      </div>

      {more.length > 0 && (
        <section className="mt-28">
          <h2 className="display text-4xl text-navy sm:text-5xl">Past <em className="!text-brand">hierbij</em></h2>
          <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4 lg:gap-x-6">{more.map((r) => <ProductCard key={r.id} product={r} />)}</div>
        </section>
      )}
    </div>
  );
}
