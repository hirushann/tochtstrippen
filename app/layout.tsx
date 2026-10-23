import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Fraunces } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/auth";
import { CartProvider } from "@/components/cart";
import { Header } from "@/components/header";
import { CartDrawer } from "@/components/cart-drawer";
import { Footer } from "@/components/footer";

const fraunces = Fraunces({ variable: "--font-fraunces", subsets: ["latin"], style: ["normal", "italic"] });
const jakarta = Plus_Jakarta_Sans({ variable: "--font-jakarta", subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: "Q-lon tochtstrips | Tochtstrippen.nl", template: "%s | Tochtstrippen.nl" },
  description:
    "Dé webshop voor Q-lon tochtstrips: zelfklevend, brandvertragend en kaderprofielen. Grootste voorraad, snelle levering, 10 jaar garantie.",
  metadataBase: new URL("https://tochtstrippen.nl"),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="nl" className={`${jakarta.variable} ${fraunces.variable} antialiased`}>
      <body className="flex min-h-screen flex-col">
        <AuthProvider>
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
