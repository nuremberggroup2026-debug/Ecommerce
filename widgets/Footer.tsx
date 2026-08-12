"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

export default function Footer() {
  // Scoped to the "Footer" namespace from your JSON files
  const t = useTranslations("Footer");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-neutral-100 bg-neutral-50/50">
      <div className="mx-auto max-w-[92%] px-6 pt-14 pb-7 lg:px-10">
        
        {/* 3-Column Layout */}
        <div className="grid gap-8 md:grid-cols-3 mb-12">
          
          {/* Column 1: Website Name & Description */}
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold tracking-tight text-neutral-900">
                {t("BRAND_NAME")}
                <span className="font-light text-neutral-400">{t("BRAND_SUFFIX")}</span>
              </h2>
              <p className="max-w-sm text-xs leading-relaxed text-gray-400 font-light">
                {t("DESCRIPTION")}
              </p>
            </div>
          </div>

          {/* Column 2: Links */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold tracking-wider uppercase text-neutral-900">
              {t("LINKS_TITLE")}
            </h3>
            <ul className="space-y-2.5 text-xs text-gray-400 font-light">
              <li>
                <Link href="/" className="transition hover:text-black">
                  {t("LINKS_HOME")}
                </Link>
              </li>
              <li>
                <Link href="/categories" className="transition hover:text-black">
                  {t("LINKS_CATEGORIES")}
                </Link>
              </li>
              <li>
                <Link href="/products" className="transition hover:text-black">
                  {t("LINKS_PRODUCTS")}
                </Link>
              </li>
              <li>
                <Link href="/about" className="transition hover:text-black">
                  {t("LINKS_ABOUT")}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="transition hover:text-black">
                  {t("LINKS_CONTACT")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info & Social Media */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold tracking-wider uppercase text-neutral-900">
              {t("CONTACT_TITLE")}
            </h3>
            <ul className="space-y-2.5 text-xs text-gray-400 font-light">
              <li>
                <span className="font-medium text-neutral-600">{t("EMAIL")}: </span>
                <a href={`mailto:${t("EMAIL_VALUE")}`} className="transition hover:text-black">
                  {t("EMAIL_VALUE")}
                </a>
              </li>
              <li>
                <span className="font-medium text-neutral-600">{t("PHONE")}: </span>
                <a href={`tel:${t("PHONE_VALUE").replace(/\D/g, '')}`} className="transition hover:text-black">
                  {t("PHONE_VALUE")}
                </a>
              </li>
              <li>
                <span className="font-medium text-neutral-600">{t("LOCATION")}: </span>
                {t("LOCATION_VALUE")}
              </li>
            </ul>

            {/* Social Media Icons */}
            <div className="flex gap-4 pt-2">
              <a href="#" aria-label="Instagram" className="text-gray-400 transition hover:text-black">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" aria-label="X (Twitter)" className="text-gray-400 transition hover:text-black">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>

        </div>

        {/* Centered Copyright Section */}
        {/* next-intl easily handles variables inside strings by passing an object */}
        <div className="flex justify-center border-t border-neutral-200/60 pt-8 text-[11px] text-gray-400 font-light">
          <p>{t("COPYRIGHT", { year: currentYear })}</p>
        </div>

      </div>
    </footer>
  );
}