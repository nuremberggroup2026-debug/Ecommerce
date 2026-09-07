import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Toaster } from "@/components/ui/sonner";
import Footer from "@/widgets/Footer";
import { Navbar } from "@/widgets/navbar";
import { generateSiteMetadata } from "@/lib/constants/metadata";
import { Locale } from "@/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  return generateSiteMetadata(locale);
}



export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "en" | "ar")) {
    notFound();
  }

  const messages = await getMessages();

  const isArabic = locale === "ar";
  const dir = isArabic ? "rtl" : "ltr";

  return (
    <div dir={dir} className="min-h-full">
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.dir='${dir}';document.documentElement.lang='${locale}';`,
        }}
      />
      <NextIntlClientProvider messages={messages}>
        <Navbar />
        {children}
        <Toaster
          dir={dir}
          toastOptions={{
            classNames: {
              success: "border-green-500",
              error: "border-red-500",
            },
          }}
        />
        <Footer />
      </NextIntlClientProvider>
    </div>
  );
}
