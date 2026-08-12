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
    image:string,
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