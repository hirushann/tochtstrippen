"use client";

import Image from "next/image";
import { useState } from "react";

type Img = { src: string; thumb: string; alt: string };

export function Gallery({ images, name }: { images: Img[]; name: string }) {
  const [i, setI] = useState(0);
  const cur = images[i];
  return (
    <div className="grid gap-3 lg:grid-cols-[5rem_1fr]">
      <div className="order-2 flex gap-3 lg:order-1 lg:flex-col" role="tablist" aria-label="Productafbeeldingen">
        {images.slice(0, 6).map((im, n) => (
          <button key={im.src} role="tab" aria-selected={n === i} aria-label={`Afbeelding ${n + 1}`} onClick={() => setI(n)}
            className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-[#ece6d8] transition ${n === i ? "ring-2 ring-navy" : "ring-1 ring-black/10 hover:ring-navy/50"}`}>
            <Image src={im.thumb} alt="" fill sizes="80px" className="object-contain p-2 mix-blend-multiply" />
          </button>
        ))}
      </div>
      <div className="relative order-1 aspect-square overflow-hidden rounded-[2rem] bg-[#ece6d8] ring-1 ring-black/5 lg:order-2">
        {cur ? <Image key={cur.src} src={cur.src} alt={cur.alt || name} fill priority sizes="(min-width:1024px) 45vw, 100vw" className="object-contain p-10 mix-blend-multiply" /> : null}
      </div>
    </div>
  );
}
