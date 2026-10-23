import { Suspense } from "react";
import type { Metadata } from "next";
import { products } from "@/lib/products";
import { ShopGrid } from "@/components/shop-grid";

export const metadata: Metadata = { title: "Winkel" };

async function Grid({ searchParams }: { searchParams: Promise<{ c?: string }> }) {
  const { c } = await searchParams;
  return <ShopGrid products={products} initial={c ?? "all"} />;
}

export default function Shop({ searchParams }: PageProps<"/shop">) {
  return (
    <>
      <section className="container-x pt-14 pb-4 sm:pt-20">
        <p className="eyebrow">De winkel</p>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-6">
          <h1 className="display max-w-3xl text-5xl leading-[1] text-navy sm:text-7xl">Q-lon tochtstrips &amp; <em className="!text-brand">Schlegel</em> borstels</h1>
          <p className="max-w-xs text-ink-soft">Vakkundig advies, de grootste voorraad en de snelste levertijden. Ook voor zakelijke afnemers.</p>
        </div>
      </section>
      <div className="container-x pb-24">
        <Suspense fallback={<p className="py-20 text-center text-ink-soft">Laden…</p>}>
          <Grid searchParams={searchParams as Promise<{ c?: string }>} />
        </Suspense>
      </div>
    </>
  );
}
