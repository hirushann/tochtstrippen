import type { Metadata } from "next";

export const metadata: Metadata = { title: "Veelgestelde vragen" };

const faqs = [
  ["Wat zijn de verzendkosten?", "Binnen Nederland en België rekenen wij €6,95 verzendkosten tot een bestelbedrag van €100,- incl. BTW. Particulieren krijgen gratis verzending boven €100. Zakelijke accounts (alleen voor frequente afnemers) hanteren zakelijke voorwaarden: €7,50 excl. BTW tot €250,- excl. BTW."],
  ["Kan ik Q-lon retourneren?", "Uiteraard, als de Q-lon in ongebruikte staat is. Via de pagina Retourneren meld je je retour aan. Particulieren krijgen 100% van het betaalde bedrag gecrediteerd; voor zakelijke klanten hanteren wij 25% retourkosten."],
  ["Zijn jullie de importeur of agent van Q-lon?", "Nee, wij zijn niet de importeur of agent van Q-lon (Schlegel)."],
  ["Kan ik Q-lon afhalen?", "Nee, wij zijn echt een webshop-only. Eens per week komt nieuwe voorraad binnen en eens per dag brengen wij orders naar GLS."],
  ["Zijn er ook items die niet op jullie site staan?", "Ja, wij kunnen aan alle Q-lon komen. Wat op de site staat is over het algemeen op voorraad. Q-lon die niet op de site staat heeft minimaal 6 weken levertijd en is alleen per volle verpakking verkrijgbaar."],
  ["Hoe lang gaan Q-lon tochtstrips mee?", "In principe je leven lang. Q-lon geeft 10 jaar garantie."],
  ["Hoe monteer ik Q-lon?", "Particulieren: lees de instructies op de verpakking. Vooral bij zelfklevende Q-lon is het belangrijk dat de ondergrond uiterst goed ontvet wordt. Zakelijke gebruikers: wij komen graag langs bij onduidelijkheden."],
  ["Hoeveel Q-lon heb ik nodig?", "Meet het aantal zijden op: zoveel meter heb je nodig. Onze 7 meter verpakking is goed voor 1 deur of raam. De 25 meter is vaak goed voor een hele verdieping."],
];

export default function FAQ() {
  return (
    <div className="container-x max-w-3xl py-16">
      <p className="eyebrow">FAQ</p>
      <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-navy sm:text-5xl">Veelgestelde vragen</h1>
      <div className="mt-10 divide-y divide-line border-y border-line">
        {faqs.map(([q, a]) => (
          <details key={q} className="py-5">
            <summary className="flex items-center justify-between gap-6 text-lg font-semibold text-navy">
              {q}<span className="chev text-2xl text-brand transition">+</span>
            </summary>
            <p className="mt-3 max-w-2xl leading-relaxed text-ink-soft">{a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
