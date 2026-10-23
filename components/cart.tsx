"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

type Lines = Record<number, number>;
type CartCtx = {
  lines: Lines;
  count: number;
  add: (id: number, qty?: number) => void;
  setQty: (id: number, qty: number) => void;
  clear: () => void;
  open: boolean;
  setOpen: (v: boolean) => void;
};

const Ctx = createContext<CartCtx | null>(null);
const KEY = "tochtstrippen-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<Lines>({});
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setLines(JSON.parse(raw));
    } catch {}
  }, []);

  const persist = (next: Lines) => {
    setLines(next);
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {}
  };

  const value = useMemo<CartCtx>(
    () => ({
      lines,
      count: Object.values(lines).reduce((a, b) => a + b, 0),
      add: (id, qty = 1) => {
        persist({ ...lines, [id]: (lines[id] ?? 0) + qty });
        setOpen(true);
      },
      setQty: (id, qty) => {
        const next = { ...lines };
        if (qty <= 0) delete next[id];
        else next[id] = qty;
        persist(next);
      },
      clear: () => persist({}),
      open,
      setOpen,
    }),
    [lines, open],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useCart = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart outside CartProvider");
  return c;
};
