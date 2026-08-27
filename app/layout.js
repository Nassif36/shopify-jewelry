import { Cormorant_Garamond, Manrope } from "next/font/google";
import { CartProvider } from "@/components/cart/CartProvider";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600"],
  display: "swap"
});

const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap"
});

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: { default: "Maison Lune — Jewelry, made to linger", template: "%s | Maison Lune" },
  description: "Quiet, sculptural jewelry for everyday moments.",
  openGraph: {
    title: "Maison Lune",
    description: "Quiet, sculptural jewelry for everyday moments.",
    type: "website"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body>
        <CartProvider>
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
          <ScrollToTop />
        </CartProvider>
      </body>
    </html>
  );
}
