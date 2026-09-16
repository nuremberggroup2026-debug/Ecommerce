import { RESPONSE_CODES } from "@/lib/constants/response";
import { prisma } from "@/lib/prisma";
import { unstable_cache } from "next/cache";

const getCachedOrdersNumbers = () =>
  unstable_cache(
    async () => {
      const ordersNumber = await prisma.orders.count({});
      const pendingOrdersNumber = await prisma.orders.count({
        where: {
          status: "PENDING",
        },
      });

      return {
        ordersNumber,
        pendingOrdersNumber,
      };
    },
    ["orders-number-and-pendeing-orders-numebr"],
    { tags: ["orders"], revalidate: 3600 },
  )();

const getCachedProductsNumebrs = () =>
  unstable_cache(
    async () => {
      const productsNumber = await prisma.products.count({});
      return { productsNumber };
    },
    ["products-number"],
    { tags: ["products"], revalidate: 3600 },
  )();

const getCachedActivePromoCodesNumber = async () =>
  unstable_cache(
    async () => {
      const activePromoCodeNumber = await prisma.promo_codes.count({
        where: {
          isActive: true,
        },
      });
      return { activePromoCodeNumber };
    },
    ["active-promo-codes-number"],
    {
      tags: ["promoCodes"],
      revalidate: 3600,
    },
  )();

const getCachedUsersNumbers = async () =>
  unstable_cache(
    async () => {
      const usersNumber = await prisma.user.count({});
      return { usersNumber };
    },
    ["users-number"],
    { tags: ["users"], revalidate: 3600 },
  )();

const getCachedCategoriesNumbers = async () =>
  unstable_cache(
    async () => {
      const categoriesNumber = await prisma.categories.count({});
      return { categoriesNumber };
    },
    ["categories-number"],
    { tags: ["categories"], revalidate: 3600 },
  )();

export const dashboardNumber = async () => {
  const [orders, products, promoCodes, users, categories] = await Promise.all([
    getCachedOrdersNumbers(),
    getCachedProductsNumebrs(),
    getCachedActivePromoCodesNumber(),
    getCachedUsersNumbers(),
    getCachedCategoriesNumbers(),
  ]);

  return {
    success: true,
    message: "DASHBOARD_NUMBERS_RETRIEVED_SUCCESSFULLY",
    code: RESPONSE_CODES.OK,
    data: {
      numberOfOrders: orders.ordersNumber,
      numberOfPendingOrders: orders.pendingOrdersNumber,
      numberOfProducts: products.productsNumber,
      numberOfActivePromoCodes: promoCodes.activePromoCodeNumber,
      numberOfUsers: users.usersNumber,
      numberOfCategories: categories.categoriesNumber,
    },
  };
};
