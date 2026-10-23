import type { Metadata } from "next";

export const metadata: Metadata = { title: "Contact" };

const field = "mt-2 w-full rounded-2xl border border-line bg-white px-4 py-3 text-[15px]";

export default function Contact() {
  return (
    <div className="container-x grid gap-14 py-16 lg:grid-cols-2">
      <div>
        <p className="eyebrow">Contact</p>
        <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-navy sm:text-5xl">Contact opnemen</h1>
        <p className="mt-5 max-w-md text-lg leading-relaxed text-ink-soft">
          Heb je problemen, vragen, tips of suggesties? Laat je gegevens en vraag achter. Binnen kantoortijden helpen wij je binnen 2 uur.
        </p>
        <address className="mt-10 space-y-5 not-italic">
          <div><p className="text-xs font-bold uppercase tracking-widest text-brand">Adres</p><p className="mt-1">Oenerweg 30, 8181 RJ Heerde</p></div>
          <div><p className="text-xs font-bold uppercase tracking-widest text-brand">WhatsApp</p><a className="mt-1 block" href="https://wa.me/31578760509">0578-760509</a></div>
          <div><p className="text-xs font-bold uppercase tracking-widest text-brand">Bedrijfsgegevens</p><p className="mt-1">KvK 77245350 · BTW NL003174000B88</p></div>
        </address>
      </div>
      {/* TODO: wire to an email/API route; currently a visual form only */}
      <form className="space-y-5 rounded-3xl bg-mist p-8" action="#">
        <label className="block text-sm font-semibold">Naam<input required name="name" className={field} /></label>
        <label className="block text-sm font-semibold">E-mail<input required type="email" name="email" className={field} /></label>
        <label className="block text-sm font-semibold">Bericht<textarea required name="message" rows={5} className={field} /></label>
        <button className="btn btn-primary h-12 w-full">Versturen</button>
      </form>
    </div>
  );
}
