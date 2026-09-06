import { prisma } from "@/lib/prisma";
import { RESPONSE_CODES } from "@/lib/constants/response";
import { bannerSchema, updateBannerSchema } from "./validators";
import { revalidateTag, unstable_cache } from "next/cache";
import { NewBanner, UpdateBanner } from "./types";
import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

function getFileKey(url: string) {
  try {
    return new URL(url).pathname.split("/f/")[1] || null;
  } catch {
    return null;
  }
}

export const createBanner = async (newBanner: NewBanner) => {
  const validation = bannerSchema.safeParse(newBanner);

  if (validation.success) {
    await prisma.banners.create({
      data: validation.data,
    });

    revalidateTag("banners", "max");
    return {
      success: true,
      message: "BANNER_CREATED_SUCCESSFULLY",
      code: RESPONSE_CODES.CREATED,
    };
  }

  return {
    success: false,
    message: "VALIDATION_ERROR",
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
      message: "BANNER_ID_REQUIRED",
      code: RESPONSE_CODES.BAD_REQUEST,
    };

  const validation = updateBannerSchema.safeParse(updatedBannerData);

  if (!validation.success) {
    return {
      success: false,
      message: "VALIDATION_ERROR",
      code: RESPONSE_CODES.BAD_REQUEST,
    };
  }

  const existingBanner = await prisma.banners.findUnique({
    where: { id },
  });

  if (!existingBanner) {
    return {
      success: false,
      message: "BANNER_NOT_FOUND",
      code: RESPONSE_CODES.NOT_FOUND,
    };
  }

  await prisma.banners.update({
    where: { id },
    data: validation.data,
  });

  if (existingBanner.image !== validation.data.image) {
    const key = getFileKey(existingBanner.image);

    if (key) {
      try {
        await utapi.deleteFiles(key);
      } catch (err) {
        console.error("UploadThing delete error:", err);
      }
    }
  }

  revalidateTag("banners", { expire: 0 });

  return {
    success: true,
    message: "BANNER_UPDATED_SUCCESSFULLY",
    code: RESPONSE_CODES.OK,
  };
};
export const deleteBanner = async (id: string) => {
  if (!id)
    return {
      success: false,
      message: "BANNER_ID_REQUIRED",
      code: RESPONSE_CODES.BAD_REQUEST,
    };

  const existingBanner = await prisma.banners.findUnique({
    where: { id },
  });

  if (!existingBanner)
    return {
      success: false,
      message: "BANNER_NOT_FOUND",
      code: RESPONSE_CODES.NOT_FOUND,
    };

  await prisma.banners.delete({
    where: { id },
  });

  const fileKey = getFileKey(existingBanner.image);

  if (fileKey) {
    await utapi.deleteFiles(fileKey);
  }
  revalidateTag("banners", { expire: 0 });
  return {
    success: true,
    message: "BANNER_DELETED_SUCCESSFULLY",
    code: RESPONSE_CODES.OK,
  };
};
///////////////////////////////////////////////////////////////////////////////////////

export const deleteManyBanner = async (ids: string[]) => {
  if (!ids.length) {
    return {
      success: false,
      message: "BANNER_IDS_REQUIRED",
      code: RESPONSE_CODES.BAD_REQUEST,
    };
  }

  const existingBanners = await prisma.banners.findMany({
    where: {
      id: {
        in: ids,
      },
    },
  });

  if (existingBanners.length === 0) {
    return {
      success: false,
      message: "BANNERS_NOT_FOUND",
      code: RESPONSE_CODES.NOT_FOUND,
    };
  }

  const result = await prisma.banners.deleteMany({
    where: {
      id: {
        in: ids,
      },
    },
  });

  if (result.count === 0) {
    return {
      success: false,
      message: "BANNERS_DELETE_FAILED",
      code: RESPONSE_CODES.BAD_REQUEST,
    };
  }

  const fileKeys = existingBanners
    .map((banner) => banner.image.split("/f/")[1])
    .filter(Boolean);

  if (fileKeys.length) {
    await utapi.deleteFiles(fileKeys);
  }

  revalidateTag("banners", { expire: 0 });

  return {
    success: true,
    message: "BANNERS_DELETED_SUCCESSFULLY",
    code: RESPONSE_CODES.OK,
  };
};

////////////////////////////////////////////////////////////////////////////////////////////
/* -------------------- Caching Helps --------------------  */

// cached banners used with getAllBanners and getAllBannersByLocale
const getCachedBanners = () =>
  unstable_cache(
    async () => {
      return prisma.banners.findMany({});
    },
    ["all-banners"],
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
    message: "BANNERS_RETRIEVED_SUCCESSFULLY",
    code: RESPONSE_CODES.OK,
    banners,
  };
};

export const getBannerById = async (id: string) => {
  if (!id)
    return {
      success: false,
      message: "BANNER_ID_REQUIRED",
      code: RESPONSE_CODES.BAD_REQUEST,
    };

  const banner = await getCachedBannerById(id);

  if (!banner)
    return {
      success: false,
      message: "BANNER_NOT_FOUND",
      code: RESPONSE_CODES.NOT_FOUND,
    };

  return {
    success: true,
    message: "BANNER_RETRIEVED_SUCCESSFULLY",
    code: RESPONSE_CODES.OK,
    banner,
  };
};

export const getAllBannersByLocale = async (locale: "ar" | "en") => {
  const banners = await getCachedBannersByLocale(locale);

  return {
    success: true,
    message: "BANNERS_RETRIEVED_SUCCESSFULLY",
    code: RESPONSE_CODES.OK,
    banners,
  };
};
