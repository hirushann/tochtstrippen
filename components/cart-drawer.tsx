"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { useCart } from "./cart";
import { formatPrice, products } from "@/lib/products";
import { FREE_SHIPPING_FROM } from "@/lib/order";

export function CartDrawer() {
  const { lines, setQty, open, setOpen } = useCart();
  const panel = useRef<HTMLElement>(null);

  const items = products.filter((p) => lines[p.id]);
  const subtotal = items.reduce((s, p) => s + p.price * lines[p.id], 0);
  const missing = Math.max(0, FREE_SHIPPING_FROM - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_FROM) * 100);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    panel.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, setOpen]);

  return (
    <div className={`fixed inset-0 z-50 ${open ? "" : "pointer-events-none"}`} aria-hidden={!open}>
      <div onClick={() => setOpen(false)} className={`absolute inset-0 bg-navy-deep/60 backdrop-blur-sm transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`} />
      <aside
        ref={panel} tabIndex={-1} role="dialog" aria-modal="true" aria-label="Winkelwagen"
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-2xl outline-none transition-transform duration-300 ease-out ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between border-b border-line px-6 py-5">
          <h2 className="text-lg font-extrabold text-navy">Winkelwagen</h2>
          <button onClick={() => setOpen(false)} aria-label="Sluiten" className="grid h-10 w-10 place-items-center rounded-full hover:bg-mist">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden><path d="M6 6l12 12M18 6 6 18" /></svg>
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
            <p className="text-ink-soft">Je winkelwagen is leeg.</p>
            <Link href="/shop" onClick={() => setOpen(false)} className="btn btn-primary mt-6 h-12 px-7">Naar de winkel</Link>
          </div>
        ) : (
          <>
            <div className="border-b border-line bg-mist px-6 py-4 text-sm">
              <p className="font-medium text-navy">
                {missing ? <>Nog <b>{formatPrice(missing)}</b> tot gratis verzending</> : "Je krijgt gratis verzending 🎉"}
              </p>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-line"><div className="h-full rounded-full bg-brand transition-all" style={{ width: `${progress}%` }} /></div>
            </div>
            <ul className="flex-1 divide-y divide-line overflow-y-auto px-6">
              {items.map((p) => (
                <li key={p.id} className="flex gap-4 py-5">
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-mist">
                    {p.images[0] && <Image src={p.images[0].thumb} alt="" fill sizes="80px" className="object-contain p-2" />}
                  </div>
                  <div className="flex flex-1 flex-col">
                    <Link href={`/product/${p.slug}`} onClick={() => setOpen(false)} className="text-sm font-semibold leading-snug text-navy">{p.name}</Link>
                    <p className="mt-1 text-sm text-ink-soft">{formatPrice(p.price)}</p>
                    <div className="mt-auto flex items-center justify-between pt-2">
                      <div className="inline-flex items-center rounded-full border border-line">
                        <button aria-label="Minder" className="h-9 w-9" onClick={() => setQty(p.id, lines[p.id] - 1)}>−</button>
                        <span className="w-6 text-center text-sm font-semibold tabular-nums">{lines[p.id]}</span>
                        <button aria-label="Meer" className="h-9 w-9" onClick={() => setQty(p.id, lines[p.id] + 1)}>+</button>
                      </div>
                      <button onClick={() => setQty(p.id, 0)} className="text-xs text-ink-soft underline hover:text-navy">Verwijder</button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="border-t border-line px-6 py-5">
              <div className="flex justify-between text-lg font-extrabold text-navy"><span>Subtotaal</span><span>{formatPrice(subtotal)}</span></div>
              <p className="mt-1 text-xs text-ink-soft">Incl. BTW. Verzendkosten worden bij het afrekenen berekend.</p>
              <Link href="/checkout" onClick={() => setOpen(false)} className="btn btn-primary mt-4 h-12 w-full">Afrekenen</Link>
              <button onClick={() => setOpen(false)} className="mt-3 w-full text-sm text-ink-soft hover:text-navy">Verder winkelen</button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
