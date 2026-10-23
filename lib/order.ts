import { products } from "./products";

export const FREE_SHIPPING_FROM = 10000; // cents, incl. BTW
export const SHIPPING = 695;

export type OrderInput = {
  lines: { id: number; qty: number }[];
  customer: {
    name: string; email: string; phone: string;
    street: string; postcode: string; city: string; country: "NL" | "BE";
    company?: string; vat?: string;
  };
};

/** Prices always come from our catalogue, never from the client. */
export function priceOrder(lines: OrderInput["lines"]) {
  const items = lines.flatMap((l) => {
    const p = products.find((x) => x.id === l.id);
    const qty = Math.floor(l.qty);
    return p && p.inStock && p.purchasable && qty > 0 && qty <= 999 ? [{ product: p, qty }] : [];
  });
  const subtotal = items.reduce((s, i) => s + i.product.price * i.qty, 0);
  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_FROM ? 0 : SHIPPING;
  return { items, subtotal, shipping, total: subtotal + shipping };
}
