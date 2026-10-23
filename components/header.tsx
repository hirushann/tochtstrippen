"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "./cart";

const nav = [
  { href: "/shop", label: "Winkel" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const { count, setOpen: openCart } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-3 z-40 px-3 sm:px-6">
      <div className="mx-auto max-w-6xl rounded-[2rem] bg-navy/95 text-white shadow-[0_10px_40px_-12px_rgba(11,5,71,0.55)] ring-1 ring-white/10 backdrop-blur-xl">
        <div className="flex h-16 items-center justify-between gap-6 pl-6 pr-2.5">
          <Link href="/" aria-label="Tochtstrippen.nl home" className="shrink-0">
            <Image src="/images/logo.png" alt="Tochtstrippen.nl" width={150} height={52} priority className="h-10 w-auto" />
          </Link>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Hoofdmenu">
            {nav.map((n) => (
              <Link key={n.href} href={n.href} className="rounded-full px-4 py-2 text-sm font-medium text-white/75 transition hover:bg-white/10 hover:text-white">
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link href="/account" aria-label="Mijn account" className="grid h-11 w-11 place-items-center rounded-full text-white/80 transition hover:bg-white/10 hover:text-white">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></svg>
            </Link>
            <button type="button" onClick={() => openCart(true)} aria-label="Open winkelwagen" className="inline-flex h-11 items-center gap-2 rounded-full bg-gold pl-4 pr-3 text-sm font-bold text-navy transition hover:bg-[#f0c75f]">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M6 6h15l-1.5 9h-12z" /><path d="M6 6 5 3H2" /><circle cx="9" cy="20" r="1.2" /><circle cx="18" cy="20" r="1.2" /></svg>
              <span className="hidden sm:inline">Winkelwagen</span>
              <span className="grid h-6 min-w-6 place-items-center rounded-full bg-navy px-1.5 text-xs text-white" suppressHydrationWarning>{count}</span>
            </button>
            <button type="button" className="grid h-11 w-11 place-items-center rounded-full bg-white/10 md:hidden" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>{open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 8h16M4 16h16" />}</svg>
            </button>
          </div>
        </div>
        {open && (
          <nav className="border-t border-white/10 px-6 pb-3 md:hidden" aria-label="Mobiel menu">
            {nav.map((n) => (
              <Link key={n.href} href={n.href} onClick={() => setOpen(false)} className="block border-b border-white/10 py-4 text-lg font-medium last:border-0">{n.label}</Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
