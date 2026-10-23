"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "./cart";
import { formatPrice, products } from "@/lib/products";
import { FREE_SHIPPING_FROM, SHIPPING } from "@/lib/order";

const field = "mt-1.5 w-full rounded-2xl border border-line bg-white px-4 py-3 text-[15px]";

export function CheckoutForm() {
  const { lines } = useCart();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const items = products.filter((p) => lines[p.id]);
  const subtotal = items.reduce((s, p) => s + p.price * lines[p.id], 0);
  const shipping = subtotal >= FREE_SHIPPING_FROM ? 0 : SHIPPING;

  if (!items.length) {
    return (
      <div className="py-20 text-center">
        <p className="text-ink-soft">Je winkelwagen is leeg.</p>
        <Link href="/shop" className="btn btn-primary mt-6 h-12 px-7">Naar de winkel</Link>
      </div>
    );
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const customer = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customer, lines: items.map((p) => ({ id: p.id, qty: lines[p.id] })) }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      window.location.href = data.checkoutUrl;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Er ging iets mis.");
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} className="mt-10 grid gap-10 lg:grid-cols-[1fr_24rem]">
      <div className="space-y-5">
        <h2 className="text-xl font-bold text-navy">Gegevens</h2>
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="text-sm font-semibold sm:col-span-2">Naam<input required name="name" autoComplete="name" className={field} /></label>
          <label className="text-sm font-semibold">E-mail<input required type="email" name="email" autoComplete="email" className={field} /></label>
          <label className="text-sm font-semibold">Telefoon<input name="phone" type="tel" autoComplete="tel" className={field} /></label>
          <label className="text-sm font-semibold sm:col-span-2">Straat en huisnummer<input required name="street" autoComplete="street-address" className={field} /></label>
          <label className="text-sm font-semibold">Postcode<input required name="postcode" autoComplete="postal-code" className={field} /></label>
          <label className="text-sm font-semibold">Plaats<input required name="city" autoComplete="address-level2" className={field} /></label>
          <label className="text-sm font-semibold">Land
            <select name="country" className={field} defaultValue="NL"><option value="NL">Nederland</option><option value="BE">België</option></select>
          </label>
          <label className="text-sm font-semibold">Bedrijfsnaam (optioneel)<input name="company" autoComplete="organization" className={field} /></label>
        </div>
        <p className="text-sm text-ink-soft">Je kiest je betaalmethode (iDEAL, creditcard, Bancontact, …) op de volgende, beveiligde pagina van Mollie.</p>
      </div>

      <aside className="h-fit rounded-3xl bg-mist p-7">
        <h2 className="font-bold text-navy">Je bestelling</h2>
        <ul className="mt-5 space-y-4">
          {items.map((p) => (
            <li key={p.id} className="flex items-center gap-3 text-sm">
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-white">
                {p.images[0] && <Image src={p.images[0].thumb} alt="" fill sizes="48px" className="object-contain p-1" />}
              </div>
              <span className="flex-1 leading-snug">{lines[p.id]}× {p.name}</span>
              <span className="font-semibold">{formatPrice(p.price * lines[p.id])}</span>
            </li>
          ))}
        </ul>
        <dl className="mt-5 space-y-2 border-t border-line pt-5 text-sm">
          <div className="flex justify-between"><dt>Subtotaal</dt><dd>{formatPrice(subtotal)}</dd></div>
          <div className="flex justify-between"><dt>Verzending</dt><dd>{shipping ? formatPrice(shipping) : "Gratis"}</dd></div>
          <div className="flex justify-between pt-2 text-lg font-extrabold text-navy"><dt>Totaal incl. BTW</dt><dd>{formatPrice(subtotal + shipping)}</dd></div>
        </dl>
        {error && <p role="alert" className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
        <button disabled={busy} className="btn btn-primary mt-6 h-12 w-full disabled:opacity-60">{busy ? "Even geduld…" : "Betalen"}</button>
      </aside>
    </form>
  );
}
