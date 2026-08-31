// app/layout.tsx

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { StoreProvider } from "@/providers/StoreProvider";
import AuthProvider from "@/components/providers/AuthProvider";
import { generateSiteMetadata } from "@/lib/constants/metadata";
import ReactQueryProvider from "@/providers/ReactQueryProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export function generateMetadata() {
  return generateSiteMetadata("en");
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen flex flex-col">
        <StoreProvider>
          <AuthProvider>

            <ReactQueryProvider>
              <main className="flex-1">
                {children}
              </main>
            </ReactQueryProvider>
          </AuthProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
