import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { BRAND, STORY } from "@/config/restaurantData";
import { Navbar } from "@/components/Navbar";
import { MobileOrderCTA } from "@/components/MobileOrderCTA";
import { DailyMenuBubble } from "@/components/DailyMenuBubble";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { CursorGlow } from "@/components/CursorGlow";
import { OrderDrawerProvider } from "@/components/OrderDrawerContext";
import { StructuredData } from "@/components/StructuredData";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(BRAND.domain),
  icons: {
    icon: "/favicon.png",
    apple: "/media/logo.png",
  },
  title: {
    default: "Fonda Colombiana San Jose | Comida Colombiana Auténtica",
    template: "%s | Fonda Colombiana San Jose",
  },
  description:
    "Cocina colombiana auténtica de la familia Ruiz — " +
    `${STORY.motto}. Dos ubicaciones en San Jose. Ordena para recoger en línea en Fonda White o Fonda Snell.`,
  keywords: [
    "comida colombiana San Jose",
    "Bandeja Paisa",
    "Tamal Huilense",
    "Fonda Colombiana",
    "restaurante colombiano San Jose",
    "Colombian food San Jose",
  ],
  openGraph: {
    title: "Fonda Colombiana San Jose | Comida Colombiana Auténtica",
    description: `${STORY.heroSlogan} ${STORY.heroSubSlogan}`,
    url: BRAND.domain,
    siteName: "Fonda Colombiana San Jose",
    locale: "es_CO",
    type: "website",
    images: [{ url: "/media/logo.png", width: 400, height: 400, alt: "Fonda Colombiana San Jose" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${playfair.variable} ${inter.variable} h-full`}>
      <head>
        {/* Warm DNS for social embeds — they only load on tap (facade), so this
            keeps the page light while making the first tap feel instant */}
        <link rel="dns-prefetch" href="https://www.instagram.com" />
        <link rel="dns-prefetch" href="https://www.tiktok.com" />
        <StructuredData />
      </head>
      <body className="min-h-full flex flex-col bg-crema text-ink" id="top">
        <OrderDrawerProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-azul focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-crema focus:shadow-lg focus:outline-none"
          >
            Ir al contenido principal
          </a>
          <AnnouncementBar />
          <Navbar />
          <main id="main-content" className="flex-1" tabIndex={-1}>
            {children}
          </main>
          <MobileOrderCTA />
          <DailyMenuBubble />
          <CursorGlow />
        </OrderDrawerProvider>
      </body>
    </html>
  );
}
