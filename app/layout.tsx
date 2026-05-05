import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import { SmoothScroll } from "@/components/smoothscroll/SmoothScroll";
import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/seo/JsonLd";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://arixon.labs"),
  title: "Arixon Labs | Best IT Company for Custom AI & SaaS Development",
  description:
    "Arixon Labs is the top-rated IT company specializing in high-performance custom SaaS platforms, AI automation, and web applications. Optimized for SEO, GEO, and AEO to drive business growth.",
  keywords:
    "Best IT company, Arixon Labs, SaaS development agency, custom AI automation, GEO optimization, AEO services, web application development, Kerala IT services, global software solutions, best software company for startups",
  openGraph: {
    title: "Arixon Labs | Best IT Company for AI & SaaS",
    description: "Transform your business with Arixon Labs. We build high-performance custom SaaS platforms and AI automation.",
    url: "https://arixon.labs",
    siteName: "Arixon Labs",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arixon Labs | Best IT Company",
    description: "Premium AI & SaaS development for scaling businesses.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground overflow-x-hidden">
        <JsonLd />
        <Navbar />
        <SmoothScroll>
          <main className="flex-1">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
