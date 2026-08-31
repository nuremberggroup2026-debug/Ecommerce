
import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import type {
  Cart,
  CartMutationContext,
} from "../types";

import type { Locale } from "@/types";

import {
  addItemToCart,
} from "@/features/cart/api/cart.client.api";

import {
  cartQueryKey,
} from "./cart.query-key";

type AddToCartVariables = {
  variantId: string;
  quantity: number;
  locale: Locale;
};

export function useAddToCart() {
  const queryClient = useQueryClient();

  return useMutation<
    Awaited<ReturnType<typeof addItemToCart>>,
    Error,
    AddToCartVariables,
    CartMutationContext
  >({
    mutationFn: ({
      variantId,
      quantity,
    }) =>
      addItemToCart(
        variantId,
        quantity,
      ),

    onMutate: async ({
      variantId,
      quantity,
      locale,
    }) => {
      const queryKey =
        cartQueryKey({
          locale,
        });

      // Cancel any active cart request
      await queryClient.cancelQueries({
        queryKey,
      });

      // Save current cart
      // in case we need rollback
      const previousCart =
        queryClient.getQueryData<Cart>(
          queryKey,
        );

      // Optimistic update
      queryClient.setQueryData<Cart>(
        queryKey,
        (old) => {
          if (!old) {
            return old;
          }

          const existingItem =
            old.items.find(
              (item) =>
                item.variant.id ===
                variantId,
            );

          // --------------------------------
          // Existing item
          // --------------------------------
          if (existingItem) {
            const newQuantity =
              existingItem.quantity +
              quantity;

            return {
              ...old,

              items: old.items.map(
                (item) => {
                  if (
                    item.variant.id !==
                    variantId
                  ) {
                    return item;
                  }

                  return {
                    ...item,

                    quantity:
                      newQuantity,

                    subtotal:
                      item.itemPrice *
                      newQuantity,
                  };
                },
              ),

              totalAmount:
                old.totalAmount +
                existingItem.itemPrice *
                  quantity,
            };
          }

          // --------------------------------
          // New item
          // --------------------------------
          //
          // We cannot construct a complete
          // CartData item from variantId
          // and quantity alone because we
          // don't have product/image/price
          // information here.
          //
          // The invalidateQueries below
          // will fetch the complete cart
          // from the server.
          //
          return old;
        },
      );

      return {
        previousCart,
      };
    },

    // --------------------------------------
    // Rollback if mutation fails
    // --------------------------------------
    onError: (
      _error,
      variables,
      context,
    ) => {
      if (
        !context?.previousCart
      ) {
        return;
      }

      queryClient.setQueryData<Cart>(
        cartQueryKey({
          locale:
            variables.locale,
        }),
        context.previousCart,
      );
    },

    // --------------------------------------
    // Refetch cart after mutation
    // --------------------------------------
    onSettled: (
      _data,
      _error,
      variables,
    ) => {
      queryClient.invalidateQueries({
        queryKey:
          cartQueryKey({
            locale:
              variables.locale,
          }),
      });
    },
  });
}