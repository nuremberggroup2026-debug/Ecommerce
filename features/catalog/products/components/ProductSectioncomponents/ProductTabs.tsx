"use client";

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
    <div className="border-t border-neutral-100 pt-6">

      <div className="flex gap-6 border-b border-neutral-100 pb-2 text-xs uppercase tracking-wider font-semibold">


        <button
          onClick={() => setActiveTab("details")}
          className={`pb-2 transition-all relative ${
            activeTab === "details"
              ? "text-black"
              : "text-gray-400 hover:text-black"
          }`}
        >

          Features

          {activeTab === "details" && (
            <span className="absolute bottom-0 inset-x-0 h-0.5 bg-black" />
          )}

        </button>



        <button
          onClick={() => setActiveTab("shipping")}
          className={`pb-2 transition-all relative ${
            activeTab === "shipping"
              ? "text-black"
              : "text-gray-400 hover:text-black"
          }`}
        >

          Shipping & Returns

          {activeTab === "shipping" && (
            <span className="absolute bottom-0 inset-x-0 h-0.5 bg-black" />
          )}

        </button>


      </div>



      <div className="py-4 text-xs text-gray-400 font-light leading-relaxed">


        {activeTab === "details" ? (

          <ul className="list-disc pl-4 space-y-2">

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