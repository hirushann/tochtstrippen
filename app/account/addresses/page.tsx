"use client";

import { useState } from "react";
import { AccountShell } from "@/components/account-shell";
import { useAuth } from "@/components/auth";
import { mockAddress } from "@/lib/mock-account";

const input = "mt-1.5 w-full rounded-2xl border-0 bg-white px-4 py-3 text-[15px] ring-1 ring-black/10";

function Card({ title, initial }: { title: string; initial: typeof mockAddress }) {
  const [a, setA] = useState(initial);
  const [edit, setEdit] = useState(false);
  const set = (k: keyof typeof a) => (e: React.ChangeEvent<HTMLInputElement>) => setA({ ...a, [k]: e.target.value });

  return (
    <section className="rounded-[2rem] bg-white p-7 ring-1 ring-black/5">
      <div className="flex items-center justify-between">
        <h2 className="display text-2xl text-navy">{title}</h2>
        <button onClick={() => setEdit(!edit)} className="text-sm font-bold text-brand hover:underline">{edit ? "Annuleren" : "Wijzigen"}</button>
      </div>
      {edit ? (
        <form onSubmit={(e) => { e.preventDefault(); setEdit(false); }} className="mt-5 grid gap-4 sm:grid-cols-2">
          <label className="text-sm font-semibold sm:col-span-2">Naam<input className={input} value={a.name} onChange={set("name")} /></label>
          <label className="text-sm font-semibold sm:col-span-2">Straat en huisnummer<input className={input} value={a.street} onChange={set("street")} /></label>
          <label className="text-sm font-semibold">Postcode<input className={input} value={a.postcode} onChange={set("postcode")} /></label>
          <label className="text-sm font-semibold">Plaats<input className={input} value={a.city} onChange={set("city")} /></label>
          <button className="btn btn-primary h-11 sm:col-span-2">Opslaan</button>
        </form>
      ) : (
        <address className="mt-4 leading-relaxed not-italic text-ink-soft">{a.name}<br />{a.street}<br />{a.postcode} {a.city}<br />{a.country}</address>
      )}
    </section>
  );
}

export default function Addresses() {
  const { user } = useAuth();
  const base = { ...mockAddress, name: user?.name ?? "" };
  return (
    <AccountShell title="Adressen">
      <p className="mb-6 max-w-xl text-ink-soft">Deze adressen worden standaard ingevuld bij het afrekenen.</p>
      <div className="grid gap-4 md:grid-cols-2">
        <Card title="Factuuradres" initial={base} />
        <Card title="Bezorgadres" initial={base} />
      </div>
    </AccountShell>
  );
}
