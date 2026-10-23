// DEMO DATA: replace with real orders/addresses from the accounts backend.
import { products } from "./products";

export type OrderStatus = "paid" | "processing" | "shipped";
export type Order = { id: string; date: string; status: OrderStatus; lines: { id: number; qty: number }[]; track?: string };

const pick = (i: number) => products.filter((p) => p.purchasable)[i].id;

export const mockOrders: Order[] = [
  { id: "TS-M1A2B3", date: "2026-10-14", status: "shipped", lines: [{ id: pick(12), qty: 3 }, { id: pick(3), qty: 1 }], track: "GLS 9876 5432 1098" },
  { id: "TS-L9K8J7", date: "2026-09-02", status: "shipped", lines: [{ id: pick(20), qty: 2 }] },
  { id: "TS-H5G4F3", date: "2026-06-21", status: "shipped", lines: [{ id: pick(30), qty: 5 }, { id: pick(1), qty: 2 }] },
];

export const statusLabel: Record<OrderStatus, { l: string; c: string }> = {
  paid: { l: "Betaald", c: "bg-blue-100 text-blue-800" },
  processing: { l: "In behandeling", c: "bg-amber-100 text-amber-800" },
  shipped: { l: "Verzonden", c: "bg-emerald-100 text-emerald-800" },
};

export const mockAddress = { name: "", street: "Voorbeeldstraat 1", postcode: "1234 AB", city: "Amsterdam", country: "Nederland" };

export const orderTotal = (lines: { id: number; qty: number }[]) =>
  lines.reduce((s, l) => s + (products.find((p) => p.id === l.id)?.price ?? 0) * l.qty, 0);
