import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AIChatWidget from "@/components/AIChatWidget";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lalith Mannem — Software Engineer @ Google",
  description:
    "Software Engineer at Google building petabyte-scale data infrastructure for DV360 — 10M+ QPS, 20B+ records/day, 5 PB/day. Previously AWS Redshift, Magic Leap, Openlane. Targeting ML Engineer roles at FAANG.",
  keywords: [
    "Software Engineer",
    "Google",
    "Data Infrastructure",
    "Distributed Systems",
    "Apache Beam",
    "C++",
    "Bigtable",
    "DV360",
    "ML Engineer",
    "FAANG",
    "Petabyte Scale",
  ],
  authors: [{ name: "Lalith Mannem" }],
  openGraph: {
    title: "Lalith Mannem — SWE @ Google · Data Infrastructure",
    description:
      "Building petabyte-scale distributed systems at Google. 10M+ QPS, 5 PB/day, 48% of global DV360 traffic. Targeting ML Engineer roles at FAANG.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lalith Mannem — SWE @ Google · Data Infrastructure",
    description:
      "Building petabyte-scale distributed systems at Google. Targeting ML Engineer roles at FAANG.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body className="flex min-h-screen flex-col font-sans antialiased">
        <Navbar />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
        <AIChatWidget />
      </body>
    </html>
  );
}
