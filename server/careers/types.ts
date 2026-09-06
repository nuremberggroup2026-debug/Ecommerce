import { Prisma } from "@/generated/prisma/client";

export type Locale = "ar" | "en";
export type CareersCreateInput = {
  id?: string | undefined;
  positionEn: string;
  positionAr: string;
  descriptionEn: string;
  descriptionAr: string;
  roleEn: string;
  roleAr: string;
  experienceEn: string;
  experienceAr: string;
  requirementsEn?: string[];
  requirementsAr?: string[];
  image: string;
};
export type CareersUpdateInput = Prisma.careersUpdateInput;
export type CareersGetPayload = Prisma.careersGetPayload<{}>;
