"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Plus, Trash2, X } from "lucide-react";

import ImageUploader from "@/components/test/ImageUploader";
import { useUploadThing } from "@/utils/uploadthing";
import { toastResponse } from "@/lib/admintoast";

import {
  productSchema,
  type ProductSchema,
} from "@/server/products/validators";

import {
  adminAddProduct,
} from "@/features/products/api/products.client.api";

export interface ProductCategoryOption {
  id: string;
  categoryNameEn: string;
  categoryNameAr: string;
}

export interface ProductAttributeValueOption {
  id: string;
  attributeId: string;
  attributeValueEn: string;
  attributeValueAr: string;
}

export interface ProductAttributeOption {
  id: string;
  attributeNameEn: string;
  attributeNameAr: string;
  attributeValues: ProductAttributeValueOption[];
}

interface AddProductFormProps {
  categories: ProductCategoryOption[];
  attributes: ProductAttributeOption[];
}

const calculateFinalPrice = (
  price: number,
  discount: number
) => {
  if (!Number.isFinite(price)) {
    return 0;
  }

  if (!Number.isFinite(discount)) {
    discount = 0;
  }

  return Number(
    Math.max(
      0,
      price - price * (discount / 100)
    ).toFixed(2)
  );
};

export default function AddProductForm({
  categories,
  attributes,
}: AddProductFormProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  /**
   * false = Simple Product
   * true  = Advanced Variants
   */
  const [advancedVariants, setAdvancedVariants] =
    useState(false);

  const [cardImageFile, setCardImageFile] =
    useState<File | null>(null);

  const [productImageFiles, setProductImageFiles] =
    useState<File[]>([]);

  const [variantFiles, setVariantFiles] =
    useState<Record<string, File | null>>({});

  const { startUpload, isUploading } =
    useUploadThing("products");

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<ProductSchema>({
    resolver: zodResolver(productSchema),

    mode: "onSubmit",

    reValidateMode: "onChange",

    defaultValues: {
      slug: "",

      productNameEn: "",

      productNameAr: "",

      productDescriptionEn: "",

      productDescriptionAr: "",

      productCardImage: "",

      productImages: [],

      categoryId: "",

      isFeatured: false,

      /**
       * We keep one internal variant in the form.
       * For Simple Product it will be used as
       * the automatically generated default variant.
       */
      variants: [
        {
          sku: "",
          variantImage: "",
          price: 0,
          discountPercentage: 0,
          finalPrice: 0,
          stock: 0,
          isDefault: true,
          attributeValueIds: [],
        },
      ],
    },
  });

  const {
    fields: variantFields,
    append,
    remove,
    replace,
  } = useFieldArray({
    control,
    name: "variants",
  });

  const variants = watch("variants") || [];

  /*
   * =========================================================
   * Upload helpers
   * =========================================================
   */

  const uploadOne = async (file: File) => {
    const result = await startUpload([file]);

    const url =
      result?.[0]?.serverData?.uploadedUrl;

    if (!url) {
      throw new Error("Image upload failed");
    }

    return url;
  };

  const uploadMany = async (files: File[]) => {
    if (!files.length) {
      return [];
    }

    const result = await startUpload(files);

    const urls =
      result
        ?.map(
          (item) =>
            item?.serverData?.uploadedUrl
        )
        .filter(
          (url): url is string =>
            Boolean(url)
        ) ?? [];

    if (urls.length !== files.length) {
      throw new Error(
        "One or more images failed to upload"
      );
    }

    return urls;
  };

  /*
   * =========================================================
   * Simple / Advanced
   * =========================================================
   */

  const enableAdvancedVariants = () => {
    setAdvancedVariants(true);

    if (!variants.length) {
      append({
        sku: "",
        variantImage: "",
        price: 0,
        discountPercentage: 0,
        finalPrice: 0,
        stock: 0,
        isDefault: true,
        attributeValueIds: [],
      });

      return;
    }

    /**
     * When switching to Advanced:
     * keep the existing simple variant as the
     * first/default variant.
     */
    setValue(
      "variants.0.isDefault",
      true,
      {
        shouldDirty: true,
        shouldValidate: true,
      }
    );

    setValue(
      "variants.0.attributeValueIds",
      [],
      {
        shouldDirty: true,
        shouldValidate: true,
      }
    );
  };

  const disableAdvancedVariants = () => {
    setAdvancedVariants(false);

    /**
     * Simple product always has exactly one
     * internal variant.
     */
    const current = variants[0];

    replace([
      {
        sku: current?.sku || "",
        variantImage:
          current?.variantImage || "",
        price: Number(
          current?.price || 0
        ),
        discountPercentage: Number(
          current?.discountPercentage || 0
        ),
        finalPrice: calculateFinalPrice(
          Number(current?.price || 0),
          Number(
            current?.discountPercentage || 0
          )
        ),
        stock: Number(
          current?.stock || 0
        ),
        isDefault: true,
        attributeValueIds: [],
      },
    ]);

    setVariantFiles({});
    clearErrors("variants");
  };

  /*
   * =========================================================
   * Variants
   * =========================================================
   */

  const addVariant = () => {
    if (!advancedVariants) {
      enableAdvancedVariants();
      return;
    }

    append({
      sku: "",
      variantImage: "",
      price: 0,
      discountPercentage: 0,
      finalPrice: 0,
      stock: 0,
      isDefault: false,
      attributeValueIds: [],
    });
  };

  const removeVariant = (
    index: number
  ) => {
    if (!advancedVariants) {
      return;
    }

    if (variantFields.length <= 1) {
      toast.error(
        "Advanced variants require at least one variant"
      );

      return;
    }

    const fieldId =
      variantFields[index]?.id;

    const wasDefault =
      variants[index]?.isDefault;

    remove(index);

    if (fieldId) {
      setVariantFiles((current) => {
        const next = {
          ...current,
        };

        delete next[fieldId];

        return next;
      });
    }

    if (wasDefault) {
      setTimeout(() => {
        setDefaultVariant(0);
      }, 0);
    }
  };

  const setDefaultVariant = (
    index: number
  ) => {
    variants.forEach((_, i) => {
      setValue(
        `variants.${i}.isDefault`,
        i === index,
        {
          shouldDirty: true,
          shouldValidate: true,
        }
      );

      if (i === index) {
        setValue(
          `variants.${i}.attributeValueIds`,
          [],
          {
            shouldDirty: true,
            shouldValidate: true,
          }
        );
      }
    });
  };

  /*
   * =========================================================
   * Attributes
   * =========================================================
   */

  const toggleAttributeValue = (
    index: number,
    valueId: string
  ) => {
    if (variants[index]?.isDefault) {
      toast.error(
        "Default variant cannot have attributes"
      );

      return;
    }

    const current =
      variants[index]
        ?.attributeValueIds ?? [];

    const next = current.includes(
      valueId
    )
      ? current.filter(
          (id) => id !== valueId
        )
      : [...current, valueId];

    setValue(
      `variants.${index}.attributeValueIds`,
      next,
      {
        shouldDirty: true,
        shouldValidate: true,
      }
    );
  };

  const isSelected = (
    index: number,
    valueId: string
  ) => {
    return (
      variants[index]
        ?.attributeValueIds?.includes(
          valueId
        ) ?? false
    );
  };

  /*
   * =========================================================
   * Price
   * =========================================================
   */

  const updatePrice = (
    index: number,
    price: number
  ) => {
    const safePrice =
      Number.isFinite(price)
        ? Math.max(0, price)
        : 0;

    const discount =
      Number(
        variants[index]
          ?.discountPercentage ?? 0
      );

    setValue(
      `variants.${index}.price`,
      safePrice,
      {
        shouldDirty: true,
        shouldValidate: true,
      }
    );

    setValue(
      `variants.${index}.finalPrice`,
      calculateFinalPrice(
        safePrice,
        discount
      ),
      {
        shouldDirty: true,
        shouldValidate: true,
      }
    );
  };

  const updateDiscount = (
    index: number,
    discount: number
  ) => {
    const safeDiscount =
      Number.isFinite(discount)
        ? Math.min(
            100,
            Math.max(0, discount)
          )
        : 0;

    const price =
      Number(
        variants[index]?.price ?? 0
      );

    setValue(
      `variants.${index}.discountPercentage`,
      safeDiscount,
      {
        shouldDirty: true,
        shouldValidate: true,
      }
    );

    setValue(
      `variants.${index}.finalPrice`,
      calculateFinalPrice(
        price,
        safeDiscount
      ),
      {
        shouldDirty: true,
        shouldValidate: true,
      }
    );
  };

  /*
   * =========================================================
   * Submit
   * =========================================================
   */

  const onSubmit = async (
    data: ProductSchema
  ) => {
    try {
      setLoading(true);

      /*
       * -----------------------------------------------------
       * Card image
       * -----------------------------------------------------
       */

      if (!cardImageFile) {
        setError(
          "productCardImage",
          {
            type: "manual",
            message:
              "Product card image is required",
          }
        );

        toast.error(
          "Please upload the product card image"
        );

        return;
      }

      /*
       * -----------------------------------------------------
       * Additional images
       * -----------------------------------------------------
       */

      if (!productImageFiles.length) {
        setError(
          "productImages",
          {
            type: "manual",
            message:
              "At least one product image is required",
          }
        );

        toast.error(
          "Please upload at least one product image"
        );

        return;
      }

      const productCardImage =
        await uploadOne(
          cardImageFile
        );

      const productImages =
        await uploadMany(
          productImageFiles
        );

      /*
       * -----------------------------------------------------
       * SIMPLE PRODUCT
       *
       * We create one internal variant.
       * The user doesn't need to think about it.
       * -----------------------------------------------------
       */

      let variantsWithImages: NonNullable<
        ProductSchema["variants"]
      > = [];

      if (!advancedVariants) {
        const simpleVariant =
          data.variants?.[0];

        if (!simpleVariant) {
          setError(
            "variants",
            {
              type: "manual",
              message:
                "Product pricing information is required",
            }
          );

          toast.error(
            "Please enter product price and stock"
          );

          return;
        }

        const price =
          Number(
            simpleVariant.price
          ) || 0;

        const discountPercentage =
          Number(
            simpleVariant.discountPercentage
          ) || 0;

        const finalPrice =
          calculateFinalPrice(
            price,
            discountPercentage
          );

        const stock =
          Number(
            simpleVariant.stock
          ) || 0;

        variantsWithImages = [
          {
            ...simpleVariant,

            sku:
              simpleVariant.sku ||
              `SKU-${Date.now()}`,

            variantImage:
              simpleVariant.variantImage ||
              "",

            price,

            discountPercentage,

            finalPrice,

            stock,

            isDefault: true,

            /**
             * Simple product can never have
             * attributes.
             */
            attributeValueIds: [],
          },
        ];
      }

      /*
       * -----------------------------------------------------
       * ADVANCED VARIANTS
       * -----------------------------------------------------
       */

      if (advancedVariants) {
        variantsWithImages =
          await Promise.all(
            (data.variants || []).map(
              async (
                variant,
                index
              ) => {
                const fieldId =
                  variantFields[index]
                    ?.id;

                const file =
                  fieldId
                    ? variantFiles[
                        fieldId
                      ]
                    : null;

                let variantImage =
                  variant.variantImage ||
                  "";

                if (file) {
                  variantImage =
                    await uploadOne(
                      file
                    );
                }

                const price =
                  Number(
                    variant.price
                  ) || 0;

                const discountPercentage =
                  Number(
                    variant.discountPercentage ||
                      0
                  );

                const finalPrice =
                  calculateFinalPrice(
                    price,
                    discountPercentage
                  );

                const stock =
                  Number(
                    variant.stock
                  ) || 0;

                return {
                  ...variant,

                  sku: variant.sku,

                  variantImage,

                  price,

                  discountPercentage,

                  finalPrice,

                  stock,

                  isDefault:
                    Boolean(
                      variant.isDefault
                    ),

                  attributeValueIds:
                    variant.isDefault
                      ? []
                      : variant.attributeValueIds ||
                        [],
                };
              }
            )
          );

        /*
         * Must have variants
         */

        if (
          !variantsWithImages.length
        ) {
          setError(
            "variants",
            {
              type: "manual",
              message:
                "Add at least one variant",
            }
          );

          toast.error(
            "Please add at least one variant"
          );

          return;
        }

        /*
         * Exactly one default variant
         */

        const defaultCount =
          variantsWithImages.filter(
            (variant) =>
              variant.isDefault
          ).length;

        if (defaultCount !== 1) {
          setError(
            "variants",
            {
              type: "manual",
              message:
                "Please select exactly one default variant",
            }
          );

          toast.error(
            "Please select exactly one default variant"
          );

          return;
        }

        /*
         * Default variant cannot have attributes
         */

        const invalidDefault =
          variantsWithImages.some(
            (variant) =>
              variant.isDefault &&
              (
                variant
                  .attributeValueIds
                  ?.length ?? 0
              ) > 0
          );

        if (invalidDefault) {
          toast.error(
            "Default variant cannot have attributes"
          );

          return;
        }
      }

      /*
       * -----------------------------------------------------
       * Starting price
       * -----------------------------------------------------
       *
       * Always comes from variants.
       *
       * Simple:
       *     startingPrice = simple finalPrice
       *
       * Advanced:
       *     startingPrice = cheapest finalPrice
       * -----------------------------------------------------
       */

      const startingPrice =
        variantsWithImages.length
          ? Math.min(
              ...variantsWithImages.map(
                (variant) =>
                  Number(
                    variant.finalPrice
                  )
              )
            )
          : 0;

      /*
       * -----------------------------------------------------
       * Create product
       * -----------------------------------------------------
       */

      await toastResponse(
        adminAddProduct({
          ...data,

          productCardImage,

          productImages,

          startingPrice,

          variants:
            variantsWithImages,
        }),
        "Product created successfully"
      );

      router.push(
        "/dashboard/products"
      );

      router.refresh();
    } catch (error) {
      console.error(error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  /*
   * =========================================================
   * UI
   * =========================================================
   */

  const inputClass =
    "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-black focus:ring-2 focus:ring-black/10";

  const labelClass =
    "text-sm font-medium text-gray-700";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto max-w-7xl space-y-6 pb-10"
    >
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="rounded-2xl border bg-white p-6">
        <h1 className="text-2xl font-semibold">
          Add Product
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Create a product with pricing,
          stock, images and optional variants.
        </p>
      </div>

      {/* =====================================================
          PRODUCT INFORMATION
      ===================================================== */}

      <section className="rounded-2xl border bg-white p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold">
            Product Information
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Basic information about the product.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div className="space-y-1">
            <label
              className={labelClass}
            >
              Product Name (EN)
            </label>

            <input
              {...register(
                "productNameEn"
              )}
              className={inputClass}
              placeholder="Product name"
            />

            {errors.productNameEn && (
              <p className="text-xs text-red-600">
                {
                  errors
                    .productNameEn
                    .message
                }
              </p>
            )}
          </div>

          <div className="space-y-1">
            <label
              className={labelClass}
            >
              Product Name (AR)
            </label>

            <input
              dir="rtl"
              {...register(
                "productNameAr"
              )}
              className={inputClass}
              placeholder="اسم المنتج"
            />

            {errors.productNameAr && (
              <p className="text-xs text-red-600">
                {
                  errors
                    .productNameAr
                    .message
                }
              </p>
            )}
          </div>

          <div className="space-y-1">
            <label
              className={labelClass}
            >
              Slug
            </label>

            <input
              {...register("slug")}
              className={inputClass}
              placeholder="product-slug"
            />

            {errors.slug && (
              <p className="text-xs text-red-600">
                {errors.slug.message}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <label
              className={labelClass}
            >
              Category
            </label>

            <select
              {...register(
                "categoryId"
              )}
              className={inputClass}
            >
              <option value="">
                Select category
              </option>

              {categories.map(
                (category) => (
                  <option
                    key={category.id}
                    value={category.id}
                  >
                    {
                      category.categoryNameEn
                    }{" "}
                    /{" "}
                    {
                      category.categoryNameAr
                    }
                  </option>
                )
              )}
            </select>

            {errors.categoryId && (
              <p className="text-xs text-red-600">
                {
                  errors
                    .categoryId
                    .message
                }
              </p>
            )}
          </div>

          <div className="space-y-1">
            <label
              className={labelClass}
            >
              Description (EN)
            </label>

            <textarea
              {...register(
                "productDescriptionEn"
              )}
              rows={6}
              className={`${inputClass} resize-none`}
              placeholder="Product description"
            />

            {errors.productDescriptionEn && (
              <p className="text-xs text-red-600">
                {
                  errors
                    .productDescriptionEn
                    .message
                }
              </p>
            )}
          </div>

          <div className="space-y-1">
            <label
              className={labelClass}
            >
              Description (AR)
            </label>

            <textarea
              dir="rtl"
              {...register(
                "productDescriptionAr"
              )}
              rows={6}
              className={`${inputClass} resize-none`}
              placeholder="وصف المنتج"
            />

            {errors.productDescriptionAr && (
              <p className="text-xs text-red-600">
                {
                  errors
                    .productDescriptionAr
                    .message
                }
              </p>
            )}
          </div>

          <label className="flex items-center gap-3 md:col-span-2">
            <input
              type="checkbox"
              {...register(
                "isFeatured"
              )}
              className="h-4 w-4 rounded"
            />

            <span className="text-sm font-medium">
              Featured Product
            </span>
          </label>
        </div>
      </section>

      {/* =====================================================
          IMAGES
      ===================================================== */}

      <section className="rounded-2xl border bg-white p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold">
            Product Images
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Upload the card image and
            additional product images.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Card */}

          <div className="space-y-3">
            <label
              className={labelClass}
            >
              Card Image
            </label>

            <div className="rounded-2xl border border-dashed bg-gray-50 p-5">
              <ImageUploader
                onFileSelect={(file) => {
                  setCardImageFile(
                    file
                  );

                  setValue(
                    "productCardImage",
                    file
                      ? "pending"
                      : "",
                    {
                      shouldDirty: true,
                      shouldValidate: true,
                    }
                  );

                  if (file) {
                    clearErrors(
                      "productCardImage"
                    );
                  }
                }}
              />
            </div>

            {errors.productCardImage && (
              <p className="text-xs text-red-600">
                {
                  errors
                    .productCardImage
                    .message
                }
              </p>
            )}
          </div>

          {/* Additional */}

          <div className="space-y-3">
            <label
              className={labelClass}
            >
              Additional Images
            </label>

            <div className="rounded-2xl border border-dashed bg-gray-50 p-5">
              <input
                type="file"
                accept="image/*"
                multiple
                className="block w-full text-sm"
                onChange={(e) => {
                  const files =
                    Array.from(
                      e.target.files ??
                        []
                    );

                  setProductImageFiles(
                    files
                  );

                  setValue(
                    "productImages",
                    files.map(
                      (_, i) =>
                        `pending-${i}`
                    ),
                    {
                      shouldDirty: true,
                      shouldValidate: true,
                    }
                  );

                  if (files.length) {
                    clearErrors(
                      "productImages"
                    );
                  }
                }}
              />
            </div>

            {productImageFiles.length >
              0 && (
              <>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {productImageFiles.map(
                    (
                      file,
                      index
                    ) => (
                      <div
                        key={`${file.name}-${index}`}
                        className="relative aspect-square overflow-hidden rounded-xl border"
                      >
                        <Image
                          src={URL.createObjectURL(
                            file
                          )}
                          alt={
                            file.name
                          }
                          fill
                          unoptimized
                          className="object-cover"
                        />

                        <button
                          type="button"
                          onClick={() => {
                            const files =
                              productImageFiles.filter(
                                (
                                  _,
                                  i
                                ) =>
                                  i !==
                                  index
                              );

                            setProductImageFiles(
                              files
                            );

                            setValue(
                              "productImages",
                              files.map(
                                (
                                  _,
                                  i
                                ) =>
                                  `pending-${i}`
                              ),
                              {
                                shouldDirty:
                                  true,
                                shouldValidate:
                                  true,
                              }
                            );
                          }}
                          className="absolute right-2 top-2 rounded-full bg-black/70 p-1.5 text-white"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    )
                  )}
                </div>

                <p className="text-xs text-gray-500">
                  {
                    productImageFiles.length
                  }{" "}
                  image
                  {productImageFiles.length !==
                  1
                    ? "s"
                    : ""}{" "}
                  selected
                </p>
              </>
            )}

            {errors.productImages && (
              <p className="text-xs text-red-600">
                {
                  errors
                    .productImages
                    .message
                }
              </p>
            )}
          </div>
        </div>
      </section>

      {/* =====================================================
          PRODUCT TYPE
      ===================================================== */}

      <section className="rounded-2xl border bg-white p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold">
            Product Type
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Choose whether this product has
            one price/stock or multiple variants.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {/* Simple */}

          <button
            type="button"
            onClick={
              disableAdvancedVariants
            }
            className={`rounded-2xl border p-5 text-left transition ${
              !advancedVariants
                ? "border-black bg-black text-white"
                : "border-gray-200 bg-white hover:border-black"
            }`}
          >
            <p className="font-semibold">
              Simple Product
            </p>

            <p
              className={`mt-1 text-sm ${
                !advancedVariants
                  ? "text-white/70"
                  : "text-gray-500"
              }`}
            >
              One product with one price,
              discount and stock.
            </p>
          </button>

          {/* Advanced */}

          <button
            type="button"
            onClick={
              enableAdvancedVariants
            }
            className={`rounded-2xl border p-5 text-left transition ${
              advancedVariants
                ? "border-black bg-black text-white"
                : "border-gray-200 bg-white hover:border-black"
            }`}
          >
            <p className="font-semibold">
              Advanced Variants
            </p>

            <p
              className={`mt-1 text-sm ${
                advancedVariants
                  ? "text-white/70"
                  : "text-gray-500"
              }`}
            >
              Multiple variants with their
              own price, stock and attributes.
            </p>
          </button>
        </div>
      </section>

      {/* =====================================================
          SIMPLE PRODUCT
      ===================================================== */}

      {!advancedVariants && (
        <section className="rounded-2xl border bg-white p-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold">
              Product Pricing & Stock
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Set the price, discount and available
              stock for this product.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {/* SKU */}

            <div>
              <label
                className={labelClass}
              >
                SKU
              </label>

              <input
                {...register(
                  "variants.0.sku"
                )}
                className={inputClass}
                placeholder="SKU-001"
              />

              {errors.variants?.[0]
                ?.sku && (
                <p className="mt-1 text-xs text-red-600">
                  {
                    errors
                      .variants[0]
                      ?.sku?.message
                  }
                </p>
              )}
            </div>

            {/* Price */}

            <div>
              <label
                className={labelClass}
              >
                Price
              </label>

              <input
                type="number"
                min="0"
                step="0.01"
                value={
                  variants[0]
                    ?.price ?? 0
                }
                onChange={(e) =>
                  updatePrice(
                    0,
                    Number(
                      e.target.value
                    )
                  )
                }
                className={inputClass}
              />

              {errors.variants?.[0]
                ?.price && (
                <p className="mt-1 text-xs text-red-600">
                  {
                    errors
                      .variants[0]
                      ?.price?.message
                  }
                </p>
              )}
            </div>

            {/* Discount */}

            <div>
              <label
                className={labelClass}
              >
                Discount %
              </label>

              <input
                type="number"
                min="0"
                max="100"
                step="0.01"
                value={
                  variants[0]
                    ?.discountPercentage ??
                  0
                }
                onChange={(e) =>
                  updateDiscount(
                    0,
                    Number(
                      e.target.value
                    )
                  )
                }
                className={inputClass}
              />

              {errors.variants?.[0]
                ?.discountPercentage && (
                <p className="mt-1 text-xs text-red-600">
                  {
                    errors
                      .variants[0]
                      ?.discountPercentage
                      ?.message
                  }
                </p>
              )}
            </div>

            {/* Final */}

            <div>
              <label
                className={labelClass}
              >
                Final Price
              </label>

              <input
                type="number"
                readOnly
                value={
                  variants[0]
                    ?.finalPrice ?? 0
                }
                className={`${inputClass} bg-gray-100`}
              />
            </div>

            {/* Stock */}

            <div>
              <label
                className={labelClass}
              >
                Stock
              </label>

              <input
                type="number"
                min="0"
                {...register(
                  "variants.0.stock",
                  {
                    valueAsNumber:
                      true,
                  }
                )}
                className={inputClass}
              />

              {errors.variants?.[0]
                ?.stock && (
                <p className="mt-1 text-xs text-red-600">
                  {
                    errors
                      .variants[0]
                      ?.stock?.message
                  }
                </p>
              )}
            </div>
          </div>

          {/* Simple variant image */}

          <div className="mt-6">
            <label
              className={labelClass}
            >
              Product Variant Image
              <span className="ml-1 text-xs text-gray-400">
                Optional
              </span>
            </label>

            <div className="mt-2 max-w-md rounded-2xl border border-dashed bg-gray-50 p-5">
              <ImageUploader
                onFileSelect={(file) =>
                  setVariantFiles(
                    (current) => ({
                      ...current,

                      [variantFields[0]
                        ?.id || "simple"]:
                        file,
                    })
                  )
                }
              />
            </div>
          </div>
        </section>
      )}

      {/* =====================================================
          ADVANCED VARIANTS
      ===================================================== */}

      {advancedVariants && (
        <section className="rounded-2xl border bg-white p-6">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold">
                Product Variants
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Create variants with their own
                pricing, stock, images and attributes.
              </p>
            </div>

            <button
              type="button"
              onClick={addVariant}
              className="flex items-center gap-2 rounded-xl bg-black px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-800"
            >
              <Plus className="h-4 w-4" />
              Add Variant
            </button>
          </div>

          <div className="space-y-5">
            {variantFields.map(
              (
                field,
                index
              ) => {
                const variant =
                  variants[index];

                return (
                  <div
                    key={field.id}
                    className="rounded-2xl border bg-gray-50 p-5"
                  >
                    {/* Variant header */}

                    <div className="mb-5 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-sm font-medium text-white">
                          {index + 1}
                        </span>

                        <div>
                          <h3 className="font-semibold">
                            Variant{" "}
                            {index + 1}
                          </h3>

                          {variant?.sku && (
                            <p className="text-xs text-gray-500">
                              {
                                variant.sku
                              }
                            </p>
                          )}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          removeVariant(
                            index
                          )
                        }
                        className="flex items-center gap-1 rounded-lg px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                        Remove
                      </button>
                    </div>

                    {/* Pricing */}

                    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-5">
                      {/* SKU */}

                      <div>
                        <label
                          className={
                            labelClass
                          }
                        >
                          SKU
                        </label>

                        <input
                          {...register(
                            `variants.${index}.sku`
                          )}
                          className={
                            inputClass
                          }
                          placeholder="SKU-001"
                        />

                        {errors
                          .variants?.[
                          index
                        ]?.sku && (
                          <p className="mt-1 text-xs text-red-600">
                            {
                              errors
                                .variants[
                                index
                              ]?.sku
                                ?.message
                            }
                          </p>
                        )}
                      </div>

                      {/* Price */}

                      <div>
                        <label
                          className={
                            labelClass
                          }
                        >
                          Price
                        </label>

                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={
                            variant?.price ??
                            0
                          }
                          onChange={(e) =>
                            updatePrice(
                              index,
                              Number(
                                e.target
                                  .value
                              )
                            )
                          }
                          className={
                            inputClass
                          }
                        />

                        {errors
                          .variants?.[
                          index
                        ]?.price && (
                          <p className="mt-1 text-xs text-red-600">
                            {
                              errors
                                .variants[
                                index
                              ]?.price
                                ?.message
                            }
                          </p>
                        )}
                      </div>

                      {/* Discount */}

                      <div>
                        <label
                          className={
                            labelClass
                          }
                        >
                          Discount %
                        </label>

                        <input
                          type="number"
                          min="0"
                          max="100"
                          step="0.01"
                          value={
                            variant?.discountPercentage ??
                            0
                          }
                          onChange={(e) =>
                            updateDiscount(
                              index,
                              Number(
                                e.target
                                  .value
                              )
                            )
                          }
                          className={
                            inputClass
                          }
                        />

                        {errors
                          .variants?.[
                          index
                        ]
                          ?.discountPercentage && (
                          <p className="mt-1 text-xs text-red-600">
                            {
                              errors
                                .variants[
                                index
                              ]
                                ?.discountPercentage
                                ?.message
                            }
                          </p>
                        )}
                      </div>

                      {/* Final Price */}

                      <div>
                        <label
                          className={
                            labelClass
                          }
                        >
                          Final Price
                        </label>

                        <input
                          type="number"
                          readOnly
                          value={
                            variant?.finalPrice ??
                            0
                          }
                          className={`${inputClass} bg-gray-100`}
                        />
                      </div>

                      {/* Stock */}

                      <div>
                        <label
                          className={
                            labelClass
                          }
                        >
                          Stock
                        </label>

                        <input
                          type="number"
                          min="0"
                          {...register(
                            `variants.${index}.stock`,
                            {
                              valueAsNumber:
                                true,
                            }
                          )}
                          className={
                            inputClass
                          }
                        />

                        {errors
                          .variants?.[
                          index
                        ]?.stock && (
                          <p className="mt-1 text-xs text-red-600">
                            {
                              errors
                                .variants[
                                index
                              ]?.stock
                                ?.message
                            }
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Default */}

                    <label className="mt-5 flex cursor-pointer items-center gap-3">
                      <input
                        type="radio"
                        name="defaultVariant"
                        checked={
                          variant?.isDefault ===
                          true
                        }
                        onChange={() =>
                          setDefaultVariant(
                            index
                          )
                        }
                        className="h-4 w-4"
                      />

                      <div>
                        <p className="text-sm font-medium">
                          Default Variant
                        </p>

                        <p className="text-xs text-gray-500">
                          Default variant
                          cannot have
                          attributes.
                        </p>
                      </div>
                    </label>

                    {/* Variant Image */}

                    <div className="mt-6">
                      <label
                        className={
                          labelClass
                        }
                      >
                        Variant Image
                      </label>

                      <div className="mt-2 rounded-2xl border border-dashed bg-white p-5">
                        <ImageUploader
                          onFileSelect={(
                            file
                          ) =>
                            setVariantFiles(
                              (
                                current
                              ) => ({
                                ...current,
                                [field.id]:
                                  file,
                              })
                            )
                          }
                        />
                      </div>
                    </div>

                    {/* Attributes */}

                    <div className="mt-6">
                      <h4 className="font-semibold">
                        Variant Attributes
                      </h4>

                      {variant?.isDefault && (
                        <div className="mt-3 rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs text-amber-700">
                          Default variant
                          cannot have
                          attributes.
                        </div>
                      )}

                      {!variant?.isDefault &&
                        attributes.length ===
                          0 && (
                          <div className="mt-4 rounded-xl border border-dashed bg-white p-5 text-sm text-gray-500">
                            No attributes
                            available.
                          </div>
                        )}

                      {!variant?.isDefault &&
                        attributes.length >
                          0 && (
                          <div className="mt-4 space-y-4">
                            {attributes.map(
                              (
                                attribute
                              ) => (
                                <div
                                  key={
                                    attribute.id
                                  }
                                  className="rounded-xl border bg-white p-4"
                                >
                                  <div className="mb-3">
                                    <p className="font-medium">
                                      {
                                        attribute.attributeNameEn
                                      }
                                    </p>

                                    <p
                                      dir="rtl"
                                      className="text-xs text-gray-500"
                                    >
                                      {
                                        attribute.attributeNameAr
                                      }
                                    </p>
                                  </div>

                                  <div className="flex flex-wrap gap-2">
                                    {attribute.attributeValues.map(
                                      (
                                        value
                                      ) => {
                                        const selected =
                                          isSelected(
                                            index,
                                            value.id
                                          );

                                        return (
                                          <button
                                            key={
                                              value.id
                                            }
                                            type="button"
                                            onClick={() =>
                                              toggleAttributeValue(
                                                index,
                                                value.id
                                              )
                                            }
                                            className={`rounded-lg border px-3 py-2 text-sm transition ${
                                              selected
                                                ? "border-black bg-black text-white"
                                                : "border-gray-200 bg-white text-gray-700 hover:border-black"
                                            }`}
                                          >
                                            {
                                              value.attributeValueEn
                                            }

                                            <span
                                              dir="rtl"
                                              className="ml-2 text-xs opacity-70"
                                            >
                                              {
                                                value.attributeValueAr
                                              }
                                            </span>
                                          </button>
                                        );
                                      }
                                    )}
                                  </div>
                                </div>
                              )
                            )}
                          </div>
                        )}

                      {errors
                        .variants?.[
                        index
                      ]
                        ?.attributeValueIds && (
                        <p className="mt-2 text-xs text-red-600">
                          {
                            errors
                              .variants[
                              index
                            ]
                              ?.attributeValueIds
                              ?.message
                          }
                        </p>
                      )}
                    </div>
                  </div>
                );
              }
            )}
          </div>

          {errors.variants?.message && (
            <p className="mt-4 text-sm text-red-600">
              {
                errors.variants
                  .message
              }
            </p>
          )}
        </section>
      )}

      {/* =====================================================
          ACTIONS
      ===================================================== */}

      <div className="flex justify-end gap-3 border-t pt-5">
        <button
          type="button"
          onClick={() =>
            router.back()
          }
          disabled={
            loading ||
            isUploading
          }
          className="rounded-xl border px-5 py-2.5 text-sm hover:bg-gray-50 disabled:opacity-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={
            loading ||
            isUploading
          }
          className="rounded-xl bg-black px-6 py-2.5 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50"
        >
          {loading ||
          isUploading
            ? "Creating Product..."
            : "Create Product"}
        </button>
      </div>
    </form>
  );
}
