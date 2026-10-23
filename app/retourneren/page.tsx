import type { Metadata } from "next";

export const metadata: Metadata = { title: "Retourneren" };

const conditions = [
  "Je meldt het retour aan via het retourformulier",
  "Je retour is minder dan 30 dagen geleden ontvangen",
  "Je retour is ongebruikt en in originele staat, in originele verpakking",
  "Je retour is voor ons in bruikbare staat",
  "Je retour is niet speciaal voor jou besteld en geen maatwerk",
  "Na aanmelden is het pakket binnen 14 dagen bij ons",
];
const grace = [
  ["30–40 dagen", "Geen extra kosten"],
  ["40–60 dagen", "80% gecrediteerd"],
  ["60–90 dagen", "65% gecrediteerd"],
  ["90–180 dagen", "45% gecrediteerd"],
];

export default function Retourneren() {
  return (
    <div className="container-x max-w-3xl py-16">
      <p className="eyebrow">Service</p>
      <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-navy sm:text-5xl">Een order retourneren</h1>
      <p className="mt-5 text-lg leading-relaxed text-ink-soft">Consumenten kunnen binnen 30 dagen retourneren, onder deze voorwaarden:</p>
      <ul className="mt-6 space-y-3">
        {conditions.map((c) => <li key={c} className="flex gap-3"><span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand text-[10px] text-white">✓</span>{c}</li>)}
      </ul>
      <p className="mt-6 leading-relaxed text-ink-soft">Voldoe je hieraan, dan storten wij het betaalde bedrag terug. Retourverzending naar ons is altijd voor eigen rekening. Let op: ons retouradres wijkt af van het showroomadres.</p>
      <h2 className="mt-12 text-2xl font-extrabold text-navy">Uit coulance langer retourneren</h2>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {grace.map(([a, b]) => <div key={a} className="rounded-2xl border border-line bg-mist p-5"><p className="font-bold text-navy">{a}</p><p className="text-sm text-ink-soft">{b}</p></div>)}
      </div>
      <p className="mt-6 text-sm leading-relaxed text-ink-soft">Accepteren wij een retour niet (te laat, niet meer verkoopbaar of niet in originele staat), dan crediteren wij 20%, of sturen wij het terug voor €6,95.</p>
      <a href="/contact" className="btn btn-primary mt-8 h-12 px-7">Retour aanmelden via contact</a>
    </div>
  );
}
