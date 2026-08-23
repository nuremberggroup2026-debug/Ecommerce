import { theme } from "@/themes";

export function StoreFeaturesSection() {
  const features = [
    {
      title: "Fast Delivery",
      description:
        "Carefully packed and shipped directly to your doorstep in record time.",
      icon: (
        <svg
          className={theme.storeFeatures.icon}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
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
      title: "Trusted Quality",
      description:
        "Every item in our collection is strictly curated to ensure premium standards.",
      icon: (
        <svg
          className={theme.storeFeatures.icon}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
          />
        </svg>
      ),
    },
    {
      title: "Secure Checkout",
      description:
        "Your data and payments are fully encrypted and protected at all times.",
      icon: (
        <svg
          className={theme.storeFeatures.icon}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
          />
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