// app/layout.tsx

import "./globals.css";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import type { Metadata } from "next";

// Font imports
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// Metadata for the site
export const metadata: Metadata = {
  title: "Nutridine - Your Health Companion",
  description: "Personalized nutrition plans and health tracking for a better you.",
};

// ✅ Root layout component
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
