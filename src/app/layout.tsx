import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
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
    default: "ReillyDesignStudio — Design That Moves People",
    template: "%s | ReillyDesignStudio",
  },
  description:
    "Professional design studio offering custom design work, digital products, physical merchandise, and creative services. Portfolio, shop, and blog.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://reillydesignstudio.com"
  ),
  openGraph: {
    type: "website",
    siteName: "ReillyDesignStudio",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-950 text-zinc-100`}>
        <Navbar />
        <main className="pt-16 min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
