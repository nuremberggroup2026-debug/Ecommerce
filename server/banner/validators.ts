import z from "zod";

export const bannerSchema = z.object({
  nameEn: z.string().min(5).max(30),
  nameAr: z.string().min(5).max(30),
  image: z.string(),
});

export const updateBannerSchema = z.object({
  nameEn: z.string().min(5).max(30).optional(),
  nameAr: z.string().min(5).max(30).optional(),
  image: z.string().optional(),
});
