"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { useAuth } from "./auth";
import { AuthForms } from "./auth-forms";

const links = [
  { href: "/account", label: "Overzicht", d: "M4 11 12 4l8 7v9h-5v-6H9v6H4z" },
  { href: "/account/orders", label: "Bestellingen", d: "M6 7h12l-1 13H7zM9 7a3 3 0 0 1 6 0" },
  { href: "/account/addresses", label: "Adressen", d: "M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11zM12 12a2 2 0 1 0 0-.01" },
  { href: "/account/details", label: "Accountgegevens", d: "M12 12a4 4 0 1 0 0-.01M4 21a8 8 0 0 1 16 0" },
];

export function AccountShell({ title, children }: { title: string; children: ReactNode }) {
  const { user, ready, logout } = useAuth();
  const path = usePathname();

  if (!ready) return <div className="container-x py-32 text-center text-ink-soft">Laden…</div>;
  if (!user) return <AuthForms />;

  return (
    <div className="container-x py-12 sm:py-16">
      <p className="eyebrow">Mijn account</p>
      <h1 className="display mt-3 text-4xl text-navy sm:text-6xl">{title}</h1>
      <div className="mt-10 grid items-start gap-8 lg:grid-cols-[16rem_1fr] lg:gap-14">
        <nav aria-label="Account" className="no-scrollbar flex gap-2 overflow-x-auto lg:sticky lg:top-28 lg:flex-col lg:overflow-visible">
          {links.map((l) => {
            const on = path === l.href || (l.href !== "/account" && path.startsWith(l.href));
            return (
              <Link key={l.href} href={l.href} aria-current={on ? "page" : undefined}
                className={`flex shrink-0 items-center gap-3 rounded-full px-5 py-3 text-sm font-semibold transition ${on ? "bg-navy text-white shadow-lg shadow-navy/20" : "bg-white text-ink ring-1 ring-black/10 hover:ring-navy"}`}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d={l.d} /></svg>
                {l.label}
              </Link>
            );
          })}
          <button onClick={logout} className="flex shrink-0 items-center gap-3 rounded-full px-5 py-3 text-left text-sm font-semibold text-ink-soft transition hover:text-navy">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M9 4H5v16h4M16 8l4 4-4 4M20 12H9" /></svg>
            Uitloggen
          </button>
        </nav>
        <div className="min-w-0">{children}</div>
      </div>
    </div>
  );
}
