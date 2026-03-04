import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import SessionProvider from "@/components/SessionProvider";
import Footer from "@/components/layout/Footer";
import Analytics from "@/components/Analytics";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "ReillyDesignStudio™ — Design That Moves People™",
    template: "%s | ReillyDesignStudio",
  },
  description:
    "Design, AI, embedded systems, and cybersecurity services. 20+ years of engineering expertise — from brand identity to board bring-up. Based in Reston, VA.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://reillydesignstudio.com"
  ),
  keywords: [
    "design studio", "AI consulting", "embedded systems", "cybersecurity",
    "penetration testing", "brand identity", "web development", "Next.js",
    "OpenClaw", "FreeRTOS", "VxWorks", "Reston VA", "software engineering",
  ],
  authors: [{ name: "Bob Reilly", url: "https://reillydesignstudio.com" }],
  creator: "Reilly Design Studio LLC",
  openGraph: {
    type: "website",
    siteName: "ReillyDesignStudio",
    title: "ReillyDesignStudio™ — Design That Moves People™",
    description: "Design, AI, embedded systems, and cybersecurity services. 20+ years of engineering expertise.",
    url: "https://reillydesignstudio.com",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "ReillyDesignStudio™ — Design That Moves People™",
    description: "Design, AI, embedded systems, and cybersecurity services. 20+ years of engineering expertise.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-950 text-zinc-100`}>
        <SessionProvider><Navbar />
        <main className="pt-16 min-h-screen">{children}</main>
        <Footer /></SessionProvider>
        <Analytics />
      </body>
    </html>
  );
}
