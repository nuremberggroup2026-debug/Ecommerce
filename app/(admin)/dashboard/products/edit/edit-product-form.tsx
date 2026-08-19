"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Plus, Trash2, X } from "lucide-react";

import ImageUploader from "@/components/test/ImageUploader";
import { useUploadThing } from "@/utils/uploadthing";
import { toastResponse } from "@/lib/admintoast";

import {
  updateProductSchema,
  type UpdateProductSchema,
} from "@/server/products/validators";

import { adminUpdateProduct } from "@/features/products/api/products.client.api";

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

export interface EditProduct {
  id: string;
  slug: string;
  productNameEn: string;
  productNameAr: string;
  productDescriptionEn: string;
  productDescriptionAr: string;
  productCardImage: string;
  productImages: string[];
  categoryId: string;
  isFeatured: boolean;
  startingPrice?: number;

  variants: {
    id?: string;
    sku: string;
    variantImage?: string;
    price: number;
    discountPercentage: number;
    finalPrice: number;
    stock: number;
    isDefault: boolean;
    attributeValueIds: string[];
  }[];
}

type Props = {
  product: EditProduct;
  categories: ProductCategoryOption[];
  attributes: ProductAttributeOption[];
};

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

export default function EditProductForm({
  product,
  categories,
  attributes,
}: Props) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  /*
   * Simple product:
   * one hidden/default variant containing
   * price, discount, finalPrice, stock, sku, image.
   *
   * Advanced product:
   * multiple variants + attributes.
   */
  const [advancedVariants, setAdvancedVariants] =
    useState(product.variants.length > 1);

  const [cardImageFile, setCardImageFile] =
    useState<File | null>(null);

  const [productImageFiles, setProductImageFiles] =
    useState<File[]>([]);

  const [removeImages, setRemoveImages] =
    useState<string[]>([]);

  const [variantFiles, setVariantFiles] =
    useState<Record<string, File | null>>({});

  const { startUpload, isUploading } =
    useUploadThing("products");

  /*
   * Find the variant that should be used
   * as the simple/default variant.
   */
  const existingDefaultVariant =
    product.variants.find((v) => v.isDefault) ??
    product.variants[0];

  const simpleVariant = existingDefaultVariant ?? {
    id: undefined,
    sku: "",
    variantImage: "",
    price: 0,
    discountPercentage: 0,
    finalPrice: 0,
    stock: 0,
    isDefault: true,
    attributeValueIds: [],
  };

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<UpdateProductSchema>({
    resolver: zodResolver(updateProductSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",

    defaultValues: {
      slug: product.slug,

      productNameEn: product.productNameEn,
      productNameAr: product.productNameAr,

      productDescriptionEn:
        product.productDescriptionEn,

      productDescriptionAr:
        product.productDescriptionAr,

      productCardImage:
        product.productCardImage,

      productImages:
        product.productImages,

      categoryId:
        product.categoryId,

      isFeatured:
        product.isFeatured,

      /*
       * IMPORTANT:
       *
       * Always initialize the form with the
       * existing variants.
       *
       * For a simple product there should
       * normally be exactly one variant.
       */
      variants: advancedVariants
        ? product.variants.map((v) => ({
            id: v.id,

            sku: v.sku,

            variantImage:
              v.variantImage || "",

            price:
              Number(v.price) || 0,

            discountPercentage:
              Number(
                v.discountPercentage || 0
              ),

            finalPrice:
              Number(
                v.finalPrice ??
                  calculateFinalPrice(
                    Number(v.price) || 0,
                    Number(
                      v.discountPercentage || 0
                    )
                  )
              ),

            stock:
              Number(v.stock) || 0,

            isDefault:
              Boolean(v.isDefault),

            attributeValueIds:
              v.attributeValueIds || [],
          }))
        : [
            {
              id: simpleVariant.id,

              sku:
                simpleVariant.sku || "",

              variantImage:
                simpleVariant.variantImage ||
                "",

              price:
                Number(
                  simpleVariant.price
                ) || 0,

              discountPercentage:
                Number(
                  simpleVariant.discountPercentage ||
                    0
                ),

              finalPrice:
                Number(
                  simpleVariant.finalPrice ??
                    calculateFinalPrice(
                      Number(
                        simpleVariant.price
                      ) || 0,
                      Number(
                        simpleVariant.discountPercentage ||
                          0
                      )
                    )
                ),

              stock:
                Number(
                  simpleVariant.stock
                ) || 0,

              isDefault: true,

              attributeValueIds: [],
            },
          ],
    },
  });

  const {
    fields,
    append,
    remove,
    replace,
  } = useFieldArray({
    control,
    name: "variants",
  });

  const variants = watch("variants") || [];

  /*
   * Upload one image.
   */
  const uploadOne = async (file: File) => {
    const result = await startUpload([file]);

    const url =
      result?.[0]?.serverData?.uploadedUrl;

    if (!url) {
      throw new Error(
        "Image upload failed"
      );
    }

    return url;
  };

  /*
   * Upload multiple images.
   */
  const uploadMany = async (
    files: File[]
  ) => {
    if (!files.length) {
      return [];
    }

    const result =
      await startUpload(files);

    const urls =
      result
        ?.map(
          (x) =>
            x?.serverData?.uploadedUrl
        )
        .filter(
          (x): x is string =>
            Boolean(x)
        ) ?? [];

    if (
      urls.length !==
      files.length
    ) {
      throw new Error(
        "One or more images failed to upload"
      );
    }

    return urls;
  };

  /*
   * Enable advanced mode.
   *
   * If there is currently no variant,
   * create one.
   */
  const enableAdvancedVariants =
    () => {
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
      }
    };

  /*
   * Switch to simple product.
   *
   * IMPORTANT:
   *
   * We DON'T delete the database variant.
   * We only make the form contain ONE
   * default variant.
   *
   * This is what allows the simple product
   * to have price/stock/etc.
   */
  const disableAdvancedVariants =
    () => {
      setAdvancedVariants(false);

      const currentVariants =
        variants;

      const defaultVariant =
        currentVariants.find(
          (v) => v.isDefault
        ) ??
        currentVariants[0] ??
        simpleVariant;

      replace([
        {
          id: defaultVariant.id,

          sku:
            defaultVariant.sku ||
            "",

          variantImage:
            defaultVariant.variantImage ||
            "",

          price:
            Number(
              defaultVariant.price
            ) || 0,

          discountPercentage:
            Number(
              defaultVariant.discountPercentage ||
                0
            ),

          finalPrice:
            calculateFinalPrice(
              Number(
                defaultVariant.price
              ) || 0,

              Number(
                defaultVariant.discountPercentage ||
                  0
              )
            ),

          stock:
            Number(
              defaultVariant.stock
            ) || 0,

          isDefault: true,

          attributeValueIds: [],
        },
      ]);

      setVariantFiles({});
      clearErrors("variants");
    };

  /*
   * Add advanced variant.
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

  /*
   * Remove advanced variant.
   */
  const removeVariant = (
    index: number
  ) => {
    if (!advancedVariants) {
      return;
    }

    if (fields.length <= 1) {
      toast.error(
        "Advanced variants require at least one variant"
      );

      return;
    }

    const fieldId =
      fields[index]?.id;

    const wasDefault =
      variants[index]?.isDefault;

    remove(index);

    if (fieldId) {
      setVariantFiles((prev) => {
        const next = {
          ...prev,
        };

        delete next[fieldId];

        return next;
      });
    }

    /*
     * If we removed the default variant,
     * make the first remaining variant default.
     */
    if (
      wasDefault &&
      fields.length > 1
    ) {
      setTimeout(() => {
        setDefaultVariant(0);
      }, 0);
    }
  };

  /*
   * Set exactly one default variant.
   */
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

      /*
       * Default variant does not have attributes.
       */
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
   * Toggle an attribute value.
   */
  const toggleAttribute = (
    index: number,
    valueId: string
  ) => {
    if (
      variants[index]?.isDefault
    ) {
      toast.error(
        "Default variant cannot have attributes"
      );

      return;
    }

    const current =
      variants[index]
        ?.attributeValueIds || [];

    setValue(
      `variants.${index}.attributeValueIds`,
      current.includes(valueId)
        ? current.filter(
            (x) => x !== valueId
          )
        : [
            ...current,
            valueId,
          ],
      {
        shouldDirty: true,
        shouldValidate: true,
      }
    );
  };

  /*
   * Update price and calculate final price.
   */
  const updatePrice = (
    index: number,
    value: string
  ) => {
    const price =
      Number(value) || 0;

    const discount =
      Number(
        variants[index]
          ?.discountPercentage
      ) || 0;

    setValue(
      `variants.${index}.price`,
      price,
      {
        shouldDirty: true,
        shouldValidate: true,
      }
    );

    setValue(
      `variants.${index}.finalPrice`,
      calculateFinalPrice(
        price,
        discount
      ),
      {
        shouldDirty: true,
        shouldValidate: true,
      }
    );
  };

  /*
   * Update discount and calculate final price.
   */
  const updateDiscount = (
    index: number,
    value: string
  ) => {
    const discount =
      Number(value) || 0;

    const price =
      Number(
        variants[index]?.price
      ) || 0;

    setValue(
      `variants.${index}.discountPercentage`,
      discount,
      {
        shouldDirty: true,
        shouldValidate: true,
      }
    );

    setValue(
      `variants.${index}.finalPrice`,
      calculateFinalPrice(
        price,
        discount
      ),
      {
        shouldDirty: true,
        shouldValidate: true,
      }
    );
  };

  /*
   * Submit.
   */
  const onSubmit = async (
    data: UpdateProductSchema
  ) => {
    try {
      setLoading(true);

      /*
       * --------------------------------
       * PRODUCT CARD IMAGE
       * --------------------------------
       */

      let cardImage =
        data.productCardImage;

      if (cardImageFile) {
        cardImage =
          await uploadOne(
            cardImageFile
          );
      }

      if (!cardImage) {
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
       * --------------------------------
       * PRODUCT ADDITIONAL IMAGES
       * --------------------------------
       */

      let additionalImages =
        data.productImages || [];

      if (
        productImageFiles.length
      ) {
        const uploaded =
          await uploadMany(
            productImageFiles
          );

        additionalImages = [
          ...additionalImages,
          ...uploaded,
        ];
      }

      additionalImages =
        additionalImages.filter(
          (x) =>
            !removeImages.includes(x)
        );

      /*
       * --------------------------------
       * SIMPLE PRODUCT
       * --------------------------------
       *
       * Simple product = exactly ONE
       * default variant.
       */

      if (!advancedVariants) {
        const source =
          data.variants?.[0];

        if (!source) {
          setError(
            "variants",
            {
              type: "manual",
              message:
                "Simple product information is required",
            }
          );

          toast.error(
            "Please enter price and stock"
          );

          return;
        }

        let variantImage =
          source.variantImage || "";

        /*
         * Upload simple product variant image
         * if user selected a new one.
         */
        const simpleFieldId =
          fields[0]?.id;

        const simpleFile =
          simpleFieldId
            ? variantFiles[
                simpleFieldId
              ]
            : null;

        if (simpleFile) {
          variantImage =
            await uploadOne(
              simpleFile
            );
        }

        const price =
          Number(source.price) || 0;

        const discount =
          Number(
            source.discountPercentage
          ) || 0;

        const final =
          calculateFinalPrice(
            price,
            discount
          );

        const simpleVariant = {
          ...(source.id
            ? {
                id: source.id,
              }
            : {}),

          sku:
            source.sku || "",

          variantImage,

          price,

          discountPercentage:
            discount,

          finalPrice: final,

          stock:
            Number(source.stock) ||
            0,

          /*
           * Simple product is always default.
           */
          isDefault: true,

          /*
           * No attributes for simple product.
           */
          attributeValueIds: [],
        };

        /*
         * startingPrice = final price
         * of the simple/default variant.
         */
        const startingPrice =
          final;

        await toastResponse(
          adminUpdateProduct(
            product.id,
            {
              ...data,

              productCardImage:
                cardImage,

              productImages:
                additionalImages,

              startingPrice,

              variants: [
                simpleVariant,
              ],
            }
          ),

          "Product updated successfully"
        );

        router.push(
          "/dashboard/products"
        );

        router.refresh();

        return;
      }

      /*
       * --------------------------------
       * ADVANCED VARIANTS
       * --------------------------------
       */

      let variantsWithImages:
        NonNullable<
          UpdateProductSchema["variants"]
        > = [];

      variantsWithImages =
        await Promise.all(
          (data.variants || []).map(
            async (v, index) => {
              const fieldId =
                fields[index]?.id;

              let variantImage =
                v.variantImage || "";

              const file =
                fieldId
                  ? variantFiles[
                      fieldId
                    ]
                  : null;

              if (file) {
                variantImage =
                  await uploadOne(
                    file
                  );
              }

              const price =
                Number(v.price) || 0;

              const discount =
                Number(
                  v.discountPercentage
                ) || 0;

              const final =
                calculateFinalPrice(
                  price,
                  discount
                );

              return {
                ...(v.id
                  ? {
                      id: v.id,
                    }
                  : {}),

                sku: v.sku,

                variantImage,

                price,

                discountPercentage:
                  discount,

                finalPrice: final,

                stock:
                  Number(v.stock) ||
                  0,

                isDefault:
                  Boolean(
                    v.isDefault
                  ),

                attributeValueIds:
                  v.isDefault
                    ? []
                    : v.attributeValueIds ||
                      [],
              };
            }
          )
        );

      /*
       * Must have at least one variant.
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
          "Advanced variants require at least one variant"
        );

        return;
      }

      /*
       * Exactly one default.
       */
      const defaultCount =
        variantsWithImages.filter(
          (v) => v.isDefault
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
       * Starting price = cheapest final price.
       */
      const startingPrice =
        Math.min(
          ...variantsWithImages.map(
            (v) =>
              Number(
                v.finalPrice
              ) || 0
          )
        );

      await toastResponse(
        adminUpdateProduct(
          product.id,
          {
            ...data,

            productCardImage:
              cardImage,

            productImages:
              additionalImages,

            startingPrice,

            variants:
              variantsWithImages,
          }
        ),

        "Product updated successfully"
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
   * --------------------------------
   * STYLES
   * --------------------------------
   */

  const input =
    "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-black focus:ring-2 focus:ring-black/10";

  const label =
    "text-sm font-medium text-gray-700";

  /*
   * Simple product current variant.
   */
  const simpleFormVariant =
    variants[0];

  return (
    <form
      onSubmit={handleSubmit(
        onSubmit
      )}
      className="space-y-8"
    >
      {/* -------------------------------- */}
      {/* HEADER */}
      {/* -------------------------------- */}

      <div>
        <h1 className="text-2xl font-semibold">
          Edit Product
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Update product information,
          images, pricing, stock,
          variants and attributes.
        </p>
      </div>

      {/* -------------------------------- */}
      {/* PRODUCT INFORMATION */}
      {/* -------------------------------- */}

      <section className="rounded-2xl border bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold">
          Product Information
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {/* NAME EN */}

          <div className="space-y-1">
            <label className={label}>
              Product Name (EN)
            </label>

            <input
              {...register(
                "productNameEn"
              )}
              className={input}
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

          {/* NAME AR */}

          <div className="space-y-1">
            <label className={label}>
              Product Name (AR)
            </label>

            <input
              dir="rtl"
              {...register(
                "productNameAr"
              )}
              className={input}
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

          {/* SLUG */}

          <div className="space-y-1">
            <label className={label}>
              Slug
            </label>

            <input
              {...register("slug")}
              className={input}
            />

            {errors.slug && (
              <p className="text-xs text-red-600">
                {errors.slug.message}
              </p>
            )}
          </div>

          {/* CATEGORY */}

          <div className="space-y-1">
            <label className={label}>
              Category
            </label>

            <select
              {...register(
                "categoryId"
              )}
              className={input}
            >
              <option value="">
                Select category
              </option>

              {categories.map((c) => (
                <option
                  key={c.id}
                  value={c.id}
                >
                  {c.categoryNameEn} /{" "}
                  {c.categoryNameAr}
                </option>
              ))}
            </select>

            {errors.categoryId && (
              <p className="text-xs text-red-600">
                {
                  errors.categoryId
                    .message
                }
              </p>
            )}
          </div>

          {/* DESCRIPTION EN */}

          <div className="space-y-1">
            <label className={label}>
              Description (EN)
            </label>

            <textarea
              {...register(
                "productDescriptionEn"
              )}
              rows={6}
              className={`${input} resize-none`}
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

          {/* DESCRIPTION AR */}

          <div className="space-y-1">
            <label className={label}>
              Description (AR)
            </label>

            <textarea
              dir="rtl"
              {...register(
                "productDescriptionAr"
              )}
              rows={6}
              className={`${input} resize-none`}
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

          {/* FEATURED */}

          <label className="flex items-center gap-3 md:col-span-2">
            <input
              type="checkbox"
              {...register(
                "isFeatured"
              )}
              className="h-4 w-4"
            />

            <span className="text-sm font-medium">
              Featured Product
            </span>
          </label>
        </div>
      </section>

      {/* -------------------------------- */}
      {/* PRODUCT IMAGES */}
      {/* -------------------------------- */}

      <section className="rounded-2xl border bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold">
          Product Images
        </h2>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {/* CARD IMAGE */}

          <div className="space-y-3">
            <label className={label}>
              Card Image
            </label>

            <div className="rounded-2xl border bg-gray-50 p-5">
              <ImageUploader
                initialImageUrl={
                  product.productCardImage
                }
                onFileSelect={(
                  file
                ) => {
                  setCardImageFile(
                    file
                  );

                  if (file) {
                    setValue(
                      "productCardImage",
                      "pending",
                      {
                        shouldValidate:
                          true,
                      }
                    );

                    clearErrors(
                      "productCardImage"
                    );
                  } else {
                    setValue(
                      "productCardImage",
                      product.productCardImage,
                      {
                        shouldValidate:
                          true,
                      }
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

          {/* ADDITIONAL IMAGES */}

          <div className="space-y-3">
            <label className={label}>
              Additional Images
            </label>

            <input
              type="file"
              accept="image/*"
              multiple
              className={input}
              onChange={(e) => {
                setProductImageFiles(
                  Array.from(
                    e.target.files ||
                      []
                  )
                );

                clearErrors(
                  "productImages"
                );
              }}
            />

            <div className="grid grid-cols-3 gap-3">
              {product.productImages
                .filter(
                  (x) =>
                    !removeImages.includes(
                      x
                    )
                )
                .map(
                  (url, i) => (
                    <div
                      key={`${url}-${i}`}
                      className="relative aspect-square overflow-hidden rounded-xl border"
                    >
                      <Image
                        src={url}
                        alt="Product"
                        fill
                        unoptimized
                        className="object-cover"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setRemoveImages(
                            (v) => [
                              ...v,
                              url,
                            ]
                          )
                        }
                        className="absolute right-2 top-2 rounded-full bg-black/70 p-2 text-white"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  )
                )}

              {productImageFiles.map(
                (
                  file,
                  i
                ) => (
                  <div
                    key={`${file.name}-${i}`}
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
                      onClick={() =>
                        setProductImageFiles(
                          (v) =>
                            v.filter(
                              (
                                _,
                                x
                              ) =>
                                x !==
                                i
                            )
                        )
                      }
                      className="absolute right-2 top-2 rounded-full bg-black/70 p-2 text-white"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                )
              )}
            </div>

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

      {/* -------------------------------- */}
      {/* PRODUCT VARIANTS */}
      {/* -------------------------------- */}

      <section className="rounded-2xl border bg-white p-6 shadow-sm">
        <div className="mb-6">
          <h2 className="text-lg font-semibold">
            Product Pricing & Variants
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            A simple product still has
            price, discount, stock and
            SKU. Advanced products can
            have multiple variants.
          </p>
        </div>

        {/* MODE SELECTOR */}

        <div className="mb-6 grid gap-4 md:grid-cols-2">
          <button
            type="button"
            onClick={
              disableAdvancedVariants
            }
            className={`rounded-2xl border p-5 text-left transition ${
              !advancedVariants
                ? "border-black bg-black text-white"
                : "bg-white hover:border-black"
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
              One product with one
              default variant. You can
              set price, discount,
              stock, SKU and image.
            </p>
          </button>

          <button
            type="button"
            onClick={
              enableAdvancedVariants
            }
            className={`rounded-2xl border p-5 text-left transition ${
              advancedVariants
                ? "border-black bg-black text-white"
                : "bg-white hover:border-black"
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
              Multiple variants with
              different prices, stock,
              images and attributes.
            </p>
          </button>
        </div>

        {/* -------------------------------- */}
        {/* SIMPLE PRODUCT */}
        {/* -------------------------------- */}

        {!advancedVariants &&
          simpleFormVariant && (
            <div className="rounded-2xl border bg-gray-50 p-5">
              <div className="mb-5">
                <h3 className="font-semibold">
                  Product Pricing & Stock
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  This product uses one
                  default variant internally.
                </p>
              </div>

              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                {/* SKU */}

                <div>
                  <label
                    className={label}
                  >
                    SKU
                  </label>

                  <input
                    {...register(
                      "variants.0.sku"
                    )}
                    className={input}
                    placeholder="e.g. PROD-001"
                  />

                  {errors
                    .variants?.[0]
                    ?.sku && (
                    <p className="mt-1 text-xs text-red-600">
                      {
                        errors
                          .variants?.[0]
                          ?.sku
                          ?.message
                      }
                    </p>
                  )}
                </div>

                {/* PRICE */}

                <div>
                  <label
                    className={label}
                  >
                    Price
                  </label>

                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    {...register(
                      "variants.0.price",
                      {
                        valueAsNumber:
                          true,
                      }
                    )}
                    onChange={(e) =>
                      updatePrice(
                        0,
                        e.target.value
                      )
                    }
                    className={input}
                    placeholder="0.00"
                  />

                  {errors
                    .variants?.[0]
                    ?.price && (
                    <p className="mt-1 text-xs text-red-600">
                      {
                        errors
                          .variants?.[0]
                          ?.price
                          ?.message
                      }
                    </p>
                  )}
                </div>

                {/* DISCOUNT */}

                <div>
                  <label
                    className={label}
                  >
                    Discount %
                  </label>

                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="0.01"
                    {...register(
                      "variants.0.discountPercentage",
                      {
                        valueAsNumber:
                          true,
                      }
                    )}
                    onChange={(e) =>
                      updateDiscount(
                        0,
                        e.target.value
                      )
                    }
                    className={input}
                    placeholder="0"
                  />
                </div>

                {/* FINAL PRICE */}

                <div>
                  <label
                    className={label}
                  >
                    Final Price
                  </label>

                  <input
                    type="number"
                    readOnly
                    {...register(
                      "variants.0.finalPrice",
                      {
                        valueAsNumber:
                          true,
                      }
                    )}
                    className={`${input} bg-gray-100 font-semibold`}
                  />
                </div>

                {/* STOCK */}

                <div>
                  <label
                    className={label}
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
                    className={input}
                    placeholder="0"
                  />
                </div>
              </div>

              {/* SIMPLE VARIANT IMAGE */}

              <div className="mt-6">
                <label
                  className={label}
                >
                  Product Variant Image
                </label>

                <div className="mt-2 rounded-2xl border bg-white p-4">
                  <ImageUploader
                    initialImageUrl={
                      simpleFormVariant.variantImage ||
                      undefined
                    }
                    onFileSelect={(
                      file
                    ) => {
                      const fieldId =
                        fields[0]
                          ?.id;

                      if (!fieldId) {
                        return;
                      }

                      setVariantFiles(
                        (v) => ({
                          ...v,
                          [fieldId]:
                            file,
                        })
                      );
                    }}
                  />
                </div>
              </div>

              {/* INFO */}

              <div className="mt-5 rounded-xl border border-blue-100 bg-blue-50 p-4">
                <p className="text-sm font-medium text-blue-900">
                  Simple product
                </p>

                <p className="mt-1 text-xs text-blue-700">
                  This will be saved as one
                  default variant with no
                  attributes.
                </p>
              </div>
            </div>
          )}

        {/* -------------------------------- */}
        {/* ADVANCED VARIANTS */}
        {/* -------------------------------- */}

        {advancedVariants && (
          <>
            <div className="mb-6 flex items-center justify-end">
              <button
                type="button"
                onClick={addVariant}
                className="flex items-center gap-2 rounded-xl bg-black px-4 py-3 text-sm font-medium text-white hover:bg-gray-800"
              >
                <Plus className="h-4 w-4" />
                Add Variant
              </button>
            </div>

            <div className="space-y-5">
              {fields.map(
                (
                  field,
                  index
                ) => {
                  const variant =
                    variants[
                      index
                    ];

                  return (
                    <div
                      key={
                        field.id
                      }
                      className="rounded-2xl border bg-gray-50 p-5"
                    >
                      {/* VARIANT HEADER */}

                      <div className="mb-5 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-sm text-white">
                            {index +
                              1}
                          </span>

                          <div>
                            <h3 className="font-semibold">
                              Variant{" "}
                              {index +
                                1}
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
                          className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                          Remove
                        </button>
                      </div>

                      {/* PRICE / STOCK */}

                      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-5">
                        {/* SKU */}

                        <div>
                          <label
                            className={
                              label
                            }
                          >
                            SKU
                          </label>

                          <input
                            {...register(
                              `variants.${index}.sku`
                            )}
                            className={
                              input
                            }
                          />

                          {errors
                            .variants?.[
                            index
                          ]?.sku && (
                            <p className="text-xs text-red-600">
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

                        {/* PRICE */}

                        <div>
                          <label
                            className={
                              label
                            }
                          >
                            Price
                          </label>

                          <input
                            type="number"
                            min="0"
                            step="0.01"
                            {...register(
                              `variants.${index}.price`,
                              {
                                valueAsNumber:
                                  true,
                              }
                            )}
                            onChange={(
                              e
                            ) =>
                              updatePrice(
                                index,
                                e
                                  .target
                                  .value
                              )
                            }
                            className={
                              input
                            }
                          />
                        </div>

                        {/* DISCOUNT */}

                        <div>
                          <label
                            className={
                              label
                            }
                          >
                            Discount %
                          </label>

                          <input
                            type="number"
                            min="0"
                            max="100"
                            step="0.01"
                            {...register(
                              `variants.${index}.discountPercentage`,
                              {
                                valueAsNumber:
                                  true,
                              }
                            )}
                            onChange={(
                              e
                            ) =>
                              updateDiscount(
                                index,
                                e
                                  .target
                                  .value
                              )
                            }
                            className={
                              input
                            }
                          />
                        </div>

                        {/* FINAL PRICE */}

                        <div>
                          <label
                            className={
                              label
                            }
                          >
                            Final Price
                          </label>

                          <input
                            type="number"
                            readOnly
                            {...register(
                              `variants.${index}.finalPrice`,
                              {
                                valueAsNumber:
                                  true,
                              }
                            )}
                            className={`${input} bg-gray-100`}
                          />
                        </div>

                        {/* STOCK */}

                        <div>
                          <label
                            className={
                              label
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
                              input
                            }
                          />
                        </div>
                      </div>

                      {/* DEFAULT */}

                      <div className="mt-5 flex items-center gap-3 rounded-xl border bg-white p-4">
                        <input
                          type="radio"
                          name="defaultVariant"
                          checked={Boolean(
                            variant?.isDefault
                          )}
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
                      </div>

                      {/* VARIANT IMAGE */}

                      <div className="mt-5">
                        <label
                          className={
                            label
                          }
                        >
                          Variant Image
                        </label>

                        <div className="mt-2 rounded-2xl border bg-white p-4">
                          <ImageUploader
                            initialImageUrl={
                              variant?.variantImage ||
                              undefined
                            }
                            onFileSelect={(
                              file
                            ) =>
                              setVariantFiles(
                                (v) => ({
                                  ...v,
                                  [field.id]:
                                    file,
                                })
                              )
                            }
                          />
                        </div>
                      </div>

                      {/* ATTRIBUTES */}

                      <div className="mt-6">
                        <h4 className="font-semibold">
                          Variant Attributes
                        </h4>

                        {variant?.isDefault && (
                          <p className="mt-1 text-xs text-amber-600">
                            Attributes are
                            disabled because
                            this is the default
                            variant.
                          </p>
                        )}

                        {!variant?.isDefault && (
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

                                  <div className="mt-3 flex flex-wrap gap-2">
                                    {attribute.attributeValues.map(
                                      (
                                        value
                                      ) => {
                                        const selected =
                                          variant?.attributeValueIds?.includes(
                                            value.id
                                          );

                                        return (
                                          <button
                                            type="button"
                                            key={
                                              value.id
                                            }
                                            onClick={() =>
                                              toggleAttribute(
                                                index,
                                                value.id
                                              )
                                            }
                                            className={`rounded-lg border px-3 py-2 text-sm ${
                                              selected
                                                ? "border-black bg-black text-white"
                                                : "bg-white hover:border-black"
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
                      </div>
                    </div>
                  );
                }
              )}
            </div>

            {errors.variants
              ?.message && (
              <p className="mt-4 text-sm text-red-600">
                {
                  errors
                    .variants
                    .message
                }
              </p>
            )}
          </>
        )}
      </section>

      {/* -------------------------------- */}
      {/* ACTIONS */}
      {/* -------------------------------- */}

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
          className="rounded-xl border px-6 py-3 text-sm hover:bg-gray-50 disabled:opacity-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={
            loading ||
            isUploading
          }
          className="rounded-xl bg-black px-7 py-3 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50"
        >
          {loading ||
          isUploading
            ? "Saving..."
            : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
