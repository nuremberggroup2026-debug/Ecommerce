"use client";

import {
  addToCart,
  updateQty,
} from "@/Redux/slices/cart.slice";

import {
  useAppDispatch,
  useAppSelector,
} from "@/Redux/store/hooks";

import type { Product } from "../../types";


type Props = {
  product: Product;
  quantity: number;
};


export default function AddToCartButton({
  product,
  quantity,
}: Props) {

  const dispatch = useAppDispatch();


  const cartItem = useAppSelector((state) =>
    state.cart.items.find(
      (item) =>
        String(item.product.id) === String(product.id)
    )
  );


  const handleAdd = () => {

    if (quantity > product.stock) return;


    if (cartItem) {

      dispatch(
        updateQty({
          id: String(product.id),
          quantity,
        })
      );

    } else {

      dispatch(
        addToCart({
          product,
          quantity,
        })
      );

    }

  };


  const disabled =
    product.stock <= 0 ||
    quantity > product.stock;


  return (
    <button
      onClick={handleAdd}
      disabled={disabled}
      className={`
        w-full py-4 text-xs font-semibold uppercase tracking-widest text-white rounded-2xl
        ${
          disabled
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-black hover:bg-neutral-800"
        }
      `}
    >
      {
        product.stock <= 0
          ? "Out Of Stock"
          : cartItem
          ? "Update Bag"
          : "Add to Bag"
      }
    </button>
  );
}