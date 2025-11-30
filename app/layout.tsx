import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "Incheon Airport Bus Guide - Find Your Route to Seoul Hotel",
    template: "%s | Incheon Airport Bus Guide",
  },
  description: "The easiest way to find Incheon Airport (ICN) limousine bus routes to Myeongdong, Dongdaemun, Gangnam, and Hongdae. Check timetables, prices, and bus stops.",
  keywords: [
    "Incheon Airport Bus",
    "Seoul Airport Bus",
    "K-Limousine",
    "Airport Limousine Bus",
    "Bus 6001",
    "Bus 6015",
    "Bus 6002",
    "Myeongdong Airport Bus",
    "Dongdaemun Airport Bus",
    "Incheon to Seoul",
  ],
  openGraph: {
    title: "Incheon Airport Bus Guide - Find Your Route to Seoul Hotel",
    description: "Don't get lost in Seoul! Find the direct limousine bus from Incheon Airport to your hotel in Myeongdong, Dongdaemun, and Gangnam.",
    url: "https://bus.lintrahub.com",
    siteName: "Incheon Airport Bus Guide",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Incheon Airport Bus Guide",
    description: "Find the direct limousine bus from Incheon Airport to your hotel.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// ... imports

import Script from "next/script";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3505313580947440"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`${plusJakartaSans.variable} antialiased font-sans flex min-h-screen flex-col bg-slate-50`}
      >
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
