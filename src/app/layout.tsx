import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Bricolage_Grotesque, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Analytics from "@/components/Analytics";
import JsonLd from "@/components/JsonLd";
import TopTape from "@/components/TopTape";
import BackgroundFx from "@/components/BackgroundFx";
import MaintenanceBanner from "@/components/MaintenanceBanner";
import ScrollToTop from "@/components/ScrollToTop";
import { organizationSchema, websiteSchema } from "@/lib/seo";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL, SITE_KEYWORDS } from "@/lib/site";

const bebas = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0908" },
    { media: "(prefers-color-scheme: light)", color: "#0a0908" },
  ],
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: "%s · CORE — Create Own Run Everything",
  },
  description: SITE_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  applicationName: "CORE",
  category: "entertainment",
  authors: [{ name: "CORE Inc.", url: SITE_URL }],
  creator: "CORE Inc.",
  publisher: "CORE Inc.",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/embed-preview.png",
        width: 1200,
        height: 630,
        type: "image/png",
        alt: "TheCoreBoys — CORE / Create Own Run Everything embed preview with all six members",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@thecoreboys",
    creator: "@thecoreboys",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/embed-preview.png",
        width: 1200,
        height: 630,
        alt: "TheCoreBoys — CORE / Create Own Run Everything embed preview",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${bebas.variable} ${bricolage.variable} ${jetbrains.variable} antialiased`}
    >
      <head>
        <link rel="canonical" href={SITE_URL} />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="apple-mobile-web-app-title" content="CORE" />
        <JsonLd id="ld-organization" data={organizationSchema()} />
        <JsonLd id="ld-website" data={websiteSchema()} />
      </head>
      <body className="min-h-screen bg-[var(--bg)] text-[var(--fg)] overflow-x-hidden">
        <BackgroundFx />
        <MaintenanceBanner />
        <TopTape />
        {children}
        <ScrollToTop />
        <Analytics />
      </body>
    </html>
  );
}
