import { PromoCodeCreateInput } from "@/types";
import { createPromoCodeSchema, updatePromoCodeSchema } from "./validators";
import { RESPONSE_CODES } from "@/lib/constants/response";
import { prisma } from "@/lib/prisma";
import { revalidateTag, unstable_cache } from "next/cache";

export const createPromoCode = async (promoCodeData: PromoCodeCreateInput) => {
  const validation = createPromoCodeSchema.safeParse(promoCodeData);

  if (!validation.success)
    return {
      success: false,
      message: "VALIDATION_ERROR",
      code: RESPONSE_CODES.BAD_REQUEST,
    };

  const code = validation.data.code.trim().toUpperCase();

  const isExisted = await prisma.promo_codes.findUnique({
    where: { code },
  });

  if (isExisted)
    return {
      success: false,
      message: "PROMO_CODE_ALREADY_EXISTS",
      code: RESPONSE_CODES.CONFLICT,
    };

  await prisma.promo_codes.create({ data: { ...validation.data, code } });

  revalidateTag("promoCodes", "max");

  return {
    success: true,
    message: "PROMO_CODE_ADDED_SUCCESSFULLY",
    code: RESPONSE_CODES.CREATED,
  };
};

export const updatePromoCode = async (
  promoCodeData: Partial<PromoCodeCreateInput>,
  promoCodeId: string,
) => {
  const validation = updatePromoCodeSchema.safeParse(promoCodeData);

  if (!validation.success)
    return {
      success: false,
      message: "VALIDATION_ERROR",
      code: RESPONSE_CODES.BAD_REQUEST,
    };

  const existedPromoCode = await prisma.promo_codes.findUnique({
    where: { id: promoCodeId },
  });

  if (!existedPromoCode)
    return {
      success: false,
      message: "PROMO_CODE_NOT_FOUND",
      code: RESPONSE_CODES.NOT_FOUND,
    };

  if (validation.data.code) {
    const isCodeExisted = await prisma.promo_codes.findUnique({
      where: {
        code: validation.data.code.trim().toUpperCase(),
        NOT: { id: promoCodeId },
      },
    });

    if (isCodeExisted)
      return {
        success: false,
        message: "PROMO_CODE_ALREADY_USED",
        code: RESPONSE_CODES.BAD_REQUEST,
      };
  }

  await prisma.promo_codes.update({
    where: { id: promoCodeId },
    data: {
      ...validation.data,
      ...(validation.data.code && {
        code: validation.data.code.trim().toUpperCase(),
      }),
    },
  });

  revalidateTag("promoCodes", "max");

  return {
    success: true,
    message: "PROMO_CODE_UPDATED_SUCCESSFULLY",
    code: RESPONSE_CODES.OK,
  };
};

export const deactivatePromoCode = async (id: string) => {
  if (!id)
    return {
      success: false,
      message: "PROMO_CODE_ID_REQUIRED",
      code: RESPONSE_CODES.BAD_REQUEST,
    };

  const promoCode = await prisma.promo_codes.findUnique({
    where: { id },
    select: {
      id: true,
      isActive: true,
      isDeleted: true,
    },
  });

  if (!promoCode)
    return {
      success: false,
      message: "PROMO_CODE_NOT_FOUND",
      code: RESPONSE_CODES.NOT_FOUND,
    };

  if (promoCode.isDeleted)
    return {
      success: false,
      message: "CANNOT_DEACTIVATE_DELETED_PROMO_CODE",
      code: RESPONSE_CODES.BAD_REQUEST,
    };

  if (!promoCode.isActive)
    return {
      success: false,
      message: "PROMO_CODE_ALREADY_INACTIVE",
      code: RESPONSE_CODES.BAD_REQUEST,
    };

  await prisma.promo_codes.update({
    where: {
      id,
    },
    data: {
      isActive: false,
    },
  });

  revalidateTag("promoCodes", "max");

  return {
    success: true,
    message: "PROMO_CODE_DEACTIVATED_SUCCESSFULLY",
    code: RESPONSE_CODES.OK,
  };
};

export const deletePromoCode = async (id: string) => {
  if (!id)
    return {
      success: false,
      message: "PROMO_CODE_ID_REQUIRED",
      code: RESPONSE_CODES.BAD_REQUEST,
    };

  const promoCode = await prisma.promo_codes.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      isDeleted: true,
    },
  });

  if (!promoCode)
    return {
      success: false,
      message: "PROMO_CODE_NOT_FOUND",
      code: RESPONSE_CODES.NOT_FOUND,
    };

  if (promoCode.isDeleted)
    return {
      success: false,
      message: "PROMO_CODE_ALREADY_DELETED",
      code: RESPONSE_CODES.BAD_REQUEST,
    };

  await prisma.promo_codes.update({
    where: {
      id,
    },
    data: {
      isDeleted: true,
      isActive: false,
    },
  });

  revalidateTag("promoCodes", "max");

  return {
    success: true,
    message: "PROMO_CODE_DELETED_SUCCESSFULLY",
    code: RESPONSE_CODES.OK,
  };
};

/* -------------------- Caching Helps --------------------  */

const getCachedPromoCodes = (page: number = 1, limit: number = 10) => {
  const skip = (page - 1) * limit;

  return unstable_cache(
    async () => {
      const [promoCodes, totalPromoCodes] = await prisma.$transaction([
        prisma.promo_codes.findMany({
          where: {
            isDeleted: false,
          },

          orderBy: {
            createdAt: "desc",
          },

          skip,
          take: limit,
        }),

        prisma.promo_codes.count({
          where: {
            isDeleted: false,
          },
        }),
      ]);

      return {
        promoCodes,
        pagination: {
          currentPage: page,
          itemsPerPage: limit,
          totalItems: totalPromoCodes,
          totalPages: Math.ceil(totalPromoCodes / limit),
        },
      };
    },

    [`all-promo-code-by-page-${page}`],

    {
      tags: ["promoCodes"],
      revalidate: 3600,
    },
  )();
};

const getCachedPromoCodeById = (id: string) => {
  return unstable_cache(
    async () => {
      return prisma.promo_codes.findFirst({
        where: {
          id,
          isDeleted: false,
        },
      });
    },

    [`promo-code-by-id-${id}`],

    {
      tags: ["promoCodes"],
      revalidate: 3600,
    },
  )();
};

/* -------------------- Caching Helps --------------------  */

export const getPromoCodes = async (page: number = 1) => {
  const result = await getCachedPromoCodes(page);

  return {
    success: true,
    message: "PROMO_CODES_RETRIEVED_SUCCESSFULLY",
    code: RESPONSE_CODES.OK,
    data: result,
  };
};

export const getPromoCodeById = async (id: string) => {
  if (!id)
    return {
      success: false,
      message: "PROMO_CODE_ID_REQUIRED",
      code: RESPONSE_CODES.BAD_REQUEST,
      data: null,
    };

  const promoCode = await getCachedPromoCodeById(id);

  if (!promoCode)
    return {
      success: false,
      message: "PROMO_CODE_NOT_FOUND",
      code: RESPONSE_CODES.NOT_FOUND,
      data: null,
    };

  return {
    success: true,
    message: "PROMO_CODE_RETRIEVED_SUCCESSFULLY",
    code: RESPONSE_CODES.OK,
    data: promoCode,
  };
};

export const validatePromoCode = async (code: string, userId: string) => {
  const promoCode = await prisma.promo_codes.findUnique({
    where: { code: code.trim().toUpperCase() },
  });

  if (!code)
    return {
      success: false,
      message: "PROMO_CODE_REQUIRED",
      code: RESPONSE_CODES.BAD_REQUEST,
      data: null,
    };

  if (
    !promoCode ||
    !promoCode.isActive ||
    promoCode.usedCount >= promoCode.maxUsage ||
    promoCode.expiresAt! < new Date()
  )
    return {
      success: false,
      message: "INVALID_PROMO_CODE",
      code: RESPONSE_CODES.BAD_REQUEST,
      data: null,
    };

  const usedByUser = await prisma.user_promo_codes.findFirst({
    where: {
      userId,
      promoCodeId: promoCode.id,
    },
  });

  if (usedByUser)
    return {
      success: false,
      message: "PROMO_CODE_ALREADY_USED",
      code: RESPONSE_CODES.BAD_REQUEST,
      data: null,
    };

  return {
    success: true,
    message: "PROMO_CODE_APPLIED",
    code: RESPONSE_CODES.OK,
    data: {
      code: promoCode.code,
      discountPercentage: Number(promoCode.discountPercentage),
    },
  };
};
