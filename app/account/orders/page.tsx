"use client";

import Image from "next/image";
import Link from "next/link";
import { AccountShell } from "@/components/account-shell";
import { mockOrders, orderTotal, statusLabel } from "@/lib/mock-account";
import { formatPrice, products } from "@/lib/products";
import { useCart } from "@/components/cart";

export default function Orders() {
  const { add } = useCart();
  return (
    <AccountShell title="Bestellingen">
      <div className="space-y-4">
        {mockOrders.map((o, i) => {
          const items = o.lines.flatMap((l) => { const p = products.find((x) => x.id === l.id); return p ? [{ p, qty: l.qty }] : []; });
          const total = orderTotal(o.lines);
          return (
            <details key={o.id} open={i === 0} className="group rounded-[2rem] bg-white ring-1 ring-black/5">
              <summary className="flex flex-wrap items-center justify-between gap-4 p-6">
                <div>
                  <p className="display text-2xl text-navy">#{o.id}</p>
                  <p className="text-sm text-ink-soft">{new Date(o.date).toLocaleDateString("nl-NL", { day: "numeric", month: "long", year: "numeric" })}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`rounded-full px-3 py-1 text-xs font-bold ${statusLabel[o.status].c}`}>{statusLabel[o.status].l}</span>
                  <span className="font-bold text-navy">{formatPrice(total)}</span>
                  <span className="chev text-xl text-brand transition">+</span>
                </div>
              </summary>
              <div className="border-t border-line p-6">
                <ul className="divide-y divide-line">
                  {items.map(({ p, qty }) => (
                    <li key={p.id} className="flex items-center gap-4 py-3">
                      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-[#ece6d8]">
                        {p.images[0] && <Image src={p.images[0].thumb} alt="" fill sizes="56px" className="object-contain p-1 mix-blend-multiply" />}
                      </div>
                      <Link href={`/product/${p.slug}`} className="flex-1 text-sm font-semibold text-navy hover:underline">{qty}× {p.name}</Link>
                      <span className="text-sm font-semibold">{formatPrice(p.price * qty)}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                  {o.track ? <p className="text-sm text-ink-soft">📦 Track &amp; trace: <b className="text-navy">{o.track}</b></p> : <span />}
                  <button onClick={() => items.forEach(({ p, qty }) => add(p.id, qty))} className="btn btn-primary h-11">Opnieuw bestellen</button>
                </div>
              </div>
            </details>
          );
        })}
      </div>
    </AccountShell>
  );
}
