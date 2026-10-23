"use client";

import { useState } from "react";
import { AccountShell } from "@/components/account-shell";
import { useAuth } from "@/components/auth";

const input = "mt-1.5 w-full rounded-2xl border-0 bg-white px-4 py-3 text-[15px] ring-1 ring-black/10";

export default function Details() {
  const { user, update } = useAuth();
  const [saved, setSaved] = useState(false);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    update({ name: String(f.get("name")), email: String(f.get("email")) });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <AccountShell title="Accountgegevens">
      <form onSubmit={submit} key={user?.email} className="max-w-xl space-y-5 rounded-[2rem] bg-white p-8 ring-1 ring-black/5">
        <label className="block text-sm font-semibold">Naam<input name="name" required defaultValue={user?.name} className={input} /></label>
        <label className="block text-sm font-semibold">E-mailadres<input name="email" type="email" required defaultValue={user?.email} className={input} /></label>
        <fieldset className="space-y-5 border-t border-line pt-5">
          <legend className="display text-xl text-navy">Wachtwoord wijzigen</legend>
          <label className="block text-sm font-semibold">Nieuw wachtwoord <span className="font-normal text-ink-soft">(leeg laten om niet te wijzigen)</span><input type="password" name="password" minLength={8} autoComplete="new-password" className={input} /></label>
        </fieldset>
        <div className="flex items-center gap-4">
          <button className="btn btn-primary h-12 px-8">Opslaan</button>
          {saved && <p role="status" className="text-sm font-semibold text-emerald-700">Opgeslagen ✓</p>}
        </div>
      </form>
    </AccountShell>
  );
}
