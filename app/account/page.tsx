"use client";

import Link from "next/link";
import { useAuth } from "@/components/auth";
import { AccountShell } from "@/components/account-shell";
import { mockOrders, orderTotal, statusLabel } from "@/lib/mock-account";
import { formatPrice } from "@/lib/products";

export default function Account() {
  const { user } = useAuth();
  const last = mockOrders[0];
  const tiles = [
    { href: "/account/orders", t: "Bestellingen", d: `${mockOrders.length} bestellingen`, k: "01" },
    { href: "/account/addresses", t: "Adressen", d: "Factuur- en bezorgadres", k: "02" },
    { href: "/account/details", t: "Accountgegevens", d: "Naam, e-mail, wachtwoord", k: "03" },
  ];
  return (
    <AccountShell title={`Hallo${user ? `, ${user.name.split(" ")[0]}` : ""}`}>
      <p className="max-w-xl text-lg text-ink-soft">Vanuit je account bekijk je je recente bestellingen, beheer je je adressen en wijzig je je gegevens.</p>

      <Link href="/account/orders" className="group mt-8 block rounded-[2rem] bg-navy p-8 text-white transition hover:shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="eyebrow !text-gold">Laatste bestelling</p>
            <p className="display mt-2 text-3xl">#{last.id}</p>
            <p className="mt-1 text-sm text-white/65">{new Date(last.date).toLocaleDateString("nl-NL", { day: "numeric", month: "long", year: "numeric" })} · {formatPrice(orderTotal(last.lines))}</p>
          </div>
          <span className={`rounded-full px-3 py-1 text-xs font-bold ${statusLabel[last.status].c}`}>{statusLabel[last.status].l}</span>
        </div>
        {last.track && <p className="mt-6 inline-flex rounded-full bg-white/10 px-4 py-2 text-sm">📦 {last.track}</p>}
      </Link>

      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        {tiles.map((t) => (
          <Link key={t.href} href={t.href} className="group rounded-[2rem] bg-white p-6 ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-xl">
            <span className="display text-4xl text-navy/20 transition group-hover:text-gold">{t.k}</span>
            <h2 className="mt-6 font-bold text-navy">{t.t}</h2>
            <p className="mt-1 text-sm text-ink-soft">{t.d}</p>
          </Link>
        ))}
      </div>
    </AccountShell>
  );
}
