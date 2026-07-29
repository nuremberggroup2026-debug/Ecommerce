import {
  Locale,
  ProductCreateInput,
  ProductFilters,
  ProductUpdateInput,
  ProductWithVaraintsCreateInput,
  ProductWithVaraintsUpdateInput,
} from "@/types";
import {
  createProductSchema,
  createProductWithVariantsSchema,
  updateProductSchema,
  updateProductWithVariantsSchema,
} from "./validators";
import { RESPONSE_CODES } from "@/lib/constants/response";
import { prisma } from "@/lib/prisma";
import { generateSlug, hasDuplicateAttributes } from "@/lib/helpers/index";
import { revalidateTag, unstable_cache } from "next/cache";
import { Prisma } from "@/generated/prisma/client";
import { da } from "zod/v4/locales";
/*
export const createNewProduct = async (newProduct: ProductCreateInput) => {
  const validation = createProductSchema.safeParse(newProduct);

  if (validation.success) {
    const isExisted = await prisma.products.findUnique({
      where: { productNameEn: validation.data.productNameEn },
    });

    if (isExisted)
      return {
        success: false,
        message: "Product name already existed",
        code: RESPONSE_CODES.CONFLICT,
      };

    const slug = generateSlug(validation.data.productNameEn);

    await prisma.products.create({
      data: { ...validation.data, slug },
    });

    revalidateTag("products", "max");
    return {
      success: true,
      message: "Product added successfully",
      code: RESPONSE_CODES.CREATED,
    };
  }

  return {
    success: false,
    message: "Validation error",
    code: RESPONSE_CODES.BAD_REQUEST,
  };
};

export const updateProduct = async (
  id: string,
  updatedProductData: ProductUpdateInput,
) => {
  if (!id)
    return {
      success: false,
      message: "Product id is required",
      code: RESPONSE_CODES.BAD_REQUEST,
    };

  const validation = updateProductSchema.safeParse(updatedProductData);

  if (validation.success) {
    const existingProduct = await prisma.products.findUnique({
      where: { id },
    });

    if (!existingProduct)
      return {
        success: false,
        message: "Product not found",
        code: RESPONSE_CODES.NOT_FOUND,
      };

    let slug = existingProduct.slug;

    if (validation.data.productNameEn) {
      const productWithSameName = await prisma.products.findFirst({
        where: {
          productNameEn: validation.data.productNameEn,
          NOT: {
            id,
          },
        },
      });

      if (productWithSameName)
        return {
          success: false,
          message: "Product already exists",
          code: RESPONSE_CODES.CONFLICT,
        };

      slug = generateSlug(validation.data.productNameEn);
    }

    await prisma.products.update({
      where: { id },
      data: {
        ...validation.data,
        slug,
      },
    });

    revalidateTag("products", "max");

    return {
      success: true,
      message: "Product updated successfully",
      code: RESPONSE_CODES.OK,
    };
  }

  return {
    success: false,
    message: "Validation error",
    code: RESPONSE_CODES.BAD_REQUEST,
  };
};*/
export const createProductWithVariant = async (
  newProductWithVariants: ProductWithVaraintsCreateInput,
) => {
  const validation = createProductWithVariantsSchema.safeParse(
    newProductWithVariants,
  );

  // Validation Check
  if (!validation.success) {
    return {
      success: false,
      message: "Validation error",
      code: RESPONSE_CODES.BAD_REQUEST,
    };
  }

  try {
    const isExisted = await prisma.products.findUnique({
      where: {
        productNameEn: validation.data.productNameEn,
      },
    });
    // Check if name already used (for slug generating)
    if (isExisted) {
      return {
        success: false,
        message: "Product name already existed",
        code: RESPONSE_CODES.CONFLICT,
      };
    }

    const isCategoryAvailable = await prisma.categories.findUnique({
      where: {
        id: validation.data.categoryId,
      },
      select: {
        id: true,
      },
    });

    // Check if category existed
    if (!isCategoryAvailable) {
      return {
        success: false,
        message: `No category with this ID: ${validation.data.categoryId}`,
        code: RESPONSE_CODES.BAD_REQUEST,
      };
    }

    const arrayOfSkus = validation.data.variants.map((v) => v.sku);

    const existingSkus = await prisma.product_variants.findMany({
      where: {
        sku: {
          in: arrayOfSkus,
        },
      },
      select: {
        sku: true,
      },
    });

    // Check if sku already used
    if (existingSkus.length > 0) {
      const usedSkus = existingSkus.map((s) => s.sku).join(", ");

      return {
        success: false,
        message: `The following SKUs are already in use: ${usedSkus}`,
        code: RESPONSE_CODES.CONFLICT,
      };
    }

    const setOfSku = new Set(arrayOfSkus);

    // Check if there redundent sku
    if (setOfSku.size !== arrayOfSkus.length) {
      return {
        success: false,
        message: "Duplicated SKUs",
        code: RESPONSE_CODES.CONFLICT,
      };
    }

    const { variants } = validation.data;

    for (const variant of variants) {
      // if variant is product default and there is variant, then thorw an error
      if (
        variant.isDefault &&
        variant.attributeValueIds &&
        variant.attributeValueIds.length > 0
      ) {
        return {
          success: false,
          message: "Default variant cannot have attributes",
          code: RESPONSE_CODES.BAD_REQUEST,
        };
      }

      if (variant.attributeValueIds?.length) {
        const hasDuplicates = await hasDuplicateAttributes(
          variant.attributeValueIds,
        );

        // if the is duplicated attributes, then throw an error
        if (hasDuplicates) {
          return {
            success: false,
            message:
              "A variant cannot contain multiple values from the same attribute",
            code: RESPONSE_CODES.BAD_REQUEST,
          };
        }
      }
    }

    const preparedVariants = variants.map((variant) => {
      let finalPrice = variant.price;

      // if there is discount, then calculate the final price
      if (variant.discountPercentage && variant.discountPercentage > 0) {
        finalPrice =
          variant.price - variant.price * (variant.discountPercentage / 100);

        finalPrice = Number(finalPrice.toFixed(2));
      }

      return {
        ...variant,
        finalPrice,
      };
    });

    const startingPrice = Math.min(
      ...preparedVariants.map((v) => v.finalPrice),
    );

    await prisma.$transaction(async (tx) => {
      const slug = generateSlug(validation.data.productNameEn);

      const newProduct = await tx.products.create({
        data: {
          productNameEn: validation.data.productNameEn,
          productNameAr: validation.data.productNameAr,
          productDescriptionEn: validation.data.productDescriptionEn,
          productDescriptionAr: validation.data.productDescriptionAr,
          productCardImage: validation.data.productCardImage,
          slug,
          categoryId: validation.data.categoryId,
          isFeatured: validation.data.isFeatured,
          productImages: validation.data.productImages,
          startingPrice,
        },
      });

      for (const variant of preparedVariants) {
        const { attributeValueIds, ...variantInputs } = variant;

        const newVariant = await tx.product_variants.create({
          data: {
            ...variantInputs,
            productId: newProduct.id,
          },
        });

        if (attributeValueIds && attributeValueIds.length > 0) {
          await tx.variant_attribute_values.createMany({
            data: attributeValueIds.map((attributeValueId) => ({
              variantId: newVariant.id,
              attributeValueId,
            })),
          });
        }
      }
    });

    revalidateTag("products", "max");
    revalidateTag("productVariants", "max");

    return {
      success: true,
      message: "Product created successfully",
      code: RESPONSE_CODES.CREATED,
    };
  } catch (error) {
    console.log("Create product error:", error);

    return {
      success: false,
      message: "Internal server error",
      code: RESPONSE_CODES.INTERNAL_ERROR,
    };
  }
};

export const updateProductWithVariant = async (
  id: string,
  updatedProductData: ProductWithVaraintsUpdateInput,
) => {
  try {
    if (!id) {
      return {
        success: false,
        message: "Product id is required",
        code: RESPONSE_CODES.BAD_REQUEST,
      };
    }

    const currentProduct = await prisma.products.findUnique({
      where: { id },
    });

    if (!currentProduct) {
      return {
        success: false,
        message: "Product not found",
        code: RESPONSE_CODES.NOT_FOUND,
      };
    }

    const validation =
      updateProductWithVariantsSchema.safeParse(updatedProductData);

    if (!validation.success) {
      return {
        success: false,
        message: "Validation error",
        code: RESPONSE_CODES.BAD_REQUEST,
      };
    }

    if (validation.data.productNameEn) {
      const isNameUsed = await prisma.products.findFirst({
        where: {
          productNameEn: validation.data.productNameEn,
          NOT: { id },
        },
      });

      if (isNameUsed) {
        return {
          success: false,
          message: "Product name already used",
          code: RESPONSE_CODES.CONFLICT,
        };
      }
    }

    const { variants, ...productData } = validation.data;

    if (variants && variants.length > 0) {
      const arrayOfSkus = variants
        .filter((v) => v.sku !== undefined)
        .map((v) => v.sku);

      const variantsId = variants.map((v) => v.id);

      if (arrayOfSkus.length > 0) {
        const existingSkus = await prisma.product_variants.findMany({
          where: {
            sku: {
              in: arrayOfSkus,
            },
            NOT: {
              id: {
                in: variantsId,
              },
            },
          },
          select: {
            sku: true,
          },
        });

        if (existingSkus.length > 0) {
          return {
            success: false,
            message: "Sku already used",
            code: RESPONSE_CODES.CONFLICT,
          };
        }

        const setOfSku = new Set(arrayOfSkus);

        if (setOfSku.size !== arrayOfSkus.length) {
          return {
            success: false,
            message: "Duplicated Skus",
            code: RESPONSE_CODES.CONFLICT,
          };
        }
      }

      for (const variant of variants) {
        if (
          variant.isDefault &&
          variant.attributeValueIds &&
          variant.attributeValueIds.length > 0
        ) {
          return {
            success: false,
            message: "Default variant cannot have attributes",
            code: RESPONSE_CODES.BAD_REQUEST,
          };
        }

        if (variant.attributeValueIds?.length) {
          const hasDuplicates = await hasDuplicateAttributes(
            variant.attributeValueIds,
          );

          if (hasDuplicates) {
            return {
              success: false,
              message:
                "A variant cannot contain multiple values from the same attribute",
              code: RESPONSE_CODES.BAD_REQUEST,
            };
          }
        }
      }
    }

    await prisma.$transaction(async (tx) => {
      await tx.products.update({
        where: { id },
        data: productData,
      });

      if (variants && variants.length > 0) {
        const arrayOfFinalPrice: number[] = [];

        for (const variant of variants) {
          const { attributeValueIds, ...variantData } = variant;

          const existedVariant = await tx.product_variants.findFirst({
            where: {
              id: variantData.id,
              productId: id,
            },
          });

          if (!existedVariant) {
            throw new Error(`Variant with ID ${variant.id} was not found`);
          }

          let finalPrice = Number(existedVariant.finalPrice.toFixed(2));

          if (
            variantData.price !== undefined ||
            variantData.discountPercentage !== undefined
          ) {
            const price =
              variantData.price !== undefined
                ? variantData.price
                : Number(existedVariant.price);

            const discountPercentage =
              variantData.discountPercentage !== undefined
                ? variantData.discountPercentage
                : Number(existedVariant.discountPercentage ?? 0);

            finalPrice = price - (price * discountPercentage) / 100;
            finalPrice = Number(finalPrice.toFixed(2));
          }
          arrayOfFinalPrice.push(finalPrice);

          await tx.product_variants.update({
            where: {
              id: variant.id,
            },
            data: {
              ...variantData,
              finalPrice,
            },
          });

          if (attributeValueIds) {
            await tx.variant_attribute_values.deleteMany({
              where: {
                variantId: existedVariant.id,
              },
            });

            await tx.variant_attribute_values.createMany({
              data: attributeValueIds.map((attributeValueId) => ({
                variantId: existedVariant.id,
                attributeValueId,
              })),
            });
          }
        }

        await tx.products.update({
          where: { id },
          data: {
            startingPrice: new Prisma.Decimal(Math.min(...arrayOfFinalPrice)),
          },
        });
      }
    });

    revalidateTag("products", "max");
    revalidateTag("productVariants", "max");
    return {
      success: true,
      message: "Product updated successfully",
      code: RESPONSE_CODES.OK,
    };
  } catch (error) {
    console.log("Update product error:", error);

    if (error instanceof Error && error.message.startsWith("Variant with ID")) {
      return {
        success: false,
        message: error.message,
        code: RESPONSE_CODES.NOT_FOUND,
      };
    }

    return {
      success: false,
      message: "Internal server error",
      code: RESPONSE_CODES.INTERNAL_ERROR,
    };
  }
};

export const deleteProduct = async (id: string) => {
  if (!id)
    return {
      success: false,
      message: "Product id is required",
      code: RESPONSE_CODES.BAD_REQUEST,
    };

  const existingProduct = await prisma.products.findUnique({
    where: { id },
  });

  if (!existingProduct)
    return {
      success: false,
      message: "Product not found",
      code: RESPONSE_CODES.NOT_FOUND,
    };

  await prisma.products.delete({
    where: { id },
  });

  revalidateTag("products", "max");
  return {
    success: true,
    message: "Product deleted successfully",
    code: RESPONSE_CODES.OK,
  };
};

/* -------------------- Caching Helps --------------------  */

const getCachedProducts = () =>
  unstable_cache(
    async () => {
      return prisma.products.findMany({
        include: { categories: { select: { categoryNameEn: true } } },
      });
    },
    ["all-products"],
    {
      tags: ["products"],
      revalidate: 3600,
    },
  )();

const getCachedProductsByLocale = (locale: Locale) =>
  unstable_cache(
    async () => {
      const products = await prisma.products.findMany({
        select: {
          id: true,
          productNameEn: true,
          productNameAr: true,
          productDescriptionEn: true,
          productDescriptionAr: true,
          productCardImage: true,
          slug: true,
          productVariants: {
            orderBy: {
              finalPrice: "asc",
            },
            take: 1,
            select: { finalPrice: true, price: true, discountPercentage: true },
          },
          categories: {
            select: { categoryNameEn: true, categoryNameAr: true },
          },
        },
      });

      return products.map((product) => ({
        id: product.id,
        productName:
          locale === "en" ? product.productNameEn : product.productNameAr,
        productDescription:
          locale === "en"
            ? product.productDescriptionEn
            : product.productDescriptionAr,
        productCardImage: product.productCardImage,
        slug: product.slug,
        categoryName:
          locale === "en"
            ? product.categories.categoryNameEn
            : product.categories.categoryNameAr,

        variants: product.productVariants,
      }));
    },
    [`products-locale-${locale}`],
    {
      tags: ["products"],
      revalidate: 3600,
    },
  )();

const getCachedProductById = (id: string) =>
  unstable_cache(
    async () => {
      return prisma.products.findUnique({
        where: { id },
        include: {
          productVariants: {
            include: {
              variantAttributeValues: {
                include: {
                  attributeValues: {
                    include: {
                      attributes: true,
                    },
                  },
                },
              },
            },
          },
          categories: true,
        },
      });
    },
    [`product-by-id-${id}`],
    {
      tags: ["products"],
      revalidate: 3600,
    },
  )();

const getCachedProductByIdAndLocale = (id: string, locale: Locale) =>
  unstable_cache(
    async () => {
      const product = await prisma.products.findUnique({
        where: { id },
        select: {
          id: true,
          productNameEn: true,
          productNameAr: true,
          productDescriptionEn: true,
          productDescriptionAr: true,
          productCardImage: true,
          slug: true,
          productImages: true,
          productVariants: {
            include: {
              variantAttributeValues: {
                include: {
                  attributeValues: {
                    include: {
                      attributes: true,
                    },
                  },
                },
              },
            },
          },
          categories: {
            select: {
              categoryNameEn: true,
              categoryNameAr: true,
              categoryDescriptionEn: true,
              categoryDescriptionAr: true,
            },
          },
        },
      });

      if (!product) return null;

      return {
        id: product.id,
        productName:
          locale === "en" ? product.productNameEn : product.productNameAr,
        productDescription:
          locale === "en"
            ? product.productDescriptionEn
            : product.productDescriptionAr,
        productCardImage: product.productCardImage,
        productImages: product.productImages,
        slug: product.slug,
        categoryName:
          locale === "en"
            ? product.categories.categoryNameEn
            : product.categories.categoryNameAr,
        categoryDescription:
          locale === "en"
            ? product.categories.categoryDescriptionEn
            : product.categories.categoryDescriptionAr,

        productVariants: product.productVariants.map((productVariant) => {
          const { id, variantAttributeValues, ...productVariantWithOutId } =
            productVariant;
          return {
            ...productVariantWithOutId,
            variantId: id,
            attributes: variantAttributeValues.map((variantValue) => ({
              attributeId: variantValue.attributeValues.attributeId,
              attributeName:
                locale === "en"
                  ? variantValue.attributeValues.attributes.attributeNameEn
                  : variantValue.attributeValues.attributes.attributeNameAr,
              attributeValueId: variantValue.attributeValues.id,
              attributeValue:
                locale === "en"
                  ? variantValue.attributeValues.attributeValueEn
                  : variantValue.attributeValues.attributeValueAr,
            })),
          };
        }),
      };
    },
    [`product-by-id-${id}-and-locale-${locale}`],
    {
      tags: ["products"],
      revalidate: 3600,
    },
  )();

const getCahcedfilteredProduct = (
  productsFilters: ProductFilters,
  locale: Locale,
) => {
  const cacheKey = [
    "filtered-products",
    locale,
    JSON.stringify(productsFilters),
  ];

  return unstable_cache(
    async () => {
      // where Object (prisma)
      const where: Prisma.productsWhereInput = {};

      // filter products by category
      if (productsFilters.categories) {
        where.categoryId = {
          in: productsFilters.categories,
        };
      }

      const priceFilter: Prisma.DecimalFilter = {};
      if (productsFilters.minPrice !== undefined) {
        priceFilter.gte = productsFilters.minPrice;
      }

      if (productsFilters.maxPrice !== undefined) {
        priceFilter.lte = productsFilters.maxPrice;
      }

      if (Object.keys(priceFilter).length > 0) {
        where.startingPrice = priceFilter;
      }

      // search prdocuts by name
      if (productsFilters.search) {
        where.OR = [
          {
            productNameEn: {
              contains: productsFilters.search.trim(),
              mode: "insensitive",
            },
          },
          {
            productNameAr: {
              contains: productsFilters.search.trim(),
              mode: "insensitive",
            },
          },
        ];
      }

      // sort product
      let orderBy: Prisma.productsOrderByWithRelationInput = {
        createdAt: "desc",
      };

      switch (productsFilters.sort) {
        case "newest":
          orderBy = { createdAt: "desc" };
          break;

        case "oldest":
          orderBy = { createdAt: "asc" };
          break;

        case "price_asc":
          orderBy = { startingPrice: "asc" };
          break;

        case "price_desc":
          orderBy = { startingPrice: "desc" };
          break;
      }

      // pagination
      const skip = 10 * ((productsFilters.page ?? 1) - 1);
      const take = 10;

      const totalProducts = await prisma.products.count({
        where,
      });

      // query
      const products = await prisma.products.findMany({
        where,
        skip,
        take,
        orderBy,
        select: {
          id: true,
          productNameEn: true,
          productNameAr: true,
          productDescriptionEn: true,
          productDescriptionAr: true,
          productCardImage: true,
          slug: true,
          productVariants: {
            orderBy: {
              finalPrice: "asc",
            },
            take: 1,
            select: { finalPrice: true, price: true, discountPercentage: true },
          },
          categories: {
            select: { categoryNameEn: true, categoryNameAr: true },
          },
        },
      });

      // get products by locale
      const data = products.map((product) => ({
        id: product.id,
        productName:
          locale === "en" ? product.productNameEn : product.productNameAr,
        productDescription:
          locale === "en"
            ? product.productDescriptionEn
            : product.productDescriptionAr,
        productCardImage: product.productCardImage,
        slug: product.slug,
        categoryName:
          locale === "en"
            ? product.categories.categoryNameEn
            : product.categories.categoryNameAr,

        variants: product.productVariants,
      }));

      return {
        data,
        pagination: {
          currentPage: productsFilters.page ?? 1,

          totalPages: Math.ceil(totalProducts / take),

          totalItems: totalProducts,

          itemsPerPage: take,
        },
      };
    },
    cacheKey,
    { tags: ["products"], revalidate: 3600 },
  )();
};

const getCachedFeaturedProductsByLocale = (locale: Locale) =>
  unstable_cache(
    async () => {
      const products = await prisma.products.findMany({
        where: {
          isFeatured: true,
          productVariants: { some: { stock: { gte: 1 } } },
        },
        select: {
          id: true,
          productNameEn: true,
          productNameAr: true,
          productDescriptionEn: true,
          productDescriptionAr: true,
          productCardImage: true,
          slug: true,
          productVariants: {
            orderBy: {
              finalPrice: "asc",
            },
            take: 1,
            select: {
              finalPrice: true,
              price: true,
              discountPercentage: true,
              stock: true,
            },
          },
          categories: {
            select: { categoryNameEn: true, categoryNameAr: true },
          },
        },
      });

      const data = products.map((product) => ({
        id: product.id,
        productName:
          locale === "en" ? product.productNameEn : product.productNameAr,
        productDescription:
          locale === "en"
            ? product.productDescriptionEn
            : product.productDescriptionAr,
        productCardImage: product.productCardImage,
        slug: product.slug,
        categoryName:
          locale === "en"
            ? product.categories.categoryNameEn
            : product.categories.categoryNameAr,

        variants: product.productVariants,
      }));

      return data;
    },
    [`featured-products-by-locale-${locale}`],
    {
      tags: ["products"],
      revalidate: 3600,
    },
  )();

const getCachedDisCountProductsByLocale = (locale: Locale) =>
  unstable_cache(
    async () => {
      const productsIDs = await prisma.product_variants.groupBy({
        by: ["productId"],
        _max: {
          discountPercentage: true,
        },
        where: {
          discountPercentage: {
            gte: 1,
          },
        },
        orderBy: {
          _max: {
            discountPercentage: "desc",
          },
        },
        take: 4,
      });

      const products = await prisma.products.findMany({
        where: {
          id: { in: productsIDs.map((pro) => pro.productId) },
        },
        select: {
          id: true,
          productNameEn: true,
          productNameAr: true,
          productDescriptionEn: true,
          productDescriptionAr: true,
          productCardImage: true,
          slug: true,
          productVariants: {
            orderBy: {
              finalPrice: "asc",
            },
            take: 1,
            select: {
              finalPrice: true,
              price: true,
              discountPercentage: true,
              stock: true,
            },
          },
          categories: {
            select: { categoryNameEn: true, categoryNameAr: true },
          },
        },
      });

      const data = products.map((product) => ({
        id: product.id,
        productName:
          locale === "en" ? product.productNameEn : product.productNameAr,
        productDescription:
          locale === "en"
            ? product.productDescriptionEn
            : product.productDescriptionAr,
        productCardImage: product.productCardImage,
        slug: product.slug,
        categoryName:
          locale === "en"
            ? product.categories.categoryNameEn
            : product.categories.categoryNameAr,

        variants: product.productVariants,
      }));

      return data;
    },
    [`discount-products-by-locale-${locale}`],
    {
      tags: ["products"],
      revalidate: 3600,
    },
  )();

/* -------------------- Caching Helps --------------------  */

export const getAllProducts = async () => {
  const products = await getCachedProducts();

  return {
    success: true,
    message: "Products retrieved successfully",
    code: RESPONSE_CODES.OK,
    data: products,
  };
};

export const getProductById = async (id: string) => {
  const product = await getCachedProductById(id);

  if (!product)
    return {
      success: false,
      message: "Product not found",
      code: RESPONSE_CODES.NOT_FOUND,
    };

  return {
    success: true,
    message: "Product retrieved successfully",
    code: RESPONSE_CODES.OK,
    data: product,
  };
};

export const getAllProductsByLocale = async (locale: Locale) => {
  const products = await getCachedProductsByLocale(locale);

  return {
    success: true,
    message: "Products retrieved successfully",
    code: RESPONSE_CODES.OK,
    data: products,
  };
};

export const getProductByIdAndLocale = async (locale: Locale, id: string) => {
  const product = await getCachedProductByIdAndLocale(id, locale);

  if (!product)
    return {
      success: false,
      message: "Product not found",
      code: RESPONSE_CODES.NOT_FOUND,
    };

  return {
    success: true,
    message: "Product retrieved successfully",
    code: RESPONSE_CODES.OK,
    data: product,
  };
};

export const getFilterProducts = async (
  productsFilters: ProductFilters,
  locale: Locale,
) => {
  const data = await getCahcedfilteredProduct(productsFilters, locale);

  return {
    success: true,
    message: "Products retrieved successfully",
    code: RESPONSE_CODES.OK,
    data,
  };
};

export const getFeaturedProductsByLocale = async (locale: Locale) => {
  const data = await getCachedFeaturedProductsByLocale(locale);

  return {
    success: true,
    message: "Featured products retrieved successfully",
    code: RESPONSE_CODES.OK,
    data,
  };
};

export const getDiscountProductsByLocale = async (locale: Locale) => {
  const data = await getCachedDisCountProductsByLocale(locale);

  return {
    success: true,
    message: "On discount products retrieved successfully",
    code: RESPONSE_CODES.OK,
    data,
  };
};
