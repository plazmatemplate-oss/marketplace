import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";

import "./globals.css";
import { cn } from "@/lib/utils";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TopBanner from "@/components/layout/TopBanner";
import FloatingSocial from "@/components/layout/FloatingSocial";
import BackToTop from "@/components/common/BackToTop";
import WhatsAppButton from "@/components/common/WhatsAppButton";
import Providers from "./providers";
import { Toaster } from "@/components/ui/sonner";

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
        <meta name="google-adsense-account" content="ca-pub-3763297443777958" />
      </head>
      <body className="flex flex-col min-h-screen">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MMKDMG88"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

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

        {/* Google AdSense */}
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3763297443777958"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />

        {/* Google Tag Manager */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-MMKDMG88');`,
          }}
        />

        {/* Google Ads Tag */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-10778899030"
          strategy="afterInteractive"
        />

        {/* Google Analytics 4 Tag */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-SG9TG65S2M"
          strategy="afterInteractive"
        />

        {/* Gtag Config */}
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'AW-10778899030');
              gtag('config', 'G-SG9TG65S2M');
            `,
          }}
        />

        {/* Tawk.to Live Chat Script */}
        <Script
          id="tawk-to"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
              (function(){
              var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
              s1.defer=true;
              s1.src='https://embed.tawk.to/6773754949e2fd8dfe00d91a/1igdg4ahk';
              s1.charset='UTF-8';
              s1.setAttribute('crossorigin','*');
              s0.parentNode.insertBefore(s1,s0);
              })();
            `,
          }}
        />
      </body>
    </html>
  );
}
