"use client";

import { useTranslations } from "next-intl";
import { theme } from "@/themes";

export function StoreFeaturesSection() {
  const t = useTranslations("Home.StoreFeatures");

  const features = [
    {
      title: t("FAST_DELIVERY_TITLE"),
      description: t("FAST_DELIVERY_DESC"),
      icon: (
        <svg
          className={theme.storeFeatures.icon}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124l-.321-5.128a2.25 2.25 0 0 0-2.25-2.112h-2.25M16.5 18.75V16.5M16.5 12h2.25m-2.25 0H12m4.5 0V7.5A2.25 2.25 0 0 0 14.25 5.25H9.75A2.25 2.25 0 0 0 7.5 7.5V12m-3 0h3.75m0 0V16.5m0 0h9"
          />
        </svg>
      ),
    },
    {
      title: t("TRUSTED_QUALITY_TITLE"),
      description: t("TRUSTED_QUALITY_DESC"),
      icon: (
        <svg
          className={theme.storeFeatures.icon}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
          />
        </svg>
      ),
    },
    {
      title: t("BEST_PRICE_TITLE"),
      description: t("BEST_PRICE_DESC"),
      icon: (
        <svg
          className={theme.storeFeatures.icon}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.386a3.75 3.75 0 0 0 1.257-1.257c.486-.827.313-1.908-.386-2.607L7.136 7.67A2.25 2.25 0 0 1 6.477 6.079V5.25c0-.621.504-1.125 1.125-1.125h.829a2.25 2.25 0 0 1 1.591.659l9.582 9.581c.699.699 1.78.872 2.607.386.438-.258.8-.62 1.058-1.058.486-.827.313-1.908-.386-2.607L12.75 3.659A2.25 2.25 0 0 0 11.159 3H9.568Z"
          />
          <circle cx="8" cy="8" r="1.5" fill="currentColor" stroke="none" />
        </svg>
      ),
    },
  ];

  return (
    <section className={theme.storeFeatures.section}>
      <div className={theme.storeFeatures.container}>
        <div className={theme.storeFeatures.grid}>
          {features.map((item, index) => (
            <div
              key={index}
              className={`${theme.storeFeatures.item} ${
                index !== 0 ? theme.storeFeatures.itemSpacing : ""
              }`}
            >
              <div className={theme.storeFeatures.iconBox}>
                {item.icon}
              </div>

              <div className={theme.storeFeatures.contentWrapper}>
                <h3 className={theme.storeFeatures.title}>
                  {item.title}
                </h3>
                <p className={theme.storeFeatures.description}>
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}