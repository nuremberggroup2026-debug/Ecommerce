import { ProductVariantCreateInput, ProductVariantUpdateInput } from "./types";
import {
  createProductVariantSchema,
  updateProductVariantSchema,
} from "./validators";
import { prisma } from "@/lib/prisma";
import { revalidateTag, unstable_cache } from "next/cache";
import { RESPONSE_CODES } from "@/lib/constants/response";
import { hasDuplicateAttributes } from "@/lib/helpers/index";

export const createProductVariant = async (
  newProductVariant: ProductVariantCreateInput,
) => {
  const validation = createProductVariantSchema.safeParse(newProductVariant);

  if (!validation.success) {
    return {
      success: false,
      message: "VALIDATION_ERROR",
      code: RESPONSE_CODES.BAD_REQUEST,
      variant: null,
    };
  }

  try {
    const { attributeValueIds, ...variantData } = validation.data;

    if (attributeValueIds && attributeValueIds.length > 0) {
      const hasDuplicates = await hasDuplicateAttributes(attributeValueIds);

      if (hasDuplicates) {
        return {
          success: false,
          message: "VARIANT_CANNOT_HAVE_MULTIPLE_VALUES_FROM_SAME_ATTRIBUTE",
          code: RESPONSE_CODES.BAD_REQUEST,
          variant: null,
        };
      }
    }

    if (
      variantData.isDefault &&
      attributeValueIds &&
      attributeValueIds.length > 0
    ) {
      return {
        success: false,
        message: "DEFAULT_VARIANT_CANNOT_HAVE_ATTRIBUTES",
        code: RESPONSE_CODES.BAD_REQUEST,
        variant: null,
      };
    }

    const isSkuUsed = await prisma.product_variants.findUnique({
      where: {
        sku: variantData.sku,
      },
      select: {
        id: true,
      },
    });

    if (isSkuUsed) {
      return {
        success: false,
        message: "SKU_ALREADY_USED",
        code: RESPONSE_CODES.CONFLICT,
        variant: null,
      };
    }

    const result = await prisma.$transaction(async (tx) => {
      let finalPrice = validation.data.price;

      if (
        validation.data.discountPercentage &&
        validation.data.discountPercentage > 0
      ) {
        finalPrice =
          validation.data.price -
          validation.data.price * (validation.data.discountPercentage / 100);

        finalPrice = Number(finalPrice.toFixed(2));
      }

      const variant = await tx.product_variants.create({
        data: {
          ...variantData,
          finalPrice,
        },
      });

      if (attributeValueIds && attributeValueIds.length > 0) {
        await tx.variant_attribute_values.createMany({
          data: attributeValueIds.map((attributeValueId) => ({
            variantId: variant.id,
            attributeValueId,
          })),
        });
      }

      return variant;
    });

    revalidateTag("productVariants", "max");

    return {
      success: true,
      message: "PRODUCT_VARIANT_CREATED_SUCCESSFULLY",
      code: RESPONSE_CODES.CREATED,
      variant: result,
    };
  } catch (error) {
    console.log("Create product variant error:", error);

    return {
      success: false,
      message: "INTERNAL_SERVER_ERROR",
      code: RESPONSE_CODES.INTERNAL_ERROR,
      variant: null,
    };
  }
};
export const updateProductVariant = async (
  id: string,
  updateProductVariant: ProductVariantUpdateInput,
) => {
  const validation = updateProductVariantSchema.safeParse(updateProductVariant);

  if (!validation.success) {
    return {
      success: false,
      message: "VALIDATION_ERROR",
      code: RESPONSE_CODES.BAD_REQUEST,
      variant: null,
    };
  }

  try {
    const { attributeValueIds, ...updateVariantData } = validation.data;

    const isExisted = await prisma.product_variants.findUnique({
      where: { id },
    });

    if (!isExisted) {
      return {
        success: false,
        message: "VARIANT_NOT_FOUND",
        code: RESPONSE_CODES.NOT_FOUND,
        variant: null,
      };
    }

    if (validation.data.sku) {
      const isSkuUsed = await prisma.product_variants.findFirst({
        where: {
          sku: validation.data.sku,
          NOT: { id },
        },
      });

      if (isSkuUsed) {
        return {
          success: false,
          message: "SKU_ALREADY_USED",
          code: RESPONSE_CODES.CONFLICT,
          variant: null,
        };
      }
    }

    if (attributeValueIds && attributeValueIds.length > 0) {
      const hasDuplicates = await hasDuplicateAttributes(attributeValueIds);

      if (hasDuplicates) {
        return {
          success: false,
          message: "VARIANT_CANNOT_HAVE_MULTIPLE_VALUES_FROM_SAME_ATTRIBUTE",
          code: RESPONSE_CODES.BAD_REQUEST,
          variant: null,
        };
      }
    }

    if (
      validation.data.isDefault &&
      attributeValueIds &&
      attributeValueIds.length > 0
    ) {
      return {
        success: false,
        message: "DEFAULT_VARIANT_CANNOT_HAVE_ATTRIBUTES",
        code: RESPONSE_CODES.BAD_REQUEST,
        variant: null,
      };
    }

    let finalPrice = Number(isExisted.finalPrice);

    if (
      validation.data.price !== undefined ||
      validation.data.discountPercentage !== undefined
    ) {
      const price =
        validation.data.price !== undefined
          ? validation.data.price
          : Number(isExisted.price);

      const discountPercentage =
        validation.data.discountPercentage !== undefined
          ? validation.data.discountPercentage
          : Number(isExisted.discountPercentage ?? 0);

      finalPrice = price - (price * discountPercentage) / 100;

      finalPrice = Number(finalPrice.toFixed(2));
    }

    const result = await prisma.$transaction(async (tx) => {
      const variant = await tx.product_variants.update({
        where: { id },
        data: {
          ...updateVariantData,
          finalPrice,
        },
      });

      if (attributeValueIds !== undefined) {
        await tx.variant_attribute_values.deleteMany({
          where: {
            variantId: variant.id,
          },
        });

        if (attributeValueIds.length > 0) {
          await tx.variant_attribute_values.createMany({
            data: attributeValueIds.map((attributeValueId) => ({
              variantId: variant.id,
              attributeValueId,
            })),
          });
        }
      }

      return variant;
    });

    revalidateTag("productVariants", "max");

    return {
      success: true,
      message: "PRODUCT_VARIANT_UPDATED_SUCCESSFULLY",
      code: RESPONSE_CODES.OK,
      variant: result,
    };
  } catch (error) {
    console.log("Update product variant error:", error);

    return {
      success: false,
      message: "INTERNAL_SERVER_ERROR",
      code: RESPONSE_CODES.INTERNAL_ERROR,
      variant: null,
    };
  }
};

export const deleteProductVariant = async (id: string) => {
  const existingVariant = await prisma.product_variants.findUnique({
    where: { id },
  });

  if (!existingVariant) {
    return {
      success: false,
      message: "VARIANT_NOT_FOUND",
      code: RESPONSE_CODES.NOT_FOUND,
    };
  }

  await prisma.product_variants.delete({
    where: { id },
  });

  revalidateTag("productVariants", "max");

  return {
    success: true,
    message: "PRODUCT_VARIANT_DELETED_SUCCESSFULLY",
    code: RESPONSE_CODES.OK,
  };
};
/* -------------------- Caching Helps --------------------  */

const getCachedProductVariants = () =>
  unstable_cache(
    async () => {
      return prisma.product_variants.findMany({
        include: {
          variantAttributeValues: {
            include: {
              attributeValues: { include: { attributes: true } },
            },
          },
        },
      });
    },
    ["all-productVariants"],
    { tags: ["productVariants"], revalidate: 3600 },
  )();

const getCachedProductVariantById = (id: string) =>
  unstable_cache(
    async () => {
      return prisma.product_variants.findUnique({
        where: { id },
        include: {
          variantAttributeValues: {
            include: { attributeValues: { include: { attributes: true } } },
          },
        },
      });
    },
    [`productVariant-by-id-${id}`],
    {
      tags: ["productVariants"],
      revalidate: 3600,
    },
  )();

/* -------------------- Caching Helps --------------------  */

export const getAllProductVariants = async () => {
  const result = await getCachedProductVariants();

  return {
    success: true,
    message: "PRODUCT_VARIANTS_RETRIEVED_SUCCESSFULLY",
    code: RESPONSE_CODES.OK,
    data: result,
  };
};

export const getAllProductVariantById = async (id: string) => {
  if (!id)
    return {
      success: false,
      message: "ID_REQUIRED",
      code: RESPONSE_CODES.BAD_REQUEST,
      data: null,
    };

  const result = await getCachedProductVariantById(id);

  if (!result)
    return {
      success: false,
      message: "VARIANT_NOT_FOUND",
      code: RESPONSE_CODES.NOT_FOUND,
      data: null,
    };

  return {
    success: true,
    message: "PRODUCT_VARIANTS_RETRIEVED_SUCCESSFULLY",
    code: RESPONSE_CODES.OK,
    data: result,
  };
};
