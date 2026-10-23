"use client";

import Link from "next/link";
import { useState } from "react";

/** Packs come in 7 m (one door/window) and 25 m. Cheapest cover with least waste. */
function plan(meters: number) {
  let best = { a: 0, b: 0, waste: Infinity };
  for (let a = 0; a <= Math.ceil(meters / 25); a++) {
    const b = Math.max(0, Math.ceil((meters - a * 25) / 7));
    const waste = a * 25 + b * 7 - meters;
    if (waste < best.waste || (waste === best.waste && a * 25 + b * 7 < best.a * 25 + best.b * 7)) best = { a, b, waste };
  }
  return best;
}

export function MeterCalculator() {
  const [n, setN] = useState(3);
  const meters = n * 7;
  const { a, b } = plan(meters);

  return (
    <div className="grid gap-10 rounded-[2.5rem] bg-navy p-8 text-white sm:p-12 lg:grid-cols-2 lg:items-center">
      <div>
        <p className="eyebrow !text-gold">Rekenhulp</p>
        <h2 className="display mt-3 text-4xl leading-tight sm:text-5xl">Hoeveel meter heb ik <em>nodig?</em></h2>
        <p className="mt-4 max-w-md text-white/70">Eén deur of raam is ongeveer 7 meter. Schuif naar het aantal ramen en deuren dat je wilt afdichten.</p>
      </div>
      <div className="rounded-3xl bg-white/[0.06] p-7 ring-1 ring-white/10">
        <label htmlFor="n" className="flex items-baseline justify-between text-sm font-semibold text-white/70">
          Ramen &amp; deuren <span className="display text-5xl text-white">{n}</span>
        </label>
        <input id="n" type="range" min={1} max={30} value={n} onChange={(e) => setN(+e.target.value)} className="mt-5 w-full accent-[#e7b84a]" />
        <div className="mt-7 flex items-end justify-between border-t border-white/10 pt-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-white/50">Je hebt nodig</p>
            <p className="display text-4xl text-gold">{meters} m</p>
          </div>
          <p className="text-right text-sm text-white/80">
            {a > 0 && <span className="block">{a} × verpakking 25 m</span>}
            {b > 0 && <span className="block">{b} × verpakking 7 m</span>}
          </p>
        </div>
        <Link href="/shop?c=zelfklevende-tochtstrippen" className="btn btn-gold mt-6 h-12 w-full">Kies je tochtstrip →</Link>
      </div>
    </div>
  );
}
