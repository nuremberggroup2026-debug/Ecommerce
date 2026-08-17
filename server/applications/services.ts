import { RESPONSE_CODES } from "@/lib/constants/response";
import { prisma } from "@/lib/prisma";
import { type ApplicationCreateInput } from "@/types/index";
import { revalidateTag, unstable_cache } from "next/cache";
import { UTApi } from "uploadthing/server";
import { applicationSchemaEn } from "./validators";

const utapi = new UTApi();

export const addNewApplication = async (
  newApplication: ApplicationCreateInput,
) => {
  const validation = applicationSchemaEn.safeParse(newApplication);
   console.log("valdation: ",validation.error);
   
  if (validation.success) {
    const career = await prisma.careers.findUnique({
      where: { slug: newApplication.careerSlug },
      select: { id: true },
    });

    if (!career)
      return {
        success: false,
        message: "CAREER_NOT_FOUND",
        code: RESPONSE_CODES.NOT_FOUND,
      };

    const {  phoneNumber, ...applicationData } = validation.data;

    await prisma.applications.create({
      data: {
        careerId: career.id,
        phoneNumber: String(phoneNumber),
        ...applicationData,
      },
    });

    revalidateTag("applications",  {expire:0});
        revalidateTag("careers",  {expire:0});


    return {
      success: true,
      message: "APPLICATION_SUBMITTED_SUCCESSFULLY",
      code: RESPONSE_CODES.CREATED,
    };
  }

  return {
    success: false,
    message: "VALIDATION_ERROR",
    code: RESPONSE_CODES.BAD_REQUEST,
  };
};

export const deleteApplication = async (id: string) => {
  if (!id)
    return {
      success: false,
      message: "APPLICATION_ID_REQUIRED",
      code: RESPONSE_CODES.BAD_REQUEST,
    };

  const existingApplication = await prisma.applications.findUnique({
    where: { id },
    select: {
      id: true,
      cv: true,
    },
  });

  if (!existingApplication)
    return {
      success: false,
      message: "APPLICATION_NOT_FOUND",
      code: RESPONSE_CODES.NOT_FOUND,
    };

  await prisma.applications.delete({
    where: { id },
  });

  const fileKey = existingApplication.cv.split("/f/")[1];

  if (fileKey) {
    await utapi.deleteFiles(fileKey);
  }

  revalidateTag("applications",  {expire:0});
          revalidateTag("careers",  {expire:0});


  return {
    success: true,
    message: "APPLICATION_DELETED_SUCCESSFULLY",
    code: RESPONSE_CODES.OK,
  };
};

export const deleteAllExpiredApplications = async () => {
  const date = new Date();
  date.setDate(date.getDate() - 45);

  const expiredApplications = await prisma.applications.findMany({
    where: {
      appliedAt: {
        lt: date,
      },
    },
    select: {
      id: true,
      cv: true,
    },
  });

  if (expiredApplications.length === 0)
    return {
      success: false,
      message: "No expired applications found",
      code: RESPONSE_CODES.NOT_FOUND,
      deletedCount: 0,
    };

  const expiredApplicationsIds = expiredApplications.map(
    (application) => application.id,
  );

  const result = await prisma.applications.deleteMany({
    where: {
      id: {
        in: expiredApplicationsIds,
      },
    },
  });

  const cvKeys = expiredApplications
    .map((application) => application.cv?.split("/f/")[1])
    .filter(Boolean);

  if (cvKeys.length > 0) {
    await utapi.deleteFiles(cvKeys as string[]);
  }

  revalidateTag("applications",  {expire:0});
          revalidateTag("careers",  {expire:0});


  return {
    success: true,
    message: "Expired applications deleted successfully",
    code: RESPONSE_CODES.OK,
    deletedCount: result.count,
  };
};

/* -------------------- Caching Helps --------------------  */

// cached Applications used with getAllApplications
const getCachedApplications = () =>
  unstable_cache(
    async () => {
      return prisma.applications.findMany({});
    },
    ["applications"],
    {
      tags: ["applications"],
      revalidate: 3600,
    },
  )();

// cached Applications by career ID used with getApplicationsByCareerId
const getCachedApplicationsByCareerId = (careerId: string) =>
  unstable_cache(
    async () => {
      return prisma.applications.findMany({
        where: {
          careerId,
        },
        include: {
          careers: {
            select: {
              positionEn: true,
            },
          },
        },
      });
    },
    [`applications-career-${careerId}`],
    {
      tags: ["applications"],
      revalidate: 3600,
    },
  )();

// cached Applications by ID used with getApplicationsByApplicationId
const getCachedApplicationById = (applicationId: string) =>
  unstable_cache(
    async () => {
      return prisma.applications.findUnique({
        where: {
          id: applicationId,
        },
      });
    },
    [`application-${applicationId}`],
    {
      tags: ["applications"],
      revalidate: 3600,
    },
  )();

export const getCachedFilteredApplications = (
  careerId: string,
  page: number,
  limit: number = 10,
) => {
  const skip = limit * (page - 1);

  return unstable_cache(
    async () => {
      const [applications, totalApplications] = await prisma.$transaction([
        prisma.applications.findMany({
          where: {
            careerId,
          },
          skip,
          take: limit,
          orderBy: {
            appliedAt: "desc",
          },
        }),

        prisma.applications.count({
          where: {
            careerId,
          },
        }),
      ]);

      return {
        applications,
        totalApplications,
      };
    },

    [`filtered-applications-by-career-id-and-page-${page}`],

    {
      tags: [`applications`],
      revalidate: 3600,
    },
  )();
};

export const getCachedApplicationsWithCareerById = (applicationId: string) =>
  unstable_cache(
    async () => {
      return prisma.applications.findUnique({
        where: { id: applicationId },
        include: {
          careers: true,
        },
      });
    },
    [`applications-with-career-by-id-${applicationId}`],
    {
      tags: ["applications"],
      revalidate: 3600,
    },
  )();

////////////////////////////////////////////////////////
export const deleteManyApplications = async (ids: string[]) => {
  if (!ids.length) {
    return {
      success: false,
      message: "APPLICATIONS_IDS_REQUIRED",
      code: RESPONSE_CODES.BAD_REQUEST,
    };
  }

  const existingApplications = await prisma.applications.findMany({
    where: {
      id: {
        in: ids,
      },
    },
  });

  if (existingApplications.length === 0) {
    return {
      success: false,
      message: "APPLICATIONS_NOT_FOUND",
      code: RESPONSE_CODES.NOT_FOUND,
    };
  }

  const result = await prisma.applications.deleteMany({
    where: {
      id: {
        in: ids,
      },
    },
  });

  if (result.count === 0) {
    return {
      success: false,
      message: "APPLICATIONS_DELETE_FAILED",
      code: RESPONSE_CODES.BAD_REQUEST,
    };
  }

  const fileKeys = existingApplications
    .map((application) => application.cv.split("/f/")[1])
    .filter(Boolean);

  if (fileKeys.length) {
    await utapi.deleteFiles(fileKeys);
  }

  revalidateTag("applications", { expire: 0 });

  return {
    success: true,
    message: "APPLICATIONS_DELETED_SUCCESSFULLY",
    code: RESPONSE_CODES.OK,
  };
};
///////////////////////////////////////////////////////

/* -------------------- Caching Helps --------------------  */

export const getAllApplications = async () => {
  const applications = await getCachedApplications();

  return {
    success: true,
    message: "APPLICATIONS_RETRIEVED_SUCCESSFULLY",
    code: RESPONSE_CODES.OK,
    applications,
  };
};

export const getApplicationsByCareerId = async (careerId: string) => {
  if (!careerId)
    return {
      success: false,
      message: "CAREER_ID_REQUIRED",
      code: RESPONSE_CODES.BAD_REQUEST,
    };

  const applications = await getCachedApplicationsByCareerId(careerId);

  return {
    success: true,
    message: "APPLICATIONS_RETRIEVED_SUCCESSFULLY",
    code: RESPONSE_CODES.OK,
    applications,
  };
};

export const getApplicationsByApplicationId = async (applicationId: string) => {
  if (!applicationId)
    return {
      success: false,
      message: "APPLICATION_ID_REQUIRED",
      code: RESPONSE_CODES.BAD_REQUEST,
    };

  const application = await getCachedApplicationById(applicationId);

  if (!application)
    return {
      success: false,
      message: "APPLICATION_NOT_FOUND",
      code: RESPONSE_CODES.NOT_FOUND,
    };

  return {
    success: true,
    message: "APPLICATION_RETRIEVED_SUCCESSFULLY",
    code: RESPONSE_CODES.OK,
    application,
  };
};

export const getFilteredApplications = async (
  careerId: string,
  page: number,
) => {
  try {
    if (!careerId)
      return {
        success: false,
        message: "CAREER_ID_REQUIRED",
        code: RESPONSE_CODES.BAD_REQUEST,
        applications: [],
        pagination: null,
      };

    const limit = 10;

    const result = await getCachedFilteredApplications(careerId, page, limit);

    return {
      success: true,
      message: "FILTERED_APPLICATIONS_RETRIEVED_SUCCESSFULLY",
      code: RESPONSE_CODES.OK,

      applications: result.applications,

      pagination: {
        currentPage: page,
        itemsPerPage: limit,
        totalItems: result.totalApplications,
        totalPages: Math.ceil(result.totalApplications / limit),
      },
    };
  } catch (error) {
    console.log("Get filtered applications error:", error);

    return {
      success: false,
      message: "INTERNAL_SERVER_ERROR",
      code: RESPONSE_CODES.INTERNAL_ERROR,
      applications: [],
      pagination: null,
    };
  }
};

export const getApplicationsWithCareerById = async (id: string) => {
  if (!id)
    return {
      success: false,
      message: "APPLICATION_ID_REQUIRED",
      code: RESPONSE_CODES.BAD_REQUEST,
    };

  const application = await getCachedApplicationsWithCareerById(id);

  if (!application)
    return {
      success: false,
      message: "APPLICATION_NOT_FOUND",
      code: RESPONSE_CODES.NOT_FOUND,
    };

  return {
    success: true,
    message: "APPLICATION_RETRIEVED_SUCCESSFULLY",
    code: RESPONSE_CODES.OK,
    application,
  };
};

export const markApplicationAsShown = async (id: string) => {
  if (!id) {
    return {
      success: false,
      message: "APPLICATION_ID_REQUIRED",
      code: RESPONSE_CODES.BAD_REQUEST,
    };
  }

  const existingApplication = await prisma.applications.findUnique({
    where: { id },
  });

  if (!existingApplication) {
    return {
      success: false,
      message: "APPLICATION_NOT_FOUND",
      code: RESPONSE_CODES.NOT_FOUND,
    };
  }

  await prisma.applications.update({
    where: { id },
    data: {
      isShown: !existingApplication.isShown,
    },
  });

  revalidateTag("applications", { expire: 0 });
          revalidateTag("careers",  {expire:0});


  return {
    success: true,
    message: existingApplication.isShown
      ? "APPLICATION_MARKED_AS_UNSHOWN_SUCCESSFULLY"
      : "APPLICATION_MARKED_AS_SHOWN_SUCCESSFULLY",
    code: RESPONSE_CODES.OK,
  };
};
