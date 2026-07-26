"use client";

import { useState } from "react";

import {
  addToCart,
} from "@/Redux/slices/cart.slice";

import {
  useAppDispatch,
  useAppSelector,
} from "@/Redux/store/hooks";

import type { Product } from "../../types";

export default function ProductInfo({
  product,
}: {
  product: Product;
}) {

  const dispatch = useAppDispatch();


  const cartItem = useAppSelector((state) =>
    state.cart.items.find(
      (item) => String(item.product.id) === String(product.id)
    )
  );


  const [quantity, setQuantity] = useState(
    cartItem?.quantity ?? 1
  );


  const handleQuantityChange = (delta: number) => {

    setQuantity((prev) =>
      Math.min(
        Math.max(1, prev + delta),
        product.stock
      )
    );

  };


  return (
    <div className="space-y-8">


      <div className="space-y-2">

        <div className="flex items-center justify-between">

          <span className="text-xs uppercase tracking-widest text-gray-400 font-medium">
            {product.brand}
          </span>


          <div className="flex items-center gap-2">

            <span
              className={`h-1.5 w-1.5 rounded-full ${
                product.stock > 5
                  ? "bg-emerald-500"
                  : "bg-amber-500"
              }`}
            />


            <span className="text-[11px] font-medium text-neutral-500">

              {product.stock > 5
                ? "In Stock"
                : `Only ${product.stock} items left`}

            </span>

          </div>

        </div>


        <h1 className="text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
          {product.title}
        </h1>


        <div className="flex items-center gap-4 pt-1">

          <p className="text-xl font-bold tracking-tight text-black">
            ${product.price}
          </p>


          <div className="h-4 w-px bg-neutral-200" />


          <div className="flex items-center gap-1.5 text-xs text-neutral-500">

            <span className="text-amber-500 font-semibold">
              ★
            </span>


            <span className="text-black font-medium">
              {product.rating}
            </span>


            <span>
              ({product.rating} reviews)
            </span>

          </div>

        </div>

      </div>


      <hr className="border-neutral-100" />


      <div className="space-y-3">

        <p className="text-sm text-gray-400 leading-relaxed font-light">
          {product.description}
        </p>


        <span className="text-[10px] text-gray-300 font-mono block">
          SKU: {product.sku}
        </span>

      </div>



      <div className="space-y-3">

        <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-800 block">
          Quantity
        </label>


        <div className="inline-flex items-center border border-neutral-200 rounded-full bg-white p-1 shadow-sm">


          <button
            onClick={() => handleQuantityChange(-1)}
            disabled={quantity <= 1}
            className="p-2 text-gray-400 hover:text-black disabled:opacity-30"
          >
            -
          </button>


          <span className="w-10 text-center text-xs font-semibold">
            {quantity}
          </span>


          <button
            onClick={() => handleQuantityChange(1)}
            disabled={quantity >= product.stock}
            className="p-2 text-gray-400 hover:text-black disabled:opacity-30"
          >
            +
          </button>


        </div>

      </div>



      <button
        onClick={() =>
          dispatch(
            addToCart({
              product,
              quantity,
            })
          )
        }
        className="w-full bg-black py-4 text-xs font-semibold uppercase tracking-widest text-white rounded-2xl transition hover:bg-neutral-800 shadow-sm active:scale-[0.98]"
      >
        Add to Bag
      </button>


    </div>
  );
}