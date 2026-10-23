import { Suspense } from "react";
import { cookies } from "next/headers";
import Link from "next/link";
import type { Metadata } from "next";
import { ClearCart } from "@/components/clear-cart";

export const metadata: Metadata = { title: "Bestelling", robots: { index: false } };

async function Status() {
  const id = (await cookies()).get("ts_payment")?.value;
  const key = process.env.MOLLIE_API_KEY;
  let status = "unknown";
  if (id && key) {
    const res = await fetch(`https://api.mollie.com/v2/payments/${encodeURIComponent(id)}`, {
      headers: { Authorization: `Bearer ${key}` },
      cache: "no-store",
    });
    if (res.ok) status = (await res.json()).status;
  }

  const paid = status === "paid";
  const pending = ["open", "pending", "authorized"].includes(status);
  return (
    <div className="mx-auto max-w-lg py-24 text-center">
      {paid && <ClearCart />}
      <div className={`mx-auto grid h-16 w-16 place-items-center rounded-full text-3xl text-white ${paid ? "bg-emerald-600" : pending ? "bg-gold" : "bg-red-600"}`}>{paid ? "✓" : pending ? "…" : "!"}</div>
      <h1 className="mt-6 text-3xl font-extrabold text-navy">
        {paid ? "Bedankt voor je bestelling!" : pending ? "We wachten op je betaling" : "Betaling niet gelukt"}
      </h1>
      <p className="mt-3 text-ink-soft">
        {paid ? "Je ontvangt een bevestiging per e-mail. We brengen je pakket zo snel mogelijk naar GLS."
          : pending ? "Zodra de betaling binnen is, verwerken we je bestelling."
          : "Er is niet afgerekend. Je winkelwagen is bewaard, je kunt het opnieuw proberen."}
      </p>
      <Link href={paid ? "/shop" : "/checkout"} className="btn btn-primary mt-8 h-12 px-7">{paid ? "Verder winkelen" : "Opnieuw proberen"}</Link>
    </div>
  );
}

export default function Return() {
  return (
    <div className="container-x">
      <Suspense fallback={<p className="py-24 text-center text-ink-soft">Betaling controleren…</p>}>
        <Status />
      </Suspense>
    </div>
  );
}
