import {
  AttributeValuesCreateInput,
  AttributeValuesUpdateInput,
  Locale,
} from "@/types";
import {
  createAttributeValueSchema,
  updateAttributeValueSchema,
} from "./validators";
import { RESPONSE_CODES } from "@/lib/constants/response";
import { prisma } from "@/lib/prisma";
import { revalidateTag, unstable_cache } from "next/cache";

export const createAttributeValue = async (
  newAttributeValue: AttributeValuesCreateInput,
) => {
  const validation = createAttributeValueSchema.safeParse(newAttributeValue);

  if (validation.success) {
    const isExisted = await prisma.attribute_values.findFirst({
      where: {
        attributeId: validation.data.attributeId,
        attributeValueEn: validation.data.attributeValueEn,
      },
    });

    if (isExisted)
      return {
        success: false,
        message: "Attribute Value already exists",
        code: RESPONSE_CODES.CONFLICT,
      };

    const attribute = await prisma.attributes.findUnique({
      where: {
        id: validation.data.attributeId,
      },
    });

    if (!attribute)
      return {
        success: false,
        message: "Attribute not found",
        code: RESPONSE_CODES.NOT_FOUND,
      };

    await prisma.attribute_values.create({
      data: validation.data,
    });

    revalidateTag("attributeValues", "max");
    return {
      success: true,
      message: "Attribute Value created successfully",
      code: RESPONSE_CODES.CREATED,
    };
  }

  return {
    success: false,
    message: "Validation error",
    code: RESPONSE_CODES.BAD_REQUEST,
  };
};

export const updateAttributeValue = async (
  id: string,
  updatedAttributeValueData: AttributeValuesUpdateInput,
) => {
  if (!id)
    return {
      success: false,
      message: "Attribute Value id is required",
      code: RESPONSE_CODES.BAD_REQUEST,
    };

  const validation = updateAttributeValueSchema.safeParse(
    updatedAttributeValueData,
  );

  if (validation.success) {
    const existingAttributeValue = await prisma.attribute_values.findUnique({
      where: { id },
    });

    if (!existingAttributeValue)
      return {
        success: false,
        message: "Attribute Value not found",
        code: RESPONSE_CODES.NOT_FOUND,
      };

    if (validation.data.attributeValueEn) {
      const duplicate = await prisma.attribute_values.findFirst({
        where: {
          attributeId: existingAttributeValue.attributeId,
          attributeValueEn: validation.data.attributeValueEn,
          NOT: {
            id,
          },
        },
      });

      if (duplicate)
        return {
          success: false,
          message: "Attribute Value already exists",
          code: RESPONSE_CODES.CONFLICT,
        };
    }

    await prisma.attribute_values.update({
      where: { id },
      data: validation.data,
    });

    revalidateTag("attributeValues", "max");

    return {
      success: true,
      message: "Attribute Value updated successfully",
      code: RESPONSE_CODES.OK,
    };
  }

  return {
    success: false,
    message: "Validation error",
    code: RESPONSE_CODES.BAD_REQUEST,
  };
};

export const deleteAttributeValue = async (id: string) => {
  if (!id)
    return {
      success: false,
      message: "Attribute Value id is required",
      code: RESPONSE_CODES.BAD_REQUEST,
    };

  const existingAttributeValue = await prisma.attribute_values.findUnique({
    where: { id },
  });

  if (!existingAttributeValue)
    return {
      success: false,
      message: "Attribute Value not found",
      code: RESPONSE_CODES.NOT_FOUND,
    };

  await prisma.attribute_values.delete({
    where: { id },
  });

  revalidateTag("attributeValues", "max");

  return {
    success: true,
    message: "Attribute Value deleted successfully",
    code: RESPONSE_CODES.OK,
  };
};

/* -------------------- Caching Helps --------------------  */

const getCachedAttributeValues = () =>
  unstable_cache(
    async () => {
      return prisma.attribute_values.findMany({
        include: {
          attributes: true,
        },
      });
    },
    ["attribute-values"],
    {
      tags: ["attributeValues"],
      revalidate: 3600,
    },
  )();

const getCachedAttributeValueById = (id: string) =>
  unstable_cache(
    async () => {
      return prisma.attribute_values.findUnique({
        where: { id },
        include: {
          attributes: true,
        },
      });
    },
    [`attribute-value-${id}`],
    {
      tags: ["attributeValues"],
      revalidate: 3600,
    },
  )();

const getCachedAttributeValuesByLocale = (locale: Locale) =>
  unstable_cache(
    async () => {
      const attributeValues = await prisma.attribute_values.findMany({
        include: {
          attributes: true,
        },
      });

      return attributeValues.map((attributeValue) => ({
        id: attributeValue.id,
        attributeValue:
          locale === "ar"
            ? attributeValue.attributeValueAr
            : attributeValue.attributeValueEn,

        attribute: {
          id: attributeValue.attributes.id,
          attributeName:
            locale === "ar"
              ? attributeValue.attributes.attributeNameAr
              : attributeValue.attributes.attributeNameEn,
        },

        createdAt: attributeValue.createdAt,
      }));
    },
    [`attribute-values-locale-${locale}`],
    {
      tags: ["attributeValues"],
      revalidate: 3600,
    },
  )();

const getCachedAttributeValueByIdAndLocale = (id: string, locale: Locale) =>
  unstable_cache(
    async () => {
      const attributeValue = await prisma.attribute_values.findUnique({
        where: { id },
        include: {
          attributes: true,
        },
      });

      if (!attributeValue) return null;

      return {
        id: attributeValue.id,

        attributeValue:
          locale === "ar"
            ? attributeValue.attributeValueAr
            : attributeValue.attributeValueEn,

        attribute: {
          id: attributeValue.attributes.id,
          attributeName:
            locale === "ar"
              ? attributeValue.attributes.attributeNameAr
              : attributeValue.attributes.attributeNameEn,
        },

        createdAt: attributeValue.createdAt,
      };
    },
    [`attribute-value-${id}-locale-${locale}`],
    {
      tags: ["attributeValues"],
      revalidate: 3600,
    },
  )();
/* -------------------- Caching Helps --------------------  */

export const getAllAttributeValues = async () => {
  const attributeValues = await getCachedAttributeValues();

  return {
    success: true,
    message: "Attribute Values retrieved successfully",
    code: RESPONSE_CODES.OK,
    attributeValues,
  };
};

export const getAttributeValueById = async (id: string) => {
  if (!id)
    return {
      success: false,
      message: "Attribute Value id is required",
      code: RESPONSE_CODES.BAD_REQUEST,
    };

  const attributeValue = await getCachedAttributeValueById(id);

  if (!attributeValue)
    return {
      success: false,
      message: "Attribute Value not found",
      code: RESPONSE_CODES.NOT_FOUND,
    };

  return {
    success: true,
    message: "Attribute Value retrieved successfully",
    code: RESPONSE_CODES.OK,
    attributeValue,
  };
};

export const getAttributeValuesByLocale = async (locale: Locale) => {
  const attributeValues = await getCachedAttributeValuesByLocale(locale);

  return {
    success: true,
    message: "Attribute Values retrieved successfully",
    code: RESPONSE_CODES.OK,
    attributeValues,
  };
};

export const getAttributeValueByIdAndLocale = async (
  id: string,
  locale: Locale,
) => {
  if (!id)
    return {
      success: false,
      message: "Attribute Value id is required",
      code: RESPONSE_CODES.BAD_REQUEST,
    };

  const attributeValue = await getCachedAttributeValueByIdAndLocale(id, locale);

  if (!attributeValue)
    return {
      success: false,
      message: "Attribute Value not found",
      code: RESPONSE_CODES.NOT_FOUND,
    };

  return {
    success: true,
    message: "Attribute Value retrieved successfully",
    code: RESPONSE_CODES.OK,
    attributeValue,
  };
};
