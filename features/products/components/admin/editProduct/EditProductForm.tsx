"use client";
import React, { useState } from "react";
import ProductInformationSection from "./ProductInformationSection";
import VariantInformationSection from "./VariantInformationSection";
import {
  CategoiresNameAndIDs,
  AttributesWithValues,
  ProductById,
} from "@/features/products/types/index";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  updateProductSchema,
  UpdateProductFormType,
} from "@/server/products/validators";
import SubmitButtons from "./SubmitButtons";
import { toast } from "sonner";
import { adminUpdateProduct } from "@/features/products/api/products.client.api";
import { useUploadThing } from "@/utils/uploadthing";
import { useRouter } from "next/navigation";
import { toastResponse } from "@/lib/admintoast";

interface Props {
  productId: string;
  product: ProductById;
  categoriesNamesAndIDs: CategoiresNameAndIDs[];
  attributeswithValues: AttributesWithValues[];
}

export default function EditProductForm({
  productId,
  product,
  categoriesNamesAndIDs,
  attributeswithValues,
}: Props) {
  const router = useRouter();
  const { productVariants } = product;
  const methods = useForm<UpdateProductFormType>({
    resolver: zodResolver(updateProductSchema),
    defaultValues: {
      productNameEn: product.productNameEn,
      productNameAr: product.productNameAr,
      productDescriptionEn: product.productDescriptionEn,
      productDescriptionAr: product.productDescriptionAr,
      productCardImage: product.productCardImage,
      productImages: product.productImages,
      categoryId: product.categoryId,
      isFeatured: product.isFeatured,
      variants: product.productVariants.map((variant) => ({
        id: variant.id,
        sku: variant.sku,
        variantImage: variant.variantImage,
        price: Number(variant.price),
        discountPercentage:
          variant.discountPercentage !== null
            ? Number(variant.discountPercentage)
            : undefined,
        stock: variant.stock,
        isDefault: variant.isDefault,

        attributeValueIds: variant.variantAttributeValues.map(
          (item) => item.attributeValueId,
        ),
      })),
    },
  });

  const [loading, setLoading] = useState(false);
  const { startUpload } = useUploadThing("products");

  const [variantImages, setVariantImages] = useState<
    Record<number, File | null>
  >({});
  const [cardImageFile, setCardImageFile] = useState<File | null>(null);
  const [productImageFiles, setProductImageFiles] = useState<File[]>([]);

  const onSubmit = async (data: UpdateProductFormType) => {
    try {
      setLoading(true);

      let cardImageUrl = product.productCardImage;
      if (cardImageFile) {
        const cardUpload = await startUpload([cardImageFile]);
        const url = cardUpload?.[0]?.url;
        if (!url) throw new Error("CARD_IMAGE_UPLOAD_FAILED");
        cardImageUrl = url;
      }

      let newProductImageUrls: string[] = [];
      if (productImageFiles.length > 0) {
        const uploaded = await startUpload(productImageFiles);
        newProductImageUrls = uploaded?.map((f) => f.url) ?? [];
        if (newProductImageUrls.length !== productImageFiles.length) {
          throw new Error("PRODUCT_IMAGES_UPLOAD_FAILED");
        }
      }

      let cursor = 0;
      const productImages =
        data.productImages ??
        [].map((entry: string) =>
          entry === "pending-image" ? newProductImageUrls[cursor++] : entry,
        );

      const variants = await Promise.all(
        data.variants.map(async (variant, index) => {
          const file = variantImages[index];
          let variantImage = variant.variantImage;

          if (file) {
            const uploaded = await startUpload([file]);
            const url = uploaded?.[0]?.url;
            if (!url) {
              throw new Error(`Variant ${index + 1} image upload failed`);
            }
            variantImage = url;
          }

          return { ...variant, variantImage };
        }),
      );

      const payload = {
        ...data,
        variants,
        productCardImage: cardImageUrl,
        productImages,
      };

      console.log("payload: ", payload);

      await toastResponse(
        adminUpdateProduct(productId, payload),
        "Updating Product",
      );
      router.replace("/dashboard/products");
      toast.success("Product updated successfully");
    } catch (error) {
      console.error(error);
      toast.error(
        error instanceof Error ? error.message : "Failed to update product",
      );
    } finally {
      setLoading(false);
    }
  };

  const initialIsDefault =
    product.productVariants.length === 1 &&
    product.productVariants[0].isDefault;

  return (
    <div>
      <FormProvider {...methods}>
        <div className="rounded-2xl border my-3 bg-white p-6">
          <h1 className="text-2xl font-semibold">Edit Product</h1>
          <p className="mt-1 text-sm text-gray-500">
            Update pricing, stock, images and variants for this product.
          </p>
        </div>

        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <ProductInformationSection
            categoriesNamesAndIDs={categoriesNamesAndIDs}
            onProductCardImageSelect={setCardImageFile}
            onProductImagesSelect={setProductImageFiles}
            initialCardImageUrl={product.productCardImage}
            initialProductImages={product.productImages}
          />

          <VariantInformationSection
            variants={productVariants}
            attributesWithValues={attributeswithValues}
            onVariantImageSelect={(index, file) => {
              setVariantImages((prev) => ({ ...prev, [index]: file }));
            }}
            initialIsDefault={initialIsDefault}
            skipInitialReset
          />

          <SubmitButtons />
        </form>
      </FormProvider>
    </div>
  );
}
