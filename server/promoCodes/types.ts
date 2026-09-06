export type PromoCodeCreateInput = {
  code: string;
  discountPercentage: number;
  maxUsage: number;
  expiresAt?: Date;
  isActive?: boolean;
};
