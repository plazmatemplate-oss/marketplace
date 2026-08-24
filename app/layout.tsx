import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import { cn } from "@/lib/utils";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TopBanner from "@/components/layout/TopBanner";
import FloatingSocial from "@/components/layout/FloatingSocial";
import BackToTop from "@/components/common/BackToTop";
import WhatsAppButton from "@/components/common/WhatsAppButton";
import Providers from "./providers";

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  metadataBase: new URL("https://plazmathemes.com"),
  title: "Prestashop Themes & Templates | PlazmaThemes Marketplace",
  description: "Prestashop Themes Marketplace by PlazmaThemes — Premium Themes & Templates with fast Performance, Mobile-ready design, easy setup and reliable support.",
  keywords: ["PrestaShop themes", "ecommerce templates", "premium themes", "PlazmaThemes", "website templates", "online store"],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Prestashop Themes & Templates | PlazmaThemes Marketplace",
    description: "Prestashop Themes Marketplace by PlazmaThemes — Premium Themes & Templates with fast Performance, Mobile-ready design, easy setup and reliable support.",
    url: "https://plazmathemes.com",
    siteName: "PlazmaThemes",
    images: [
      {
        url: "https://plazmathemes.com/img/favicon.png",
        width: 800,
        height: 600,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "https://plazmathemes.com/img/favicon.png",
    shortcut: "https://plazmathemes.com/img/favicon.png",
    apple: "https://plazmathemes.com/img/favicon.png",
  },
};

import { Toaster } from "@/components/ui/sonner";
import Script from "next/script";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased font-sans", inter.variable)}
    >
      <head>
        <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3763297443777958"
          crossOrigin="anonymous"></Script>
        <meta name="google-adsense-account" content="ca-pub-3763297443777958"></meta>
      </head>
      <body className="flex flex-col min-h-screen">
        <Providers>
          <Toaster />
          <div className="hidden md:block">
            <FloatingSocial />
          </div>
          <TopBanner />
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <BackToTop />
          <WhatsAppButton />
        </Providers>
      </body>
    </html>
  );
}
