"use client";

import { useCart } from "./cart";

export function QuickAdd({ id, name }: { id: number; name: string }) {
  const { add } = useCart();
  return (
    <button
      type="button" onClick={() => add(id)} aria-label={`${name} in winkelwagen`}
      className="relative z-10 grid h-11 w-11 shrink-0 place-items-center rounded-full bg-navy text-white transition hover:scale-110 hover:bg-brand active:scale-95"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden><path d="M12 5v14M5 12h14" /></svg>
    </button>
  );
}
