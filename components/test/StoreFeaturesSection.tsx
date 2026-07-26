export function StoreFeaturesSection() {
  const features = [
    {
      title: "Fast Delivery",
      description:
        "Carefully packed and shipped directly to your doorstep in record time.",
      icon: (
        <svg
          className="h-5 w-5"
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
          className="h-5 w-5"
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
          className="h-5 w-5"
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
    <section className="bg-white py-20 border-t border-neutral-100">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-12 divide-y divide-neutral-100 lg:divide-y-0 lg:divide-x lg:divide-neutral-100">
          {features.map((item, index) => (
            <div
              key={index}
              className={`flex flex-col items-center text-center sm:items-start sm:text-left space-y-4 ${
                index !== 0 ? "pt-12 lg:pt-0 lg:pl-12" : ""
              }`}
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-neutral-50 text-neutral-800 border border-neutral-200/60 shadow-sm transition-colors duration-300 hover:bg-black hover:text-white">
                {item.icon}
              </div>

              <div className="space-y-1.5">
                <h3 className="text-sm font-semibold tracking-wider uppercase text-neutral-900">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-400 font-light max-w-sm">
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
