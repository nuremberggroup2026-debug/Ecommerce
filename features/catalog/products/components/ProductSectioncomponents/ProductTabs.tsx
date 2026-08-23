"use client";

import { theme } from "@/themes";

type Props = {
  activeTab: "details" | "shipping";
  setActiveTab: (tab: "details" | "shipping") => void;
};

export default function ProductTabs({
  activeTab,
  setActiveTab,
}: Props) {
  const features = ["XL", "L", "M", "S"];

  return (
    <div className={theme.productTabs.container}>
      <div className={theme.productTabs.tabsList}>
        <button
          onClick={() => setActiveTab("details")}
          className={theme.productTabs.tabButton(activeTab === "details")}
        >
          Features
          {activeTab === "details" && (
            <span className={theme.productTabs.activeIndicator} />
          )}
        </button>

        <button
          onClick={() => setActiveTab("shipping")}
          className={theme.productTabs.tabButton(activeTab === "shipping")}
        >
          Shipping & Returns
          {activeTab === "shipping" && (
            <span className={theme.productTabs.activeIndicator} />
          )}
        </button>
      </div>

      <div className={theme.productTabs.contentArea}>
        {activeTab === "details" ? (
          <ul className={theme.productTabs.featuresList}>
            {features.map((feature, index) => (
              <li key={index}>
                {feature}
              </li>
            ))}
          </ul>
        ) : (
          <p>
            Complimentary standard shipping on orders over $300.
            Returns are accepted within 14 days of receipt,
            provided items are returned in their pristine original packaging.
          </p>
        )}
      </div>
    </div>
  );
}