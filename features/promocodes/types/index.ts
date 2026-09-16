import { CreatePromoCodeSchema,UpdatePromoCodeSchema } from "@/server/promoCodes/validators";

export type CreatePromoCodeType = CreatePromoCodeSchema;
export type UpdatePromoCodeType = UpdatePromoCodeSchema;

export type AllPromoCodes = {
  id: string;
  createdAt: Date;
  discountPercentage: number;
  code: string;
  maxUsage: number;
  expiresAt: Date | null;
  isActive: boolean;
  usedCount: number;
};

export type AdminPromoCodesData = {
  promoCodes: AllPromoCodes[];
  pagination: {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
  };
};

export interface ResponseType<T> {
  message: string;
  success: boolean;
  data: T;
}