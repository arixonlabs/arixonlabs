import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import { SmoothScroll } from "@/components/smoothscroll/SmoothScroll";
import Footer from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Arixon Labs | Custom AI & SaaS Development for Scaling Businesses",
  description:
    "Transform your business with Arixon Labs. We build high-performance custom SaaS platforms, AI automation, and web applications that drive growth.",
  keywords:
    "SaaS development agency, custom AI automation for business, web application development, hire software developer, AI solution provider for startups, Arixon Labs",
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
        <Navbar />
        <SmoothScroll>
          <main className="flex-1">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
