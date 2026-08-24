"use client";
import type { CreateAdminProduct } from "@/features/products/types";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { useUploadThing } from "@/utils/uploadthing";
import { toastResponse } from "@/lib/admintoast";
import {
  productSchema,
  type ProductSchema,
} from "@/server/products/validators";
import { adminAddProduct } from "@/features/products/api/products.client.api";

import ProductInfoSection, {
  ProductCategoryOption,
} from "./ProductInfoSection";
import ProductImagesSection from "./ProductImagesSection";
import ProductTypeSelector from "./ProductTypeSelector";
import SimpleVariantSection from "./SimpleVariantSection";
import AdvancedVariantsSection, {
  ProductAttributeOption,
} from "./AdvancedVariantsSection";

interface AddProductFormProps {
  categories: ProductCategoryOption[];
  attributes: ProductAttributeOption[];
}

const calculateFinalPrice = (price: number, discount: number) => {
  if (!Number.isFinite(price)) return 0;
  if (!Number.isFinite(discount)) discount = 0;
  return Number(Math.max(0, price - price * (discount / 100)).toFixed(2));
};

export default function AddProductForm({
  categories,
  attributes,
}: AddProductFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [advancedVariants, setAdvancedVariants] = useState(false);
  const [cardImageFile, setCardImageFile] = useState<File | null>(null);
  const [productImageFiles, setProductImageFiles] = useState<File[]>([]);
  const [variantFiles, setVariantFiles] = useState<Record<string, File | null>>(
    {},
  );

  const { startUpload } = useUploadThing("products");

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

  const uploadOne = async (file: File) => {
    const result = await startUpload([file]);
    const url = result?.[0]?.serverData?.uploadedUrl;
    if (!url) throw new Error("Image upload failed");
    return url;
  };

  const uploadMany = async (files: File[]) => {
    if (!files.length) return [];
    const result = await startUpload(files);
    const urls =
      result
        ?.map((item) => item?.serverData?.uploadedUrl)
        .filter((url): url is string => Boolean(url)) ?? [];

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
      return;
    }
    setValue("variants.0.isDefault", true, {
      shouldDirty: true,
      shouldValidate: true,
    });
    setValue("variants.0.attributeValueIds", [], {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const disableAdvancedVariants = () => {
    setAdvancedVariants(false);
    const current = variants[0];
    replace([
      {
        sku: current?.sku || "",
        variantImage: current?.variantImage || "",
        price: Number(current?.price || 0),
        discountPercentage: Number(current?.discountPercentage || 0),
        finalPrice: calculateFinalPrice(
          Number(current?.price || 0),
          Number(current?.discountPercentage || 0),
        ),
        stock: Number(current?.stock || 0),
        isDefault: true,
        attributeValueIds: [],
      },
    ]);
    setVariantFiles({});
    clearErrors("variants");
  };

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
    if (!advancedVariants) return;
    if (variantFields.length <= 1) {
      toast.error("Advanced variants require at least one variant");
      return;
    }
    const fieldId = variantFields[index]?.id;
    const wasDefault = variants[index]?.isDefault;

    remove(index);

    if (fieldId) {
      setVariantFiles((current) => {
        const next = { ...current };
        delete next[fieldId];
        return next;
      });
    }

    if (wasDefault) {
      setTimeout(() => setDefaultVariant(0), 0);
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

  const toggleAttributeValue = (index: number, valueId: string) => {
   
    const current = variants[index]?.attributeValueIds ?? [];
    const next = current.includes(valueId)
      ? current.filter((id) => id !== valueId)
      : [...current, valueId];

    setValue(`variants.${index}.attributeValueIds`, next, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const isSelected = (index: number, valueId: string) => {
    return variants[index]?.attributeValueIds?.includes(valueId) ?? false;
  };

  const updatePrice = (index: number, price: number) => {
    const safePrice = Number.isFinite(price) ? Math.max(0, price) : 0;
    const discount = Number(variants[index]?.discountPercentage ?? 0);

    setValue(`variants.${index}.price`, safePrice, {
      shouldDirty: true,
      shouldValidate: true,
    });
    setValue(
      `variants.${index}.finalPrice`,
      calculateFinalPrice(safePrice, discount),
      {
        shouldDirty: true,
        shouldValidate: true,
      },
    );
  };

  const updateDiscount = (index: number, discount: number) => {
    const safeDiscount = Number.isFinite(discount)
      ? Math.min(100, Math.max(0, discount))
      : 0;
    const price = Number(variants[index]?.price ?? 0);

    setValue(`variants.${index}.discountPercentage`, safeDiscount, {
      shouldDirty: true,
      shouldValidate: true,
    });
    setValue(
      `variants.${index}.finalPrice`,
      calculateFinalPrice(price, safeDiscount),
      {
        shouldDirty: true,
        shouldValidate: true,
      },
    );
  };

  const onSubmit = async (data: ProductSchema) => {
    try {
      setLoading(true);

      if (!cardImageFile) {
        setError("productCardImage", {
          type: "manual",
          message: "Product card image is required",
        });
        toast.error("Please upload the product card image");
        return;
      }

      if (!productImageFiles.length) {
        setError("productImages", {
          type: "manual",
          message: "At least one product image is required",
        });
        toast.error("Please upload at least one product image");
        return;
      }

      const productCardImage = await uploadOne(cardImageFile);
      const productImages = await uploadMany(productImageFiles);

      let variantsWithImages: CreateAdminProduct["variants"] = [];

      if (!advancedVariants) {
        const simpleVariant = data.variants?.[0];
        if (!simpleVariant) {
          setError("variants", {
            type: "manual",
            message: "Product pricing information is required",
          });
          toast.error("Please enter product price and stock");
          return;
        }

        const price = Number(simpleVariant.price) || 0;
        const discountPercentage =
          Number(simpleVariant.discountPercentage) || 0;

        variantsWithImages = [
          {
            ...simpleVariant,
            sku: simpleVariant.sku || `SKU-${Date.now()}`,
            variantImage: simpleVariant.variantImage || "",
            price,
            discountPercentage,
            finalPrice: calculateFinalPrice(price, discountPercentage),
            stock: Number(simpleVariant.stock) || 0,
            isDefault: true,
            attributeValueIds: [],
          },
        ];
      } else {
        variantsWithImages = await Promise.all(
          (data.variants || []).map(async (variant, index) => {
            const fieldId = variantFields[index]?.id;
            const file = fieldId ? variantFiles[fieldId] : null;
            let variantImage = variant.variantImage || "";

            if (file) variantImage = await uploadOne(file);

            const price = Number(variant.price) || 0;
            const discountPercentage = Number(variant.discountPercentage || 0);

            return {
              ...variant,
              sku: variant.sku,
              variantImage,
              price,
              discountPercentage,
              finalPrice: calculateFinalPrice(price, discountPercentage),
              stock: Number(variant.stock) || 0,
              isDefault: Boolean(variant.isDefault),
              attributeValueIds: variant.isDefault
                ? []
                : variant.attributeValueIds || [],
            };
          }),
        );

        if (!variantsWithImages.length) {
          setError("variants", {
            type: "manual",
            message: "Add at least one variant",
          });
          toast.error("Please add at least one variant");
          return;
        }

     
      }

      const startingPrice = variantsWithImages.length
        ? Math.min(...variantsWithImages.map((v) => Number(v.finalPrice)))
        : 0;

      await toastResponse(
        adminAddProduct({
          ...data,
          productCardImage,
          productImages,
          startingPrice,
          variants: variantsWithImages,
        }),
        "Product created successfully",
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

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto max-w-7xl space-y-6 pb-10"
    >
      <div className="rounded-2xl border bg-white p-6">
        <h1 className="text-2xl font-semibold">Add Product</h1>
        <p className="mt-1 text-sm text-gray-500">
          Create a product with pricing, stock, images and optional variants.
        </p>
      </div>

      <ProductInfoSection
        register={register}
        errors={errors}
        categories={categories}
      />

      <ProductImagesSection
        errors={errors}
        productImageFiles={productImageFiles}
        setCardImageFile={setCardImageFile}
        setProductImageFiles={setProductImageFiles}
        setValue={setValue}
        clearErrors={clearErrors}
      />

      <ProductTypeSelector
        advancedVariants={advancedVariants}
        enableAdvancedVariants={enableAdvancedVariants}
        disableAdvancedVariants={disableAdvancedVariants}
      />

      {!advancedVariants ? (
        <SimpleVariantSection
          register={register}
          errors={errors}
          variants={variants}
          variantFieldId={variantFields[0]?.id}
          updatePrice={updatePrice}
          updateDiscount={updateDiscount}
          setVariantFiles={setVariantFiles}
        />
      ) : (
        <AdvancedVariantsSection
          register={register}
          errors={errors}
          variantFields={variantFields}
          variants={variants}
          attributes={attributes}
          addVariant={addVariant}
          removeVariant={removeVariant}
          setDefaultVariant={setDefaultVariant}
          toggleAttributeValue={toggleAttributeValue}
          isSelected={isSelected}
          updatePrice={updatePrice}
          updateDiscount={updateDiscount}
          setVariantFiles={setVariantFiles}
        />
      )}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-800 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Product"}
        </button>
      </div>
    </form>
  );
}
