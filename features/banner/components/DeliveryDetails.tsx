import { ChangeEvent } from "react";
import { ShippingData } from "@/types/checkout";

interface DeliveryDetailsProps {
  shippingData: ShippingData;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function DeliveryDetails({ shippingData, onChange }: DeliveryDetailsProps) {
  const inputs = [
    { name: "name", placeholder: "Full Name" },
    { name: "email", placeholder: "Email Address", type: "email" },
    { name: "phone", placeholder: "Phone Number", type: "tel" },
    { name: "address", placeholder: "Address" },
    { name: "city", placeholder: "City" },
  ];

  return (
    <div className="rounded-[32px] border border-neutral-100 p-8">
      <h2 className="mb-6 text-sm font-semibold uppercase tracking-widest">
        Delivery Details
      </h2>
      <div className="grid gap-4">
        {inputs.map((input) => (
          <input
            key={input.name}
            name={input.name}
            type={input.type || "text"}
            value={shippingData[input.name as keyof ShippingData]}
            onChange={onChange}
            placeholder={input.placeholder}
            required
            className="rounded-xl border border-neutral-200 p-4 text-sm outline-none transition focus:border-black"
          />
        ))}
      </div>
    </div>
  );
}