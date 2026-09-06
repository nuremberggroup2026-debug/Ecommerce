interface PaymentMethodsProps {
  paymentMethod: string;
  setPaymentMethod: (method: string) => void;
}

export default function PaymentMethods({ paymentMethod, setPaymentMethod }: PaymentMethodsProps) {
  const methods = [
    { id: "cash", title: "Cash On Delivery", desc: "Pay when your order arrives" },
    { id: "visa", title: "Visa / Mastercard", desc: "Secure card payment" },
    { id: "cliq", title: "CliQ", desc: "Instant bank transfer" },
  ];

  return (
    <div className="rounded-[32px] border border-neutral-100 p-8">
      <h2 className="mb-6 text-sm font-semibold uppercase tracking-widest">
        Payment Method
      </h2>
      <div className="grid gap-4">
        {methods.map((method) => (
          <button
            key={method.id}
            type="button"
            onClick={() => setPaymentMethod(method.id)}
            className={`rounded-2xl border p-5 text-left transition ${
              paymentMethod === method.id
                ? "border-black bg-black text-white"
                : "border-neutral-200 hover:border-black"
            }`}
          >
            <p className="text-sm font-semibold">{method.title}</p>
            <span className="text-xs opacity-70">{method.desc}</span>
          </button>
        ))}
      </div>
    </div>
  );
}