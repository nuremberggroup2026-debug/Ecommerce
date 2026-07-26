import { prisma } from "@/lib/prisma";
import { RESPONSE_CODES } from "@/lib/constants/response";
import { revalidateTag, unstable_cache } from "next/cache";
import { CategoriesCreateInput, CategoriesUpdateInput, Locale } from "@/types";
import { categorySchema, updateCategorySchema } from "./validators";
import { generateSlug } from "@/lib/helpers/index";

export const addNewCategory = async (newCategory: CategoriesCreateInput) => {
  const validation = categorySchema.safeParse(newCategory);

  if (validation.success) {
    const existingCategory = await prisma.categories.findFirst({
      where: {
        categoryNameEn: validation.data.categoryNameEn,
      },
    });

    if (existingCategory)
      return {
        success: false,
        message: "Category already exists",
        code: RESPONSE_CODES.CONFLICT,
      };

    if (validation.data.isFeatured) {
      const featuredCategoriesCount = await prisma.categories.count({
        where: {
          isFeatured: true,
        },
      });

      if (featuredCategoriesCount >= 5)
        return {
          success: false,
          message: "Maximum featured category is 5",
          code: RESPONSE_CODES.CONFLICT,
        };
    }

    const slug = generateSlug(validation.data.categoryNameEn);

    await prisma.categories.create({
      data: {
        ...validation.data,
        slug,
      },
    });

    revalidateTag("categories", "max");

    return {
      success: true,
      message: "Category added successfully",
      code: RESPONSE_CODES.CREATED,
    };
  }

  return {
    success: false,
    message: "Validation error",
    code: RESPONSE_CODES.BAD_REQUEST,
  };
};

export const updateCategory = async (
  id: string,
  updatedCategoryData: CategoriesUpdateInput,
) => {
  if (!id)
    return {
      success: false,
      message: "Category id is required",
      code: RESPONSE_CODES.BAD_REQUEST,
    };

  const validation = updateCategorySchema.safeParse(updatedCategoryData);

  if (validation.success) {
    const existingCategory = await prisma.categories.findUnique({
      where: { id },
    });

    if (!existingCategory)
      return {
        success: false,
        message: "Category not found",
        code: RESPONSE_CODES.NOT_FOUND,
      };

    let slug = existingCategory.slug;

    if (validation.data.categoryNameEn) {
      const categoryWithSameName = await prisma.categories.findFirst({
        where: {
          categoryNameEn: validation.data.categoryNameEn,
          NOT: {
            id,
          },
        },
      });
      slug = generateSlug(validation.data.categoryNameEn);
      if (categoryWithSameName)
        return {
          success: false,
          message: "Category already exists",
          code: RESPONSE_CODES.CONFLICT,
        };

      slug = generateSlug(validation.data.categoryNameEn);
    }

    const isFeatured =
      validation.data.isFeatured ?? existingCategory.isFeatured;

    if (isFeatured && !existingCategory.isFeatured) {
      const featuredCategoriesCount = await prisma.categories.count({
        where: {
          isFeatured: true,
        },
      });

      if (featuredCategoriesCount >= 5)
        return {
          success: false,
          message: "Maximum featured category is 5",
          code: RESPONSE_CODES.CONFLICT,
        };
    }

    await prisma.categories.update({
      where: { id },
      data: {
        ...validation.data,
        slug,
      },
    });

    revalidateTag("categories", "max");

    return {
      success: true,
      message: "Category updated successfully",
      code: RESPONSE_CODES.OK,
    };
  }

  return {
    success: false,
    message: "Validation error",
    code: RESPONSE_CODES.BAD_REQUEST,
  };
};

export const deleteCategory = async (id: string) => {
  if (!id)
    return {
      success: false,
      message: "Category id is required",
      code: RESPONSE_CODES.BAD_REQUEST,
    };

  const existingCategory = await prisma.categories.findUnique({
    where: { id },
  });

  if (!existingCategory)
    return {
      success: false,
      message: "Category not found",
      code: RESPONSE_CODES.NOT_FOUND,
    };

  await prisma.categories.delete({
    where: { id },
  });

  revalidateTag("categories", "max");

  return {
    success: true,
    message: "Category deleted successfully",
    code: RESPONSE_CODES.OK,
  };
};

/* -------------------- Caching Helps --------------------  */

const getCachedCategories = () =>
  unstable_cache(
    async () => {
      return prisma.categories.findMany({});
    },
    ["categories"],
    {
      tags: ["categories"],
      revalidate: 3600,
    },
  )();

const getCachedCategoryById = (id: string) =>
  unstable_cache(
    async () => {
      return prisma.categories.findUnique({
        where: { id },
      });
    },
    [`category-${id}`],
    {
      tags: ["categories"],
      revalidate: 3600,
    },
  )();

const getCachedCategoriesByLocale = (locale: Locale) =>
  unstable_cache(
    async () => {
      const categories = await prisma.categories.findMany({});

      return categories.map((category) => ({
        id: category.id,
        name:
          locale === "en" ? category.categoryNameEn : category.categoryNameAr,
        description:
          locale === "en"
            ? category.categoryDescriptionEn
            : category.categoryDescriptionAr,
        image: category.image,
        isFeatured: category.isFeatured,
        createdAt: category.createdAt,
      }));
    },
    [`categories-locale-${locale}`],
    {
      tags: ["categories"],
      revalidate: 3600,
    },
  )();

const getCachedCategoryByIdAndLocale = (id: string, locale: Locale) =>
  unstable_cache(
    async () => {
      const category = await prisma.categories.findUnique({
        where: { id },
      });

      if (!category) return null;

      return {
        id: category.id,
        name:
          locale === "en" ? category.categoryNameEn : category.categoryNameAr,
        description:
          locale === "en"
            ? category.categoryDescriptionEn
            : category.categoryDescriptionAr,
        image: category.image,
        isFeatured: category.isFeatured,
        createdAt: category.createdAt,
      };
    },
    [`category-${id}-locale-${locale}`],
    {
      tags: ["categories"],
      revalidate: 3600,
    },
  )();

const getCachedFeaturedCategoriesByLocale = (locale: Locale) =>
  unstable_cache(
    async () => {
      const categories = await prisma.categories.findMany({
        where: {
          isFeatured: true,
        },
      });

      return categories.map((category) => ({
        id: category.id,
        name:
          locale === "en" ? category.categoryNameEn : category.categoryNameAr,
        description:
          locale === "en"
            ? category.categoryDescriptionEn
            : category.categoryDescriptionAr,
        image: category.image,
        isFeatured: category.isFeatured,
        createdAt: category.createdAt,
      }));
    },
    [`featured-categories-locale-${locale}`],
    {
      tags: ["categories"],
      revalidate: 3600,
    },
  )();

/* -------------------- Caching Helps --------------------  */

export const getAllCategories = async () => {
  const categories = await getCachedCategories();

  return {
    success: true,
    message: "Categories retrieved successfully",
    code: RESPONSE_CODES.OK,
    categories,
  };
};

export const getCategoryById = async (id: string) => {
  if (!id)
    return {
      success: false,
      message: "Category id is required",
      code: RESPONSE_CODES.BAD_REQUEST,
    };

  const category = await getCachedCategoryById(id);

  if (!category)
    return {
      success: false,
      message: "Category not found",
      code: RESPONSE_CODES.NOT_FOUND,
    };

  return {
    success: true,
    message: "Category retrieved successfully",
    code: RESPONSE_CODES.OK,
    category,
  };
};

export const getAllCategoriesByLocale = async (locale: Locale) => {
  const categories = await getCachedCategoriesByLocale(locale);

  return {
    success: true,
    message: "Categories retrieved successfully",
    code: RESPONSE_CODES.OK,
    categories,
  };
};

export const getCategoryByIdAndLocale = async (id: string, locale: Locale) => {
  if (!id)
    return {
      success: false,
      message: "Category id is required",
      code: RESPONSE_CODES.BAD_REQUEST,
    };

  const category = await getCachedCategoryByIdAndLocale(id, locale);

  if (!category)
    return {
      success: false,
      message: "Category not found",
      code: RESPONSE_CODES.NOT_FOUND,
    };

  return {
    success: true,
    message: "Category retrieved successfully",
    code: RESPONSE_CODES.OK,
    category,
  };
};

export const getFeaturedCategoryByLocale = async (locale: Locale) => {
  const categories = await getCachedFeaturedCategoriesByLocale(locale);

  return {
    success: true,
    message: "Featured categories retrieved successfully",
    code: RESPONSE_CODES.OK,
    categories,
  };
};
