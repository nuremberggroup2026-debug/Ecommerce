import { prisma } from "@/lib/prisma";
import {
  Locale,
  CareersCreateInput,
  CareersUpdateInput,
  CareersGetPayload,
} from "@/types";
import { revalidateTag, unstable_cache } from "next/cache";
import { UTApi } from "uploadthing/server";
import { RESPONSE_CODES } from "@/lib/constants/response";
import { careersSchema, updateCareersSchema } from "./validators";
import { generateSlug } from "@/lib/helpers";

const utapi = new UTApi();

export const addNewCareer = async (newCareer: CareersCreateInput) => {
  const validation = careersSchema.safeParse(newCareer);

  if (validation.success) {
    const existingCareer = await prisma.careers.findFirst({
      where: {
        positionEn: validation.data.positionEn,
      },
    });

    if (existingCareer)
      return {
        success: false,
        message: "Position already exists",
        code: RESPONSE_CODES.CONFLICT,
      };

    const slug = generateSlug(validation.data.positionEn);

    await prisma.careers.create({
      data: { ...validation.data, slug },
    });

    revalidateTag("careers", "max");

    return {
      success: true,
      message: "Career added successfully",
      code: RESPONSE_CODES.CREATED,
    };
  }

  return {
    success: false,
    message: "Validation error",
    code: RESPONSE_CODES.BAD_REQUEST,
  };
};

export const updateCareer = async (
  id: string,
  updatedCareerData: CareersUpdateInput,
) => {
  if (!id)
    return {
      success: false,
      message: "Career id is required",
      code: RESPONSE_CODES.BAD_REQUEST,
    };

  const validation = updateCareersSchema.safeParse(updatedCareerData);

  if (validation.success) {
    const existingCareer = await prisma.careers.findUnique({
      where: { id },
    });

    if (!existingCareer)
      return {
        success: false,
        message: "Career not found",
        code: RESPONSE_CODES.NOT_FOUND,
      };

    let slug = existingCareer.slug;

    if (validation.data.positionEn) {
      const careerWithSameName = await prisma.careers.findFirst({
        where: {
          positionEn: validation.data.positionEn,
          NOT: {
            id,
          },
        },
      });

      if (careerWithSameName)
        return {
          success: false,
          message: "Career already exists",
          code: RESPONSE_CODES.CONFLICT,
        };

      slug = generateSlug(validation.data.positionEn);
    }

    await prisma.careers.update({
      where: { id },
      data: {
        ...validation.data,
        slug,
      },
    });

    revalidateTag("careers", "max");

    return {
      success: true,
      message: "Career updated successfully",
      code: RESPONSE_CODES.OK,
    };
  }

  return {
    success: false,
    message: "Validation error",
    code: RESPONSE_CODES.BAD_REQUEST,
  };
};

export const deleteCareer = async (id: string) => {
  if (!id)
    return {
      success: false,
      message: "Career id is required",
      code: RESPONSE_CODES.BAD_REQUEST,
    };

  const existingCareer = await prisma.careers.findUnique({
    where: { id },
    select: {
      id: true,
      image: true,
    },
  });

  if (!existingCareer)
    return {
      success: false,
      message: "Career not found",
      code: RESPONSE_CODES.NOT_FOUND,
    };

  await prisma.careers.delete({
    where: { id },
  });

  const imageKey = existingCareer.image?.split("/f/")[1];

  if (imageKey) {
    await utapi.deleteFiles(imageKey);
  }

  revalidateTag("careers", "max");

  return {
    success: true,
    message: "Career deleted successfully",
    code: RESPONSE_CODES.OK,
  };
};

/* -------------------- Caching Helps --------------------  */

// cached Careers used with getAllCareers and getAllCareersByLocale
const getCachedCareers = () =>
  unstable_cache(
    async () => {
      return prisma.careers.findMany({
        include: {
          applications: {
            select: {
              id: true,
            },
          },
        },
      });
    },
    ["careers"],
    {
      tags: ["careers"],
      revalidate: 3600,
    },
  )();

// cached Careers With Applications used with getAllCareersWithApplications
const getCachedCareersWithApplications = () =>
  unstable_cache(
    async () => {
      return prisma.careers.findMany({
        include: {
          applications: true,
        },
      });
    },
    ["careers-with-applications"],
    {
      tags: ["careers"],
      revalidate: 3600,
    },
  )();

// cached Career By ID used with getCareerById
const getCachedCareerById = (id: string) =>
  unstable_cache(
    async () => {
      return prisma.careers.findUnique({
        where: { id },
      });
    },
    [`career-${id}`],
    {
      tags: ["careers"],
      revalidate: 3600,
    },
  )();

// cached Career By Slug used with getCareerBySlug
const getCachedCareerBySlug = (slug: string) =>
  unstable_cache(
    async () => {
      return prisma.careers.findUnique({
        where: { slug },
      });
    },
    [`career-slug-${slug}`],
    {
      tags: ["careers"],
      revalidate: 3600,
    },
  )();

// cached Career With Applications By ID used with getCareerWithApplicationsById
const getCachedCareerWithApplicationsById = (id: string) =>
  unstable_cache(
    async () => {
      return prisma.careers.findUnique({
        where: { id },
        include: {
          applications: true,
        },
      });
    },
    [`career-with-applications-${id}`],
    {
      tags: ["careers"],
      revalidate: 3600,
    },
  )();

// cached Career By Locale used with getCareersByLocale
const getCachedCareersByLocale = (locale: Locale) =>
  unstable_cache(
    async () => {
      const careers = await prisma.careers.findMany({});

      return careers.map((career: CareersGetPayload) => ({
        id: career.id,
        position: locale === "en" ? career.positionEn : career.positionAr,
        description:
          locale === "en" ? career.descriptionEn : career.descriptionAr,
        image: career.image,
        requirements:
          locale === "en" ? career.requirementsEn : career.requirementsAr,
        role: locale === "en" ? career.roleEn : career.roleAr,
        experience: locale === "en" ? career.experienceEn : career.experienceAr,
        slug: career.slug,
      }));
    },
    [`careers-locale-${locale}`],
    {
      tags: ["careers"],
      revalidate: 3600,
    },
  )();

// cached Career By ID and Locale used with getCareerByIdAndLocale
const getCachedCareerByIdAndLocale = (id: string, locale: Locale) =>
  unstable_cache(
    async () => {
      const career = await prisma.careers.findUnique({
        where: { id },
      });

      if (!career) return null;

      return {
        id: career.id,
        position: locale === "en" ? career.positionEn : career.positionAr,
        description:
          locale === "en" ? career.descriptionEn : career.descriptionAr,
        image: career.image,
        requirements:
          locale === "en" ? career.requirementsEn : career.requirementsAr,
        role: locale === "en" ? career.roleEn : career.roleAr,
        experience: locale === "en" ? career.experienceEn : career.experienceAr,
        slug: career.slug,
      };
    },
    [`career-${id}-locale-${locale}`],
    {
      tags: ["careers"],
      revalidate: 3600,
    },
  )();

// cached Career By Slug and Locale used with getCareerBySlugAndLocale
const getCachedCareerBySlugAndLocale = (slug: string, locale: Locale) =>
  unstable_cache(
    async () => {
      const career = await prisma.careers.findUnique({
        where: { slug },
      });

      if (!career) return null;

      return {
        id: career.id,
        position: locale === "en" ? career.positionEn : career.positionAr,
        description:
          locale === "en" ? career.descriptionEn : career.descriptionAr,
        image: career.image,
        requirements:
          locale === "en" ? career.requirementsEn : career.requirementsAr,
        role: locale === "en" ? career.roleEn : career.roleAr,
        experience: locale === "en" ? career.experienceEn : career.experienceAr,
        slug: career.slug,
      };
    },
    [`career-slug-${slug}-locale-${locale}`],
    {
      tags: ["careers"],
      revalidate: 3600,
    },
  )();

/* -------------------- Caching Helps --------------------  */

export const getAllCareers = async () => {
  const careers = await getCachedCareers();

  return {
    success: true,
    message: "Careers retrieved successfully",
    code: RESPONSE_CODES.OK,
    careers,
  };
};

export const getAllCareersWithApplications = async () => {
  const careers = await getCachedCareersWithApplications();

  return {
    success: true,
    message: "Careers with applications retrieved successfully",
    code: RESPONSE_CODES.OK,
    careers,
  };
};

export const getCareerById = async (id: string) => {
  if (!id)
    return {
      success: false,
      message: "Career id is required",
      code: RESPONSE_CODES.BAD_REQUEST,
    };

  const career = await getCachedCareerById(id);

  if (!career)
    return {
      success: false,
      message: "Career not found",
      code: RESPONSE_CODES.NOT_FOUND,
    };

  return {
    success: true,
    message: "Career retrieved successfully",
    code: RESPONSE_CODES.OK,
    career,
  };
};

export const getCareerBySlug = async (slug: string) => {
  if (!slug)
    return {
      success: false,
      message: "Career slug is required",
      code: RESPONSE_CODES.BAD_REQUEST,
    };

  const career = await getCachedCareerBySlug(slug);

  if (!career)
    return {
      success: false,
      message: "Career not found",
      code: RESPONSE_CODES.NOT_FOUND,
    };

  return {
    success: true,
    message: "Career retrieved successfully",
    code: RESPONSE_CODES.OK,
    career,
  };
};

export const getCareerWithApplicationsById = async (id: string) => {
  if (!id)
    return {
      success: false,
      message: "Career id is required",
      code: RESPONSE_CODES.BAD_REQUEST,
    };

  const career = await getCachedCareerWithApplicationsById(id);

  if (!career)
    return {
      success: false,
      message: "Career not found",
      code: RESPONSE_CODES.NOT_FOUND,
    };

  return {
    success: true,
    message: "Career retrieved successfully",
    code: RESPONSE_CODES.OK,
    career,
  };
};

export const getCareerNameAndIdById = async (id: string) => {
  if (!id)
    return {
      success: false,
      message: "Career id is required",
      code: RESPONSE_CODES.BAD_REQUEST,
    };

  const career = await prisma.careers.findUnique({
    where: { id },
    select: {
      id: true,
      positionEn: true,
    },
  });

  if (!career)
    return {
      success: false,
      message: "Career not found",
      code: RESPONSE_CODES.NOT_FOUND,
    };

  return {
    success: true,
    message: "Career retrieved successfully",
    code: RESPONSE_CODES.OK,
    career,
  };
};

export const getCareersByLocale = async (locale: Locale) => {
  const careers = await getCachedCareersByLocale(locale);

  return {
    success: true,
    message: "Careers retrieved successfully",
    code: RESPONSE_CODES.OK,
    careers,
  };
};

export const getCareerByIdAndLocale = async (id: string, locale: Locale) => {
  if (!id)
    return {
      success: false,
      message: "Career id is required",
      code: RESPONSE_CODES.BAD_REQUEST,
    };

  const career = await getCachedCareerByIdAndLocale(id, locale);

  if (!career)
    return {
      success: false,
      message: "Career not found",
      code: RESPONSE_CODES.NOT_FOUND,
    };

  return {
    success: true,
    message: "Career retrieved successfully",
    code: RESPONSE_CODES.OK,
    career,
  };
};

export const getCareerBySlugAndLocale = async (
  slug: string,
  locale: Locale,
) => {
  if (!slug)
    return {
      success: false,
      message: "Career slug is required",
      code: RESPONSE_CODES.BAD_REQUEST,
    };

  const career = await getCachedCareerBySlugAndLocale(slug, locale);

  if (!career)
    return {
      success: false,
      message: "Career not found",
      code: RESPONSE_CODES.NOT_FOUND,
    };

  return {
    success: true,
    message: "Career retrieved successfully",
    code: RESPONSE_CODES.OK,
    career,
  };
};
