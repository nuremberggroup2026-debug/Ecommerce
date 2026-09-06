import { Prisma } from "@/generated/prisma/client";

export type NewBanner = Prisma.bannersCreateInput;
export type UpdateBanner = Prisma.bannersUpdateInput;

export type TranslatedBanner = {
  id: string;
  name: string;
  image: string;
};
