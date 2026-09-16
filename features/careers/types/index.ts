import { Prisma } from "@/generated/prisma/client";

export type AdminCareers = {
  id: string;
  image: string;
  createdAt: Date;
  positionEn: string;
  positionAr: string;
  descriptionEn: string;
  descriptionAr: string;
  requirementsEn: string[];
  requirementsAr: string[];
  experienceEn: string;
  experienceAr: string;
  roleEn: string;
  roleAr: string;
};

export interface PUTAdminCareer {
  positionEn: string;
  positionAr: string;
  descriptionEn: string;
  descriptionAr: string;
  requirementsEn: string[];
  requirementsAr: string[];
  experienceEn: string;
  experienceAr: string;
  roleEn: string;
  roleAr: string;
  image: string;
}

export interface CreateAdminCareer {
  positionEn: string;
  positionAr: string;
  descriptionEn: string;
  descriptionAr: string;
  requirementsEn: string[];
  requirementsAr: string[];
  experienceEn: string;
  experienceAr: string;
  roleEn: string;
  roleAr: string;
  image: string;
}

export type ApplicationGetPayloadWithCareer = Prisma.applicationsGetPayload<{
  include: {
    careers: {
      select: {
        position_en: true;
        image: true;
      };
    };
  };
}>;

export type TransalatedCareer = {
  id: string;
  position: string;
  description: string;
  image: string;
  requirements: string[];
  role: string | null;
  experience: string | null;
  slug: string;
};
