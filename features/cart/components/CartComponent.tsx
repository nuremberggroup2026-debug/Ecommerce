"use client";

import Image from "next/image";
import Link from "next/link";

import { useAppDispatch, useAppSelector } from "@/Redux/store/hooks";

import {
  removeFromCart,
  increaseQty,
  decreaseQty,
} from "@/Redux/slices/cart.slice";

export default function CartComponent() {
  const dispatch = useAppDispatch();

  const cartItems = useAppSelector(
    (state) => state.cart.items
  );

  const subtotal = cartItems.reduce(
    (total, item) =>
      total + item.product.price * item.quantity,
    0
  );

  const shipping = subtotal > 300 ? 0 : 15;

  const total = subtotal + shipping;


  return (
    <main className="min-h-screen bg-white text-black">

      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">


        <header className="mb-16 border-b border-neutral-100 pb-6">

          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Shopping Cart
          </h1>

          <p className="mt-2 text-xs text-gray-400">
            {
              cartItems.length === 0
                ? "Your cart is empty"
                : `You have ${cartItems.length} items in your cart`
            }
          </p>

        </header>



        {
          cartItems.length === 0 ? (

            <div className="flex flex-col items-center justify-center py-24 text-center">

              <p className="mb-6 text-sm text-gray-400">
                Your cart feels light.
              </p>


              <Link
                href="/products"
                className="rounded-full bg-black px-8 py-4 text-xs font-semibold uppercase tracking-widest text-white"
              >
                Continue Shopping
              </Link>


            </div>


          ) : (


            <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">


              {/* Cart Items */}

              <div className="divide-y divide-neutral-100 lg:col-span-7">


                {
                  cartItems.map((item) => {

                    const product = item.product;


                    return (

                      <div
                        key={product.id}
                        className="flex gap-6 py-8"
                      >


                        <div className="relative h-32 w-24 overflow-hidden rounded-2xl bg-neutral-100">

                          <Image
                            src={product.images[0]}
                            alt={product.title}
                            fill
                            className="object-cover"
                          />

                        </div>



                        <div className="flex flex-1 flex-col justify-between">


                          <div>

                            <div className="flex justify-between gap-4">


                              <h3 className="font-medium">
                                {product.title}
                              </h3>


                              <p className="font-semibold">
                                ${product.price * item.quantity}
                              </p>


                            </div>



                            {
                              product.brand && (
                                <p className="mt-2 text-xs text-gray-400">
                                  {product.brand}
                                </p>
                              )
                            }


                          </div>





                          <div className="mt-5 flex items-center justify-between">


                            <div className="flex items-center rounded-full border border-neutral-200">


                              <button
                                onClick={() =>
                                  dispatch(
                                    decreaseQty(
                                      String(product.id)
                                    )
                                  )
                                }
                                className="px-4 py-2 text-gray-500 hover:text-black"
                              >
                                -
                              </button>



                              <span className="px-3 text-sm font-semibold">
                                {item.quantity}
                              </span>



                              <button
                                onClick={() =>
                                  dispatch(
                                    increaseQty(
                                      String(product.id)
                                    )
                                  )
                                }
                                className="px-4 py-2 text-gray-500 hover:text-black"
                              >
                                +
                              </button>


                            </div>





                            <button
                              onClick={() =>
                                dispatch(
                                  removeFromCart(
                                    String(product.id)
                                  )
                                )
                              }
                              className="text-sm text-gray-400 hover:text-black"
                            >
                              Remove
                            </button>


                          </div>


                        </div>


                      </div>

                    );


                  })
                }


              </div>







              {/* Summary */}

              <div className="lg:col-span-5">


                <div className="rounded-[32px] bg-neutral-50 p-8">


                  <h2 className="mb-6 text-sm font-semibold uppercase tracking-wider">
                    Order Summary
                  </h2>



                  <div className="space-y-4 border-b border-neutral-200 pb-6">


                    <div className="flex justify-between text-sm">

                      <span>
                        Subtotal
                      </span>


                      <span className="font-semibold">
                        ${subtotal}
                      </span>

                    </div>





                    <div className="flex justify-between text-sm">


                      <span>
                        Shipping
                      </span>


                      <span className="font-semibold">

                        {
                          shipping === 0
                            ? "Free"
                            : `$${shipping}`
                        }

                      </span>


                    </div>


                  </div>





                  <div className="flex justify-between py-6">

                    <span className="font-medium">
                      Total
                    </span>


                    <span className="text-xl font-bold">
                      ${total}
                    </span>


                  </div>




    <Link
  href="/checkout"
  className="
  block
  w-full
  rounded-2xl
  bg-black
  py-4
  text-center
  text-xs
  font-semibold
  uppercase
  tracking-widest
  text-white
  transition
  hover:bg-neutral-800
  "
>
  Proceed To Checkout
</Link>


                  <Link
                    href="/products"
                    className="mt-5 block text-center text-xs text-gray-400 hover:text-black"
                  >
                    ← Continue Shopping
                  </Link>


                </div>


              </div>


            </div>


          )
        }


      </div>

    </main>
  );
}