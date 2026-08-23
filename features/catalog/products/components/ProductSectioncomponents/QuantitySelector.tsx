"use client";

import { theme } from "@/themes";

type Props = {
  quantity: number;
  stock: number;
  setQuantity: (value: number) => void;
};

export default function QuantitySelector({
  quantity,
  stock,
  setQuantity,
}: Props) {
  const changeQuantity = (delta: number) => {
    setQuantity(
      Math.min(
        Math.max(
          1,
          quantity + delta
        ),
        stock
      )
    );
  };

  return (
    <div className={theme.quantitySelector.container}>
      <label className={theme.quantitySelector.label}>
        Quantity
      </label>

      <div className={theme.quantitySelector.wrapper}>
        <button
          onClick={() => changeQuantity(-1)}
          disabled={quantity <= 1}
          className={theme.quantitySelector.button}
        >
          -
        </button>

        <span className={theme.quantitySelector.value}>
          {quantity}
        </span>

        <button
          onClick={() => changeQuantity(1)}
          disabled={quantity >= stock}
          className={theme.quantitySelector.button}
        >
          +
        </button>
      </div>
    </div>
  );
}