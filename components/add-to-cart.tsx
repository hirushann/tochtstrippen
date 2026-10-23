"use client";

import { useState } from "react";
import { useCart } from "./cart";

export function AddToCart({ id, large = false, compact = false }: { id: number; large?: boolean; compact?: boolean }) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [done, setDone] = useState(false);

  const submit = () => {
    add(id, qty);
    setDone(true);
    setTimeout(() => setDone(false), 1800);
  };

  return (
    <div className="flex items-stretch gap-3">
      <div className={`${compact ? "hidden" : "inline-flex"} items-center rounded-full border border-line bg-white`}>
        <button type="button" aria-label="Minder" onClick={() => setQty(Math.max(1, qty - 1))} className="h-11 w-11 text-lg text-ink-soft hover:text-ink">−</button>
        <span className="w-8 text-center text-sm font-semibold tabular-nums" aria-live="polite">{qty}</span>
        <button type="button" aria-label="Meer" onClick={() => setQty(qty + 1)} className="h-11 w-11 text-lg text-ink-soft hover:text-ink">+</button>
      </div>
      <button
        type="button"
        onClick={submit}
        className={`btn btn-primary flex-1 ${large ? "h-12" : ""}`}
      >
        {done ? "Toegevoegd ✓" : "In winkelwagen"}
      </button>
    </div>
  );
}
