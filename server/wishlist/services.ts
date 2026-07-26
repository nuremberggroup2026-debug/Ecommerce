import { RESPONSE_CODES } from "@/lib/constants/response";
import { prisma } from "@/lib/prisma";
import { Locale, WishlistCreateInput } from "@/types";
import { revalidateTag, unstable_cache } from "next/cache";
import { addWishlistItemSchema } from "./validations";

export const addWishlistItem = async (newWishlistItem: WishlistCreateInput) => {
  const validation = addWishlistItemSchema.safeParse(newWishlistItem);

  if (validation.success) {
    const isExisted = await prisma.wishlist.findFirst({
      where: {
        productId: validation.data.productId,
        userId: validation.data.userId,
      },
    });

    if (isExisted)
      return {
        success: false,
        message: "Product already exists in wishlist",
        code: RESPONSE_CODES.CONFLICT,
      };

    await prisma.wishlist.create({
      data: validation.data,
    });

    revalidateTag("wishlist", "max");
    return {
      success: true,
      message: "Item added successfully",
      code: RESPONSE_CODES.CREATED,
    };
  }

  return {
    success: false,
    message: "Validation error",
    code: RESPONSE_CODES.BAD_REQUEST,
  };
};

export const deleteWishlistItem = async (itemId: string) => {
  const isExisted = await prisma.wishlist.findUnique({
    where: { id: itemId },
  });

  if (!isExisted)
    return {
      success: false,
      message: "Item not found",
      code: RESPONSE_CODES.NOT_FOUND,
    };

  await prisma.wishlist.delete({
    where: { id: itemId },
  });

  return {
    success: true,
    message: "Item deleted successfully",
    code: RESPONSE_CODES.OK,
  };
};

/* -------------------- Caching Helps --------------------  */

const getCachedWishlistItems = (userId: string, locale: Locale) =>
  unstable_cache(
    async () => {
      const result = await prisma.wishlist.findMany({
        where: { userId },
        select: {
          id: true,
          products: {
            select: {
              id: true,
              productNameEn: true,
              productNameAr: true,
              productDescriptionEn: true,
              productDescriptionAr: true,
              productCardImage: true,
              productVariants: {
                orderBy: {
                  finalPrice: "asc",
                },
                take: 1,
                select: {
                  finalPrice: true,
                  price: true,
                  discountPercentage: true,
                },
              },
              categories: {
                select: { categoryNameEn: true, categoryNameAr: true },
              },
            },
          },
        },
      });

      const data = result.map((item) => {
        return {
          itemId: item.id,
          productId: item.products.id,
          productName:
            locale === "en"
              ? item.products.productNameEn
              : item.products.productNameAr,
          productDescription:
            locale === "en"
              ? item.products.productDescriptionEn
              : item.products.productDescriptionAr,
          productCardImage: item.products.productCardImage,
          categoryName:
            locale === "en"
              ? item.products.categories.categoryNameEn
              : item.products.categories.categoryNameAr,
          finalPrice: item.products.productVariants[0].finalPrice ?? null, // keep in mind that i am getting one row (the variant with the lowest finalprice) from the database
        };
      });

      return data;
    },
    [`wishlist-by-user-id-${userId}-locale-${locale}`],
    {
      tags: ["wishlist"],
      revalidate: 3600,
    },
  )();

/* -------------------- Caching Helps --------------------  */

export const getAllWishlistItemsByUserIdAndLocale = async (
  userId: string,
  locale: Locale,
) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user)
    return {
      success: false,
      message: "User not found",
      code: RESPONSE_CODES.NOT_FOUND,
      data: null,
    };

  const result = await getCachedWishlistItems(userId, locale);

  return {
    success: true,
    message: "All wishlist items ",
    code: RESPONSE_CODES.OK,
    data: result,
  };
};
