import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-navy-deep text-white/70">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-4">
        <div className="md:col-span-2">
          <Image src="/images/logo.png" alt="Tochtstrippen.nl" width={150} height={52} className="h-12 w-auto" />
          <p className="mt-5 max-w-sm text-sm leading-relaxed">
            Dé webshop voor Q-lon tochtstrips en Schlegel borstels. Grootste voorraad, snelste levering, vakkundig advies.
          </p>
        </div>
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-gold">Winkel</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><Link className="hover:text-white" href="/shop?c=zelfklevende-tochtstrippen">Zelfklevend</Link></li>
            <li><Link className="hover:text-white" href="/shop?c=brandvertragende-tochtstrip">Brandvertragend</Link></li>
            <li><Link className="hover:text-white" href="/shop?c=q-lon-kaderprofiel">Kaderprofielen</Link></li>
            <li><Link className="hover:text-white" href="/shop?c=accessoires">Accessoires</Link></li>
            <li><Link className="hover:text-white" href="/retourneren">Retourneren</Link></li>
            <li><Link className="hover:text-white" href="/faq">FAQ</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-gold">Contact</h3>
          <address className="mt-4 space-y-2.5 text-sm not-italic">
            <p>Oenerweg 30<br />8181 RJ Heerde</p>
            <p>WhatsApp: <a className="hover:text-white" href="https://wa.me/31578760509">0578-760509</a></p>
            <p>KvK 77245350<br />BTW NL003174000B88</p>
          </address>
        </div>
      </div>
      <div className="border-t border-white/10 px-5 py-6 text-center text-xs sm:px-8">
        © 2026 Tochtstrippen.nl · Onderdeel van DayZ Solutions
      </div>
    </footer>
  );
}
