import Image from "next/image";
import Link from "next/link";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/product-card";
import { DraughtHero } from "@/components/draught-hero";
import { MeterCalculator } from "@/components/meter-calculator";

const ticker = ["10 jaar garantie", "Gratis verzending vanaf €100", "Origineel Schlegel Q-lon", "Op voorraad, snel geleverd", "Particulier & zakelijk", "Levering via GLS"];

const finder = [
  { t: "Hout", d: "Houten kozijnen", c: "kaderprofiel-voor-houten-toepassing" },
  { t: "Aluminium", d: "Aluminium profielen", c: "kaderprofiel-voor-aluminium-toepassing" },
  { t: "Kunststof", d: "PVC kozijnen", c: "q-lon-kaderprofiel" },
  { t: "Binnendeur", d: "Voor binnen", c: "kaderprofiel-voor-binnendeuren-toepassing" },
  { t: "Buitendeur", d: "Voor buiten", c: "kaderprofiel-voor-buitendeuren" },
  { t: "Zelfklevend", d: "Plakken en klaar", c: "zelfklevende-tochtstrippen" },
];

export default function Home() {
  const featured = products.filter((p) => p.categories.includes("zelfklevende-tochtstrippen")).slice(0, 4);

  return (
    <>
      {/* HERO */}
      <section className="relative -mt-19 overflow-hidden pt-32 pb-20 sm:pt-40">
        <div className="pointer-events-none absolute -left-32 top-10 h-[28rem] w-[28rem] rounded-full bg-gold/25 blur-[110px]" />
        <div className="container-x relative grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rise">
            <p className="inline-flex items-center gap-2 rounded-full border border-navy/15 bg-white/60 px-4 py-1.5 text-xs font-bold tracking-wide text-navy backdrop-blur">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" /> Op voorraad · morgen in huis
            </p>
            <h1 className="display mt-7 text-[clamp(3rem,8.5vw,7rem)] leading-[0.95] text-navy">
              Houd de tocht <em className="!text-brand">buiten</em>, de warmte binnen.
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-ink-soft">
              Dé specialist in Q-lon tochtstrips en borsteldichtingen. Het afdichtingsmateriaal dat 10 jaar meegaat, voor ramen en deuren van hout, aluminium en kunststof.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link href="/shop" className="btn h-14 bg-navy px-8 text-base text-white hover:bg-brand">Bekijk de winkel →</Link>
              <Link href="#rekenhulp" className="btn h-14 border border-navy/20 px-7 text-base text-navy hover:bg-white">Hoeveel heb ik nodig?</Link>
            </div>
            <dl className="mt-14 grid max-w-lg grid-cols-3 gap-6 border-t border-navy/10 pt-8">
              {[["10 jr", "garantie"], ["0,04", "W/m·K"], ["70+", "producten"]].map(([k, l]) => (
                <div key={l}><dt className="display text-4xl text-navy">{k}</dt><dd className="mt-1 text-xs font-semibold uppercase tracking-widest text-ink-soft">{l}</dd></div>
              ))}
            </dl>
          </div>
          <div className="rise [animation-delay:.15s]"><DraughtHero /></div>
        </div>
      </section>

      {/* TICKER */}
      <div className="overflow-hidden border-y border-navy/10 bg-navy py-4 text-white" aria-hidden>
        <div className="marquee flex w-max gap-12 whitespace-nowrap">
          {[...ticker, ...ticker, ...ticker, ...ticker].map((t, i) => (
            <span key={i} className="display flex items-center gap-12 text-xl italic">{t}<span className="text-gold not-italic">✦</span></span>
          ))}
        </div>
      </div>

      {/* FINDER */}
      <section className="container-x py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">Profielkeuze</p>
            <h2 className="display mt-3 max-w-xl text-4xl text-navy sm:text-6xl">Waar komt de strip <em className="!text-brand">te zitten?</em></h2>
          </div>
          <p className="max-w-xs text-ink-soft">Kies je toepassing en zie direct de profielen die passen.</p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-3">
          {finder.map((f, i) => (
            <Link key={f.t} href={`/shop?c=${f.c}`} className="group relative flex aspect-[16/8] flex-col sm:aspect-[4/3] justify-between overflow-hidden rounded-[2rem] border border-navy/10 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:bg-navy hover:text-white hover:shadow-2xl">
              <span className="display text-5xl text-navy/15 transition group-hover:text-gold">0{i + 1}</span>
              <div className="flex items-end justify-between gap-3">
                <div>
                  <h3 className="display text-3xl">{f.t}</h3>
                  <p className="mt-1 text-sm text-ink-soft transition group-hover:text-white/70">{f.d}</p>
                </div>
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-navy text-white transition group-hover:rotate-45 group-hover:bg-gold group-hover:text-navy">→</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* BENTO */}
      <section className="container-x pb-24">
        <p className="eyebrow">Waarom Q-lon</p>
        <h2 className="display mt-3 max-w-2xl text-4xl text-navy sm:text-6xl">Gebouwd om <em className="!text-brand">nooit</em> te verslappen.</h2>
        <div className="mt-12 grid auto-rows-[minmax(14rem,auto)] gap-4 md:grid-cols-6">
          <div className="relative overflow-hidden rounded-[2rem] bg-navy text-white md:col-span-4 md:row-span-2">
            <Image src="/images/img-49.png" alt="Doorsnede van een Q-lon profiel" fill sizes="(min-width:768px) 66vw, 100vw" className="object-cover opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/30 to-transparent" />
            <div className="relative flex h-full min-h-96 flex-col justify-end p-8 sm:p-10">
              <p className="display text-7xl text-gold sm:text-8xl">50%</p>
              <h3 className="mt-2 text-2xl font-bold">Beter geheugen</h3>
              <p className="mt-2 max-w-md text-white/75">Q-lon veert terug naar zijn oorspronkelijke vorm, ook bij extreem lage en hoge temperaturen.</p>
            </div>
          </div>
          {[
            { k: "0,04", u: "W/m·K", t: "Laagste geleidbaarheid", d: "3 tot 6 keer beter dan andere materialen.", bg: "bg-gold text-navy", span: "md:col-span-2" },
            { k: "3×", u: "langer", t: "Betrouwbare levensduur", d: "UV- en weerbestendig polyethyleen.", bg: "bg-white text-navy border border-navy/10", span: "md:col-span-2" },
            { k: "4 dB", u: "stiller", t: "Geluidsisolatie", d: "Extra reductie dankzij hoog compressievermogen.", bg: "bg-brand text-white", span: "md:col-span-3" },
            { k: "Ook", u: "schuifdeuren", t: "Superieure afdichting", d: "Betere lucht- en waterdichtheid dan borstelafdichtingen.", bg: "bg-white text-navy border border-navy/10", span: "md:col-span-3" },
          ].map((c) => (
            <div key={c.t} className={`flex min-h-56 flex-col justify-between rounded-[2rem] p-7 ${c.span} ${c.bg}`}>
              <p className="display text-6xl">{c.k}<span className="ml-2 font-sans text-xs font-bold uppercase tracking-widest opacity-60">{c.u}</span></p>
              <div><h3 className="font-bold">{c.t}</h3><p className="mt-1 text-sm opacity-75">{c.d}</p></div>
            </div>
          ))}
        </div>
      </section>

      {/* CALCULATOR */}
      <section id="rekenhulp" className="container-x scroll-mt-28 pb-24"><MeterCalculator /></section>

      {/* PRODUCTS */}
      <section className="pb-24">
        <div className="container-x">
          <div className="flex items-end justify-between gap-6">
            <h2 className="display text-4xl text-navy sm:text-6xl">Populair <em className="!text-brand">zelfklevend</em></h2>
            <Link href="/shop?c=zelfklevende-tochtstrippen" className="hidden shrink-0 text-sm font-bold text-navy underline underline-offset-4 sm:block">Alles bekijken →</Link>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
            {featured.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-x pb-24">
        <div className="grain relative overflow-hidden rounded-[2.5rem] bg-gold p-10 text-navy sm:p-16">
          <h2 className="display max-w-3xl text-4xl leading-[1.05] sm:text-6xl">Vragen over het juiste profiel? <em className="!text-navy underline decoration-navy/30 underline-offset-8">Wij helpen je graag.</em></h2>
          <p className="mt-5 max-w-lg font-medium text-navy/75">Binnen kantoortijden reageren we binnen 2 uur. Zakelijk? Wij komen graag bij je langs.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/contact" className="btn h-14 bg-navy px-8 text-base text-white hover:bg-brand">Contact opnemen</Link>
            <Link href="/faq" className="btn h-14 border border-navy/30 px-8 text-base hover:bg-white/40">Veelgestelde vragen</Link>
          </div>
        </div>
      </section>
    </>
  );
}
