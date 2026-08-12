import { AttributeCreateInput, AttributeUpdateInput, Locale } from "@/types";
import { attributeSchema, updateAttributeSchema } from "./validators";
import { RESPONSE_CODES } from "@/lib/constants/response";
import { prisma } from "@/lib/prisma";
import { revalidateTag, unstable_cache } from "next/cache";

export const createAttribute = async (
  newAttribute: AttributeCreateInput,
) => {
  const validation = attributeSchema.safeParse(newAttribute);

  if (!validation.success) {
    return {
      success: false,
      message: "VALIDATION_ERROR",
      code: RESPONSE_CODES.BAD_REQUEST,
    };
  }

  const existingAttribute = await prisma.attributes.findUnique({
    where: {
      attributeNameEn: validation.data.attributeNameEn,
    },
  });

  if (existingAttribute) {
    return {
      success: false,
      message: "ATTRIBUTE_ALREADY_EXISTS",
      code: RESPONSE_CODES.CONFLICT,
    };
  }

  await prisma.attributes.create({
    data: validation.data,
  });

  revalidateTag("attributes", { expire: 0 });

  return {
    success: true,
    message: "ATTRIBUTE_ADDED_SUCCESSFULLY",
    code: RESPONSE_CODES.CREATED,
  };
};

export const updateAttribute = async (
  id: string,
  updatedAttributeData: AttributeUpdateInput,
) => {
  if (!id) {
    return {
      success: false,
      message: "ATTRIBUTE_ID_REQUIRED",
      code: RESPONSE_CODES.BAD_REQUEST,
    };
  }

  const validation = updateAttributeSchema.safeParse(
    updatedAttributeData,
  );

  if (!validation.success) {
    console.error(
      "Update attribute validation error:",
      validation.error.flatten(),
    );

    return {
      success: false,
      message: "VALIDATION_ERROR",
      code: RESPONSE_CODES.BAD_REQUEST,
    };
  }

  const existingAttribute =
    await prisma.attributes.findUnique({
      where: { id },
    });

  if (!existingAttribute) {
    return {
      success: false,
      message: "ATTRIBUTE_NOT_FOUND",
      code: RESPONSE_CODES.NOT_FOUND,
    };
  }

  try {
    await prisma.attributes.update({
      where: { id },

      data: {
        attributeNameEn:
          validation.data.attributeNameEn,

        attributeNameAr:
          validation.data.attributeNameAr,
      },
    });

    revalidateTag("attributes", { expire: 0 });

    return {
      success: true,
      message: "ATTRIBUTE_UPDATED_SUCCESSFULLY",
      code: RESPONSE_CODES.OK,
    };
  } catch (error) {
    console.error(
      "Update attribute error:",
      error,
    );

    return {
      success: false,
      message: "ATTRIBUTE_UPDATE_FAILED",
      code: RESPONSE_CODES.BAD_REQUEST,
    };
  }
};

export const deleteAttribute = async (id: string) => {
  if (!id) {
    return {
      success: false,
      message: "ATTRIBUTE_ID_REQUIRED",
      code: RESPONSE_CODES.BAD_REQUEST,
    };
  }

  const existingAttribute = await prisma.attributes.findUnique({
    where: { id },
  });

  if (!existingAttribute) {
    return {
      success: false,
      message: "ATTRIBUTE_NOT_FOUND",
      code: RESPONSE_CODES.NOT_FOUND,
    };
  }

  await prisma.attributes.delete({
    where: { id },
  });

  revalidateTag("attributes", { expire: 0 });
  revalidateTag("attributeValues", { expire: 0 });

  return {
    success: true,
    message: "ATTRIBUTE_DELETED_SUCCESSFULLY",
    code: RESPONSE_CODES.OK,
  };
};

/////////////////////////////////////////////////////////////////

export const deleteManyAttributes = async (ids: string[]) => {
  if (!ids.length) {
    return {
      success: false,
      message: "ATTRIBUTE_IDS_REQUIRED",
      code: RESPONSE_CODES.BAD_REQUEST,
    };
  }

  const existingAttributes = await prisma.attributes.findMany({
    where: {
      id: {
        in: ids,
      },
    },
  });

  if (existingAttributes.length === 0) {
    return {
      success: false,
      message: "ATTRIBUTES_NOT_FOUND",
      code: RESPONSE_CODES.NOT_FOUND,
    };
  }

  const result = await prisma.attributes.deleteMany({
    where: {
      id: {
        in: ids,
      },
    },
  });

  if (result.count === 0) {
    return {
      success: false,
      message: "ATTRIBUTES_DELETE_FAILED",
      code: RESPONSE_CODES.BAD_REQUEST,
    };
  }

  revalidateTag("attributes", { expire: 0 });
  revalidateTag("attributeValues", { expire: 0 });

  return {
    success: true,
    message: "ATTRIBUTES_DELETED_SUCCESSFULLY",
    code: RESPONSE_CODES.OK,
  };
};



/////////////////////////////////////////////////////////////////
// Caching
/////////////////////////////////////////////////////////////////

const getCachedAttribute = () =>
  unstable_cache(
    async () => {
      return prisma.attributes.findMany({
        include: {
          attributeValues: true,
        },
      });
    },
    ["all-attributes"],
    {
      tags: ["attributes"],
      revalidate: 3600,
    },
  )();

const getCachedAttributeById = (id: string) =>
  unstable_cache(
    async () => {
      return prisma.attributes.findUnique({
        where: { id },
        include: {
          attributeValues: true,
        },
      });
    },
    [`attribute-by-id-${id}`],
    {
      tags: ["attributes"],
      revalidate: 3600,
    },
  )();

const getCachedAttributesByLocale = (locale: Locale) =>
  unstable_cache(
    async () => {
      const attributes = await prisma.attributes.findMany({
        include: {
          attributeValues: true,
        },
      });

      const translatedAttribute = attributes.map((attribute) => {
        return {
          id: attribute.id,
          attributeName:
            locale === "en"
              ? attribute.attributeNameEn
              : attribute.attributeNameAr,
          createdAt: attribute.createdAt,
          attributeValues: attribute.attributeValues.map(
            (attributeValue) => ({
              attributeValue:
                locale === "en"
                  ? attributeValue.attributeValueEn
                  : attributeValue.attributeValueAr,
              attributeValueId: attributeValue.id,
              createdAt: attributeValue.createdAt,
            }),
          ),
        };
      });

      return translatedAttribute;
    },
    [`all-attributes-by-locale-${locale}`],
    {
      tags: ["attributes"],
      revalidate: 3600,
    },
  )();

const getCachedAttributeByIdAndLocale = (
  id: string,
  locale: Locale,
) =>
  unstable_cache(
    async () => {
      const attribute = await prisma.attributes.findUnique({
        where: { id },
        include: {
          attributeValues: true,
        },
      });

      if (!attribute) return null;

      return {
        id: attribute.id,
        attributeName:
          locale === "en"
            ? attribute.attributeNameEn
            : attribute.attributeNameAr,
        createdAt: attribute.createdAt,
        attributeValues: attribute.attributeValues.map(
          (attributeValue) => ({
            attributeValue:
              locale === "en"
                ? attributeValue.attributeValueEn
                : attributeValue.attributeValueAr,
            attributeValueId: attributeValue.id,
            createdAt: attributeValue.createdAt,
          }),
        ),
      };
    },
    [`all-attributes-by-id-${id}-and-locale-${locale}`],
    {
      tags: ["attributes"],
      revalidate: 3600,
    },
  )();

/////////////////////////////////////////////////////////////////
// Getters
/////////////////////////////////////////////////////////////////

export const getAllAttributes = async () => {
  const attributes = await getCachedAttribute();

  return {
    success: true,
    message: "ATTRIBUTES_RETRIEVED_SUCCESSFULLY",
    code: RESPONSE_CODES.OK,
    attributes,
  };
};

export const getAttributeById = async (id: string) => {
  if (!id) {
    return {
      success: false,
      message: "ATTRIBUTE_ID_REQUIRED",
      code: RESPONSE_CODES.BAD_REQUEST,
    };
  }

  const attribute = await getCachedAttributeById(id);

  if (!attribute) {
    return {
      success: false,
      message: "ATTRIBUTE_NOT_FOUND",
      code: RESPONSE_CODES.NOT_FOUND,
    };
  }

  return {
    success: true,
    message: "ATTRIBUTE_RETRIEVED_SUCCESSFULLY",
    code: RESPONSE_CODES.OK,
    attribute,
  };
};

export const getAttributesByLocale = async (locale: Locale) => {
  const attributes = await getCachedAttributesByLocale(locale);

  return {
    success: true,
    message: "ATTRIBUTES_RETRIEVED_SUCCESSFULLY",
    code: RESPONSE_CODES.OK,
    attributes,
  };
};

export const getAttributeByIdAndLocale = async (
  id: string,
  locale: Locale,
) => {
  if (!id) {
    return {
      success: false,
      message: "ATTRIBUTE_ID_REQUIRED",
      code: RESPONSE_CODES.BAD_REQUEST,
    };
  }

  const attribute = await getCachedAttributeByIdAndLocale(
    id,
    locale,
  );

  if (!attribute) {
    return {
      success: false,
      message: "ATTRIBUTE_NOT_FOUND",
      code: RESPONSE_CODES.NOT_FOUND,
    };
  }

  return {
    success: true,
    message: "ATTRIBUTE_RETRIEVED_SUCCESSFULLY",
    code: RESPONSE_CODES.OK,
    attribute,
  };
};