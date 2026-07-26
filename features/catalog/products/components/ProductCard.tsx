"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { useAppDispatch, useAppSelector } from "@/Redux/store/hooks";
import { addToCart } from "@/Redux/slices/cart.slice";

import { theme } from "@/themes";

import type { Product } from "../types";


export default function ProductCard({
  product,
}: {
  product: Product;
}) {

  const dispatch = useAppDispatch();

  const [heart, setHeart] = useState(false);


  const cartItem = useAppSelector((state) =>
    state.cart.items.find(
      (item) =>
        String(item.product.id) === String(product.id)
    )
  );


  const isAdded = !!cartItem;

  const isOutOfStock = product.stock <= 0;


  const handleAddToCart = () => {

    if (isOutOfStock) return;

    if (isAdded) return;


    dispatch(
      addToCart({
        product,
        quantity: 1,
      })
    );

  };


  return (
    <div className={theme.productCard.container}>

      <div className={theme.productCard.imageWrapper}>


        <Link href={`/products/${product.id}`}>

          <Image
            src={product.images[0]}
            alt={product.title}
            fill
            sizes="(max-w-7xl) 33vw, 50vw"
            className={theme.productCard.image}
          />

        </Link>


        {product.brand && (

          <span className={theme.productCard.brandBadge}>
            {product.brand}
          </span>

        )}



        <button
          className={theme.productCard.wishlistButton}
          aria-label="Add to wishlist"
          onClick={() => setHeart(!heart)}
        >

          <svg

            className={theme.productCard.wishlistIcon}

            fill={heart ? "red" : "none"}

            stroke={heart ? "red" : "currentColor"}

            strokeWidth="2"

            viewBox="0 0 24 24"

            width="24"

            height="24"

          >

            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />

          </svg>

        </button>




        <div className={theme.productCard.addCartWrapper}>


          <button

            onClick={handleAddToCart}

            disabled={isOutOfStock}

            className={`${theme.productCard.addCartButton} ${
              isAdded
                ? "bg-green-600"
                : isOutOfStock
                ? "bg-gray-400 cursor-not-allowed"
                : ""
            }`}

          >

            {
              isOutOfStock
                ? "Out Of Stock"
                : isAdded
                ? "Added ✓"
                : "Add To Cart"
            }


          </button>


        </div>



      </div>




      <div className={theme.productCard.info}>


        <div className="space-y-0.5">


          <span className={theme.productCard.meta}>
            {product.brand} • {product.category}
          </span>



          <Link href={`/products/${product.id}`}>

            <h3 className={theme.productCard.title}>
              {product.title}
            </h3>

          </Link>


        </div>



        <p className={theme.productCard.price}>
          ${product.price}
        </p>



      </div>



    </div>
  );
}