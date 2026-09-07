import { cookies } from "next/headers";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Cairo } from "next/font/google";
import "./globals.css";

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

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export async function generateMetadata() {
  const cookieStore = await cookies();
  const locale = cookieStore.get("NEXT_LOCALE")?.value === "ar" ? "ar" : "en";
  return generateSiteMetadata(locale);
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html
    
      className={`${geistSans.variable} ${geistMono.variable} ${cairo.variable} `}
    >
      <body className="min-h-screen flex flex-col font-sans antialiased">
        <AuthProvider>
          <ReactQueryProvider>
            <main className="flex-1">{children}</main>
          </ReactQueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
