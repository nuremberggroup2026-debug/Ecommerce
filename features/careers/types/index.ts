
export type TransalatedCareers = {
  id: string;
  image: string;
  createdAt: Date;
  position: string;
  description: string;
  requirements: string[];
  experience: string;
  role: string;
};

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
