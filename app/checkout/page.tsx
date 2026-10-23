import type { Metadata } from "next";
import { CheckoutForm } from "@/components/checkout-form";

export const metadata: Metadata = { title: "Afrekenen" };

export default function Checkout() {
  return (
    <div className="container-x py-14">
      <h1 className="text-4xl font-extrabold tracking-tight text-navy">Afrekenen</h1>
      <CheckoutForm />
    </div>
  );
}
