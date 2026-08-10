export type TransalatedCategories = {
  id: string;
  image: string;
  createdAt: Date;
  slug: string;
  name: string;
  description: string;
  isFeatured: boolean;
};

export type AdminCategories = {
  id: string;
  image: string;
  createdAt: Date;
  slug: string;
  categoryNameAr: string;
  categoryNameEn: string;
  categoryDescriptionAr: string;
  categoryDescriptionEn: string;
  isFeatured: boolean;
};


export interface PUTAdminCategory {
  image: string;
  categoryNameAr: string;
  categoryNameEn: string;
  categoryDescriptionAr: string;
  categoryDescriptionEn: string;
  isFeatured: boolean;
}
  

export interface CreateAdminCategory {
  image: string;
  categoryNameAr: string;
  categoryNameEn: string;
  categoryDescriptionAr: string;
  categoryDescriptionEn: string;
  isFeatured: boolean;
}