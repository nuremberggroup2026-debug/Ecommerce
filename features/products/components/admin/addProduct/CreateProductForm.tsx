"use client";
import React, { useState } from "react";
import ProductInformationSection from "./ProductInformationSection";
import VariantInformationSection from "./VariantInformationSection";
import {
  CategoiresNameAndIDs,
  AttributesWithValues,
} from "@/features/products/types/index";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createProductWithVariantsSchema,
  CreateProductFormType,
} from "@/server/products/validators";
import SubmitButtons from "./SubmitButtons";
import { toast } from "sonner";
import { adminAddProduct } from "@/features/products/api/products.client.api";
import { useUploadThing } from "@/utils/uploadthing";
import { toastResponse } from "@/lib/admintoast";
import { useRouter } from "next/navigation";

interface Props {
  categoriesNamesAndIDs: CategoiresNameAndIDs[];
  attributeswithValues: AttributesWithValues[];
}

export default function CreateProductForm({
  categoriesNamesAndIDs,
  attributeswithValues,
}: Props) {
  const router = useRouter();
  const methods = useForm<CreateProductFormType>({
    resolver: zodResolver(createProductWithVariantsSchema),
  });
  const {
    formState: { errors },
    getValues,
  } = methods;

  console.log("error3232: ", errors);
  console.log(" getValues(): ", getValues());

  const [loading, setLoading] = useState<boolean>(false);
  const { startUpload, isUploading } = useUploadThing("products");
  const [variantImages, setVariantImages] = useState<
    Record<number, File | null>
  >({});
  const [cardImageFile, setCardImageFile] = useState<File | null>(null);

  const [productImageFiles, setProductImageFiles] = useState<File[]>([]);
  const onSubmit = async (data: CreateProductFormType) => {
    if (!cardImageFile) {
      toast.error("Product card image is required");
      return;
    }

    try {
      setLoading(true);

      const cardUpload = await startUpload([cardImageFile]);
      const cardImageUrl = cardUpload?.[0]?.url;

      if (!cardImageUrl) {
        throw new Error("CARD_IMAGE_UPLOAD_FAILED");
      }

      let productImageUrls: string[] = [];

      if (productImageFiles.length > 0) {
        const productImagesUpload = await startUpload(productImageFiles);
        productImageUrls = productImagesUpload?.map((file) => file.url) ?? [];

        if (productImageUrls.length !== productImageFiles.length) {
          throw new Error("PRODUCT_IMAGES_UPLOAD_FAILED");
        }
      }

      const variants = await Promise.all(
        data.variants.map(async (variant, index) => {
          const file = variantImages[index];
          let variantImage = "";

          if (file) {
            const uploaded = await startUpload([file]);
            const url = uploaded?.[0]?.url;

            if (!url) {
              throw new Error(`Variant ${index + 1} image upload failed`);
            }

            variantImage = url;
          }

          return {
            ...variant,
            variantImage,
          };
        }),
      );

      const payload = {
        ...data,
        variants,
        productCardImage: cardImageUrl,
        productImages: productImageUrls,
      };

      await toastResponse(adminAddProduct(payload), "Adding Product");
      router.replace("/dashboard/products");
    } catch (error) {
      console.error(error);
      toast.error(
        error instanceof Error ? error.message : "Failed to create product",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <FormProvider {...methods}>
        <div className="rounded-2xl border my-3  bg-white p-6">
          <h1 className="text-2xl font-semibold">Add Product</h1>
          <p className="mt-1 text-sm text-gray-500">
            Create a product with pricing, stock, images and optional variants.
          </p>
        </div>

        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <ProductInformationSection
            categoriesNamesAndIDs={categoriesNamesAndIDs}
            onProductCardImageSelect={setCardImageFile}
            onProductImagesSelect={setProductImageFiles}
          />

          <VariantInformationSection
            attributesWithValues={attributeswithValues}
            onVariantImageSelect={(index, file) => {
              setVariantImages((prev) => ({
                ...prev,
                [index]: file,
              }));
            }}
          />

          <SubmitButtons />
        </form>
      </FormProvider>
    </div>
  );
}
