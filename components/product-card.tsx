import Image from "next/image";
import Link from "next/link";
import { categoryLabel, formatPrice, type Product } from "@/lib/products";
import { QuickAdd } from "./quick-add";

export function ProductCard({ product }: { product: Product }) {
  const [a, b] = product.images;
  return (
    <article className="group relative flex flex-col">
      <Link href={`/product/${product.slug}`} className="relative block aspect-square overflow-hidden rounded-[1.75rem] bg-[#ece6d8] ring-1 ring-black/5 transition duration-500 group-hover:shadow-[0_24px_50px_-24px_rgba(11,5,71,0.45)]">
        {a && <Image src={a.thumb} alt={a.alt} fill sizes="(min-width:1024px) 25vw, 50vw" className={`object-contain p-7 mix-blend-multiply transition duration-500 ${b ? "group-hover:opacity-0" : "group-hover:scale-105"}`} />}
        {b && <Image src={b.thumb} alt="" fill sizes="(min-width:1024px) 25vw, 50vw" className="object-contain p-7 opacity-0 mix-blend-multiply transition duration-500 group-hover:opacity-100" />}
        <span className="absolute left-4 top-4 rounded-full bg-white/80 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-navy backdrop-blur">{categoryLabel(product)}</span>
      </Link>
      <div className="mt-4 flex items-start justify-between gap-3 px-1">
        <div className="min-w-0">
          <h3 className="text-[15px] font-semibold leading-snug text-ink"><Link href={`/product/${product.slug}`} className="after:absolute after:inset-x-0 after:top-0 after:aspect-square">{product.name}</Link></h3>
          <p className="display mt-1.5 text-2xl text-navy">{product.purchasable ? formatPrice(product.price) : "Op aanvraag"}</p>
        </div>
        {product.purchasable ? <QuickAdd id={product.id} name={product.name} /> : (
          <Link href="/contact" aria-label="Prijs opvragen" className="relative z-10 grid h-11 w-11 shrink-0 place-items-center rounded-full border border-navy/20 text-navy transition hover:bg-navy hover:text-white">→</Link>
        )}
      </div>
    </article>
  );
}
