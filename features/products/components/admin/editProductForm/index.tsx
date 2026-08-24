"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, useFieldArray, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { useUploadThing } from "@/utils/uploadthing";
import { toastResponse } from "@/lib/admintoast";

import {
  updateProductSchema,
  type UpdateProductSchema,
} from "@/server/products/validators";

import { adminUpdateProduct } from "@/features/products/api/products.client.api";

import type { Props, VariantFilesMap } from "./types";
import { calculateFinalPrice } from "./utils";

import ProductInfoSection from "./ProductInfoSection";
import ProductImagesSection from "./ProductImagesSection";
import VariantModeSelector from "./VariantModeSelector";
import SimpleVariantSection from "./SimpleVariantSection";
import AdvancedVariantsSection from "./AdvancedVariantsSection";
import FormActions from "./FormActions";

export type {
  ProductCategoryOption,
  ProductAttributeValueOption,
  ProductAttributeOption,
  EditProduct,
} from "./types";

export default function EditProductForm({
  product,
  categories,
  attributes,
}: Props) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [advancedVariants, setAdvancedVariants] = useState(
    product.variants.length > 1,
  );

  const [cardImageFile, setCardImageFile] = useState<File | null>(null);
  const [productImageFiles, setProductImageFiles] = useState<File[]>([]);
  const [removeImages, setRemoveImages] = useState<string[]>([]);
  const [variantFiles, setVariantFiles] = useState<VariantFilesMap>({});

  const { startUpload, isUploading } = useUploadThing("products");

  const existingDefaultVariant =
    product.variants.find((v) => v.isDefault) ?? product.variants[0];

  const simpleVariantSeed = existingDefaultVariant ?? {
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

  const form = useForm<UpdateProductSchema>({
    resolver: zodResolver(updateProductSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",

    defaultValues: {
      slug: product.slug,
      productNameEn: product.productNameEn,
      productNameAr: product.productNameAr,
      productDescriptionEn: product.productDescriptionEn,
      productDescriptionAr: product.productDescriptionAr,
      productCardImage: product.productCardImage,
      productImages: product.productImages,
      categoryId: product.categoryId,
      isFeatured: product.isFeatured,

      variants: advancedVariants
        ? product.variants.map((v) => ({
            id: v.id,
            sku: v.sku,
            variantImage: v.variantImage || "",
            price: Number(v.price) || 0,
            discountPercentage: Number(v.discountPercentage || 0),
            finalPrice: Number(
              v.finalPrice ??
                calculateFinalPrice(
                  Number(v.price) || 0,
                  Number(v.discountPercentage || 0),
                ),
            ),
            stock: Number(v.stock) || 0,
            isDefault: Boolean(v.isDefault),
            attributeValueIds: v.attributeValueIds || [],
          }))
        : [
            {
              id: simpleVariantSeed.id,
              sku: simpleVariantSeed.sku || "",
              variantImage: simpleVariantSeed.variantImage || "",
              price: Number(simpleVariantSeed.price) || 0,
              discountPercentage: Number(
                simpleVariantSeed.discountPercentage || 0,
              ),
              finalPrice: Number(
                simpleVariantSeed.finalPrice ??
                  calculateFinalPrice(
                    Number(simpleVariantSeed.price) || 0,
                    Number(simpleVariantSeed.discountPercentage || 0),
                  ),
              ),
              stock: Number(simpleVariantSeed.stock) || 0,
              isDefault: true,
              attributeValueIds: [],
            },
          ],
    },
  });

  const { control, handleSubmit, watch, setValue, setError, clearErrors } =
    form;

  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: "variants",
  });

  const variants = watch("variants") || [];

  /*
   * Upload one image.
   */
  const uploadOne = async (file: File) => {
    const result = await startUpload([file]);
    const url = result?.[0]?.serverData?.uploadedUrl;

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
        ?.map((x) => x?.serverData?.uploadedUrl)
        .filter((x): x is string => Boolean(x)) ?? [];

    if (urls.length !== files.length) {
      throw new Error("One or more images failed to upload");
    }

    return urls;
  };

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
    }
  };

  const disableAdvancedVariants = () => {
    setAdvancedVariants(false);

    const currentVariants = variants;

    const defaultVariant =
      currentVariants.find((v) => v.isDefault) ??
      currentVariants[0] ??
      simpleVariantSeed;

    replace([
      {
        id: defaultVariant.id,
        sku: defaultVariant.sku || "",
        variantImage: defaultVariant.variantImage || "",
        price: Number(defaultVariant.price) || 0,
        discountPercentage: Number(defaultVariant.discountPercentage || 0),
        finalPrice: calculateFinalPrice(
          Number(defaultVariant.price) || 0,
          Number(defaultVariant.discountPercentage || 0),
        ),
        stock: Number(defaultVariant.stock) || 0,
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

  const removeVariant = (index: number) => {
    if (!advancedVariants) {
      return;
    }

    if (fields.length <= 1) {
      toast.error("Advanced variants require at least one variant");
      return;
    }

    const fieldId = fields[index]?.id;
    const wasDefault = variants[index]?.isDefault;

    remove(index);

    if (fieldId) {
      setVariantFiles((prev) => {
        const next = { ...prev };
        delete next[fieldId];
        return next;
      });
    }

    /*
     * If we removed the default variant,
     * make the first remaining variant default.
     */
    if (wasDefault && fields.length > 1) {
      setTimeout(() => {
        setDefaultVariant(0);
      }, 0);
    }
  };

  const setDefaultVariant = (index: number) => {
    variants.forEach((_, i) => {
      setValue(`variants.${i}.isDefault`, i === index, {
        shouldDirty: true,
        shouldValidate: true,
      });

      if (i === index) {
        setValue(`variants.${i}.attributeValueIds`, [], {
          shouldDirty: true,
          shouldValidate: true,
        });
      }
    });
  };

  const toggleAttribute = (index: number, valueId: string) => {
    if (variants[index]?.isDefault) {
      toast.error("Default variant cannot have attributes");
      return;
    }

    const current = variants[index]?.attributeValueIds || [];

    setValue(
      `variants.${index}.attributeValueIds`,
      current.includes(valueId)
        ? current.filter((x) => x !== valueId)
        : [...current, valueId],
      { shouldDirty: true, shouldValidate: true },
    );
  };

  const updatePrice = (index: number, value: string) => {
    const price = Number(value) || 0;
    const discount = Number(variants[index]?.discountPercentage) || 0;

    setValue(`variants.${index}.price`, price, {
      shouldDirty: true,
      shouldValidate: true,
    });

    setValue(
      `variants.${index}.finalPrice`,
      calculateFinalPrice(price, discount),
      {
        shouldDirty: true,
        shouldValidate: true,
      },
    );
  };

  const updateDiscount = (index: number, value: string) => {
    const discount = Number(value) || 0;
    const price = Number(variants[index]?.price) || 0;

    setValue(`variants.${index}.discountPercentage`, discount, {
      shouldDirty: true,
      shouldValidate: true,
    });

    setValue(
      `variants.${index}.finalPrice`,
      calculateFinalPrice(price, discount),
      {
        shouldDirty: true,
        shouldValidate: true,
      },
    );
  };

  /*
   * Submit.
   */
  const onSubmit = async (data: UpdateProductSchema) => {
    try {
      setLoading(true);

      let cardImage = data.productCardImage;

      if (cardImageFile) {
        cardImage = await uploadOne(cardImageFile);
      }

      if (!cardImage) {
        setError("productCardImage", {
          type: "manual",
          message: "Product card image is required",
        });

        toast.error("Please upload the product card image");
        return;
      }

      let additionalImages = data.productImages || [];

      if (productImageFiles.length) {
        const uploaded = await uploadMany(productImageFiles);
        additionalImages = [...additionalImages, ...uploaded];
      }

      additionalImages = additionalImages.filter(
        (x) => !removeImages.includes(x),
      );

      if (!advancedVariants) {
        const source = data.variants?.[0];

        if (!source) {
          setError("variants", {
            type: "manual",
            message: "Simple product information is required",
          });

          toast.error("Please enter price and stock");
          return;
        }

        let variantImage = source.variantImage || "";

        const simpleFieldId = fields[0]?.id;
        const simpleFile = simpleFieldId ? variantFiles[simpleFieldId] : null;

        if (simpleFile) {
          variantImage = await uploadOne(simpleFile);
        }

        const price = Number(source.price) || 0;
        const discount = Number(source.discountPercentage) || 0;
        const final = calculateFinalPrice(price, discount);

        const simpleVariantPayload = {
          ...(source.id ? { id: source.id } : {}),
          sku: source.sku || "",
          variantImage,
          price,
          discountPercentage: discount,
          finalPrice: final,
          stock: Number(source.stock) || 0,

          isDefault: true,

          attributeValueIds: [],
        };

        const startingPrice = final;

        console.log("form dataddd: ", {
          ...data,
          productCardImage: cardImage,
          productImages: additionalImages,
          startingPrice,
          variants: [simpleVariantPayload],
        });

        await toastResponse(
          adminUpdateProduct(product.id, {
            ...data,
            productCardImage: cardImage,
            productImages: additionalImages,
            startingPrice,
            variants: [simpleVariantPayload],
          }),
          "Product updated successfully",
        );

        router.push("/dashboard/products");
        router.refresh();

        return;
      }

      let variantsWithImages: NonNullable<UpdateProductSchema["variants"]> = [];

      variantsWithImages = await Promise.all(
        (data.variants || []).map(async (v, index) => {
          const fieldId = fields[index]?.id;
          let variantImage = v.variantImage || "";

          const file = fieldId ? variantFiles[fieldId] : null;

          if (file) {
            variantImage = await uploadOne(file);
          }

          const price = Number(v.price) || 0;
          const discount = Number(v.discountPercentage) || 0;
          const final = calculateFinalPrice(price, discount);

          return {
            ...(v.id ? { id: v.id } : {}),
            sku: v.sku,
            variantImage,
            price,
            discountPercentage: discount,
            finalPrice: final,
            stock: Number(v.stock) || 0,
            isDefault: Boolean(v.isDefault),
            attributeValueIds: v.isDefault ? [] : v.attributeValueIds || [],
          };
        }),
      );

      if (!variantsWithImages.length) {
        setError("variants", {
          type: "manual",
          message: "Add at least one variant",
        });

        toast.error("Advanced variants require at least one variant");
        return;
      }

      const defaultCount = variantsWithImages.filter((v) => v.isDefault).length;

      /* if (defaultCount !== 1) {
        setError("variants", {
          type: "manual",
          message: "Please select exactly one default variant",
        });

        toast.error("Please select exactly one default variant");
        return;
      }*/

      const startingPrice = Math.min(
        ...variantsWithImages.map((v) => Number(v.finalPrice) || 0),
      );

      console.log("form dataddd: ", {
        ...data,
        productCardImage: cardImage,
        productImages: additionalImages,
        startingPrice,
        variants: variantsWithImages,
      });

      await toastResponse(
        adminUpdateProduct(product.id, {
          ...data,
          productCardImage: cardImage,
          productImages: additionalImages,
          startingPrice,
          variants: variantsWithImages,
        }),
        "Product updated successfully",
      );

      router.push("/dashboard/products");
      router.refresh();
    } catch (error) {
      console.error(error);

      toast.error(
        error instanceof Error ? error.message : "Something went wrong",
      );
    } finally {
      setLoading(false);
    }
  };

  const simpleFormVariant = variants[0];

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div>
          <h1 className="text-2xl font-semibold">Edit Product</h1>

          <p className="mt-1 text-sm text-gray-500">
            Update product information, images, pricing, stock, variants and
            attributes.
          </p>
        </div>

        <ProductInfoSection categories={categories} />

        <ProductImagesSection
          cardImage={product.productCardImage}
          existingImages={product.productImages}
          cardImageFile={cardImageFile}
          setCardImageFile={setCardImageFile}
          productImageFiles={productImageFiles}
          setProductImageFiles={setProductImageFiles}
          removeImages={removeImages}
          setRemoveImages={setRemoveImages}
        />
        <section className="rounded-2xl border bg-white p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-lg font-semibold">
              Product Pricing & Variants
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              A simple product still has price, discount, stock and SKU.
              Advanced products can have multiple variants.
            </p>
          </div>

          <VariantModeSelector
            advancedVariants={advancedVariants}
            onSelectSimple={disableAdvancedVariants}
            onSelectAdvanced={enableAdvancedVariants}
          />

          {!advancedVariants && simpleFormVariant && (
            <SimpleVariantSection
              fieldId={fields[0]?.id}
              variantImage={simpleFormVariant.variantImage || ""}
              onUpdatePrice={(value) => updatePrice(0, value)}
              onUpdateDiscount={(value) => updateDiscount(0, value)}
              onImageSelect={(file) => {
                const fieldId = fields[0]?.id;
                if (!fieldId) return;
                setVariantFiles((v) => ({ ...v, [fieldId]: file }));
              }}
            />
          )}

          {advancedVariants && (
            <AdvancedVariantsSection
              fields={fields}
              variants={variants}
              attributes={attributes}
              onAddVariant={addVariant}
              onRemoveVariant={removeVariant}
              onSetDefaultVariant={setDefaultVariant}
              onToggleAttribute={toggleAttribute}
              onUpdatePrice={updatePrice}
              onUpdateDiscount={updateDiscount}
              onVariantImageSelect={(fieldId, file) =>
                setVariantFiles((v) => ({ ...v, [fieldId]: file }))
              }
            />
          )}
        </section>

        <FormActions
          loading={loading || isUploading}
          onCancel={() => router.back()}
        />
      </form>
    </FormProvider>
  );
}
