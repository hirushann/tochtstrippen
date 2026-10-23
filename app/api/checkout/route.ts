import { NextResponse } from "next/server";
import { priceOrder, type OrderInput } from "@/lib/order";

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const isPublic = !/localhost|127\.0\.0\.1/.test(SITE); // Mollie can't reach a local webhook

const clean = (v: unknown, max = 120) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(req: Request) {
  const key = process.env.MOLLIE_API_KEY;
  if (!key) return NextResponse.json({ error: "Betalen is nog niet geconfigureerd." }, { status: 503 });

  let body: OrderInput;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Ongeldig verzoek." }, { status: 400 });
  }

  const c = body.customer ?? ({} as OrderInput["customer"]);
  const customer = {
    name: clean(c.name), email: clean(c.email), phone: clean(c.phone, 30),
    street: clean(c.street), postcode: clean(c.postcode, 12), city: clean(c.city),
    country: c.country === "BE" ? "BE" : "NL",
    company: clean(c.company), vat: clean(c.vat, 30),
  } as OrderInput["customer"];

  if (!customer.name || !/^\S+@\S+\.\S+$/.test(customer.email) || !customer.street || !customer.postcode || !customer.city) {
    return NextResponse.json({ error: "Vul alle verplichte velden in." }, { status: 400 });
  }

  const order = priceOrder(Array.isArray(body.lines) ? body.lines : []);
  if (!order.items.length) return NextResponse.json({ error: "Je winkelwagen is leeg." }, { status: 400 });

  const orderId = `TS-${Date.now().toString(36).toUpperCase()}`;
  const res = await fetch("https://api.mollie.com/v2/payments", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      amount: { currency: "EUR", value: (order.total / 100).toFixed(2) },
      description: `Tochtstrippen.nl bestelling ${orderId}`,
      redirectUrl: `${SITE}/checkout/return?order=${orderId}`,
      ...(isPublic && { webhookUrl: `${SITE}/api/mollie/webhook` }),
      locale: "nl_NL",
      billingAddress: {
        givenName: customer.name, familyName: "-", email: customer.email,
        streetAndNumber: customer.street, postalCode: customer.postcode, city: customer.city, country: customer.country,
      },
      metadata: {
        orderId, customer,
        items: order.items.map((i) => ({ sku: i.product.sku, name: i.product.name, qty: i.qty, unit: i.product.price })),
        shipping: order.shipping,
      },
    }),
  });

  const payment = await res.json();
  if (!res.ok || !payment._links?.checkout?.href) {
    console.error("Mollie error", payment);
    return NextResponse.json({ error: "Betaling starten mislukt. Probeer het opnieuw." }, { status: 502 });
  }

  const out = NextResponse.json({ checkoutUrl: payment._links.checkout.href });
  // Remember the payment so the return page can check its status without a database.
  out.cookies.set("ts_payment", payment.id, { httpOnly: true, sameSite: "lax", secure: isPublic, path: "/", maxAge: 60 * 60 * 24 });
  return out;
}
