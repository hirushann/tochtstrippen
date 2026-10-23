"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "./auth";

const input = "mt-1.5 w-full rounded-2xl border-0 bg-white px-4 py-3 text-[15px] ring-1 ring-black/10";

export function AuthForms() {
  const { login } = useAuth();
  const [mode, setMode] = useState<"login" | "register">("login");

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    login(String(f.get("email")), f.get("name") ? String(f.get("name")) : undefined);
  };

  return (
    <div className="container-x py-12 sm:py-20">
      <div className="mx-auto grid max-w-5xl overflow-hidden rounded-[2.5rem] bg-white shadow-[0_40px_80px_-40px_rgba(11,5,71,0.35)] ring-1 ring-black/5 md:grid-cols-2">
        <div className="relative hidden bg-navy p-12 text-white md:block">
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand/50 blur-[90px]" />
          <p className="eyebrow !text-gold">Mijn account</p>
          <h1 className="display mt-4 text-5xl leading-[1.05]">Alles over je <em>bestellingen</em> op één plek.</h1>
          <ul className="mt-10 space-y-4 text-white/80">
            {["Bestellingen en track & trace bekijken", "Sneller afrekenen met opgeslagen adres", "Eenvoudig opnieuw bestellen"].map((t) => (
              <li key={t} className="flex gap-3"><span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-gold text-[10px] font-bold text-navy">✓</span>{t}</li>
            ))}
          </ul>
        </div>

        <div className="p-8 sm:p-12">
          <div className="inline-flex rounded-full bg-mist p-1" role="tablist">
            {(["login", "register"] as const).map((m) => (
              <button key={m} role="tab" aria-selected={mode === m} onClick={() => setMode(m)}
                className={`rounded-full px-5 py-2 text-sm font-bold transition ${mode === m ? "bg-navy text-white" : "text-ink-soft"}`}>
                {m === "login" ? "Inloggen" : "Registreren"}
              </button>
            ))}
          </div>

          <form onSubmit={submit} className="mt-8 space-y-5">
            {mode === "register" && <label className="block text-sm font-semibold">Naam<input required name="name" autoComplete="name" className={input} /></label>}
            <label className="block text-sm font-semibold">E-mailadres<input required type="email" name="email" autoComplete="email" className={input} /></label>
            <label className="block text-sm font-semibold">Wachtwoord<input required type="password" name="password" autoComplete={mode === "login" ? "current-password" : "new-password"} minLength={8} className={input} /></label>
            {mode === "login" && (
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2"><input type="checkbox" name="remember" className="h-4 w-4 accent-[#0b0547]" />Onthoud mij</label>
                <Link href="/account/lost-password" className="font-semibold text-brand hover:underline">Wachtwoord vergeten?</Link>
              </div>
            )}
            <button className="btn btn-primary h-12 w-full text-base">{mode === "login" ? "Inloggen" : "Account aanmaken"}</button>
          </form>
          <p className="mt-6 rounded-2xl bg-amber-50 p-3 text-xs leading-relaxed text-amber-900">
            <b>Demoversie:</b> inloggen is nog niet gekoppeld aan een echt account. Vul een willekeurig e-mailadres in om het ontwerp te bekijken.
          </p>
        </div>
      </div>
    </div>
  );
}
