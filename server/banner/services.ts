import { prisma } from "@/lib/prisma";
import { RESPONSE_CODES } from "@/lib/constants/response";
import { bannerSchema, updateBannerSchema } from "./validators";
import { revalidateTag, unstable_cache } from "next/cache";
import { NewBanner, UpdateBanner } from "@/types";
import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

export const createBanner = async (newBanner: NewBanner) => {
  const validation = bannerSchema.safeParse(newBanner);

  if (validation.success) {
    await prisma.banners.create({
      data: validation.data,
    });

    revalidateTag("banners", "max");
    return {
      success: true,
      message: "Banner created successfully",
      code: RESPONSE_CODES.CREATED,
    };
  }

  return {
    success: false,
    message: "Validation error",
    code: RESPONSE_CODES.BAD_REQUEST,
  };
};

export const updateBanner = async (
  id: string,
  updatedBannerData: UpdateBanner,
) => {
  if (!id)
    return {
      success: false,
      message: "Banner id is required",
      code: RESPONSE_CODES.BAD_REQUEST,
    };

  const validation = updateBannerSchema.safeParse(updatedBannerData);

  if (validation.success) {
    const existingBanner = await prisma.banners.findUnique({
      where: { id },
    });

    if (!existingBanner)
      return {
        success: false,
        message: "Banner not found",
        code: RESPONSE_CODES.NOT_FOUND,
      };

    await prisma.banners.update({
      where: { id },
      data: validation.data,
    });

    revalidateTag("banners", "max");
    return {
      success: true,
      message: "Banner updated successfully",
      code: RESPONSE_CODES.OK,
    };
  }

  return {
    success: false,
    message: "Validation error",
    code: RESPONSE_CODES.BAD_REQUEST,
  };
};

export const deleteBanner = async (id: string) => {
  if (!id)
    return {
      success: false,
      message: "Banner id is required",
      code: RESPONSE_CODES.BAD_REQUEST,
    };

  const existingBanner = await prisma.banners.findUnique({
    where: { id },
  });

  if (!existingBanner)
    return {
      success: false,
      message: "Banner not found",
      code: RESPONSE_CODES.NOT_FOUND,
    };

  await prisma.banners.delete({
    where: { id },
  });

  const fileKey = existingBanner.image.split("/f/")[1];

  if (fileKey) {
    await utapi.deleteFiles(fileKey);
  }
  revalidateTag("banners", "max");
  return {
    success: true,
    message: "Banner deleted successfully",
    code: RESPONSE_CODES.OK,
  };
};

/* -------------------- Caching Helps --------------------  */

// cached banners used with getAllBanners and getAllBannersByLocale
const getCachedBanners = () =>
  unstable_cache(
    async () => {
      return prisma.banners.findMany({});
    },
    ["banners"],
    { tags: ["banners"], revalidate: 3600 },
  )();

// cached banner by id used with getBannerById
const getCachedBannerById = (id: string) =>
  unstable_cache(
    async () => {
      return prisma.banners.findUnique({
        where: { id },
      });
    },
    [`banner-${id}`],
    {
      tags: [`banners`],
      revalidate: 3600,
    },
  )();

// cached banners by locale used with getAllBannersByLocale
const getCachedBannersByLocale = (locale: "ar" | "en") =>
  unstable_cache(
    async () => {
      const banners = await prisma.banners.findMany({});

      return banners.map((banner) => ({
        id: banner.id,
        name: locale === "ar" ? banner.nameAr : banner.nameEn,
        image: banner.image,
        createdAt: banner.createdAt,
      }));
    },
    [`banners-locale-${locale}`],
    {
      tags: ["banners"],
      revalidate: 3600,
    },
  )();

/* -------------------- Caching Helps --------------------  */

export const getAllBanners = async () => {
  const banners = await getCachedBanners();

  return {
    success: true,
    message: "Banners retrieved successfully",
    code: RESPONSE_CODES.OK,
    banners,
  };
};

export const getBannerById = async (id: string) => {
  if (!id)
    return {
      success: false,
      message: "Banner id is required",
      code: RESPONSE_CODES.BAD_REQUEST,
    };

  const banner = await getCachedBannerById(id);

  if (!banner)
    return {
      success: false,
      message: "Banner not found",
      code: RESPONSE_CODES.NOT_FOUND,
    };

  return {
    success: true,
    message: "Banner retrieved successfully",
    code: RESPONSE_CODES.OK,
    banner,
  };
};

export const getAllBannersByLocale = async (locale: "ar" | "en") => {
  const banners = await getCachedBannersByLocale(locale);

  return {
    success: true,
    message: "Banners retrieved successfully",
    code: RESPONSE_CODES.OK,
    banners,
  };
};
