import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import { SmoothScroll } from "@/components/smoothscroll/SmoothScroll";
import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/seo/JsonLd";
import PerformanceManager from "@/components/PerformanceManager";

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
  title: {
    default: "Arixon Labs | Best IT Company for Custom AI & SaaS Development",
    template: "%s | Arixon Labs"
  },
  description:
    "Arixon Labs is a premier IT company specializing in custom AI automation, SaaS platform development, and high-performance web applications. Leading the industry in SEO, GEO (Generative Engine Optimization), and AEO (Answer Engine Optimization) to ensure global brand dominance.",
  keywords: [
    "Best IT company", 
    "Arixon Labs", 
    "SaaS development agency", 
    "custom AI automation", 
    "GEO optimization services", 
    "AEO experts", 
    "web application development", 
    "Kerala IT services", 
    "global software solutions", 
    "software for startups",
    "AI integration",
    "enterprise software development",
    "high performance web apps"
  ],
  authors: [{ name: "Arixon Labs" }],
  creator: "Arixon Labs",
  publisher: "Arixon Labs",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Arixon Labs | Premier AI & SaaS Development Agency",
    description: "Scale your business with high-performance custom SaaS platforms and AI automation tailored for the next generation of digital growth.",
    url: "https://arixon.labs",
    siteName: "Arixon Labs",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Arixon Labs - Best IT Company",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arixon Labs | Best IT Company for AI & SaaS",
    description: "Engineering the future with custom AI and SaaS solutions. Optimized for SEO, GEO, and AEO.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://arixon.labs",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
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
        <PerformanceManager />
        <Navbar />
        <SmoothScroll>
          <main className="flex-1">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>

    </html>
  );
}
