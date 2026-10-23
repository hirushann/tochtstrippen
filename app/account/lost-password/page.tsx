"use client";

import Link from "next/link";
import { useState } from "react";

export default function LostPassword() {
  const [sent, setSent] = useState(false);
  return (
    <div className="container-x py-16 sm:py-24">
      <div className="mx-auto max-w-md rounded-[2.5rem] bg-white p-8 shadow-[0_40px_80px_-40px_rgba(11,5,71,0.35)] ring-1 ring-black/5 sm:p-10">
        <p className="eyebrow">Mijn account</p>
        <h1 className="display mt-3 text-4xl text-navy">Wachtwoord vergeten?</h1>
        {sent ? (
          <p role="status" className="mt-6 rounded-2xl bg-emerald-50 p-4 text-emerald-900">Als dit e-mailadres bij ons bekend is, ontvang je binnen enkele minuten een link om een nieuw wachtwoord in te stellen.</p>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="mt-6 space-y-5">
            <p className="text-ink-soft">Vul je e-mailadres in. Je ontvangt een link om je wachtwoord opnieuw in te stellen.</p>
            <label className="block text-sm font-semibold">E-mailadres<input required type="email" className="mt-1.5 w-full rounded-2xl border-0 bg-paper px-4 py-3 text-[15px] ring-1 ring-black/10" /></label>
            <button className="btn btn-primary h-12 w-full text-base">Link versturen</button>
          </form>
        )}
        <Link href="/account" className="mt-6 inline-block text-sm font-semibold text-brand hover:underline">← Terug naar inloggen</Link>
      </div>
    </div>
  );
}
