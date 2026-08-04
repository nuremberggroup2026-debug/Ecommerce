import { RESPONSE_CODES } from "@/lib/constants/response";
import { prisma } from "@/lib/prisma";
import { Locale, WishlistCreateInput } from "@/types";
import { revalidateTag, unstable_cache } from "next/cache";
import { addWishlistItemSchema } from "./validations";

export const addWishlistItem = async (newWishlistItem: WishlistCreateInput) => {
  console.log("newWishlistItem: ", newWishlistItem);

  const validation = addWishlistItemSchema.safeParse(newWishlistItem);

  if (validation.success) {
    console.log("validation data: ", validation.data);

    const isProductExisted = await prisma.products.findUnique({
      where: { id: validation.data.productId },
    });

    if (!isProductExisted)
      return {
        success: false,
        message: "PRODUCT_NOT_FOUND",
        code: RESPONSE_CODES.CONFLICT,
      };

    const isExisted = await prisma.wishlist.findFirst({
      where: {
        productId: validation.data.productId,
        userId: validation.data.userId,
      },
    });

    console.log("isExisted: ", isExisted);

    if (isExisted)
      return {
        success: false,
        message: "PRODUCT_ALREADY_EXISTS_IN_WISHLIST",
        code: RESPONSE_CODES.CONFLICT,
      };

    await prisma.wishlist.create({
      data: validation.data,
    });

    revalidateTag("wishlist", { expire: 0 });
    

    return {
      success: true,
      message: "ITEM_ADDED_SUCCESSFULLY",
      code: RESPONSE_CODES.CREATED,
    };
  }

  return {
    success: false,
    message: "VALIDATION_ERROR",
    code: RESPONSE_CODES.BAD_REQUEST,
  };
};

export const deleteWishlistItem = async (productId: string, userId: string) => {
  console.log("productId: ", productId, " userid: ", userId);

  const isExisted = await prisma.wishlist.findFirst({
    where: { productId, userId },
  });

  if (!isExisted)
    return {
      success: false,
      message: "ITEM_NOT_FOUND",
      code: RESPONSE_CODES.NOT_FOUND,
    };

  await prisma.wishlist.delete({
    where: { id: isExisted.id },
  });

  revalidateTag("wishlist", { expire: 0 });
  

  return {
    success: true,
    message: "ITEM_DELETED_SUCCESSFULLY",
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
      message: "USER_NOT_FOUND",
      code: RESPONSE_CODES.NOT_FOUND,
      data: null,
    };

  const result = await getCachedWishlistItems(userId, locale);

  return {
    success: true,
    message: "WISHLIST_ITEMS_RETRIEVED_SUCCESSFULLY",
    code: RESPONSE_CODES.OK,
    data: result,
  };
};
