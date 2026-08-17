export type CareerApplication = {
  id: string;
  firstName: string;
  lastName: string | null;
  email: string;
  phoneNumber: string;
  major: string | null;
  cv: string;
  careerId: string;
  isShown: boolean;
  appliedAt: string | Date;

  careers: {
    id: string;
    positionEn: string;
    positionAr: string;
    roleEn: string | null;
    roleAr: string | null;
    image: string;
    experienceEn: string | null;
    experienceAr: string | null;
    descriptionEn: string;
    descriptionAr: string;
  };
};
export type CareerWithApplications = {
  id: string;

  positionEn: string;
  positionAr: string;

  descriptionEn: string;
  descriptionAr: string;

  experienceEn: string | null;
  experienceAr: string | null;

  roleEn: string | null;
  roleAr: string | null;

  image: string;

  slug: string;

  requirementsEn: string[];
  requirementsAr: string[];

  createdAt: Date;

  applications: CareerApplication[];
};
export type CareerCard = {
  id: string;
  positionEn: string;
  positionAr: string;
  descriptionEn: string;
  descriptionAr: string;
  experienceEn: string | null;
  experienceAr: string | null;
  roleEn: string | null;
  roleAr: string | null;
  image: string;
  slug: string;
  requirementsEn: string[];
  requirementsAr: string[];
  createdAt: string;
  applications: {
    id: string;
    email: string;
    phoneNumber: string;
    major: string | null;
    cv: string;
    careerId: string;
    isShown: boolean;
    appliedAt: string;
    firstName: string;
    lastName: string | null;
  }[];
};

export type PostResponseType = {
  message: string;
  success: boolean;
  status: number;
};

export interface PutResponseType {
  message: string;
  success: boolean;
}
export interface deleteResponseType {
  message: string;
  success: boolean;
}
export interface AddResponseType {
  message: string;
  success: boolean;
}
export interface ShownResponseType {
  message: string;
  success: boolean;
}

export interface ResponseType<T> {
  message: string;
  success: boolean;
  data: T;
}

export type ApplicationCreateInput = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: number;
  major: string;
  cv: string;
  careerSlug: string;
};

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
